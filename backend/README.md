# Todo Backend API

A secure, scalable backend API for todo management with JWT authentication using FastAPI, SQLModel, and Neon PostgreSQL.

## Features

- JWT-based authentication with Better Auth compatibility
- Secure Todo CRUD operations
- User-level data isolation
- Database persistence with Neon Serverless PostgreSQL
- RESTful API design
- Comprehensive error handling

## Tech Stack

- Python 3.11+
- FastAPI
- SQLModel
- Neon Serverless PostgreSQL
- Better Auth (JWT-based)
- python-jose for JWT verification

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
6. Update the `.env` file with your specific values:
   - `NEON_DB_URL`: Your Neon PostgreSQL connection string
   - `BETTER_AUTH_SECRET`: Your Better Auth secret
   - `BETTER_AUTH_URL`: Your frontend URL

## Running the Application

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /api/health` - Public endpoint to check API status

### Todo Operations (require authentication)
- `GET /api/todos` - Get authenticated user's todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Authentication

All Todo endpoints require a valid JWT token from Better Auth in the Authorization header:
```
Authorization: Bearer <jwt_token_here>
```

The token is validated against the `BETTER_AUTH_SECRET`.

## Testing

Run the test suite:
```bash
pytest
```

## Security

- JWT validation on all protected routes
- User data isolation (users can only access their own todos)
- Secrets are not logged
- CORS configured for frontend origin only
- Stateless API design