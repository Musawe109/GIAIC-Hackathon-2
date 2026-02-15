from sqlmodel import SQLModel, Field, Column
from sqlalchemy import String, DateTime
from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional
import uuid


class TodoBase(SQLModel):
    """Base model for Todo with common fields."""
    title: str = Field(sa_column=Column(String(255), nullable=False))
    description: Optional[str] = Field(sa_column=Column(String(1000), nullable=True))
    completed: bool = Field(default=False)


class Todo(TodoBase, table=True):
    """Todo model for database storage."""
    __tablename__ = "todos"
    
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)


class TodoRead(TodoBase):
    """Todo model for API responses (without user_id)."""
    id: UUID
    created_at: datetime
    updated_at: datetime


class TodoCreate(TodoBase):
    """Todo model for creation requests."""
    title: str  # Required field
    description: Optional[str] = None


class TodoUpdate(SQLModel):
    """Todo model for update requests."""
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None