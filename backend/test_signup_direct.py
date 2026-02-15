#!/usr/bin/env python3
"""
Direct test of the signup functionality to identify the error
"""

import sys
import os
import asyncio
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from app.routers.auth import signup
from app.models.user import UserCreate
from app.db.session import engine
from sqlmodel import Session

async def test_signup_directly():
    """Test the signup function directly"""
    try:
        print("Creating signup request...")
        signup_request = UserCreate(
            name="Test User",
            email="test@example.com",
            password="password123"
        )
        
        print("Getting database session...")
        with Session(engine) as session:
            print("Calling signup function...")
            result = await signup(signup_request=signup_request, session=session)
            print(f"Signup result: {result}")
            
    except Exception as e:
        print(f"Error during signup: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_signup_directly())