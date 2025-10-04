"""Base class for sentiment providers."""

from abc import ABC, abstractmethod
from typing import List

from ...utils.logger import get_logger

logger = get_logger(__name__)


class SentimentProvider(ABC):
    """Abstract base class for sentiment data providers."""

    def __init__(self, config: dict):
        """Initialize provider with configuration."""
        self.config = config
        self.logger = logger.bind(provider=self.__class__.__name__)

    @abstractmethod
    async def fetch_sentiment(
        self, symbol: str, company_name: str
    ) -> List[float]:
        """
        Fetch sentiment scores for a symbol.

        Args:
            symbol: Stock ticker symbol
            company_name: Company name for search

        Returns:
            List of sentiment scores (-1 to +1)
        """
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        """Provider name for logging."""
        pass
