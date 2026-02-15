from fastapi import APIRouter, HTTPException, status, Depends
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
from jose import jwt
from pydantic import BaseModel
from sqlmodel import Session, select
from app.core.config import settings
from app.dependencies import get_current_user, get_session
from app.models.user import User, UserCreate, UserLogin, hash_password

router = APIRouter(prefix="/auth", tags=["auth"])

# Use the models from the user module
SignupRequest = UserCreate
LoginRequest = UserLogin

class AuthResponse(BaseModel):
    token: str
    user_id: str
    email: str
    name: Optional[str] = None

@router.post("/login", response_model=AuthResponse)
async def login(login_request: LoginRequest, session: Session = Depends(get_session)):
    """
    Login endpoint that validates credentials against the database and returns a JWT token.
    """
    # Find user by email in the database
    statement = select(User).where(User.email == login_request.email)
    result = session.exec(statement)
    user = result.first()

    if not user or user.hashed_password != hash_password(login_request.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Create JWT token
    expire = datetime.now() + timedelta(days=30)  # Token valid for 30 days
    token_data = {
        "sub": str(user.id),
        "userId": str(user.id),
        "email": user.email,
        "name": user.name,
        "exp": int(expire.timestamp())
    }

    token = jwt.encode(token_data, settings.better_auth_secret, algorithm="HS256")

    return AuthResponse(
        token=token,
        user_id=str(user.id),
        email=user.email,
        name=user.name
    )

@router.post("/signup", response_model=AuthResponse)
async def signup(signup_request: SignupRequest, session: Session = Depends(get_session)):
    """
    Signup endpoint that creates a new user in the database and returns a JWT token.
    """
    # Check if user already exists in the database
    statement = select(User).where(User.email == signup_request.email)
    result = session.exec(statement)
    existing_user = result.first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    # Hash the password
    hashed_pwd = hash_password(signup_request.password)

    # Create new user instance
    db_user = User(
        name=signup_request.name,
        email=signup_request.email,
        hashed_password=hashed_pwd
    )

    # Add user to the database
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    # Create JWT token
    expire = datetime.now() + timedelta(days=30)  # Token valid for 30 days
    token_data = {
        "sub": str(db_user.id),
        "userId": str(db_user.id),
        "email": db_user.email,
        "name": db_user.name,
        "exp": int(expire.timestamp())
    }

    token = jwt.encode(token_data, settings.better_auth_secret, algorithm="HS256")

    return AuthResponse(
        token=token,
        user_id=str(db_user.id),
        email=db_user.email,
        name=db_user.name
    )

@router.post("/logout")
async def logout(current_user_id: str = Depends(get_current_user)):
    """
    Logout endpoint - in a real application, this might invalidate tokens
    or add them to a blacklist. For this demo, we just return a success response.
    """
    # In a real application, you might want to add the token to a blacklist
    # until expiration, but for this demo we'll just return success
    return {"message": "Logged out successfully"}