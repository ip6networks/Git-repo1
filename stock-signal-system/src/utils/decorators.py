"""Utility decorators."""

import functools
import time
from typing import Callable

from .logger import get_logger

logger = get_logger(__name__)


def log_execution_time(func: Callable) -> Callable:
    """
    Decorator to log function execution time.

    Args:
        func: Function to decorate

    Returns:
        Decorated function
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start

        logger.info(
            f"{func.__name__} completed",
            duration_ms=f"{elapsed * 1000:.2f}",
        )

        return result

    return wrapper


def handle_errors(default_return=None):
    """
    Decorator to handle and log errors.

    Args:
        default_return: Value to return on error

    Returns:
        Decorator function
    """

    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                logger.error(
                    f"{func.__name__} failed",
                    error=str(e),
                    error_type=type(e).__name__,
                )
                return default_return

        return wrapper

    return decorator
