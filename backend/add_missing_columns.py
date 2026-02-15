#!/usr/bin/env python3
"""
Script to manually update the database schema to add missing columns
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from app.db.session import engine
from app.models.user import User
from app.models.todo import Todo
from sqlmodel import SQLModel
from sqlalchemy import text, inspect

def add_missing_columns():
    """Add missing columns to the users table"""
    try:
        print("Connecting to database to add missing columns...")
        
        with engine.connect() as conn:
            # Check if 'name' column exists
            inspector = inspect(conn)
            columns = [col['name'] for col in inspector.get_columns('users')]
            
            print(f"Current columns: {columns}")
            
            # Add 'name' column if it doesn't exist
            if 'name' not in columns:
                print("Adding 'name' column to users table...")
                conn.execute(text("ALTER TABLE users ADD COLUMN name VARCHAR(255)"))
                print("Added 'name' column successfully!")
            else:
                print("'name' column already exists.")
                
            # Check if 'username' column should be renamed to 'name' (based on the current schema)
            if 'username' in columns and 'name' not in columns:
                print("Found 'username' column, renaming to 'name'...")
                conn.execute(text("ALTER TABLE users RENAME COLUMN username TO name"))
                print("Renamed 'username' to 'name' successfully!")
            
            # Check if id column is of correct type (should be UUID)
            # Note: Changing id column type might be risky if there's existing data
            # For now, let's just check the current type
            
            # Commit the changes
            conn.commit()
            
        print("Database schema updated successfully!")
        return True
    except Exception as e:
        print(f"Error updating database schema: {e}")
        import traceback
        traceback.print_exc()
        return False

def verify_update():
    """Verify that the schema update worked"""
    inspector = inspect(engine)
    columns = inspector.get_columns('users')
    print("\nUpdated 'users' table columns:")
    for col in columns:
        print(f"  - {col['name']} ({col['type']})")

if __name__ == "__main__":
    print("Adding missing columns to database...")
    success = add_missing_columns()
    
    if success:
        print("\nVerifying update...")
        verify_update()
    else:
        print("\nFailed to update schema.")