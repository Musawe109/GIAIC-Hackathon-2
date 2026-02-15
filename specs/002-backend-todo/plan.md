# Implementation Plan: Backend Todo API

**Branch**: `002-backend-todo` | **Date**: 2026-02-06 | **Spec**: [specs/002-backend-todo/spec.md]
**Input**: Feature specification from `/specs/[002-backend-todo]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a secure, modular backend API using FastAPI that supports authenticated Todo CRUD operations with Neon PostgreSQL persistence and Better Auth JWT verification. The system will follow a layered architecture with clear separation between API, authentication, and database layers.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI, SQLModel, Neon PostgreSQL, python-jose, python-dotenv
**Storage**: Neon Serverless PostgreSQL database
**Testing**: pytest with FastAPI test client
**Target Platform**: Linux server (backend API)
**Project Type**: Web backend
**Performance Goals**: Sub-2 second response times under normal load, support 100+ concurrent users
**Constraints**: Must integrate with Better Auth JWT system, ensure user data isolation, secure token handling
**Scale/Scope**: Support multi-tenant architecture with user data isolation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on the constitution template, we need to ensure:
- Test-first approach: TDD will be implemented for all backend components
- Integration testing: Focus on JWT verification, database connectivity, and API contract compliance
- Observability: Proper logging without exposing sensitive data
- Simplicity: Minimal viable implementation following YAGNI principles

## Project Structure

### Documentation (this feature)

```text
specs/002-backend-todo/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
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
│   └── dependencies/
├── requirements.txt
├── .env.example
└── tests/
    ├── conftest.py
    ├── test_auth.py
    ├── test_todos.py
    └── test_health.py
```

**Structure Decision**: Following the backend structure as specified in the feature requirements, with clear separation of concerns between different layers of the application.

## Phase 0: Research & Clarifications

### Research Findings

- **Decision**: Use python-jose for JWT verification with Better Auth compatibility
- **Rationale**: Better Auth uses standard JWT signing, python-jose is well-maintained and compatible
- **Alternatives considered**: PyJWT, authlib - python-jose chosen for its robust cryptographic implementations

- **Decision**: Use asyncpg for PostgreSQL connections with SQLModel
- **Rationale**: Better async performance with FastAPI and Neon Serverless PostgreSQL
- **Alternatives considered**: psycopg2 - asyncpg chosen for async/await compatibility

### Resolved Clarifications

- JWT token verification algorithm confirmed as HS256 (asymmetric) for Better Auth compatibility
- CORS configuration determined to allow only frontend origin as specified
- Database connection pooling configured with appropriate timeouts for Neon Serverless

## Phase 1: Design Artifacts

### Data Model

The Todo entity will follow SQLModel specifications with proper indexing on user_id for efficient data isolation.

### API Contracts

OpenAPI schemas will be generated for all endpoints ensuring frontend compatibility.

### Quickstart Guide

Documentation will include setup instructions, environment configuration, and basic API usage.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| JWT Dependency | Required for Better Auth integration | Direct user management would break frontend compatibility |
| SQLModel ORM | Required for Neon PostgreSQL integration | Raw SQL would be less maintainable and secure |