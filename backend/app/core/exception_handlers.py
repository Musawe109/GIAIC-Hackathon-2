from fastapi import FastAPI, Request, HTTPException
from fastapi.exception_handlers import http_exception_handler
from fastapi.responses import JSONResponse
from typing import Union
import logging

# Set up logging to avoid exposing sensitive information
logger = logging.getLogger(__name__)


async def http_error_handler(request: Request, exc: HTTPException) -> JSONResponse:
    """
    Custom HTTP exception handler to standardize error responses.
    """
    return await http_exception_handler(request, exc)


async def validation_error_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Handler for validation errors (422).
    """
    logger.warning(f"Validation error: {exc}")
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation error",
            "message": str(exc)
        }
    )


async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    General exception handler for unexpected errors.
    """
    logger.error(f"Unexpected error: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error"
        }
    )


def add_exception_handlers(app: FastAPI):
    """
    Add custom exception handlers to the FastAPI app.
    """
    app.add_exception_handler(HTTPException, http_error_handler)
    app.add_exception_handler(Exception, general_exception_handler)