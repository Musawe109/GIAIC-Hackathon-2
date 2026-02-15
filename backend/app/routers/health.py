from fastapi import APIRouter
from datetime import datetime
from typing import Dict, Any

router = APIRouter()


@router.get("/health", response_model=Dict[str, Any])
async def health_check():
    """
    Public health check endpoint to verify backend status.
    
    Returns:
        JSON response with health status and timestamp
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }