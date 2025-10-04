"""Technical indicator data models."""

from dataclasses import dataclass

import pandas as pd


@dataclass
class TechnicalIndicators:
    """Container for technical indicators."""

    price: float
    ma_20: float
    ma_50: float
    ma_200: float
    rsi: float
    volume_ratio: float
    week_change: float
    month_change: float
    price_history: pd.DataFrame

    def is_above_ma20(self) -> bool:
        """Check if price is above 20-day MA."""
        return self.price > self.ma_20

    def is_above_ma50(self) -> bool:
        """Check if price is above 50-day MA."""
        return self.price > self.ma_50

    def is_above_ma200(self) -> bool:
        """Check if price is above 200-day MA."""
        return self.price > self.ma_200

    def is_oversold(self, threshold: float = 30) -> bool:
        """Check if RSI indicates oversold condition."""
        return self.rsi < threshold

    def is_overbought(self, threshold: float = 70) -> bool:
        """Check if RSI indicates overbought condition."""
        return self.rsi > threshold

    def has_high_volume(self, threshold: float = 1.5) -> bool:
        """Check if volume is elevated."""
        return self.volume_ratio > threshold
