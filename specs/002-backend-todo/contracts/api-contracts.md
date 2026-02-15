# API Contracts: Backend Todo API

## Base Configuration
- Base URL: `/api`
- Content-Type: `application/json`
- Timestamp Format: ISO 8601
- Authentication: JWT Bearer token in Authorization header

## Contract 1: Health Check
**Endpoint**: `GET /api/health`

### Request
- Method: GET
- Authentication: None required
- Headers: None required
- Parameters: None
- Body: None

### Response
- Success: 200 OK
- Content-Type: application/json
- Body:
```json
{
  "status": "healthy",
  "timestamp": "ISO8601 timestamp",
  "version": "backend version"
}
```

## Contract 2: Get User Todos
**Endpoint**: `GET /api/todos`

### Request
- Method: GET
- Authentication: Required (Bearer token)
- Headers: `Authorization: Bearer <token>`
- Parameters: None
- Body: None

### Response
- Success: 200 OK
- Content-Type: application/json
- Body:
```json
{
  "todos": [
    {
      "id": "uuid-string",
      "title": "todo title",
      "description": "optional description",
      "completed": false,
      "user_id": "user identifier from token",
      "created_at": "ISO8601 timestamp",
      "updated_at": "ISO8601 timestamp"
    }
  ]
}
```

### Error Responses
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: Token validation failed

## Contract 3: Create Todo
**Endpoint**: `POST /api/todos`

### Request
- Method: POST
- Authentication: Required (Bearer token)
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Parameters: None
- Body:
```json
{
  "title": "required title",
  "description": "optional description"
}
```

### Response
- Success: 201 Created
- Content-Type: application/json
- Body:
```json
{
  "id": "uuid-string",
  "title": "todo title",
  "description": "optional description",
  "completed": false,
  "user_id": "extracted user id",
  "created_at": "ISO8601 timestamp",
  "updated_at": "ISO8601 timestamp"
}
```

### Error Responses
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: Token validation failed
- 422 Unprocessable Entity: Validation errors (missing title, etc.)

## Contract 4: Update Todo
**Endpoint**: `PUT /api/todos/{id}`

### Request
- Method: PUT
- Authentication: Required (Bearer token)
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Parameters: `id` (todo identifier in path)
- Body:
```json
{
  "title": "updated title",
  "description": "updated description",
  "completed": true
}
```

### Response
- Success: 200 OK
- Content-Type: application/json
- Body:
```json
{
  "id": "uuid-string",
  "title": "updated title",
  "description": "updated description",
  "completed": true,
  "user_id": "extracted user id",
  "created_at": "original creation timestamp",
  "updated_at": "current timestamp"
}
```

### Error Responses
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: Attempting to modify another user's todo
- 404 Not Found: Todo with specified id does not exist
- 422 Unprocessable Entity: Validation errors

## Contract 5: Delete Todo
**Endpoint**: `DELETE /api/todos/{id}`

### Request
- Method: DELETE
- Authentication: Required (Bearer token)
- Headers: `Authorization: Bearer <token>`
- Parameters: `id` (todo identifier in path)
- Body: None

### Response
- Success: 204 No Content
- Content-Type: N/A

### Error Responses
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: Attempting to delete another user's todo
- 404 Not Found: Todo with specified id does not exist

## Error Response Format
All error responses follow this structure:
```json
{
  "detail": "human-readable error message",
  "error_code": "machine-readable error code",
  "timestamp": "ISO8601 timestamp"
}
```

## HTTP Status Codes
- 200 OK: Successful GET, PUT operations
- 201 Created: Successful POST operation
- 204 No Content: Successful DELETE operation
- 401 Unauthorized: Missing or invalid authentication
- 403 Forbidden: Insufficient permissions/access denied
- 404 Not Found: Resource not found
- 422 Unprocessable Entity: Validation errors
- 500 Internal Server Error: Server-side errors