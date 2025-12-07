
	# Stock Signal System
	
	A comprehensive automated stock trading signal generator that combines **multi-source sentiment analysis** with **technical indicators** to produce actionable BUY/SELL/HOLD recommendations.
	
	## 🎯 Overview
	
	This system analyzes stocks from a configurable watchlist by:
	- Aggregating sentiment from news articles, Reddit, and financial APIs
	- Calculating technical indicators (RSI, moving averages, volume trends)
	- Generating weighted trading signals with confidence scores
	- Outputting results in multiple formats (console reports, CSV, visualizations)
	
	## ✨ Key Features
	
	### 📡 Data Sources
	- **NewsAPI** - Financial news sentiment analysis
	- **Reddit** - Social media sentiment (r/wallstreetbets, r/stocks, etc.)
	- **Finnhub** - Professional financial data and news
	- **Technical Analysis** - Price/volume indicators from market data
	
	### 🎯 Signal Generation
	- **5 Signal Types:** STRONG BUY, BUY, HOLD, SELL, STRONG SELL
	- **Confidence Scoring:** Percentage-based reliability metric
	- **Multi-factor Analysis:** Combines sentiment + technical scores
	- **Warnings System:** Alerts for volatility, low data quality, etc.
	
	### 🔧 Configuration
	- Configurable sentiment/technical weights
	- Adjustable confidence thresholds
	- Customizable watchlists
	- Flexible API provider settings
	
	## 📤 Outputs & Formats
	
	### 1. **Console Reports** (Real-time, per stock)

============================================================

🟢 STRONG BUY - AAPL


Signal              🟢 STRONG BUY

Confidence          87.5%

Current Price       $175.23

Week Change         +3.45%

RSI                 62.5

Combined Score      +0.456

├─ Sentiment        +0.321 (47 sources)

└─ Technical        +0.135

Sentiment Sources:

• NewsAPI         +0.342

• Reddit          +0.298

• Finnhub         +0.324

⚠️  WARNINGS:

High volatility detected

📅 Generated: 2025-10-04 21:00:00


	### 2. **CSV Export** (Optional)
	- **Filename:** `signals_YYYYMMDD_HHMMSS.csv`
	- **Location:** Configurable output path
	- **Columns:**
	  - Symbol, Company Name
	  - Signal Type, Confidence %
	  - Combined/Sentiment/Technical Scores
	  - Current Price, RSI, Week Change
	  - Source Count, Timestamp
	
	### 3. **Dashboard Visualizations** (Optional)
	- Overview charts of all signals
	- Confidence distributions
	- Sentiment vs technical comparisons
	- **Format:** PNG/HTML images
	- **Location:** Saved to configured output directory
	
	### 4. **Summary Statistics** (Console)

============================================================

📊 SUMMARY


🟢 Buy Signals: 3

🔴 Sell Signals: 1

🟡 Hold Signals: 2

📈 Average Confidence: 73.2%

⭐ TOP PICK: TSLA - STRONG BUY (89% confidence)

✅ Analysis complete!


	## 🏗️ Architecture

StockSignalSystem

│

├── Sentiment Providers (Async/Concurrent)

│   ├── NewsAPISentimentProvider

│   ├── RedditSentimentProvider

│   └── FinnhubSentimentProvider

│

├── Technical Analysis

│   ├── TechnicalIndicatorCalculator (RSI, MAs, etc.)

│   └── TechnicalAnalyzer (Score generation)

│

├── Signal Generation

│   └── SignalGenerator (Weighted scoring + thresholds)

│

└── Output Processing

├── Console Reports (Tabulated)

├── CSV Export

└── Dashboard (Visualizations)


	### Key Components:
	- **Async Processing:** Fetches sentiment from multiple providers concurrently
	- **Error Handling:** Continues analysis even if individual providers fail
	- **Weighted Scoring:** Configurable weights for sentiment vs technical
	- **Extensible:** Easy to add new sentiment providers or indicators
	
	## 📋 Project Structure

stock-signal-system/

├── main.py                      # Main application entry point (THIS FILE)

├── config/

│   └── settings.py              # Configuration management

├── models/

│   └── signal.py                # TradingSignal, SentimentScore models

├── services/

│   ├── sentiment/

│   │   ├── finnhub.py           # Finnhub API provider

│   │   ├── news_api.py          # NewsAPI provider

│   │   └── reddit.py            # Reddit API provider

│   ├── technical/

│   │   ├── analyzers.py         # Technical score analyzer

│   │   └── indicators.py        # Technical indicator calculator

│   └── signal_generator.py      # Signal generation logic

├── visualization/

│   └── dashboard.py             # Dashboard and CSV export

└── utils/

├── decorators.py            # Utility decorators

└── logger.py                # Logging setup


	## 🚀 Usage
	
	### Basic Run
	```bash
	python -m stock_signal_system.main

Programmatic Usage

	import asyncio
	from stock_signal_system.main import StockSignalSystem
	
	async def analyze():
	    system = StockSignalSystem()
	    signals = await system.analyze_watchlist()
	    system.process_results(signals)
	
	asyncio.run(analyze())

Single Symbol Analysis

	signal = await system.analyze_symbol("AAPL", "Apple Inc.")

⚙️ Configuration


Configuration is managed through settings (typically config/settings.py):


	{
	    "watchlist": ["AAPL", "TSLA", "MSFT", "GOOGL"],
	    "company_names": {
	        "AAPL": "Apple Inc.",
	        "TSLA": "Tesla Inc.",
	        ...
	    },
	    "weights": {
	        "sentiment": 0.6,
	        "technical": 0.4
	    },
	    "thresholds": {
	        "strong_buy": 0.5,
	        "buy": 0.2,
	        "sell": -0.2,
	        "strong_sell": -0.5
	    },
	    "output": {
	        "save_path": "./output",
	        "show_dashboard": true,
	        "export_csv": true
	    },
	    "data": {
	        "price_history_months": 6
	    }
	}

Required API Keys (Environment Variables)

	NEWS_API_KEY=your_newsapi_key
	REDDIT_CLIENT_ID=your_reddit_client_id
	REDDIT_SECRET=your_reddit_secret
	FINNHUB_KEY=your_finnhub_key

📊 Signal Scoring Logic

Combined Score Calculation

	Combined Score = (Sentiment Score × Sentiment Weight) + (Technical Score × Technical Weight)

Sentiment Score

- Aggregated from all available sources

- Normalized to [-1, 1] range

- Weighted average across NewsAPI, Reddit, Finnhub

Technical Score

- Based on RSI levels

- Price trend analysis

- Volume indicators

- Weighted by configured technical_weights

Signal Mapping

Combined Score	Signal Type
≥ 0.5	STRONG BUY
0.2 to 0.5	BUY
-0.2 to 0.2	HOLD
-0.5 to -0.2	SELL
≤ -0.5	STRONG SELL

🛡️ Error Handling

- Provider Failures: System continues if individual sentiment providers fail

- Missing Data: Generates warnings but continues analysis

- API Limits: Graceful degradation with available data

- Logging: Structured logging with configurable levels

📝 Output Examples

Strong Buy Signal

	🟢 STRONG BUY - TSLA
	Confidence: 89%
	Combined Score: +0.678
	├─ Sentiment: +0.456 (63 sources)
	└─ Technical: +0.222

Sell Signal with Warning

	🔴 SELL - XYZ
	Confidence: 72%
	Combined Score: -0.334
	⚠️  WARNING: High volatility detected
	⚠️  WARNING: Low sentiment source count

🔍 Technical Indicators Calculated

- RSI (Relative Strength Index)

- Moving Averages (SMA, EMA)

- Volume Trends

- Price Change % (Daily, Weekly)

- Volatility Metrics

🎨 Visualization Dashboard


When enabled, generates:


- Signal distribution pie chart

- Confidence level histogram

- Sentiment vs Technical scatter plot

- Time-series price overlays

- Top picks summary table

📦 Dependencies


Core libraries used:


- asyncio - Async/concurrent processing

- tabulate - Console table formatting

- pydantic - Settings validation

- Sentiment provider SDKs (newsapi, praw, finnhub)

- Technical analysis libraries

- Visualization libraries (matplotlib/plotly)

🔄 Future Enhancements


Potential additions:


-  Twitter/X sentiment integration

-  Real-time streaming mode

-  Backtesting framework

-  Email/SMS notifications

-  Machine learning confidence scoring

-  Portfolio optimization suggestions