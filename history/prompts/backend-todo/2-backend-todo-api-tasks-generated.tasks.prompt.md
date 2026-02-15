---
id: 2
title: Backend-Todo-API-Tasks-Generated
stage: tasks
date: 2026-02-09
surface: agent
model: Qwen Code
feature: backend-todo
branch: 002-backend-todo
user: ts.com
command: /sp.tasks
labels: ["backend", "todo", "api", "fastapi", "tasks"]
links:
  spec: ../specs/002-backend-todo/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-backend-todo/tasks.md
tests:
 - specs/002-backend-todo/
---

## Prompt

```
/sp.tasks /sp.tasks

Scope: Backend Only

Project: Phase II Todo Full-Stack Web Application – Backend

Reference:
- Follow /sp.specify strictly
- Execute according to /sp.plan
- Comply with /sp.constitution
----------------------------------------------------------------
TASK 1 – Backend Project Bootstrap
Objective: Initialize FastAPI backend project with proper structure and dependencies.
Actions:
- Create `/backend` root directory
- Initialize Python project
- Create virtual environment (if required)
- Add `requirements.txt` with:
- fastapi
- uvicorn
- sqlmodel
- psycopg2-binary
- python-dotenv
- python-jose
- Create folder structure:
- app/
- main.py
- core/
- models/
- routers/
- db/
- dependencies/
Deliverable:
- Backend project skeleton with dependencies defined
----------------------------------------------------------------
TASK 2 – Environment & Configuration Setup
Objective: Centralize environment variable loading and application settings.
Actions:
- Create `.env` file under `/backend`
- Load environment variables:
- NEON_DB_URL
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- Create `core/config.py`
- Implement environment validation
- Expose configuration object to app
Deliverable:
- Secure, reusable configuration system
----------------------------------------------------------------
TASK 3 – FastAPI Application Initialization
Objective: Initialize FastAPI app with base configuration.
Actions:
- Create FastAPI instance in `app/main.py`
- Configure:
- Application metadata
- Startup events
- Register API routers
- Enable CORS for frontend origin only
Deliverable:
- Running FastAPI application instance
----------------------------------------------------------------
TASK 4 – Database Engine & Session Management
Objective: Connect FastAPI to Neon PostgreSQL using SQLModel.
Actions:
- Create SQLModel engine using NEON_DB_URL
- Implement session dependency in `db/session.py`
- Enable connection pooling
- Setup table creation on startup
Deliverable:
- Active Neon PostgreSQL connection
- Session dependency available for routes
----------------------------------------------------------------
TASK 5 – Todo Data Model Implementation
Objective: Define Todo database schema using SQLModel.
Actions:
- Create `models/todo.py`
- Define Todo model with:
- UUID primary key
- title (required)
- description (optional)
- completed (boolean, default false)
- user_id (indexed)
- created_at timestamp
- updated_at timestamp
- Ensure SQLModel compatibility
Deliverable:
- Persistent Todo table mapped to database
----------------------------------------------------------------
TASK 6 – JWT Authentication Dependency
Objective: Verify Better Auth JWT tokens and extract user identity.
Actions:
- Create `core/security.py`
- Implement JWT decode & verification using BETTER_AUTH_SECRET
- Validate token expiration and integrity
- Create auth dependency in `dependencies/auth.py`
- Extract authenticated user ID from token payload
- Reject unauthorized requests
Deliverable:
- Reusable JWT authentication dependency
----------------------------------------------------------------
TASK 7 – Health Check Endpoint
Objective: Provide public health endpoint for backend status.
Actions:
- Create `/api/health` endpoint
- Return JSON status response
- Do not require authentication
Deliverable:
- Public backend health check endpoint
----------------------------------------------------------------
TASK 8 – Fetch Todos Endpoint
Objective: Return all Todos for authenticated user.
Actions:
- Create GET `/api/todos`
- Require authentication dependency
- Query Todos filtered by user_id
- Return JSON list
Deliverable:
- Secure user-specific Todo fetch API
----------------------------------------------------------------
TASK 9 – Create Todo Endpoint
Objective: Create a new Todo for authenticated user.
Actions:
- Create POST `/api/todos`
- Require authentication
- Validate request body
- Assign authenticated user_id automatically
- Persist Todo in database
Deliverable:
- Todo creation API
----------------------------------------------------------------
TASK 10 – Update Todo Endpoint
Objective: Update Todo only if owned by authenticated user.
Actions:
- Create PUT `/api/todos/{id}`
- Verify Todo exists
- Verify Todo.user_id matches authenticated user
- Update fields: title, description, completed
- Save changes
Deliverable:
- Secure Todo update API
----------------------------------------------------------------
TASK 11 – Delete Todo Endpoint
Objective: Delete Todo only if owned by authenticated user.
Actions:
- Create DELETE `/api/todos/{id}`
- Verify ownership
- Delete Todo from database
- Return success response
Deliverable:
- Secure Todo delete API
----------------------------------------------------------------
TASK 12 – Error Handling & Response Standardization
Objective: Ensure predictable and frontend-friendly error responses.
Actions:
- Implement HTTPException handling
- Standardize JSON error format
- Handle:
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 422 Validation errors
Deliverable:
- Consistent API error responses
----------------------------------------------------------------
TASK 13 – Frontend Integration Validation
Objective: Ensure backend API is fully compatible with frontend.
Actions:
- Verify endpoint paths and methods
- Validate JSON response shapes
- Ensure ISO-8601 timestamps
- Confirm JWT header format compatibility
Deliverable:
- Verified frontend-backend integration readiness
----------------------------------------------------------------
TASK 14 – Security & Compliance Review
Objective: Harden backend against misuse.
Actions:
- Ensure JWT verification on all protected routes
- Confirm no cross-user data access possible
- Ensure secrets are not logged
- Validate CORS restrictions
Deliverable:
- Security-reviewed backend API
----------------------------------------------------------------
TASK 15 – Final Quality Check
Objective: Ensure backend meets all specs and CCR standards.
Actions:
- Review code structure and cleanliness
- Validate SQLModel usage everywhere
- Confirm stateless API behavior
- Verify database persistence
Deliverable:
- Backend ready for `/sp.implement`
```

## Response snapshot

```
# Tasks: Backend Todo API

**Feature**: Backend Todo API | **Branch**: `002-backend-todo` | **Spec**: [specs/002-backend-todo/spec.md](../spec.md)
**Plan**: [specs/002-backend-todo/plan.md](../plan.md) | **Input**: Feature specification with user stories and requirements

## Phase 1: Setup

**Goal**: Initialize FastAPI backend project with proper structure and dependencies

- [ ] T001 Create `/backend` root directory
- [ ] T002 [P] Create virtual environment in `/backend`
- [ ] T003 Create `requirements.txt` with: fastapi, uvicorn, sqlmodel, psycopg2-binary, python-dotenv, python-jose[cryptography], pydantic
- [ ] T004 Create folder structure: `app/`, `app/main.py`, `app/core/`, `app/models/`, `app/routers/`, `app/db/`, `app/dependencies.py`
- [ ] T005 Create `.env.example` with NEON_DB_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
- [ ] T006 Create `.gitignore` for Python project

## Phase 2: Foundational Components

**Goal**: Establish core infrastructure components that all user stories depend on

- [ ] T007 Create `app/core/config.py` with settings class loading environment variables
- [ ] T008 Create `app/db/session.py` with SQLModel engine and session dependency
- [ ] T009 Create `app/core/security.py` with JWT verification utilities
- [ ] T010 Create `app/dependencies.py` with authentication dependency
- [ ] T011 Initialize FastAPI app in `app/main.py` with CORS configuration
- [ ] T012 Create `app/models/todo.py` with SQLModel Todo class and Pydantic schemas

## Phase 3: User Story 1 - View Personal Todo List (P1)

**Goal**: As an authenticated user, I want to view my personal todo list so that I can see my tasks and manage them effectively.

**Independent Test**: A user can log in and successfully retrieve their own todos from the API endpoint while being prevented from accessing other users' todos.

- [ ] T013 [US1] Create GET `/api/todos` endpoint in `app/routers/todos.py`
- [ ] T014 [US1] Implement authentication dependency for GET `/api/todos`
- [ ] T015 [US1] Query Todos filtered by user_id from JWT token
- [ ] T016 [US1] Return JSON list of authenticated user's todos
- [ ] T017 [US1] Add tests for retrieving user's own todos
- [ ] T018 [US1] Add tests to ensure users can't access other users' todos

## Phase 4: User Story 2 - Create New Todo (P1)

**Goal**: As an authenticated user, I want to create new todos so that I can track my tasks and responsibilities.

**Independent Test**: A user can create a new todo item and verify it appears in their personal todo list.

- [ ] T019 [US2] Create POST `/api/todos` endpoint in `app/routers/todos.py`
- [ ] T020 [US2] Implement authentication dependency for POST `/api/todos`
- [ ] T021 [US2] Validate request body with title (required) and description (optional)
- [ ] T022 [US2] Assign authenticated user_id automatically from JWT token
- [ ] T023 [US2] Persist Todo in database with auto-generated ID and timestamps
- [ ] T024 [US2] Return created todo with assigned ID (201 Created)
- [ ] T025 [US2] Add tests for creating new todos
- [ ] T026 [US2] Add validation error tests for invalid data

## Phase 5: User Story 3 - Update Existing Todo (P2)

**Goal**: As an authenticated user, I want to update my existing todos so that I can modify task details and mark them as completed.

**Independent Test**: A user can update one of their own todos while being prevented from updating todos that belong to other users.

- [ ] T027 [US3] Create PUT `/api/todos/{id}` endpoint in `app/routers/todos.py`
- [ ] T028 [US3] Implement authentication dependency for PUT `/api/todos/{id}`
- [ ] T029 [US3] Verify Todo exists and belongs to authenticated user
- [ ] T030 [US3] Update fields: title, description, completed
- [ ] T031 [US3] Update updated_at timestamp
- [ ] T032 [US3] Return updated todo (200 OK)
- [ ] T033 [US3] Add tests for updating user's own todos
- [ ] T034 [US3] Add tests to ensure users can't update other users' todos (403)

## Phase 6: User Story 4 - Delete Own Todo (P2)

**Goal**: As an authenticated user, I want to delete my own todos so that I can remove completed or irrelevant tasks.

**Independent Test**: A user can delete one of their own todos while being prevented from deleting todos that belong to other users.

- [ ] T035 [US4] Create DELETE `/api/todos/{id}` endpoint in `app/routers/todos.py`
- [ ] T036 [US4] Implement authentication dependency for DELETE `/api/todos/{id}`
- [ ] T037 [US4] Verify Todo exists and belongs to authenticated user
- [ ] T038 [US4] Delete Todo from database
- [ ] T039 [US4] Return success response (204 No Content)
- [ ] T040 [US4] Add tests for deleting user's own todos
- [ ] T041 [US4] Add tests to ensure users can't delete other users' todos (403)

## Phase 7: User Story 5 - Health Check for System Status (P3)

**Goal**: As a system administrator or monitoring service, I want to check the backend health status so that I can monitor system availability.

**Independent Test**: Anyone can access the health endpoint and receive a positive response indicating the backend is operational.

- [ ] T042 [US5] Create GET `/api/health` endpoint in `app/routers/health.py`
- [ ] T043 [US5] Return JSON status response without authentication
- [ ] T044 [US5] Include timestamp in health response
- [ ] T045 [US5] Add tests for health endpoint accessibility without auth

## Phase 8: Error Handling & Response Standardization

**Goal**: Ensure predictable and frontend-friendly error responses

- [ ] T046 Implement HTTPException handler for 401 Unauthorized
- [ ] T047 Implement HTTPException handler for 403 Forbidden
- [ ] T048 Implement HTTPException handler for 404 Not Found
- [ ] T049 Implement HTTPException handler for 422 Validation errors
- [ ] T050 Standardize JSON error format across all handlers
- [ ] T051 Add tests for each error condition

## Phase 9: Frontend Integration Validation

**Goal**: Ensure backend API is fully compatible with frontend

- [ ] T052 Verify endpoint paths and methods match frontend API client expectations
- [ ] T053 Validate JSON response shapes match frontend types
- [ ] T054 Ensure ISO-8601 timestamp formatting
- [ ] T055 Confirm JWT header format compatibility with frontend
- [ ] T056 Test integration between all components

## Phase 10: Security & Compliance Review

**Goal**: Harden backend against misuse

- [ ] T057 Verify JWT verification on all protected routes
- [ ] T058 Confirm no cross-user data access possible
- [ ] T059 Ensure secrets are not logged anywhere
- [ ] T060 Validate CORS restrictions for frontend origin only
- [ ] T061 Perform security audit of authentication flow

## Phase 11: Polish & Cross-Cutting Concerns

**Goal**: Final quality assurance and documentation

- [ ] T062 Update README.md with backend setup and usage instructions
- [ ] T063 Add API documentation to README
- [ ] T064 Review code structure and implement any necessary refactoring
- [ ] T065 Run full test suite and address any failures
- [ ] T066 Verify all requirements from spec are met
- [ ] T067 Perform final integration test with frontend API client

## Dependencies

**User Story Completion Order**:
- US5 (Health Check) - No dependencies
- US1 (View Todos) - Depends on foundational components
- US2 (Create Todo) - Depends on foundational components
- US3 (Update Todo) - Depends on US1 and US2
- US4 (Delete Todo) - Depends on US1 and US2

**Parallel Execution Opportunities**:
- T007-T010 (Core components) can be developed in parallel [P]
- T013-T016, T019-T023, T027-T031, T035-T038 (API endpoints) can be developed in parallel after foundational components [P]
- T046-T051 (Error handlers) can be implemented in parallel [P]
- T017-T018, T025-T026, T033-T034, T040-T041 (Tests) can be written in parallel [P]

## Implementation Strategy

**MVP First**: Implement US5 (Health Check) and US1 (View Todos) as minimal viable product
**Incremental Delivery**: Add US2 (Create), US3 (Update), US4 (Delete) in sequence
**Quality Gates**: Each phase must pass tests before moving to next phase
```

## Outcome

- ✅ Impact: Created comprehensive task breakdown for backend Todo API implementation with 67 specific tasks
- 🧪 Tests: Included test tasks for each user story and error condition
- 📁 Files: Generated tasks.md with organized phases and dependencies
- 🔁 Next prompts: Ready for implementation phase with clear task structure
- 🧠 Reflection: Tasks are organized by user stories enabling independent development and testing

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation of Phase 1 tasks