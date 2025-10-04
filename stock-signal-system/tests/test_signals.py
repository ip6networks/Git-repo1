"""Tests for signal generation."""

import pytest

from src.config.settings import ThresholdsConfig, WeightsConfig
from src.models.signal import SentimentScore, SignalType, TechnicalScore
from src.services.signal_generator import SignalGenerator


@pytest.fixture
def signal_generator():
    """Create signal generator fixture."""
    thresholds = ThresholdsConfig()
    weights = WeightsConfig()
    return SignalGenerator(thresholds, weights)


def test_strong_buy_signal(signal_generator):
    """Test strong buy signal generation."""
    sentiment = SentimentScore(value=0.8, source_count=50)
    technical = TechnicalScore(value=0.9)

    combined = signal_generator.calculate_combined_score(
        sentiment, technical
    )

    signal_type = signal_generator.determine_signal_type(combined)

    assert signal_type == SignalType.STRONG_BUY
    assert combined >= 0.7


def test_hold_signal(signal_generator):
    """Test hold signal generation."""
    sentiment = SentimentScore(value=0.1, source_count=50)
    technical = TechnicalScore(value=-0.1)

    combined = signal_generator.calculate_combined_score(
        sentiment, technical
    )

    signal_type = signal_generator.determine_signal_type(combined)

    assert signal_type == SignalType.HOLD
    assert -0.4 < combined < 0.4
