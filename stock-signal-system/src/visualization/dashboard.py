"""Interactive dashboard generation."""

from pathlib import Path
from typing import List

import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

from ..models.signal import TradingSignal
from ..utils.logger import get_logger

logger = get_logger(__name__)


class Dashboard:
    """Create interactive visualizations."""

    def __init__(self, output_path: Path):
        """
        Initialize dashboard.

        Args:
            output_path: Directory to save outputs
        """
        self.output_path = output_path
        self.output_path.mkdir(parents=True, exist_ok=True)
        self.logger = logger.bind(component="Dashboard")

    def create_overview(self, signals: List[TradingSignal]):
        """
        Create overview dashboard.

        Args:
            signals: List of trading signals
        """
        if not signals:
            self.logger.warning("No signals to visualize")
            return

        self.logger.info("Creating dashboard")

        fig = make_subplots(
            rows=2,
            cols=2,
            subplot_titles=(
                "Signal Distribution",
                "Confidence Levels",
                "Score Breakdown",
                "Price Performance",
            ),
            specs=[
                [{"type": "bar"}, {"type": "bar"}],
                [{"type": "scatter"}, {"type": "bar"}],
            ],
        )

        symbols = [s.symbol for s in signals]

        # Chart 1: Signal distribution
        signal_types = [s.signal_type.value for s in signals]
        signal_counts = pd.Series(signal_types).value_counts()

        colors = [
            "green" if "BUY" in s else "red" if "SELL" in s else "yellow"
            for s in signal_counts.index
        ]

        fig.add_trace(
            go.Bar(
                x=signal_counts.index,
                y=signal_counts.values,
                marker_color=colors,
                name="Signals",
            ),
            row=1,
            col=1,
        )

        # Chart 2: Confidence levels
        confidences = [s.confidence for s in signals]
        bar_colors = [s.color for s in signals]

        fig.add_trace(
            go.Bar(
                x=symbols,
                y=confidences,
                marker_color=bar_colors,
                text=[f"{c:.0f}%" for c in confidences],
                textposition="auto",
                name="Confidence",
            ),
            row=1,
            col=2,
        )

        # Chart 3: Score breakdown
        for signal in signals:
            fig.add_trace(
                go.Scatter(
                    x=["Sentiment", "Technical", "Combined"],
                    y=[
                        signal.sentiment_score.value,
                        signal.technical_score.value,
                        signal.combined_score,
                    ],
                    mode="lines+markers",
                    name=signal.symbol,
                    line=dict(width=3),
                ),
                row=2,
                col=1,
            )

        # Chart 4: Weekly performance
        week_changes = [s.week_change for s in signals]
        perf_colors = ["green" if x > 0 else "red" for x in week_changes]

        fig.add_trace(
            go.Bar(
                x=symbols,
                y=week_changes,
                marker_color=perf_colors,
                text=[f"{x:+.1f}%" for x in week_changes],
                textposition="auto",
                name="Week %",
            ),
            row=2,
            col=2,
        )

        # Update layout
        fig.update_layout(
            height=800,
            showlegend=True,
            title_text="Stock Investment Signal Dashboard",
            title_font_size=20,
        )

        fig.update_xaxes(title_text="Signal Type", row=1, col=1)
        fig.update_xaxes(title_text="Stock", row=1, col=2)
        fig.update_xaxes(title_text="Metric", row=2, col=1)
        fig.update_xaxes(title_text="Stock", row=2, col=2)

        fig.update_yaxes(title_text="Count", row=1, col=1)
        fig.update_yaxes(title_text="Confidence %", row=1, col=2)
        fig.update_yaxes(title_text="Score", row=2, col=1)
        fig.update_yaxes(title_text="% Change", row=2, col=2)

        # Save and show
        output_file = self.output_path / "dashboard.html"
        fig.write_html(str(output_file))
        self.logger.info(f"Dashboard saved to {output_file}")

        fig.show()

    def export_csv(self, signals: List[TradingSignal], filename: str):
        """
        Export signals to CSV.

        Args:
            signals: List of trading signals
            filename: Output filename
        """
        if not signals:
            return

        df = pd.DataFrame([s.to_dict() for s in signals])
        output_file = self.output_path / filename

        df.to_csv(output_file, index=False)
        self.logger.info(f"CSV exported to {output_file}")
