"""Technical indicator calculations."""

from typing import Optional

import numpy as np
import pandas as pd
import yfinance as yf
from tenacity import retry, stop_after_attempt, wait_exponential

from ...models.indicators import TechnicalIndicators
from ...utils.logger import get_logger

logger = get_logger(__name__)


class TechnicalIndicatorCalculator:
    """Calculate technical indicators from price data."""

    def __init__(self, history_months: int = 6):
        """
        Initialize calculator.

        Args:
            history_months: Months of historical data to fetch
        """
        self.history_months = history_months
        self.logger = logger.bind(calculator="TechnicalIndicator")

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
    )
    def fetch_price_data(self, symbol: str) -> Optional[pd.DataFrame]:
        """
        Fetch historical price data.

        Args:
            symbol: Stock ticker symbol

        Returns:
            DataFrame with OHLCV data or None if failed
        """
        try:
            stock = yf.Ticker(symbol)
            hist = stock.history(period=f"{self.history_months}mo")

            if hist.empty:
                self.logger.warning(
                    "No price data available", symbol=symbol
                )
                return None

            return hist

        except Exception as e:
            self.logger.error(
                "Failed to fetch price data", symbol=symbol, error=str(e)
            )
            return None

    def calculate_moving_averages(
        self, df: pd.DataFrame
    ) -> tuple[float, float, float]:
        """
        Calculate moving averages.

        Args:
            df: Price data DataFrame

        Returns:
            Tuple of (MA20, MA50, MA200)
        """
        ma_20 = df["Close"].rolling(window=20).mean().iloc[-1]
        ma_50 = df["Close"].rolling(window=50).mean().iloc[-1]
        ma_200 = df["Close"].rolling(window=100).mean().iloc[-1]

        return ma_20, ma_50, ma_200

    def calculate_rsi(
        self, df: pd.DataFrame, period: int = 14
    ) -> float:
        """
        Calculate Relative Strength Index.

        Args:
            df: Price data DataFrame
            period: RSI period (default 14)

        Returns:
            Current RSI value
        """
        delta = df["Close"].diff()
        gain = delta.where(delta > 0, 0).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()

        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))

        return rsi.iloc[-1]

    def calculate_volume_ratio(self, df: pd.DataFrame) -> float:
        """
        Calculate current volume vs average volume ratio.

        Args:
            df: Price data DataFrame

        Returns:
            Volume ratio
        """
        avg_volume = df["Volume"].rolling(window=20).mean().iloc[-1]
        current_volume = df["Volume"].iloc[-1]

        return current_volume / avg_volume if avg_volume > 0 else 1.0

    def calculate_price_momentum(
        self, df: pd.DataFrame
    ) -> tuple[float, float]:
        """
        Calculate price momentum.

        Args:
            df: Price data DataFrame

        Returns:
            Tuple of (week_change_pct, month_change_pct)
        """
        current = df["Close"].iloc[-1]

        week_ago = df["Close"].iloc[-5] if len(df) >= 5 else current
        month_ago = df["Close"].iloc[-20] if len(df) >= 20 else current

        week_change = ((current - week_ago) / week_ago) * 100
        month_change = ((current - month_ago) / month_ago) * 100

        return week_change, month_change

    def calculate(self, symbol: str) -> Optional[TechnicalIndicators]:
        """
        Calculate all technical indicators.

        Args:
            symbol: Stock ticker symbol

        Returns:
            TechnicalIndicators object or None if failed
        """
        self.logger.info("Calculating indicators", symbol=symbol)

        hist = self.fetch_price_data(symbol)
        if hist is None:
            return None

        try:
            # Current price
            current_price = hist["Close"].iloc[-1]

            # Moving averages
            ma_20, ma_50, ma_200 = self.calculate_moving_averages(hist)

            # RSI
            rsi = self.calculate_rsi(hist)

            # Volume
            volume_ratio = self.calculate_volume_ratio(hist)

            # Momentum
            week_change, month_change = self.calculate_price_momentum(hist)

            indicators = TechnicalIndicators(
                price=current_price,
                ma_20=ma_20,
                ma_50=ma_50,
                ma_200=ma_200,
                rsi=rsi,
                volume_ratio=volume_ratio,
                week_change=week_change,
                month_change=month_change,
                price_history=hist,
            )

            self.logger.info(
                "Indicators calculated",
                symbol=symbol,
                price=f"${current_price:.2f}",
                rsi=f"{rsi:.1f}",
            )

            return indicators

        except Exception as e:
            self.logger.error(
                "Indicator calculation failed",
                symbol=symbol,
                error=str(e),
            )
            return None
