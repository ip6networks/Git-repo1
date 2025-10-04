"""NewsAPI sentiment provider."""

from datetime import datetime, timedelta
from typing import List

from newsapi import NewsApiClient
from tenacity import retry, stop_after_attempt, wait_exponential
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from .base import SentimentProvider


class NewsAPISentimentProvider(SentimentProvider):
    """Sentiment provider using NewsAPI."""

    def __init__(self, api_key: str, config: dict):
        """Initialize NewsAPI client."""
        super().__init__(config)
        self.client = NewsApiClient(api_key=api_key)
        self.analyzer = SentimentIntensityAnalyzer()
        self.max_articles = config.get("max_articles", 30)

    @property
    def name(self) -> str:
        """Provider name."""
        return "NewsAPI"

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
    )
    async def fetch_sentiment(
        self, symbol: str, company_name: str
    ) -> List[float]:
        """Fetch sentiment from news articles."""
        sentiments = []

        try:
            from_date = (
                datetime.now() - timedelta(days=3)
            ).strftime("%Y-%m-%d")

            articles = self.client.get_everything(
                q=f'"{company_name}" OR {symbol}',
                from_param=from_date,
                language="en",
                page_size=self.max_articles,
            )["articles"]

            for article in articles:
                text = (
                    f"{article['title']} {article.get('description', '')}"
                )
                score = self.analyzer.polarity_scores(text)["compound"]
                sentiments.append(score)

            self.logger.info(
                f"Fetched {len(sentiments)} articles", symbol=symbol
            )

        except Exception as e:
            self.logger.error(f"Failed to fetch news", error=str(e))

        return sentiments
