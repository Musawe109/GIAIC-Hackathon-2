import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import verify_token, get_user_id_from_token_payload
from jose import jwt
from app.core.config import settings

client = TestClient(app)


def test_authentication_required_for_protected_routes():
    """Test that protected routes require authentication."""
    # Try to access protected route without auth header
    response = client.get("/api/todos")
    assert response.status_code == 401
    assert "detail" in response.json()
    
    # Try to access with malformed auth header
    response = client.get("/api/todos", headers={"Authorization": "Invalid"})
    assert response.status_code == 401
    
    # Try to access with invalid token
    response = client.get("/api/todos", headers={"Authorization": "Bearer invalid-token"})
    assert response.status_code == 401


def test_jwt_verification():
    """Test JWT token verification functionality."""
    # Create a mock token (this is for testing purposes only)
    # In real scenario, tokens come from Better Auth
    payload = {
        "sub": "test-user-id",
        "userId": "test-user-id",
        "exp": 9999999999  # Far future expiration
    }
    token = jwt.encode(payload, settings.better_auth_secret, algorithm="HS256")
    
    # Verify the token
    decoded_payload = verify_token(token)
    assert decoded_payload["sub"] == "test-user-id"
    
    # Get user ID from payload
    user_id = get_user_id_from_token_payload(decoded_payload)
    assert user_id == "test-user-id"