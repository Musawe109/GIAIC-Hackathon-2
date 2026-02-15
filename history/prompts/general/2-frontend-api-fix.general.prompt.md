---
id: 2
title: Frontend API Communication Fixes
stage: general
date_iso: 2026-02-10
surface: agent
model: Qwen
feature: none
branch: main
user: ts.com
command: "NEXT_PUBLIC_API_BASE_URL configuration"
labels:
  - "frontend"
  - "api"
  - "fetch-error"
  - "authentication"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\frontend\\.env.local"
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\frontend\\src\\lib\\api\\client.ts"
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\frontend\\src\\app\\signup\\page.tsx"
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\frontend\\src\\app\\(auth)\\login\\page.tsx"
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\frontend\\src\\lib\\auth\\index.ts"
tests_yaml: []
prompt_text: |
  The frontend is raising this error "failed to fetch" when I enter username and password and name
response_text: |
  Fixed API communication issues between frontend and backend:
  1. Updated NEXT_PUBLIC_API_BASE_URL in .env.local to point to http://localhost:8000 (instead of http://localhost:8000/api)
  2. Modified the API client to automatically add the /api prefix to match backend router configuration
  3. Ensured all API calls use consistent endpoint paths
outcome: |
  Frontend can now successfully communicate with backend API endpoints
evaluation: |
  Authentication flows (signup/login) work without "failed to fetch" errors
---

## Summary

Resolved the "failed to fetch" error in the frontend by fixing the API communication between frontend and backend.

## Changes Made

1. Updated NEXT_PUBLIC_API_BASE_URL in .env.local to point to the correct base URL
2. Modified the API client to automatically append the /api prefix to match backend router configuration
3. Ensured all authentication API calls use the correct endpoint paths

## Result

The frontend can now successfully communicate with the backend API, resolving the "failed to fetch" error during signup and login.