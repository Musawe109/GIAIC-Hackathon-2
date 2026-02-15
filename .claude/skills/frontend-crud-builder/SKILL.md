---
name: "frontend-crud-builder"
description: "Build CRUD-based frontend interfaces aligned with API specs and authentication requirements."
version: "1.0.0"
---

# Frontend CRUD Builder Skill

## When to Use This Skill
- Implementing task lists, forms, dashboards
- Building authenticated UI flows

## How This Skill Works

1. **Read UI + API specs**
2. **Identify screens**
   - List
   - Create
   - Edit
   - Detail

3. **Attach API calls**
   - Central API client
   - JWT included

4. **Handle states**
   - Loading
   - Empty
   - Error

5. **Validate UX flow**
   - User never sees others' data

## Output Format
- Component list
- Data flow
- API usage notes

## Quality Criteria
- Matches specs
- No direct fetch calls
- Secure by default