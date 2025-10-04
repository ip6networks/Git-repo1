"""Main application entry point with all sentiment providers."""

import asyncio
from datetime import datetime
from pathlib import Path
from typing import List

from tabulate import tabulate

from .config.settings import get_settings
from .models.signal import TradingSignal
from .services.sentiment.finnhub import FinnhubSentimentProvider
from .services.sentiment.news_api import NewsAPISentimentProvider
from .services.sentiment.reddit import RedditSentimentProvider
from .services.signal_generator import SignalGenerator
from .services.technical.analyzers import TechnicalAnalyzer
from .services.technical.indicators import TechnicalIndicatorCalculator
from .utils.decorators import log_execution_time
from .utils.logger import get_logger, setup_logging
from .visualization.dashboard import Dashboard

logger = get_logger(__name__)


class StockSignalSystem:
    """Main stock signal analysis system with all providers."""

    def __init__(self):
        """Initialize the system with configuration."""
        self.settings = get_settings()

        # Setup logging
        setup_logging(
            level=self.settings.logging_config.level,
            log_file=self.settings.logging_config.file,
        )

        # Initialize all sentiment providers
        self.sentiment_providers = []

        # NewsAPI provider
        try:
            news_provider = NewsAPISentimentProvider(
                api_key=self.settings.news_api_key.get_secret_value(),
                config=self.settings.api_configs.get("news_api", {}),
            )
            self.sentiment_providers.append(news_provider)
            logger.info("NewsAPI provider initialized")
        except Exception as e:
            logger.warning(f"Failed to initialize NewsAPI: {e}")

        # Reddit provider
        try:
            reddit_provider = RedditSentimentProvider(
                client_id=self.settings.reddit_client_id.get_secret_value(),
                client_secret=self.settings.reddit_secret.get_secret_value(),
                user_agent=self.settings.api_configs.get("reddit", {}).get(
                    "user_agent", "stock_signal_bot/1.0"
                ),
                config=self.settings.api_configs.get("reddit", {}),
            )
            self.sentiment_providers.append(reddit_provider)
            logger.info("Reddit provider initialized")
        except Exception as e:
            logger.warning(f"Failed to initialize Reddit: {e}")

        # Finnhub provider
        try:
            finnhub_provider = FinnhubSentimentProvider(
                api_key=self.settings.finnhub_key.get_secret_value(),
                config=self.settings.api_configs.get("finnhub", {}),
            )
            self.sentiment_providers.append(finnhub_provider)
            logger.info("Finnhub provider initialized")
        except Exception as e:
            logger.warning(f"Failed to initialize Finnhub: {e}")

        if not self.sentiment_providers:
            logger.error("No sentiment providers available!")

        # Technical analysis services
        self.technical_calculator = TechnicalIndicatorCalculator(
            history_months=self.settings.data.price_history_months
        )

        self.technical_analyzer = TechnicalAnalyzer(
            weights=self.settings.technical_weights
        )

        self.signal_generator = SignalGenerator(
            thresholds=self.settings.thresholds,
            weights=self.settings.weights,
        )

        self.dashboard = Dashboard(
            output_path=self.settings.output.save_path
        )

        self.logger = logger.bind(system="StockSignal")

    async def analyze_symbol(
        self, symbol: str, company_name: str
    ) -> TradingSignal | None:
        """
        Analyze a single stock symbol.

        Args:
            symbol: Stock ticker symbol
            company_name: Company name

        Returns:
            TradingSignal or None if analysis failed
        """
        self.logger.info("Analyzing", symbol=symbol, company=company_name)

        try:
            # Fetch sentiment from all providers concurrently
            sentiment_tasks = [
                provider.fetch_sentiment(symbol, company_name)
                for provider in self.sentiment_providers
            ]
            sentiment_results = await asyncio.gather(
                *sentiment_tasks, return_exceptions=True
            )

            # Combine sentiment scores
            all_sentiments = []
            source_scores = {}

            for provider, result in zip(
                self.sentiment_providers, sentiment_results
            ):
                if isinstance(result, Exception):
                    self.logger.warning(
                        f"Provider {provider.name} failed: {result}"
                    )
                    continue

                scores = result
                all_sentiments.extend(scores)
                
                if scores:
                    source_scores[provider.name] = sum(scores) / len(scores)
                    self.logger.info(
                        f"{provider.name}: {len(scores)} sources, "
                        f"avg {source_scores[provider.name]:.3f}"
                    )

            if not all_sentiments:
                avg_sentiment = 0.0
                self.logger.warning(
                    "No sentiment data available", symbol=symbol
                )
            else:
                avg_sentiment = sum(all_sentiments) / len(all_sentiments)

            from .models.signal import SentimentScore

            sentiment_score = SentimentScore(
                value=avg_sentiment,
                source_count=len(all_sentiments),
                sources=source_scores,
            )

            # Calculate technical indicators
            indicators = self.technical_calculator.calculate(symbol)
            if indicators is None:
                self.logger.error("Technical analysis failed", symbol=symbol)
                return None

            # Analyze technical indicators
            technical_score = self.technical_analyzer.analyze(indicators)

            # Generate signal
            signal = self.signal_generator.generate(
                symbol=symbol,
                company_name=company_name,
                sentiment_score=sentiment_score,
                technical_score=technical_score,
                indicators=indicators,
            )

            self._print_signal_report(signal)

            return signal

        except Exception as e:
            self.logger.error(
                "Analysis failed", symbol=symbol, error=str(e)
            )
            return None

    def _print_signal_report(self, signal: TradingSignal):
        """Print formatted signal report."""
        print(f"\n{'='*60}")
        print(f"{signal.emoji} {signal.signal_type.value} - {signal.symbol}")
        print(f"{'='*60}")

        data = [
            ["Signal", f"{signal.emoji} {signal.signal_type.value}"],
            ["Confidence", signal.confidence_pct],
            ["Current Price", f"${signal.current_price:.2f}"],
            ["Week Change", f"{signal.week_change:+.2f}%"],
            ["RSI", f"{signal.rsi:.1f}"],
            ["", ""],
            ["Combined Score", f"{signal.combined_score:+.3f}"],
            [
                "├─ Sentiment",
                f"{signal.sentiment_score.value:+.3f} "
                f"({signal.sentiment_score.source_count} sources)",
            ],
            [
                "└─ Technical",
                f"{signal.technical_score.value:+.3f}",
            ],
        ]

        # Add source breakdown
        if signal.sentiment_score.sources:
            data.append(["", ""])
            data.append(["Sentiment Sources:", ""])
            for source, score in signal.sentiment_score.sources.items():
                data.append([f"  • {source}", f"{score:+.3f}"])

        print(tabulate(data, tablefmt="simple"))

        if signal.warnings:
            print(f"\n⚠️  WARNINGS:")
            for warning in signal.warnings:
                print(f"   {warning}")

        print(
            f"\n📅 Generated: {signal.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
        )

    @log_execution_time
    async def analyze_watchlist(self) -> List[TradingSignal]:
        """
        Analyze all symbols in watchlist.

        Returns:
            List of trading signals
        """
        print("\n" + "=" * 60)
        print("🚀 STOCK SIGNAL SYSTEM - STARTING ANALYSIS")
        print("=" * 60)
        print(f"📋 Watchlist: {', '.join(self.settings.watchlist)}")
        print(
            f"📡 Providers: {', '.join([p.name for p in self.sentiment_providers])}"
        )
        print(f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)

        signals = []

        for symbol in self.settings.watchlist:
            company_name = self.settings.company_names.get(symbol, symbol)

            signal = await self.analyze_symbol(symbol, company_name)
            if signal:
                signals.append(signal)

        return signals

    def process_results(self, signals: List[TradingSignal]):
        """
        Process and display results.

        Args:
            signals: List of trading signals
        """
        if not signals:
            print("\n❌ No signals generated")
            return

        # Generate visualizations
        if self.settings.output.show_dashboard:
            self.dashboard.create_overview(signals)

        # Export CSV
        if self.settings.output.export_csv:
            filename = f"signals_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            self.dashboard.export_csv(signals, filename)

        # Print summary
        self._print_summary(signals)

    def _print_summary(self, signals: List[TradingSignal]):
        """Print summary statistics."""
        print("\n" + "=" * 60)
        print("📊 SUMMARY")
        print("=" * 60)

        buy_signals = sum(
            1 for s in signals if "BUY" in s.signal_type.value
        )
        sell_signals = sum(
            1 for s in signals if "SELL" in s.signal_type.value
        )
        hold_signals = sum(
            1 for s in signals if s.signal_type.value == "HOLD"
        )

        avg_confidence = sum(s.confidence for s in signals) / len(signals)

        print(f"🟢 Buy Signals: {buy_signals}")
        print(f"🔴 Sell Signals: {sell_signals}")
        print(f"🟡 Hold Signals: {hold_signals}")
        print(f"📈 Average Confidence: {avg_confidence:.1f}%")

        # Top recommendation
        best = max(signals, key=lambda x: x.combined_score)
        print(
            f"\n⭐ TOP PICK: {best.symbol} - {best.signal_type.value} "
            f"({best.confidence:.0f}% confidence)"
        )

        print("\n✅ Analysis complete!")


async def main():
    """Main entry point."""
    system = StockSignalSystem()
    signals = await system.analyze_watchlist()
    system.process_results(signals)


if __name__ == "__main__":
    asyncio.run(main())
