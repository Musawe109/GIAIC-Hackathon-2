from sqlmodel import SQLModel, Field, Column
from sqlalchemy import String, DateTime
from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional
import hashlib


class UserBase(SQLModel):
    """Base model for User with common fields."""
    name: str = Field(sa_column=Column(String(255), nullable=False))
    email: str = Field(sa_column=Column(String(255), nullable=False, unique=True, index=True))
    hashed_password: str = Field(sa_column=Column(String(255), nullable=False))


class User(UserBase, table=True):
    """User model for database storage."""
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.now, nullable=False)


class UserRead(SQLModel):
    """User model for API responses."""
    id: UUID
    name: str
    email: str
    created_at: datetime
    updated_at: datetime


class UserCreate(SQLModel):
    """User model for creation requests."""
    name: str
    email: str
    password: str  # Plain text password that will be hashed


class UserLogin(SQLModel):
    """User model for login requests."""
    email: str
    password: str  # Plain text password for comparison with hash


def hash_password(password: str) -> str:
    """Hash a password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()