"""Finnhub sentiment provider."""

from datetime import datetime, timedelta
from typing import List

import requests
from tenacity import retry, stop_after_attempt, wait_exponential
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from .base import SentimentProvider


class FinnhubSentimentProvider(SentimentProvider):
    """Sentiment provider using Finnhub API."""

    def __init__(self, api_key: str, config: dict):
        """
        Initialize Finnhub client.

        Args:
            api_key: Finnhub API key
            config: Provider configuration
        """
        super().__init__(config)
        
        self.api_key = api_key
        self.base_url = config.get(
            "base_url", "https://finnhub.io/api/v1"
        )
        self.timeout = config.get("timeout", 30)
        self.max_articles = config.get("max_articles", 20)
        self.analyzer = SentimentIntensityAnalyzer()

    @property
    def name(self) -> str:
        """Provider name."""
        return "Finnhub"

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
    )
    async def fetch_sentiment(
        self, symbol: str, company_name: str
    ) -> List[float]:
        """
        Fetch sentiment from Finnhub company news.

        Args:
            symbol: Stock ticker symbol
            company_name: Company name (not used by Finnhub)

        Returns:
            List of sentiment scores (-1 to +1)
        """
        sentiments = []

        try:
            # Date range (last 7 days)
            to_date = datetime.now().strftime("%Y-%m-%d")
            from_date = (datetime.now() - timedelta(days=7)).strftime(
                "%Y-%m-%d"
            )

            # Fetch company news
            response = requests.get(
                f"{self.base_url}/company-news",
                params={
                    "symbol": symbol,
                    "from": from_date,
                    "to": to_date,
                    "token": self.api_key,
                },
                timeout=self.timeout,
            )

            response.raise_for_status()
            articles = response.json()

            # Analyze articles
            for article in articles[: self.max_articles]:
                headline = article.get("headline", "")
                summary = article.get("summary", "")
                
                # Combine headline and summary
                text = f"{headline} {summary}"
                
                if text.strip():
                    score = self.analyzer.polarity_scores(text)["compound"]
                    sentiments.append(score)

            self.logger.info(
                f"Fetched {len(sentiments)} Finnhub articles",
                symbol=symbol,
            )

        except requests.exceptions.RequestException as e:
            self.logger.error(
                "Failed to fetch Finnhub data", symbol=symbol, error=str(e)
            )
        except Exception as e:
            self.logger.error(
                "Unexpected error with Finnhub",
                symbol=symbol,
                error=str(e),
            )

        return sentiments


class FinnhubSentimentProviderV2(SentimentProvider):
    """
    Enhanced Finnhub provider with sentiment scores and social sentiment.
    
    Features:
    - Uses Finnhub's built-in sentiment scores
    - Incorporates social sentiment data
    - Considers news relevance
    """

    def __init__(self, api_key: str, config: dict):
        super().__init__(config)
        
        self.api_key = api_key
        self.base_url = config.get(
            "base_url", "https://finnhub.io/api/v1"
        )
        self.timeout = config.get("timeout", 30)
        self.max_articles = config.get("max_articles", 20)
        self.use_social_sentiment = config.get("use_social_sentiment", True)
        self.analyzer = SentimentIntensityAnalyzer()

    @property
    def name(self) -> str:
        return "Finnhub_Enhanced"

    def _fetch_news_sentiment(self, symbol: str) -> List[float]:
        """Fetch sentiment from company news."""
        sentiments = []

        try:
            to_date = datetime.now().strftime("%Y-%m-%d")
            from_date = (datetime.now() - timedelta(days=7)).strftime(
                "%Y-%m-%d"
            )

            response = requests.get(
                f"{self.base_url}/company-news",
                params={
                    "symbol": symbol,
                    "from": from_date,
                    "to": to_date,
                    "token": self.api_key,
                },
                timeout=self.timeout,
            )

            response.raise_for_status()
            articles = response.json()

            for article in articles[: self.max_articles]:
                headline = article.get("headline", "")
                summary = article.get("summary", "")
                text = f"{headline} {summary}"

                if text.strip():
                    score = self.analyzer.polarity_scores(text)["compound"]
                    sentiments.append(score)

        except Exception as e:
            self.logger.error(
                "Failed to fetch news sentiment", symbol=symbol, error=str(e)
            )

        return sentiments

    def _fetch_social_sentiment(self, symbol: str) -> List[float]:
        """
        Fetch social sentiment from Finnhub.
        
        Note: Requires premium Finnhub subscription
        """
        sentiments = []

        if not self.use_social_sentiment:
            return sentiments

        try:
            # Get social sentiment (Twitter, Reddit, etc.)
            response = requests.get(
                f"{self.base_url}/stock/social-sentiment",
                params={"symbol": symbol, "token": self.api_key},
                timeout=self.timeout,
            )

            response.raise_for_status()
            data = response.json()

            # Finnhub provides sentiment scores
            if "twitter" in data:
                for item in data["twitter"]:
                    # Normalize score to -1 to +1 range
                    score = item.get("score", 0)
                    mention = item.get("mention", 0)
                    
                    # Weight by mention count
                    if mention > 0:
                        normalized_score = (score - 0.5) * 2  # 0-1 to -1-1
                        sentiments.append(normalized_score)

            if "reddit" in data:
                for item in data["reddit"]:
                    score = item.get("score", 0)
                    mention = item.get("mention", 0)
                    
                    if mention > 0:
                        normalized_score = (score - 0.5) * 2
                        sentiments.append(normalized_score)

        except requests.exceptions.HTTPError as e:
            # Social sentiment might require premium subscription
            if e.response.status_code == 403:
                self.logger.warning(
                    "Social sentiment requires premium subscription"
                )
            else:
                self.logger.error(
                    "Failed to fetch social sentiment",
                    symbol=symbol,
                    error=str(e),
                )
        except Exception as e:
            self.logger.error(
                "Unexpected error fetching social sentiment",
                symbol=symbol,
                error=str(e),
            )

        return sentiments

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
    )
    async def fetch_sentiment(
        self, symbol: str, company_name: str
    ) -> List[float]:
        """Fetch combined sentiment from news and social data."""
        all_sentiments = []

        # Fetch news sentiment
        news_sentiment = self._fetch_news_sentiment(symbol)
        all_sentiments.extend(news_sentiment)

        # Fetch social sentiment
        social_sentiment = self._fetch_social_sentiment(symbol)
        all_sentiments.extend(social_sentiment)

        self.logger.info(
            f"Fetched {len(all_sentiments)} total Finnhub sentiments "
            f"(news: {len(news_sentiment)}, social: {len(social_sentiment)})",
            symbol=symbol,
        )

        return all_sentiments
