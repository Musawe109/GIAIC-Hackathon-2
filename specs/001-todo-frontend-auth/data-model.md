# Data Model: Todo Frontend Authentication

## Entities

### Todo
**Representation**: A user's task item in the todo list
- **id**: Unique identifier for the todo (string/UUID)
- **title**: Short descriptive title of the task (string, required)
- **description**: Optional detailed description of the task (string, optional)
- **completed**: Boolean indicating if the task is completed (boolean, default: false)
- **createdAt**: Timestamp when the todo was created (ISO date string)
- **updatedAt**: Timestamp when the todo was last updated (ISO date string)
- **userId**: Reference to the user who owns this todo (string, required)

**Validation rules**:
- Title must be 1-200 characters
- Description, if provided, must be 0-1000 characters
- Completed status can be toggled by the user
- userId must match the authenticated user's ID

**State transitions**:
- Incomplete → Completed: When user marks as complete
- Completed → Incomplete: When user marks as incomplete

### User
**Representation**: An authenticated user of the system
- **id**: Unique identifier for the user (string/UUID)
- **email**: User's email address (string, required, unique)
- **name**: User's display name (string, optional)
- **createdAt**: Timestamp when the user account was created (ISO date string)
- **lastLoginAt**: Timestamp of last login (ISO date string, optional)

**Validation rules**:
- Email must be valid and unique
- Name, if provided, must be 1-100 characters

## Relationships
- One User has many Todos (1:N relationship)
- Todos are isolated by userId - users cannot access other users' todos

## Frontend State Model
### Auth State
- **isAuthenticated**: Boolean indicating authentication status
- **user**: User object when authenticated (null when not authenticated)
- **token**: JWT token string when authenticated (null when not authenticated)
- **isLoading**: Boolean indicating auth loading state

### Todo List State
- **todos**: Array of Todo objects
- **isLoading**: Boolean indicating loading state
- **error**: Error message if operation failed
- **filter**: Current filter applied (all, active, completed)