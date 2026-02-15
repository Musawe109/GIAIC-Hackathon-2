#!/usr/bin/env python3
"""
Simple script to check the database schema
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from app.db.session import engine
from sqlalchemy import text

def check_users_table():
    """Directly query the database to check the users table structure"""
    try:
        with engine.connect() as conn:
            # Query the information schema to get column details
            result = conn.execute(text("""
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users' 
                ORDER BY ordinal_position
            """))
            
            print("Users table columns:")
            for row in result:
                print(f"  - {row[0]} ({row[1]})")
                
    except Exception as e:
        print(f"Error checking table: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_users_table()