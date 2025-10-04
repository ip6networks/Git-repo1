import requests

API_KEY = "be5200f034f14c99bc1261b920f49b4e"
url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={API_KEY}"

res = requests.get(url)
data = res.json()

print("Status:", res.status_code)
print("Top headline:", data["articles"][0]["title"] if data["articles"] else "None")

#finnhub

import requests

API_KEY = "d3fj5uhr01qolkndg040d3fj5uhr01qolkndg04g"
url = f"https://finnhub.io/api/v1/quote?symbol=AAPL&token={API_KEY}"

res = requests.get(url)
data = res.json()

print("Apple stock price:", data.get("c"))


#Reddit

import praw

reddit = praw.Reddit(
    client_id="_j3CHEiMw0Fqk3Lixkntgg",
    client_secret="EkkqmXtPg4OURYQ1myVcZ01SgEuC8A",
    user_agent="my_test_script/0.0.1",
)

subreddit = reddit.subreddit("python")
for post in subreddit.hot(limit=3):
    print(post.title)