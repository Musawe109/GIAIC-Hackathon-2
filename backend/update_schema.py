#!/usr/bin/env python3
"""
Script to update the database schema to match the models
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from app.db.session import engine
from app.models.user import User
from app.models.todo import Todo
from sqlmodel import SQLModel
from sqlalchemy import inspect, text

def check_database_schema():
    """Check the current database schema"""
    inspector = inspect(engine)
    
    # Get the columns in the users table
    columns = inspector.get_columns('users')
    print("Current 'users' table columns:")
    for col in columns:
        print(f"  - {col['name']} ({col['type']})")
    
    print("\nComparing with expected model fields...")
    
    # Get expected columns from the model
    expected_columns = []
    for field_name, field in User.__fields__.items():
        expected_columns.append(field_name)
    
    print(f"Expected columns from model: {expected_columns}")
    
    # Check if all expected columns exist
    existing_column_names = [col['name'] for col in columns]
    missing_columns = []
    
    for exp_col in expected_columns:
        if exp_col not in existing_column_names:
            missing_columns.append(exp_col)
    
    if missing_columns:
        print(f"\nMissing columns: {missing_columns}")
        return False
    else:
        print("\nAll expected columns are present.")
        return True

def update_database_schema():
    """Update the database schema to match the models"""
    try:
        print("Updating database schema...")
        
        # Create all tables according to the models
        # This will create new tables and update existing ones if possible
        SQLModel.metadata.create_all(bind=engine)
        
        print("Database schema updated successfully!")
        
        # Also try to sync the tables using alembic-style approach if needed
        with engine.connect() as conn:
            # Commit the transaction
            conn.commit()
        
        return True
    except Exception as e:
        print(f"Error updating database schema: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Checking current database schema...")
    schema_ok = check_database_schema()
    
    if not schema_ok:
        print("\nThe database schema doesn't match the model. Updating...")
        update_database_schema()
        print("\nRechecking schema after update...")
        check_database_schema()
    else:
        print("\nSchema is already up to date.")