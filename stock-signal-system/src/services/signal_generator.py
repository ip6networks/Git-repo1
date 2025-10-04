"""Signal generation service."""

from typing import List, Optional

import numpy as np

from ..config.settings import Settings, ThresholdsConfig, WeightsConfig
from ..models.indicators import TechnicalIndicators
from ..models.signal import (
    SentimentScore,
    SignalType,
    TechnicalScore,
    TradingSignal,
)
from ..utils.logger import get_logger

logger = get_logger(__name__)


class SignalGenerator:
    """Generate trading signals from analysis data."""

    def __init__(
        self,
        thresholds: ThresholdsConfig,
        weights: WeightsConfig,
    ):
        """
        Initialize signal generator.

        Args:
            thresholds: Signal threshold configuration
            weights: Analysis weights configuration
        """
        self.thresholds = thresholds
        self.weights = weights
        self.logger = logger.bind(generator="Signal")

    def calculate_combined_score(
        self,
        sentiment_score: SentimentScore,
        technical_score: TechnicalScore,
    ) -> float:
        """
        Calculate weighted combined score.

        Args:
            sentiment_score: Sentiment analysis score
            technical_score: Technical analysis score

        Returns:
            Combined score (-1 to +1)
        """
        combined = (
            sentiment_score.value * self.weights.sentiment
            + technical_score.value * self.weights.technical
        )

        return np.clip(combined, -1, 1)

    def determine_signal_type(self, combined_score: float) -> SignalType:
        """
        Determine signal type from combined score.

        Args:
            combined_score: Combined analysis score

        Returns:
            SignalType enum
        """
        if combined_score >= self.thresholds.strong_buy:
            return SignalType.STRONG_BUY
        elif combined_score >= self.thresholds.buy:
            return SignalType.BUY
        elif combined_score >= self.thresholds.hold:
            return SignalType.HOLD
        elif combined_score >= self.thresholds.sell:
            return SignalType.SELL
        else:
            return SignalType.STRONG_SELL

    def generate_warnings(
        self,
        indicators: TechnicalIndicators,
        sentiment_score: SentimentScore,
    ) -> List[str]:
        """
        Generate risk warnings.

        Args:
            indicators: Technical indicators
            sentiment_score: Sentiment analysis score

        Returns:
            List of warning messages
        """
        warnings = []

        if indicators.is_overbought():
            warnings.append("⚠️ Overbought (RSI > 70)")

        if indicators.is_oversold():
            warnings.append("✅ Oversold (RSI < 30)")

        if sentiment_score.source_count < 10:
            warnings.append("⚠️ Low sentiment data")

        if not indicators.has_high_volume(threshold=0.5):
            warnings.append("⚠️ Low volume")

        return warnings

    def generate(
        self,
        symbol: str,
        company_name: str,
        sentiment_score: SentimentScore,
        technical_score: TechnicalScore,
        indicators: TechnicalIndicators,
    ) -> TradingSignal:
        """
        Generate complete trading signal.

        Args:
            symbol: Stock ticker symbol
            company_name: Company name
            sentiment_score: Sentiment analysis result
            technical_score: Technical analysis result
            indicators: Technical indicators

        Returns:
            TradingSignal with all analysis data
        """
        self.logger.info("Generating signal", symbol=symbol)

        # Calculate combined score
        combined_score = self.calculate_combined_score(
            sentiment_score, technical_score
        )

        # Determine signal type
        signal_type = self.determine_signal_type(combined_score)

        # Calculate confidence (0-100%)
        confidence = abs(combined_score) * 100

        # Generate warnings
        warnings = self.generate_warnings(indicators, sentiment_score)

        signal = TradingSignal(
            symbol=symbol,
            company_name=company_name,
            signal_type=signal_type,
            confidence=confidence,
            combined_score=combined_score,
            sentiment_score=sentiment_score,
            technical_score=technical_score,
            current_price=indicators.price,
            rsi=indicators.rsi,
            week_change=indicators.week_change,
            warnings=warnings,
        )

        self.logger.info(
            "Signal generated",
            symbol=symbol,
            signal=signal_type.value,
            confidence=f"{confidence:.1f}%",
        )

        return signal
