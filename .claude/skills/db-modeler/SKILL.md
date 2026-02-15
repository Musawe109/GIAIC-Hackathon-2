---
name: "db-modeler"
description: "Design relational database schemas and SQLModel entities aligned with application features and user isolation."
version: "1.0.0"
---

# Database Modeler Skill

## When to Use This Skill
- Designing database schemas
- Updating SQLModel models
- Enforcing ownership relationships

## How This Skill Works

1. **Identify entities**
   - Core tables
   - Ownership relationships

2. **Define fields**
   - Types
   - Required vs optional
   - Defaults

3. **Define constraints**
   - Primary keys
   - Foreign keys
   - Indexes

4. **Map to ORM**
   - SQLModel compatibility
   - Relationship clarity

5. **Validate access patterns**
   - Queries scoped by user_id

## Output Format
- Table definition
- Fields with types
- Constraints
- Indexes

## Quality Criteria
- Supports all feature queries
- Enforces ownership
- ORM-friendly