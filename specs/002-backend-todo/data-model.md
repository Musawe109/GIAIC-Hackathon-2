# Data Model: Backend Todo API

## Entity: Todo

### Fields:
- **id**: UUID (primary key, auto-generated)
- **title**: string (required, max length 255)
- **description**: string (optional, max length 1000)
- **completed**: boolean (default false)
- **user_id**: string (indexed, from JWT token)
- **created_at**: datetime (auto-generated on creation)
- **updated_at**: datetime (auto-generated on update)

### Relationships:
- None (Todo is self-contained with user_id for ownership)

### Validation Rules:
- title: Required, minimum 1 character
- description: Optional, maximum 1000 characters
- completed: Boolean value only
- user_id: Required, comes from authenticated user's JWT

### Indexes:
- Primary key: id
- Foreign key equivalent: user_id (indexed for efficient user-based queries)

## Entity: User (Implicit)

### Fields (from JWT):
- **user_id**: string (extracted from JWT token payload)
- **email**: string (optional, from JWT)
- **name**: string (optional, from JWT)

### Notes:
- User data is not stored in backend database
- User identity is derived from JWT token
- User validation happens via Better Auth frontend

## State Transitions:

### Todo State Changes:
1. **Creation**: New todo with completed=False
2. **Update**: Title/description/completed can be modified
3. **Deletion**: Todo is removed from database
4. **Toggle Completion**: completed field flips between true/false

## SQLModel Implementation:

```python
from sqlmodel import SQLModel, Field, Column
from sqlalchemy import String, DateTime
from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional

class Todo(SQLModel, table=True):
    __tablename__ = "todos"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    title: str = Field(sa_column=Column(String(255), nullable=False))
    description: Optional[str] = Field(sa_column=Column(String(1000), nullable=True))
    completed: bool = Field(default=False)
    user_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
```

## API Schema Models:

### TodoRead:
- Includes all fields except user_id (not exposed to client)

### TodoCreate:
- title (required)
- description (optional)

### TodoUpdate:
- title (optional)
- description (optional)
- completed (optional)