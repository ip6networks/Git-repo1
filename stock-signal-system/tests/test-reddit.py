"""Test script for Reddit API connection."""

import asyncio
import asyncpraw
import os
from pathlib import Path


async def test_reddit_connection():
    """Test Reddit API connection and data fetching."""
    
    # Load .env file
    try:
        from dotenv import load_dotenv
        
        # Try to find .env file
        env_path = Path('.env')
        if env_path.exists():
            load_dotenv(env_path)
            print(f"✓ Loaded .env file from: {env_path.absolute()}")
        else:
            # Try parent directory
            env_path = Path('../.env')
            if env_path.exists():
                load_dotenv(env_path)
                print(f"✓ Loaded .env file from: {env_path.absolute()}")
            else:
                print("⚠ No .env file found")
    except ImportError:
        print("⚠ python-dotenv not installed. Install with: pip install python-dotenv")
    
    # Get credentials from environment variables
    client_id = os.getenv("REDDIT_CLIENT_ID")
    client_secret = os.getenv("REDDIT_SECRET")
    user_agent = "python:stock-signal-system:v1.0 (by /u/YOUR_USERNAME)"
    
    print("=" * 60)
    print("Testing Reddit API Connection")
    print("=" * 60)
    
    # Debug: Show what was found
    print(f"\nREDDIT_CLIENT_ID found: {bool(client_id)}")
    print(f"REDDIT_SECRET found: {bool(client_secret)}")
    
    # Validate credentials are set
    if not client_id or not client_secret:
        print("\n✗ Error: Missing credentials!")
        print("\nOption 1 - Use .env file:")
        print("  Create a .env file with:")
        print("    REDDIT_CLIENT_ID=your_client_id")
        print("    REDDIT_SECRET=your_secret")
        print("\nOption 2 - Set environment variables:")
        print("  Windows CMD: set REDDIT_CLIENT_ID=your_id")
        print("  Windows PS:  $env:REDDIT_CLIENT_ID='your_id'")
        print("  Linux/Mac:   export REDDIT_CLIENT_ID=your_id")
        return
    
    print(f"\nClient ID: {client_id[:5]}...{client_id[-3:] if len(client_id) > 8 else '***'}")
    print(f"Secret: {client_secret[:5]}...{client_secret[-3:] if len(client_secret) > 8 else '***'}")
    print(f"User Agent: {user_agent}")
    
    try:
        # Initialize client
        print("\n1. Initializing Reddit client...")
        reddit = asyncpraw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent,
        )
        print("✓ Client initialized")
        
        # Test authentication
        print("\n2. Testing authentication...")
        print(f"✓ Read-only: {reddit.read_only}")
        
        # Get subreddit
        print("\n3. Accessing subreddit...")
        subreddit = await reddit.subreddit("wallstreetbets+stocks")
        print(f"✓ Subreddit accessed: {subreddit.display_name}")
        
        # Test search
        symbol = "IONQ"
        print(f"\n4. Searching for '{symbol}'...")
        
        post_count = 0
        async for post in subreddit.search(
            symbol, time_filter="week", limit=5
        ):
            post_count += 1
            print(f"\n--- Post {post_count} ---")
            print(f"Title: {post.title}")
            print(f"Score: {post.score}")
            print(f"Upvote ratio: {post.upvote_ratio}")
            print(f"Num comments: {post.num_comments}")
            
            # Test comment loading
            if post.num_comments > 0:
                try:
                    await post.comments.replace_more(limit=0)
                    comment_list = list(post.comments)
                    print(f"Comments loaded: {len(comment_list)}")
                    
                    for i, comment in enumerate(comment_list[:3], 1):
                        if hasattr(comment, "body"):
                            print(
                                f"  Comment {i}: "
                                f"{comment.body[:50]}..."
                            )
                except Exception as e:
                    print(f"Error loading comments: {e}")
        
        if post_count == 0:
            print(f"\n⚠ No posts found for '{symbol}'")
            print("\nTrying more popular terms...")
            
            # Try different searches
            for term in ["TSLA", "SPY", "stocks"]:
                print(f"\nSearching for '{term}'...")
                count = 0
                async for post in subreddit.search(
                    term, time_filter="day", limit=3
                ):
                    count += 1
                    print(f"  - {post.title[:60]}...")
                print(f"Found {count} posts")
        
        print("\n" + "=" * 60)
        print("✓ Test completed successfully!")
        print("=" * 60)
        
        await reddit.close()
        
    except asyncpraw.exceptions.ResponseException as e:
        print(f"\n✗ Authentication Error: {e}")
        print("\nPlease check:")
        print("1. REDDIT_CLIENT_ID is correct (14 char string)")
        print("2. REDDIT_SECRET is correct (27 char string)")
        print("3. You created a 'script' type app on Reddit")
        print("4. No extra spaces or quotes in .env file")
        
    except Exception as e:
        print(f"\n✗ Error: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(test_reddit_connection())