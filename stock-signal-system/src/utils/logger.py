"""Structured logging configuration."""

import logging
import sys
from pathlib import Path

import structlog


def setup_logging(level: str = "INFO", log_file: Path | None = None):
    """
    Configure structured logging.

    Args:
        level: Logging level
        log_file: Optional log file path
    """
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, level.upper()),
    )

    processors = [
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.dev.ConsoleRenderer()
        if sys.stdout.isatty()
        else structlog.processors.JSONRenderer(),
    ]

    structlog.configure(
        processors=processors,
        wrapper_class=structlog.make_filtering_bound_logger(
            getattr(logging, level.upper())
        ),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )

    if log_file:
        log_file.parent.mkdir(parents=True, exist_ok=True)
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(getattr(logging, level.upper()))
        logging.root.addHandler(file_handler)


def get_logger(name: str) -> structlog.BoundLogger:
    """
    Get a logger instance.

    Args:
        name: Logger name (usually __name__)

    Returns:
        Configured logger
    """
    return structlog.get_logger(name)
