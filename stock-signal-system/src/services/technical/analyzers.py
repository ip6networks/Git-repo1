"""Technical analysis scoring."""

import numpy as np

from ...config.settings import TechnicalWeightsConfig
from ...models.indicators import TechnicalIndicators
from ...models.signal import TechnicalScore
from ...utils.logger import get_logger

logger = get_logger(__name__)


class TechnicalAnalyzer:
    """Analyze technical indicators and generate scores."""

    def __init__(self, weights: TechnicalWeightsConfig):
        """
        Initialize analyzer with weights.

        Args:
            weights: Technical indicator weights configuration
        """
        self.weights = weights
        self.logger = logger.bind(analyzer="Technical")

    def analyze_moving_averages(
        self, indicators: TechnicalIndicators
    ) -> float:
        """
        Analyze moving average signals.

        Returns:
            Score contribution from moving averages
        """
        score = 0.0

        # Price vs MAs (distribute weight)
        ma_weight = self.weights.moving_averages / 3

        if indicators.is_above_ma20():
            score += ma_weight
        else:
            score -= ma_weight

        if indicators.is_above_ma50():
            score += ma_weight
        else:
            score -= ma_weight

        if indicators.is_above_ma200():
            score += ma_weight
        else:
            score -= ma_weight

        return score

    def analyze_rsi(self, indicators: TechnicalIndicators) -> float:
        """
        Analyze RSI momentum signal.

        Returns:
            Score contribution from RSI
        """
        rsi = indicators.rsi

        if rsi < 30:  # Oversold - bullish
            return self.weights.rsi
        elif rsi < 40:
            return self.weights.rsi * 0.5
        elif rsi > 70:  # Overbought - bearish
            return -self.weights.rsi
        elif rsi > 60:
            return -self.weights.rsi * 0.5

        return 0.0

    def analyze_momentum(self, indicators: TechnicalIndicators) -> float:
        """
        Analyze price momentum.

        Returns:
            Score contribution from momentum
        """
        score = 0.0
        momentum_weight = self.weights.momentum / 2

        # Week momentum
        if indicators.week_change > 5:
            score += momentum_weight
        elif indicators.week_change < -5:
            score -= momentum_weight

        # Month momentum
        if indicators.month_change > 10:
            score += momentum_weight
        elif indicators.month_change < -10:
            score -= momentum_weight

        return score

    def analyze_volume(self, indicators: TechnicalIndicators) -> float:
        """
        Analyze volume signal.

        Returns:
            Score contribution from volume
        """
        if indicators.has_high_volume(threshold=1.5):
            return self.weights.volume

        return 0.0

    def analyze(
        self, indicators: TechnicalIndicators
    ) -> TechnicalScore:
        """
        Perform complete technical analysis.

        Args:
            indicators: Technical indicators to analyze

        Returns:
            TechnicalScore with overall score and components
        """
        self.logger.debug("Analyzing technical indicators")

        # Calculate component scores
        ma_score = self.analyze_moving_averages(indicators)
        rsi_score = self.analyze_rsi(indicators)
        momentum_score = self.analyze_momentum(indicators)
        volume_score = self.analyze_volume(indicators)

        # Total score
        total_score = ma_score + rsi_score + momentum_score + volume_score

        # Clip to [-1, 1] range
        total_score = np.clip(total_score, -1, 1)

        components = {
            "moving_averages": ma_score,
            "rsi": rsi_score,
            "momentum": momentum_score,
            "volume": volume_score,
        }

        self.logger.debug(
            "Technical analysis complete", score=f"{total_score:.3f}"
        )

        return TechnicalScore(value=total_score, components=components)
