---
name: "api-designer"
description: "Design RESTful APIs from specifications with consistent contracts, authentication requirements, and error handling."
version: "1.0.0"
---

# API Designer Skill

## When to Use This Skill
- Designing backend endpoints
- Translating feature specs into REST APIs
- Reviewing API consistency

## How This Skill Works

1. **Extract required operations**
   - CRUD actions
   - Ownership boundaries

2. **Define endpoint structure**
   - HTTP method
   - URL pattern
   - Path and query parameters

3. **Specify auth requirements**
   - JWT required
   - Authorization behavior

4. **Define request/response shapes**
   - Required vs optional fields
   - Status codes

5. **Validate consistency**
   - Naming conventions
   - REST semantics

## Output Format
- Method
- Endpoint
- Description
- Auth requirement
- Request schema
- Response schema

## Quality Criteria
- Endpoint matches REST conventions
- No undocumented behavior
- Errors are explicit