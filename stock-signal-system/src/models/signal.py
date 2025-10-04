"""Data models for signals and analysis results."""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import List

import numpy as np


class SignalType(Enum):
    """Signal type enumeration."""

    STRONG_BUY = "STRONG BUY"
    BUY = "BUY"
    HOLD = "HOLD"
    SELL = "SELL"
    STRONG_SELL = "STRONG SELL"

    @property
    def emoji(self) -> str:
        """Get emoji representation."""
        return {
            self.STRONG_BUY: "🟢🟢",
            self.BUY: "🟢",
            self.HOLD: "🟡",
            self.SELL: "🔴",
            self.STRONG_SELL: "🔴🔴",
        }[self]

    @property
    def color(self) -> str:
        """Get color for visualization."""
        return {
            self.STRONG_BUY: "green",
            self.BUY: "lightgreen",
            self.HOLD: "yellow",
            self.SELL: "orange",
            self.STRONG_SELL: "red",
        }[self]


@dataclass(frozen=True)
class SentimentScore:
    """Sentiment analysis score."""

    value: float
    source_count: int
    sources: dict[str, float] = field(default_factory=dict)

    def __post_init__(self):
        """Validate sentiment score."""
        if not -1 <= self.value <= 1:
            raise ValueError("Sentiment score must be between -1 and 1")


@dataclass(frozen=True)
class TechnicalScore:
    """Technical analysis score."""

    value: float
    components: dict[str, float] = field(default_factory=dict)

    def __post_init__(self):
        """Validate technical score."""
        if not -1 <= self.value <= 1:
            raise ValueError("Technical score must be between -1 and 1")


@dataclass
class TradingSignal:
    """Complete trading signal with all analysis data."""

    symbol: str
    company_name: str
    signal_type: SignalType
    confidence: float  # 0-100
    combined_score: float  # -1 to +1
    sentiment_score: SentimentScore
    technical_score: TechnicalScore
    current_price: float
    rsi: float
    week_change: float
    warnings: List[str] = field(default_factory=list)
    timestamp: datetime = field(default_factory=datetime.now)

    @property
    def confidence_pct(self) -> str:
        """Get formatted confidence percentage."""
        return f"{self.confidence:.1f}%"

    @property
    def emoji(self) -> str:
        """Get signal emoji."""
        return self.signal_type.emoji

    @property
    def color(self) -> str:
        """Get signal color."""
        return self.signal_type.color

    def to_dict(self) -> dict:
        """Convert to dictionary for export."""
        return {
            "Symbol": self.symbol,
            "Signal": self.signal_type.value,
            "Confidence": self.confidence_pct,
            "Price": f"${self.current_price:.2f}",
            "Week_Change": f"{self.week_change:+.2f}%",
            "RSI": f"{self.rsi:.1f}",
            "Sentiment": f"{self.sentiment_score.value:+.3f}",
            "Technical": f"{self.technical_score.value:+.3f}",
            "Combined": f"{self.combined_score:+.3f}",
            "Timestamp": self.timestamp.isoformat(),
        }
