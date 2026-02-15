from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session, select
from uuid import UUID
from datetime import datetime

from app.dependencies import get_current_user
from app.db.session import get_session
from app.models.todo import Todo, TodoRead, TodoCreate, TodoUpdate

router = APIRouter()


@router.get("/", response_model=List[TodoRead])
async def get_todos(
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all todos for the authenticated user.
    
    Args:
        current_user_id: ID of the authenticated user (from JWT)
        session: Database session
        
    Returns:
        List of todos belonging to the authenticated user
    """
    # Query todos filtered by user_id
    statement = select(Todo).where(Todo.user_id == current_user_id)
    results = session.exec(statement)
    todos = results.all()
    
    return todos


@router.post("/", response_model=TodoRead, status_code=status.HTTP_201_CREATED)
async def create_todo(
    todo_data: TodoCreate,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new todo for the authenticated user.
    
    Args:
        todo_data: Todo creation data (title, description)
        current_user_id: ID of the authenticated user (from JWT)
        session: Database session
        
    Returns:
        Created todo with assigned ID
    """
    # Create a new Todo instance with the authenticated user's ID
    todo = Todo(
        title=todo_data.title,
        description=todo_data.description,
        completed=todo_data.completed,
        user_id=current_user_id
    )
    
    # Add to session and commit
    session.add(todo)
    session.commit()
    session.refresh(todo)
    
    return todo


@router.put("/{todo_id}", response_model=TodoRead)
async def update_todo(
    todo_id: UUID,
    todo_update: TodoUpdate,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a todo if it belongs to the authenticated user.

    Args:
        todo_id: ID of the todo to update
        todo_update: Update data (title, description, completed)
        current_user_id: ID of the authenticated user (from JWT)
        session: Database session

    Returns:
        Updated todo
    """
    # Get the existing todo
    statement = select(Todo).where(Todo.id == todo_id)
    result = session.exec(statement)
    todo = result.first()

    # Verify todo exists and belongs to the authenticated user
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    if todo.user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied - insufficient permissions"
        )

    # Update the todo with provided fields
    for field, value in todo_update.dict(exclude_unset=True).items():
        setattr(todo, field, value)

    # Update the updated_at timestamp
    todo.updated_at = datetime.utcnow()

    # Commit changes
    session.add(todo)
    session.commit()
    session.refresh(todo)

    return todo


@router.patch("/{todo_id}/toggle", response_model=TodoRead)
async def toggle_todo_completion(
    todo_id: UUID,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a todo if it belongs to the authenticated user.

    Args:
        todo_id: ID of the todo to toggle
        current_user_id: ID of the authenticated user (from JWT)
        session: Database session

    Returns:
        Updated todo with toggled completion status
    """
    # Get the existing todo
    statement = select(Todo).where(Todo.id == todo_id)
    result = session.exec(statement)
    todo = result.first()

    # Verify todo exists and belongs to the authenticated user
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    if todo.user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied - insufficient permissions"
        )

    # Toggle the completion status
    todo.completed = not todo.completed

    # Update the updated_at timestamp
    todo.updated_at = datetime.utcnow()

    # Commit changes
    session.add(todo)
    session.commit()
    session.refresh(todo)

    return todo


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(
    todo_id: UUID,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a todo if it belongs to the authenticated user.
    
    Args:
        todo_id: ID of the todo to delete
        current_user_id: ID of the authenticated user (from JWT)
        session: Database session
    """
    # Get the existing todo
    statement = select(Todo).where(Todo.id == todo_id)
    result = session.exec(statement)
    todo = result.first()
    
    # Verify todo exists and belongs to the authenticated user
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    
    if todo.user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied - insufficient permissions"
        )
    
    # Delete the todo
    session.delete(todo)
    session.commit()
    
    # Return 204 No Content
    return