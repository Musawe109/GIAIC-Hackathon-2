#!/usr/bin/env python3
"""
Script to update the database schema with proper transaction handling
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from app.db.session import engine
from sqlalchemy import text, inspect

def update_schema_with_transaction():
    """Update schema using a proper transaction"""
    try:
        print("Connecting to database to update schema...")
        
        # Use the session approach to ensure proper transaction handling
        from sqlmodel import Session
        
        with Session(engine) as session:
            # Check current columns
            result = session.exec(text("""
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users' 
                ORDER BY ordinal_position
            """))
            
            print("Current columns:")
            columns = []
            for row in result:
                col_name = row[0]
                columns.append(col_name)
                print(f"  - {col_name}")
            
            # Add 'name' column if it doesn't exist
            if 'name' not in columns:
                print("Adding 'name' column...")
                session.exec(text("ALTER TABLE users ADD COLUMN name VARCHAR(255)"))
                print("Added 'name' column successfully!")
            else:
                print("'name' column already exists.")
                
            # If 'username' exists and 'name' doesn't, we might need to handle that
            if 'username' in columns and 'name' in columns:
                # Both exist, we should update existing records if needed
                print("Both 'username' and 'name' columns exist.")
                
            # Commit the transaction
            session.commit()
            
        print("Schema update completed successfully!")
        return True
    except Exception as e:
        print(f"Error updating schema: {e}")
        import traceback
        traceback.print_exc()
        return False

def verify_update():
    """Verify the update"""
    from sqlmodel import Session
    
    with Session(engine) as session:
        result = session.exec(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users' 
            ORDER BY ordinal_position
        """))
        
        print("\nUpdated columns:")
        for row in result:
            print(f"  - {row[0]} ({row[1]})")

if __name__ == "__main__":
    print("Updating schema with proper transaction handling...")
    success = update_schema_with_transaction()
    
    if success:
        print("\nVerifying update...")
        verify_update()
    else:
        print("\nSchema update failed.")