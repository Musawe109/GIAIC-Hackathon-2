---
description: "Task list for Todo Frontend Authentication implementation"
---

# Tasks: Todo Frontend Authentication

**Input**: Design documents from `/specs/001-todo-frontend-auth/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend app**: `frontend/src/`, `frontend/public/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 14+ App Router project with TypeScript in frontend/
- [X] T002 [P] Configure environment variables (.env.local) for API base URL in frontend/
- [X] T003 [P] Set up global styles, fonts, and Tailwind CSS configuration in frontend/src/app/globals.css
- [X] T004 [P] Create base layout component with header, footer, and main content area in frontend/src/app/layout.tsx
- [X] T005 [P] Implement global metadata (title, description, favicon) in frontend/src/app/layout.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 [P] Define professional color palette and typography scale in frontend/src/lib/styles/
- [X] T007 [P] Create centralized API client (api.ts) for all REST calls in frontend/src/lib/api/client.ts
- [X] T008 Configure JWT inclusion in Authorization header for all requests in frontend/src/lib/api/client.ts
- [X] T009 [P] Standardize API error handling and loading states in frontend/src/lib/api/client.ts
- [X] T010 [P] Support retry mechanism for failed API requests in frontend/src/lib/api/client.ts
- [X] T011 [P] Create reusable Button component (variants: primary, secondary, disabled) in frontend/src/components/ui/button.tsx
- [X] T012 [P] Create reusable Input component (text, textarea, password) with labels and error states in frontend/src/components/ui/input.tsx
- [X] T013 [P] Create Card component for todo items in frontend/src/components/ui/card.tsx
- [X] T014 [P] Create Modal component for confirmation dialogs in frontend/src/components/ui/modal.tsx
- [X] T015 [P] Create Badge / Status component for task completion in frontend/src/components/ui/badge.tsx
- [X] T016 Implement spacing, shadows, border radius, and subtle transition standards in frontend/src/lib/styles/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Authenticate and View Todos (Priority: P1) 🎯 MVP

**Goal**: Enable authenticated users to log in securely and view their personal todo list

**Independent Test**: After completing this story, a user can visit the login page, authenticate with valid credentials, and see their personal todo list with no one else's todos.

### Implementation for User Story 1

- [X] T017 [P] [US1] Integrate Better Auth for frontend login and signup in frontend/src/lib/auth/
- [X] T018 [US1] Build Login page with email/password fields and submit button in frontend/src/app/(auth)/login/page.tsx
- [X] T019 [US1] Build Logout functionality in frontend/src/components/auth/logout-button.tsx
- [X] T020 [US1] Securely store JWT in browser (localStorage) in frontend/src/lib/auth/
- [X] T021 [US1] Protect authenticated routes with redirect for unauthenticated users in frontend/src/app/dashboard/todos/page.tsx
- [X] T022 [US1] Build Todo list page displaying all tasks in frontend/src/app/dashboard/todos/page.tsx
- [X] T023 [US1] Implement API call to fetch todos for authenticated user in frontend/src/app/dashboard/todos/page.tsx
- [X] T024 [US1] Ensure user isolation - users see only their own todos in frontend/src/app/dashboard/todos/page.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Manage Todos (Priority: P2)

**Goal**: Enable authenticated users to create, edit, and delete their todos to keep their task list up-to-date

**Independent Test**: After completing this story, a user can create new todos, edit existing ones, and delete todos while maintaining all functionality from User Story 1.

### Implementation for User Story 2

- [X] T025 [P] [US2] Implement "Create Todo" form with title, description fields in frontend/src/components/todos/create-todo-form.tsx
- [X] T026 [US2] Implement "Edit Todo" inline or via modal in frontend/src/components/todos/edit-todo-form.tsx
- [X] T027 [US2] Implement "Delete Todo" with confirmation modal in frontend/src/components/todos/delete-todo-modal.tsx
- [X] T028 [US2] Implement API call to create todo in frontend/src/lib/api/todos.ts
- [X] T029 [US2] Implement API call to update todo in frontend/src/lib/api/todos.ts
- [X] T030 [US2] Implement API call to delete todo in frontend/src/lib/api/todos.ts
- [X] T031 [US2] Sync all todo actions with backend API responses in frontend/src/app/dashboard/todos/page.tsx
- [X] T032 [US2] Update todo list after create, edit, delete operations in frontend/src/app/dashboard/todos/page.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Toggle Todo Completion (Priority: P3)

**Goal**: Allow authenticated users to mark their todos as completed or incomplete to track their progress

**Independent Test**: After completing this story, a user can toggle completion status of their todos while maintaining all functionality from previous stories.

### Implementation for User Story 3

- [X] T033 [P] [US3] Implement "Complete/Incomplete" toggle for tasks in frontend/src/components/todos/todo-item.tsx
- [X] T034 [US3] Implement API call to update todo completion status in frontend/src/lib/api/todos.ts
- [X] T035 [US3] Update UI to visually reflect completion status in frontend/src/components/todos/todo-item.tsx
- [X] T036 [US3] Update todo list after completion status changes in frontend/src/app/dashboard/todos/page.tsx

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Logout (Priority: P2)

**Goal**: Enable authenticated users to securely log out to protect their personal todo data on shared devices

**Independent Test**: After completing this story, a user can securely log out from their session, clearing authentication tokens and redirecting to the login page.

### Implementation for User Story 4

- [X] T037 [P] [US4] Implement logout button UI in frontend/src/components/auth/logout-button.tsx
- [X] T038 [US4] Implement secure token clearing on logout in frontend/src/lib/auth/
- [X] T039 [US4] Redirect to login page after logout in frontend/src/lib/auth/
- [X] T040 [US4] Ensure protected routes redirect to login after logout in frontend/src/app/dashboard/todos/page.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T041 [P] Implement loading indicators for all async actions in frontend/src/components/ui/loading-spinner.tsx
- [X] T042 [P] Display empty states when no todos exist in frontend/src/components/todos/empty-state.tsx
- [X] T043 Show error feedback for API failures in frontend/src/components/ui/error-message.tsx
- [X] T044 Add subtle animations and micro-interactions (hover, click, transitions) in frontend/src/components/ui/
- [X] T045 Ensure responsive layout for desktop and tablet in frontend/src/app/globals.css
- [X] T046 [P] Review component consistency (buttons, inputs, cards, modals) across all components
- [X] T047 Validate spec compliance for all features against spec.md
- [X] T048 Verify route protection and JWT behavior across all protected routes
- [X] T049 Confirm API contract adherence (endpoint URLs, request/response) in contracts/todo-api-contract.yaml
- [X] T050 Accessibility review (color contrast, readable fonts, ARIA labels) across all components
- [X] T051 Clean up code structure and file organization in frontend/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 2

```bash
# Launch all components for User Story 2 together:
Task: "Implement 'Create Todo' form with title, description fields in frontend/src/components/todos/create-todo-form.tsx"
Task: "Implement 'Edit Todo' inline or via modal in frontend/src/components/todos/edit-todo-form.tsx"
Task: "Implement 'Delete Todo' with confirmation modal in frontend/src/components/todos/delete-todo-modal.tsx"
Task: "Implement API call to create todo in frontend/src/lib/api/todos.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence