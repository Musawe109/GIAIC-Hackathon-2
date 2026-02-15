---
id: 1
title: "Backend Todo API Specification"
stage: spec
date_iso: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: backend-todo
branch: 002-backend-todo
user: ts.com
command: /sp.specify
labels:
  - specification
  - backend
  - todo-api
  - fastapi
links:
  spec: specs/002-backend-todo/spec.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - specs/002-backend-todo/spec.md
  - specs/002-backend-todo/checklists/requirements.md
tests_yaml:
  - specification quality checklist
prompt_text: " /sp.specify\n\nProject: Phase II Todo Full-Stack Web Application – Backend\n\nPurpose:\nDesign and implement a secure, scalable, and spec-compliant backend that integrates seamlessly with the existing Next.js frontend. The backend must provide authenticated, user-isolated Todo CRUD functionality using FastAPI, JWT-based authentication (Better Auth), and Neon Serverless PostgreSQL.\n\nSystem Overview:\nThe backend acts as a REST API server responsible for:\n- User authentication verification via JWT\n- Secure Todo CRUD operations\n- User-level data isolation\n- Database persistence\n- Contract-level compatibility with frontend API client\n\nTech Stack:\n- Language: Python 3.11+\n- Framework: FastAPI\n- ORM: SQLModel\n- Database: Neon Serverless PostgreSQL\n- Auth: Better Auth (JWT-based)\n- Migrations: SQLModel metadata (no manual SQL)\n- Environment management: python-dotenv\n- Server: Uvicorn\n\nEnvironment Configuration:\nBackend must load the following variables from `.env`:\n\n- NEON_DB_URL\n  Description: PostgreSQL connection string for Neon serverless database\n  Usage: SQLModel engine creation\n\n- BETTER_AUTH_SECRET\n  Description: Shared JWT signing secret\n  Usage: JWT verification and decoding\n\n- BETTER_AUTH_URL\n  Description: Base URL of frontend application\n  Usage: Token validation context and auth alignment\n\nAuthentication & Authorization:\n- Backend does NOT manage user registration or login\n- Authentication is handled by Better Auth on the frontend\n- Backend must:\n  - Accept JWT from Authorization header: `Bearer <token>`\n  - Verify JWT using BETTER_AUTH_SECRET\n  - Extract authenticated user ID from token payload\n  - Reject requests with missing, invalid, or expired tokens\n- Authorization rules:\n  - Every request must be authenticated (except health check)\n  - Users may ONLY access their own Todos\n  - Cross-user access is strictly forbidden\n\nData Model:\nDefine a Todo model using SQLModel with the following fields:\n\n- id: UUID (primary key)\n- title: string (required)\n- description: string (optional)\n- completed: boolean (default false)\n- user_id: string (from JWT, indexed)\n- created_at: datetime (auto)\n- updated_at: datetime (auto)\n\nDatabase Rules:\n- Use SQLModel for all database interactions\n- No raw SQL queries\n- Neon PostgreSQL must be the only persistence layer\n- Ensure proper indexing on user_id\n- Automatic table creation on startup\n\nAPI Endpoints:\nAll endpoints must be RESTful and JSON-based.\n\nBase path: /api\n\n1. GET /api/health\n   - Public endpoint\n   - Returns backend status\n\n2. GET /api/todos\n   - Auth required\n   - Returns list of Todos for authenticated user only\n\n3. POST /api/todos\n   - Auth required\n   - Creates new Todo for authenticated user\n   - Body: title, description\n\n4. PUT /api/todos/{id}\n   - Auth required\n   - Updates Todo (title, description, completed)\n   - Only if Todo belongs to user\n\n5. DELETE /api/todos/{id}\n   - Auth required\n   - Deletes Todo owned by user only\n\nError Handling:\n- Use proper HTTP status codes\n- 401: Unauthorized (invalid/missing token)\n- 403: Forbidden (accessing another user's data)\n- 404: Resource not found\n- 422: Validation errors\n- Errors must return structured JSON responses\n\nSecurity Requirements:\n- JWT must be validated on every protected route\n- No sensitive data logged\n- No secrets hardcoded\n- CORS configured to allow frontend origin only\n- Rate-safe and stateless API design\n\nIntegration Requirements (Frontend Compatibility):\n- Endpoint paths, methods, and response shapes must match frontend API client\n- JSON field naming must be consistent\n- Timestamps must be ISO-8601\n- Backend must accept and return data exactly as frontend expects\n- JWT format must be identical to frontend token\n\nProject Structure:\nBackend must follow a clean, maintainable layout:\n\n/backend\n ├── app/\n │   ├── main.py\n │   ├── core/\n │   │   ├── config.py\n │   │   ├── security.py\n │   ├── models/\n │   │   └── todo.py\n │   ├── routers/\n │   │   └── todos.py\n │   ├── db/\n │   │   └── session.py\n │   └── depend"
response_text: "Successfully created a comprehensive specification for the backend todo API. The spec includes all user stories, functional requirements, success criteria, and quality validation. Created spec file at specs/002-backend-todo/spec.md with a quality checklist at specs/002-backend-todo/checklists/requirements.md. The specification covers all required functionality including JWT authentication, user isolation, CRUD operations, error handling, and security requirements."
outcome: "Complete backend specification created and validated, ready for implementation planning"
evaluation: "Specification is comprehensive and follows all requirements from the user's request. Successfully captured all technical requirements and business needs."
---

# Prompt History Record: Backend Todo API Specification

## Summary
Created comprehensive backend specification for a Todo API using FastAPI, JWT authentication, and PostgreSQL database.

## Context
**Surface**: Agent
**Date**: 2026-02-06
**Model**: claude-sonnet-4-5-20250929
**Feature**: backend-todo
**Branch**: 002-backend-todo

## Details
**Command**: /sp.specify
**Stage**: spec

### Labels
- specification
- backend
- todo-api
- fastapi

### Related Links
- **Spec**: specs/002-backend-todo/spec.md
- **Ticket**: null
- **ADR**: null
- **PR**: null

## Files Created/Modified
- specs/002-backend-todo/spec.md
- specs/002-backend-todo/checklists/requirements.md

## Tests/Validations
- specification quality checklist

## Original Prompt
```
 /sp.specify

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
 │   └── depend
```

## Response Summary
Successfully created a comprehensive specification for the backend todo API. The spec includes all user stories, functional requirements, success criteria, and quality validation. Created spec file at specs/002-backend-todo/spec.md with a quality checklist at specs/002-backend-todo/checklists/requirements.md. The specification covers all required functionality including JWT authentication, user isolation, CRUD operations, error handling, and security requirements.

## Outcome
Complete backend specification created and validated, ready for implementation planning

## Evaluation
Specification is comprehensive and follows all requirements from the user's request. Successfully captured all technical requirements and business needs.