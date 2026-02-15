import pytest
from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch
from uuid import UUID

client = TestClient(app)


def test_todo_endpoints_exist():
    """Test that all todo endpoints exist."""
    # Mock a valid JWT token for testing
    headers = {"Authorization": "Bearer fake-valid-token"}
    
    # Test GET /api/todos
    response = client.get("/api/todos", headers=headers)
    # This should return 200 (empty list) or 401 depending on token validation
    # Since the token is fake, it will likely be 401
    assert response.status_code in [200, 401]
    
    # Test POST /api/todos
    response = client.post(
        "/api/todos",
        json={"title": "Test Todo", "description": "Test Description"},
        headers=headers
    )
    # This will likely be 401 due to invalid token, but could be 422 for validation
    assert response.status_code in [201, 401, 422]