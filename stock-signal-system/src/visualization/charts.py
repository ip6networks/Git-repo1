"""Individual chart generation."""

import plotly.graph_objects as go
from plotly.subplots import make_subplots

from ..models.signal import TradingSignal
from ..utils.logger import get_logger

logger = get_logger(__name__)


class ChartGenerator:
    """Generate individual stock charts."""

    def __init__(self):
        self.logger = logger.bind(component="ChartGenerator")

    def create_price_chart(self, signal: TradingSignal) -> go.Figure:
        """
        Create detailed price chart with indicators.

        Args:
            signal: Trading signal with indicator data

        Returns:
            Plotly figure
        """
        indicators = signal.technical_score.components
        hist = signal.sentiment_score.sources  # Should be price_history

        fig = make_subplots(
            rows=2,
            cols=1,
            shared_xaxes=True,
            vertical_spacing=0.03,
            subplot_titles=(f"{signal.symbol} Price Action", "RSI"),
            row_heights=[0.7, 0.3],
        )

        # Candlestick chart (if we had OHLC data)
        # For now, simplified line chart
        fig.add_trace(
            go.Scatter(
                x=[],
                y=[],
                name="Price",
                line=dict(color="blue", width=2),
            ),
            row=1,
            col=1,
        )

        # Add signal annotation
        fig.add_annotation(
            text=f"{signal.emoji} {signal.signal_type.value}",
            showarrow=True,
            arrowhead=2,
            bgcolor=signal.color,
            font=dict(size=14, color="white"),
            row=1,
            col=1,
        )

        # RSI subplot
        fig.add_trace(
            go.Scatter(
                x=[],
                y=[],
                name="RSI",
                line=dict(color="purple", width=2),
            ),
            row=2,
            col=1,
        )

        # RSI reference lines
        fig.add_hline(y=70, line_dash="dash", line_color="red", row=2, col=1)
        fig.add_hline(
            y=30, line_dash="dash", line_color="green", row=2, col=1
        )

        fig.update_layout(height=800, showlegend=True)
        fig.update_yaxes(title_text="Price ($)", row=1, col=1)
        fig.update_yaxes(title_text="RSI", row=2, col=1)
        fig.update_xaxes(title_text="Date", row=2, col=1)

        return fig
