# Feature Specification: Backend Todo API

**Feature Branch**: `002-backend-todo`
**Created**: 2026-02-06
**Status**: Draft
**Input**: User description: " /sp.specify

Project: Phase II Todo Full-Stack Web Application – Backend

Purpose:
Design and implement a secure, scalable, and spec-compliant backend that integrates seamlessly with the existing Next.js frontend. The backend must provide authenticated, user-isolated Todo CRUD functionality using FastAPI, JWT-based authentication (Better Auth), and Neon Serverless PostgreSQL.

System Overview:
The backend acts as a REST API server responsible for:
- User authentication verification via JWT
- Secure Todo CRUD operations
- User-level data isolation
- Database persistence
- Contract-level compatibility with frontend API client

Tech Stack:
- Language: Python 3.11+
- Framework: FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Auth: Better Auth (JWT-based)
- Migrations: SQLModel metadata (no manual SQL)
- Environment management: python-dotenv
- Server: Uvicorn

Environment Configuration:
Backend must load the following variables from `.env`:

- NEON_DB_URL
  Description: PostgreSQL connection string for Neon serverless database
  Usage: SQLModel engine creation

- BETTER_AUTH_SECRET
  Description: Shared JWT signing secret
  Usage: JWT verification and decoding

- BETTER_AUTH_URL
  Description: Base URL of frontend application
  Usage: Token validation context and auth alignment

Authentication & Authorization:
- Backend does NOT manage user registration or login
- Authentication is handled by Better Auth on the frontend
- Backend must:
  - Accept JWT from Authorization header: `Bearer <token>`
  - Verify JWT using BETTER_AUTH_SECRET
  - Extract authenticated user ID from token payload
  - Reject requests with missing, invalid, or expired tokens
- Authorization rules:
  - Every request must be authenticated (except health check)
  - Users may ONLY access their own Todos
  - Cross-user access is strictly forbidden

Data Model:
Define a Todo model using SQLModel with the following fields:

- id: UUID (primary key)
- title: string (required)
- description: string (optional)
- completed: boolean (default false)
- user_id: string (from JWT, indexed)
- created_at: datetime (auto)
- updated_at: datetime (auto)

Database Rules:
- Use SQLModel for all database interactions
- No raw SQL queries
- Neon PostgreSQL must be the only persistence layer
- Ensure proper indexing on user_id
- Automatic table creation on startup

API Endpoints:
All endpoints must be RESTful and JSON-based.

Base path: /api

1. GET /api/health
   - Public endpoint
   - Returns backend status

2. GET /api/todos
   - Auth required
   - Returns list of Todos for authenticated user only

3. POST /api/todos
   - Auth required
   - Creates new Todo for authenticated user
   - Body: title, description

4. PUT /api/todos/{id}
   - Auth required
   - Updates Todo (title, description, completed)
   - Only if Todo belongs to user

5. DELETE /api/todos/{id}
   - Auth required
   - Deletes Todo owned by user only

Error Handling:
- Use proper HTTP status codes
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (accessing another user's data)
- 404: Resource not found
- 422: Validation errors
- Errors must return structured JSON responses

Security Requirements:
- JWT must be validated on every protected route
- No sensitive data logged
- No secrets hardcoded
- CORS configured to allow frontend origin only
- Rate-safe and stateless API design

Integration Requirements (Frontend Compatibility):
- Endpoint paths, methods, and response shapes must match frontend API client
- JSON field naming must be consistent
- Timestamps must be ISO-8601
- Backend must accept and return data exactly as frontend expects
- JWT format must be identical to frontend token

Project Structure:
Backend must follow a clean, maintainable layout:

/backend
 ├── app/
 │   ├── main.py
 │   ├── core/
 │   │   ├── config.py
 │   │   ├── security.py
 │   ├── models/
 │   │   └── todo.py
 │   ├── routers/
 │   │   └── todos.py
 │   ├── db/
 │   │   └── session.py
 │   └── depend"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Personal Todo List (Priority: P1)

As an authenticated user, I want to view my personal todo list so that I can see my tasks and manage them effectively.

**Why this priority**: This is the foundational functionality that allows users to access their data. Without this, the entire todo system is unusable.

**Independent Test**: A user can log in and successfully retrieve their own todos from the API endpoint while being prevented from accessing other users' todos.

**Acceptance Scenarios**:

1. **Given** user is authenticated with valid JWT, **When** user requests their todos via GET /api/todos, **Then** system returns only todos belonging to that user
2. **Given** user has no todos created yet, **When** user requests their todos via GET /api/todos, **Then** system returns an empty list successfully

---

### User Story 2 - Create New Todo (Priority: P1)

As an authenticated user, I want to create new todos so that I can track my tasks and responsibilities.

**Why this priority**: This enables the core functionality of adding tasks, which is essential for a todo application.

**Independent Test**: A user can create a new todo item and verify it appears in their personal todo list.

**Acceptance Scenarios**:

1. **Given** user is authenticated with valid JWT, **When** user posts a new todo with title and optional description to POST /api/todos, **Then** system creates the todo and returns the created todo with assigned ID
2. **Given** user provides invalid data (e.g., missing title), **When** user posts to POST /api/todos, **Then** system returns appropriate validation error

---

### User Story 3 - Update Existing Todo (Priority: P2)

As an authenticated user, I want to update my existing todos so that I can modify task details and mark them as completed.

**Why this priority**: This enables task management beyond just creation and deletion, allowing users to maintain their todo lists effectively.

**Independent Test**: A user can update one of their own todos while being prevented from updating todos that belong to other users.

**Acceptance Scenarios**:

1. **Given** user is authenticated and owns a specific todo, **When** user sends PUT request to /api/todos/{id} with updated details, **Then** system updates the todo successfully
2. **Given** user is authenticated but does not own the requested todo, **When** user attempts to update another user's todo, **Then** system returns 403 Forbidden error

---

### User Story 4 - Delete Own Todo (Priority: P2)

As an authenticated user, I want to delete my own todos so that I can remove completed or irrelevant tasks.

**Why this priority**: This enables users to clean up their todo lists and maintain only relevant tasks.

**Independent Test**: A user can delete one of their own todos while being prevented from deleting todos that belong to other users.

**Acceptance Scenarios**:

1. **Given** user is authenticated and owns a specific todo, **When** user sends DELETE request to /api/todos/{id}, **Then** system deletes the todo successfully
2. **Given** user is authenticated but does not own the requested todo, **When** user attempts to delete another user's todo, **Then** system returns 403 Forbidden error

---

### User Story 5 - Health Check for System Status (Priority: P3)

As a system administrator or monitoring service, I want to check the backend health status so that I can monitor system availability.

**Why this priority**: While not a user-facing feature, this is important for system reliability and maintenance.

**Independent Test**: Anyone can access the health endpoint and receive a positive response indicating the backend is operational.

**Acceptance Scenarios**:

1. **Given** system is running normally, **When** anyone accesses GET /api/health, **Then** system returns successful health status
2. **Given** system has connectivity issues with database, **When** health endpoint is accessed, **Then** system returns appropriate error status

---

### Edge Cases

- What happens when JWT token is expired or invalid during any protected operation?
- How does system handle malformed JSON requests?
- What occurs when user tries to access a todo that doesn't exist?
- How does system behave when database is temporarily unavailable?
- What happens when concurrent users try to access the same resource simultaneously?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST verify JWT tokens from Authorization header for all protected endpoints using the BETTER_AUTH_SECRET
- **FR-002**: System MUST extract authenticated user ID from JWT payload and use it for data isolation
- **FR-003**: System MUST only allow users to access their own todos based on user_id stored in the database
- **FR-004**: System MUST provide RESTful API endpoints at the /api base path following standard HTTP methods
- **FR-005**: System MUST reject requests with missing, invalid, or expired tokens with HTTP 401 status
- **FR-006**: System MUST prevent cross-user access by returning HTTP 403 Forbidden when attempting to access another user's data
- **FR-007**: System MUST provide GET /api/health endpoint that is accessible without authentication
- **FR-008**: System MUST allow authenticated users to retrieve their own todos via GET /api/todos
- **FR-009**: System MUST allow authenticated users to create new todos via POST /api/todos
- **FR-010**: System MUST allow authenticated users to update their own todos via PUT /api/todos/{id}
- **FR-011**: System MUST allow authenticated users to delete their own todos via DELETE /api/todos/{id}
- **FR-012**: System MUST return appropriate HTTP status codes (401, 403, 404, 422) for various error conditions
- **FR-013**: System MUST return structured JSON responses for all API endpoints and error conditions
- **FR-014**: System MUST store all todo data in Neon Serverless PostgreSQL database
- **FR-015**: System MUST use SQLModel ORM for all database interactions without raw SQL queries
- **FR-016**: System MUST automatically create database tables on startup
- **FR-017**: System MUST load configuration from environment variables (NEON_DB_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL)
- **FR-018**: System MUST ensure proper indexing on user_id field for efficient data isolation queries
- **FR-019**: System MUST configure CORS to allow only the frontend origin to access the API
- **FR-020**: System MUST handle all timestamp fields in ISO-8601 format

### Key Entities *(include if feature involves data)*

- **Todo**: Represents a user task with title, description, completion status, timestamps, and ownership
- **User**: Identified by user ID extracted from JWT token, representing the authenticated entity that owns todos
- **Authentication Token**: JWT token containing user identity information that is verified against BETTER_AUTH_SECRET

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully authenticate via JWT and access their isolated todo data without seeing others' data
- **SC-002**: API responds to requests within 2 seconds under normal load conditions (95th percentile)
- **SC-003**: System maintains 99% uptime over a 30-day period
- **SC-004**: 100% of requests properly validate JWT tokens before processing protected endpoints
- **SC-005**: Users can complete the full CRUD cycle (create, read, update, delete) for their own todos
- **SC-006**: System properly rejects 100% of cross-user access attempts with appropriate error responses
- **SC-007**: All API responses conform to documented JSON schema and endpoint specifications
- **SC-008**: System can support at least 100 concurrent users without degradation in performance