from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import HTTPException, status
from app.core.config import settings


def verify_token(token: str) -> dict:
    """
    Verify and decode JWT token, returning the payload.
    
    Args:
        token: JWT token string
        
    Returns:
        Decoded token payload as dictionary
        
    Raises:
        HTTPException: If token is invalid, expired, or malformed
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode the token using the secret
        payload = jwt.decode(
            token, 
            settings.better_auth_secret, 
            algorithms=["HS256"]  # Using HS256 as specified for Better Auth
        )
        
        # Check if token has expired
        if payload.get("exp") is not None:
            exp_timestamp = payload.get("exp")
            if isinstance(exp_timestamp, int):
                if datetime.fromtimestamp(exp_timestamp) < datetime.utcnow():
                    raise credentials_exception
        
        return payload
    
    except JWTError:
        raise credentials_exception


def get_user_id_from_token_payload(payload: dict) -> str:
    """
    Extract user ID from JWT payload.
    
    Args:
        payload: Decoded JWT payload
        
    Returns:
        User ID string
    """
    user_id = payload.get("userId") or payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials - no user ID in token"
        )
    return str(user_id)