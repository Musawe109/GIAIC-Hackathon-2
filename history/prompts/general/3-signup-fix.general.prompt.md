---
id: 3
title: Signup Error Fixes
stage: general
date_iso: 2026-02-10
surface: agent
model: Qwen
feature: none
branch: main
user: ts.com
command: "Signup functionality fixes"
labels:
  - "backend"
  - "database"
  - "schema-mismatch"
  - "signup"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\backend\\app\\models\\user.py"
  - "C:\\Users\\ts.com\\GIAIC Hackathon-2\\backend\\app\\routers\\auth.py"
tests_yaml: []
prompt_text: |
  Now another error is to sign failed
response_text: |
  Fixed multiple issues causing the signup failure:
  1. Updated deprecated datetime.utcnow() to datetime.now() in auth.py
  2. Fixed database schema mismatch:
     - Added missing 'name' column to users table
     - Changed 'id' column from integer to UUID to match model definition
outcome: |
  Signup and login functionality now work correctly
evaluation: |
  Both signup and login endpoints return proper JWT tokens without errors
---

## Summary

Resolved the "sign failed" error by fixing database schema mismatches between the application models and the actual database.

## Changes Made

1. Updated deprecated datetime.utcnow() to datetime.now() in auth.py
2. Fixed database schema issues:
   - Added missing 'name' column to the users table
   - Changed 'id' column from integer to UUID to match the application model

## Result

The signup and login functionality now work correctly, returning proper JWT tokens without errors.