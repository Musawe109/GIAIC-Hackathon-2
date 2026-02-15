from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict, Any
from app.core.security import verify_token, get_user_id_from_token_payload
from app.db.session import get_session

# Create security scheme for JWT Bearer token
security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Dependency to get the current authenticated user ID from JWT token.

    Args:
        credentials: HTTP Authorization credentials containing the JWT

    Returns:
        User ID string from the token payload

    Raises:
        HTTPException: If token is invalid or user ID cannot be extracted
    """
    # Verify the token and get the payload
    token_payload = verify_token(credentials.credentials)

    # Extract user ID from the token payload
    user_id = get_user_id_from_token_payload(token_payload)

    # Return the user ID
    return user_id