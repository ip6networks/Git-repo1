"""Reddit sentiment provider."""

from datetime import datetime, timedelta
from typing import List

import asyncpraw
from tenacity import retry, stop_after_attempt, wait_exponential
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from .base import SentimentProvider


class RedditSentimentProvider(SentimentProvider):
    """Sentiment provider using Reddit API."""

    def __init__(
        self,
        client_id: str,
        client_secret: str,
        user_agent: str,
        config: dict,
    ):
        super().__init__(config)

        self.client = asyncpraw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent,
        )

        self.analyzer = SentimentIntensityAnalyzer()
        self.subreddits = config.get(
            "subreddits", ["wallstreetbets", "stocks", "investing"]
        )
        self.post_limit = config.get("post_limit", 30)

    @property
    def name(self) -> str:
        """Provider name."""
        return "Reddit"

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
    )
    async def fetch_sentiment(
        self, symbol: str, company_name: str
    ) -> List[float]:
        """
        Fetch sentiment from Reddit posts and comments.

        Args:
            symbol: Stock ticker symbol
            company_name: Company name for search

        Returns:
            List of sentiment scores (-1 to +1)
        """
        sentiments = []

        try:
            subreddit = await self.client.subreddit(
                "+".join(self.subreddits)
            )

            search_queries = [symbol, f"${symbol}", company_name]

            for query in search_queries:
                async for post in subreddit.search(
                    query, time_filter="week", limit=self.post_limit
                ):
                    # Analyze post title and text
                    text = f"{post.title} {post.selftext or ''}"
                    score = self.analyzer.polarity_scores(text)["compound"]
                    sentiments.append(score)

                    # Load and analyze comments
                    if post.num_comments > 0:
                        try:
                            # Load submission to get comments
                            submission = await self.client.submission(
                                id=post.id
                            )
                            await submission.load()
                            await submission.comments.replace_more(limit=0)

                            # Get comment list
                            comments = submission.comments.list()
                            
                            for comment in comments[:5]:
                                if hasattr(comment, "body") and comment.body:
                                    comment_score = (
                                        self.analyzer.polarity_scores(
                                            comment.body
                                        )["compound"]
                                    )
                                    sentiments.append(comment_score)
                        except Exception as comment_error:
                            self.logger.warning(
                                "Failed to process comments",
                                symbol=symbol,
                                post_id=post.id,
                                error=str(comment_error),
                            )

            self.logger.info(
                f"Fetched {len(sentiments)} Reddit posts/comments",
                symbol=symbol,
            )

        except Exception as e:
            self.logger.error(
                "Failed to fetch Reddit data", symbol=symbol, error=str(e)
            )

        return sentiments


class RedditSentimentProviderV2(SentimentProvider):
    """
    Enhanced Reddit provider with filtering and ranking.

    Features:
    - Filters by upvote count
    - Weighs sentiment by post popularity
    - Focuses on recent posts
    """

    def __init__(
        self,
        client_id: str,
        client_secret: str,
        user_agent: str,
        config: dict,
    ):
        super().__init__(config)

        self.client = asyncpraw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent,
        )

        self.analyzer = SentimentIntensityAnalyzer()
        self.subreddits = config.get(
            "subreddits", ["wallstreetbets", "stocks", "investing"]
        )
        self.post_limit = config.get("post_limit", 50)
        self.min_upvotes = config.get("min_upvotes", 10)
        self.max_post_age_days = config.get("max_post_age_days", 7)

    @property
    def name(self) -> str:
        return "Reddit_Enhanced"

    def _is_post_recent(self, post: asyncpraw.models.Submission) -> bool:
        """Check if post is within max age."""
        post_time = datetime.fromtimestamp(post.created_utc)
        age = datetime.now() - post_time
        return age.days <= self.max_post_age_days

    def _calculate_weighted_sentiment(
        self, text: str, weight: float
    ) -> tuple[float, float]:
        """
        Calculate sentiment with weight.

        Args:
            text: Text to analyze
            weight: Weight multiplier (e.g., upvote ratio)

        Returns:
            Tuple of (weighted_score, weight)
        """
        score = self.analyzer.polarity_scores(text)["compound"]
        return score * weight, weight

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
    )
    async def fetch_sentiment(
        self, symbol: str, company_name: str
    ) -> List[float]:
        """Fetch weighted sentiment from Reddit."""
        weighted_scores = []
        weights = []

        try:
            subreddit = await self.client.subreddit(
                "+".join(self.subreddits)
            )

            search_terms = [
                symbol,
                f"${symbol}",
                f"{symbol} stock",
                company_name,
            ]

            for term in search_terms:
                async for post in subreddit.search(
                    term, time_filter="week", limit=self.post_limit
                ):
                    # Filter by recency and popularity
                    if not self._is_post_recent(post):
                        continue

                    if post.score < self.min_upvotes:
                        continue

                    # Weight by upvote ratio (0.5 to 1.0)
                    weight = min(post.upvote_ratio, 1.0)

                    # Analyze post
                    text = f"{post.title} {post.selftext or ''}"
                    score, w = self._calculate_weighted_sentiment(
                        text, weight
                    )
                    weighted_scores.append(score)
                    weights.append(w)

                    # Load and analyze comments
                    if post.num_comments > 0:
                        try:
                            # Load submission to get comments
                            submission = await self.client.submission(
                                id=post.id
                            )
                            await submission.load()
                            await submission.comments.replace_more(limit=0)

                            # Get and sort comments
                            comments = submission.comments.list()
                            top_comments = sorted(
                                comments,
                                key=lambda x: getattr(x, "score", 0),
                                reverse=True,
                            )[:5]

                            for comment in top_comments:
                                if hasattr(comment, "body") and comment.body:
                                    comment_weight = weight * 0.5
                                    c_score, c_w = (
                                        self._calculate_weighted_sentiment(
                                            comment.body, comment_weight
                                        )
                                    )
                                    weighted_scores.append(c_score)
                                    weights.append(c_w)
                        except Exception as comment_error:
                            self.logger.warning(
                                "Failed to process comments",
                                symbol=symbol,
                                post_id=post.id,
                                error=str(comment_error),
                            )

            # Calculate weighted average
            if weighted_scores and weights:
                total_weight = sum(weights)
                if total_weight > 0:
                    sentiments = [
                        s / w for s, w in zip(weighted_scores, weights)
                    ]
                else:
                    sentiments = []
            else:
                sentiments = []

            self.logger.info(
                f"Fetched {len(sentiments)} weighted Reddit sentiments",
                symbol=symbol,
            )

            return sentiments

        except Exception as e:
            self.logger.error(
                "Failed to fetch Reddit data", symbol=symbol, error=str(e)
            )
            return []