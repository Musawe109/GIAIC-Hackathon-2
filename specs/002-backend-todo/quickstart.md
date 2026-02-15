# Quickstart Guide: Backend Todo API

## Prerequisites

- Python 3.11+
- pip package manager
- Neon PostgreSQL database instance
- Better Auth configured in frontend

## Setup Instructions

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your specific values:
```bash
NEON_DB_URL=your_neon_postgres_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=your_frontend_url
```

### 5. Run the Application
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

Run tests with coverage:
```bash
pytest --cov=app
```

## Development

For active development with auto-reload:
```bash
uvicorn app.main:app --reload
```

## Troubleshooting

### Common Issues:
1. **Database Connection**: Verify `NEON_DB_URL` is correct
2. **JWT Validation**: Ensure `BETTER_AUTH_SECRET` matches frontend
3. **CORS Errors**: Check `BETTER_AUTH_URL` matches frontend origin