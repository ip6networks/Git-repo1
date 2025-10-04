"""Market data repository for caching and data management."""

from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

import pandas as pd
import yfinance as yf

from ..utils.logger import get_logger

logger = get_logger(__name__)


class MarketDataRepository:
    """
    Repository for market data with caching.
    
    Features:
    - Cache price data to disk
    - Avoid redundant API calls
    - Data validation
    """

    def __init__(self, cache_dir: Path = Path("./cache")):
        """
        Initialize repository.

        Args:
            cache_dir: Directory for cached data
        """
        self.cache_dir = cache_dir
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.logger = logger.bind(repo="MarketData")

    def _get_cache_path(self, symbol: str, data_type: str) -> Path:
        """Get cache file path for symbol."""
        return self.cache_dir / f"{symbol}_{data_type}.parquet"

    def _is_cache_valid(
        self, cache_path: Path, max_age_hours: int = 1
    ) -> bool:
        """Check if cached data is still valid."""
        if not cache_path.exists():
            return False

        mod_time = datetime.fromtimestamp(cache_path.stat().st_mtime)
        age = datetime.now() - mod_time

        return age < timedelta(hours=max_age_hours)

    def get_price_history(
        self,
        symbol: str,
        period: str = "6mo",
        use_cache: bool = True,
    ) -> Optional[pd.DataFrame]:
        """
        Get price history with caching.

        Args:
            symbol: Stock ticker
            period: History period
            use_cache: Whether to use cache

        Returns:
            DataFrame with price data or None
        """
        cache_path = self._get_cache_path(symbol, f"prices_{period}")

        # Try cache first
        if use_cache and self._is_cache_valid(cache_path):
            try:
                df = pd.read_parquet(cache_path)
                self.logger.debug("Loaded from cache", symbol=symbol)
                return df
            except Exception as e:
                self.logger.warning(
                    "Cache read failed", symbol=symbol, error=str(e)
                )

        # Fetch fresh data
        try:
            stock = yf.Ticker(symbol)
            df = stock.history(period=period)

            if df.empty:
                self.logger.warning("No data available", symbol=symbol)
                return None

            # Cache the data
            df.to_parquet(cache_path)
            self.logger.debug("Fetched and cached", symbol=symbol)

            return df

        except Exception as e:
            self.logger.error(
                "Failed to fetch data", symbol=symbol, error=str(e)
            )
            return None

    def clear_cache(self, symbol: Optional[str] = None):
        """
        Clear cached data.

        Args:
            symbol: Specific symbol to clear, or None for all
        """
        if symbol:
            for file in self.cache_dir.glob(f"{symbol}_*.parquet"):
                file.unlink()
            self.logger.info("Cache cleared", symbol=symbol)
        else:
            for file in self.cache_dir.glob("*.parquet"):
                file.unlink()
            self.logger.info("All cache cleared")
