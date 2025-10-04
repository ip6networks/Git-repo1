"""Configuration management using Pydantic."""

from pathlib import Path
from typing import Dict, List

import yaml
from pydantic import BaseModel, Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class APIConfig(BaseModel):
    """API configuration."""

    base_url: str
    timeout: int = 30
    max_articles: int | None = None


class ThresholdsConfig(BaseModel):
    """Signal threshold configuration."""

    strong_buy: float = 0.7
    buy: float = 0.4
    hold: float = 0.0
    sell: float = -0.4
    strong_sell: float = -0.7


class WeightsConfig(BaseModel):
    """Analysis weights configuration."""

    sentiment: float = 0.3
    technical: float = 0.7


class TechnicalWeightsConfig(BaseModel):
    """Technical indicator weights."""

    moving_averages: float = 0.4
    rsi: float = 0.3
    momentum: float = 0.2
    volume: float = 0.1


class DataConfig(BaseModel):
    """Data collection configuration."""

    sentiment_lookback_days: int = 7
    price_history_months: int = 6
    min_sentiment_sources: int = 10


class OutputConfig(BaseModel):
    """Output configuration."""

    export_csv: bool = True
    generate_charts: bool = True
    show_dashboard: bool = True
    save_path: Path = Path("./output")


class LoggingConfig(BaseModel):
    """Logging configuration."""

    level: str = "INFO"
    format: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    file: Path = Path("./logs/stock_signals.log")


class Settings(BaseSettings):
    """Application settings loaded from environment and config file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        env_nested_delimiter="__",
    )

    # API Keys (from .env file)
    news_api_key: SecretStr = Field(..., alias="NEWS_API_KEY")
    finnhub_key: SecretStr = Field(..., alias="FINNHUB_KEY")
    reddit_client_id: SecretStr = Field(..., alias="REDDIT_CLIENT_ID")
    reddit_secret: SecretStr = Field(..., alias="REDDIT_SECRET")

    # Watchlist
    watchlist: List[str] = Field(
        default=["TSLA", "AAPL", "NVDA", "MSFT"], alias="WATCHLIST"
    )

    # Company names mapping
    company_names: Dict[str, str] = {
        "TSLA": "Tesla",
        "AAPL": "Apple",
        "NVDA": "NVIDIA",
        "MSFT": "Microsoft",
        "GOOGL": "Google",
        "AMZN": "Amazon",
        "META": "Meta",
        "AMD": "AMD",
    }

    # Configuration from YAML
    thresholds: ThresholdsConfig = Field(default_factory=ThresholdsConfig)
    weights: WeightsConfig = Field(default_factory=WeightsConfig)
    technical_weights: TechnicalWeightsConfig = Field(
        default_factory=TechnicalWeightsConfig
    )
    data: DataConfig = Field(default_factory=DataConfig)
    output: OutputConfig = Field(default_factory=OutputConfig)
    logging_config: LoggingConfig = Field(default_factory=LoggingConfig)

    api_configs: Dict[str, APIConfig] = Field(default_factory=dict)

    @classmethod
    def load_from_yaml(cls, config_path: str = "config/config.yaml") -> "Settings":
        """Load settings from YAML file and environment."""
        config_file = Path(config_path)

        if config_file.exists():
            with open(config_file) as f:
                yaml_config = yaml.safe_load(f)

            # Create settings instance
            settings = cls()

            # Load configurations from YAML
            if "thresholds" in yaml_config:
                settings.thresholds = ThresholdsConfig(**yaml_config["thresholds"])

            if "weights" in yaml_config:
                settings.weights = WeightsConfig(**yaml_config["weights"])

            if "technical_weights" in yaml_config:
                settings.technical_weights = TechnicalWeightsConfig(
                    **yaml_config["technical_weights"]
                )

            if "data" in yaml_config:
                settings.data = DataConfig(**yaml_config["data"])

            if "output" in yaml_config:
                settings.output = OutputConfig(**yaml_config["output"])

            if "logging" in yaml_config:
                settings.logging_config = LoggingConfig(**yaml_config["logging"])

            if "api" in yaml_config:
                settings.api_configs = {
                    name: APIConfig(**config)
                    for name, config in yaml_config["api"].items()
                }

            return settings

        return cls()


# Global settings instance
def get_settings() -> Settings:
    """Get application settings."""
    return Settings.load_from_yaml()
