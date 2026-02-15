---
id: 6
title: Todo Visibility Issue Fix
stage: general
date_iso: 2026-02-10
surface: agent
model: Qwen
feature: none
branch: main
user: ts.com
command: "Fixing todo visibility after creation"
labels:
  - "frontend"
  - "todos"
  - "visibility"
  - "refresh"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\frontend\\src\\app\\dashboard\\todos\\page.tsx"
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\frontend\\src\\app\\dashboard\\todos\\create\\page.tsx"
tests_yaml: []
prompt_text: |
  When I create a task on dashboard it's not showing in the UI, though the task is stored in the Neon database
response_text: |
  Fixed the todo visibility issue by implementing proper page refresh after creation:
  - Updated the dashboard page to listen for refresh parameters
  - Modified the create page to pass a refresh parameter when redirecting back
  - Implemented useEffect hook to refetch todos when refresh parameter changes
outcome: |
  Newly created todos now appear in the UI after creation
evaluation: |
  Todos created through the UI are now visible immediately after creation
---

## Summary

Fixed the issue where newly created todos were not appearing in the UI after creation, despite being stored in the database.

## Changes Made

1. Updated the dashboard page to listen for refresh parameters in the URL
2. Modified the create page to pass a refresh parameter when redirecting back to the dashboard
3. Implemented useEffect hook to refetch todos when the refresh parameter changes

## Result

Newly created todos now appear in the UI immediately after creation without requiring a manual page refresh.