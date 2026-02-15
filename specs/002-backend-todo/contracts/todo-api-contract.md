# API Contract: Backend Todo API

## Base URL
`/api`

## Authentication
All endpoints (except health check) require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Health Check
```
GET /health
```

#### Request
- No authentication required
- No request body

#### Response
Success (200 OK):
```json
{
  "status": "healthy",
  "timestamp": "2026-02-09T10:00:00.000Z"
}
```

### Get Todos
```
GET /todos
```

#### Request
- Authentication required
- No request body

#### Response
Success (200 OK):
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Sample Todo",
    "description": "A sample todo item",
    "completed": false,
    "created_at": "2026-02-09T10:00:00.000Z",
    "updated_at": "2026-02-09T10:00:00.000Z"
  }
]
```

### Create Todo
```
POST /todos
```

#### Request
- Authentication required
- Request body:
```json
{
  "title": "New Todo",
  "description": "Description of the new todo"
}
```

#### Response
Success (201 Created):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174001",
  "title": "New Todo",
  "description": "Description of the new todo",
  "completed": false,
  "user_id": "user123",
  "created_at": "2026-02-09T10:00:00.000Z",
  "updated_at": "2026-02-09T10:00:00.000Z"
}
```

### Update Todo
```
PUT /todos/{id}
```

#### Request
- Authentication required
- Path parameter: `id` (UUID)
- Request body:
```json
{
  "title": "Updated Todo",
  "description": "Updated description",
  "completed": true
}
```

#### Response
Success (200 OK):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174001",
  "title": "Updated Todo",
  "description": "Updated description",
  "completed": true,
  "user_id": "user123",
  "created_at": "2026-02-09T10:00:00.000Z",
  "updated_at": "2026-02-09T10:01:00.000Z"
}
```

### Delete Todo
```
DELETE /todos/{id}
```

#### Request
- Authentication required
- Path parameter: `id` (UUID)
- No request body

#### Response
Success (204 No Content):
- No response body

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 403 Forbidden
```json
{
  "detail": "Access denied - insufficient permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Todo not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "Field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

## Data Types

### Todo Object
| Field | Type | Description |
|-------|------|-------------|
| id | UUID string | Unique identifier for the todo |
| title | string | Title of the todo (max 255 chars) |
| description | string \| null | Optional description (max 1000 chars) |
| completed | boolean | Completion status |
| user_id | string | ID of the user who owns this todo |
| created_at | ISO 8601 datetime | Creation timestamp |
| updated_at | ISO 8601 datetime | Last update timestamp |

## Security Requirements
- All endpoints except `/health` require valid JWT token
- Users can only access their own todos
- JWT must be signed with BETTER_AUTH_SECRET
- No sensitive information in error messages