#!/usr/bin/env python3
"""
Debug script to run the server and capture errors during signup
"""

import sys
import os
import threading
import time
import requests
import traceback
from io import StringIO
from contextlib import redirect_stderr, redirect_stdout

# Add the backend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

def run_server():
    """Function to run the server in a thread"""
    import uvicorn
    from app.main import app
    
    # Enable detailed logging
    import logging
    logging.basicConfig(level=logging.DEBUG)
    
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000, log_level="debug")
    except Exception as e:
        print(f"Server error: {e}")
        traceback.print_exc()

def test_api_call():
    """Function to test the API call after server starts"""
    time.sleep(3)  # Wait for server to start
    
    try:
        print("Making signup request...")
        response = requests.post(
            "http://localhost:8000/api/auth/signup",
            json={
                "name": "Test User",
                "email": "test@example.com",
                "password": "password123"
            },
            timeout=10
        )
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")
    except Exception as e:
        print(f"Request failed: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    # Capture stderr and stdout
    stderr_buffer = StringIO()
    stdout_buffer = StringIO()
    
    with redirect_stderr(stderr_buffer), redirect_stdout(stdout_buffer):
        # Start server in a thread
        server_thread = threading.Thread(target=run_server, daemon=True)
        server_thread.start()
        
        # Start API test in another thread
        test_thread = threading.Thread(target=test_api_call, daemon=True)
        test_thread.start()
        
        # Wait for a bit to allow operations to complete
        time.sleep(10)
    
    # Print captured output
    print("=== CAPTURED STDOUT ===")
    stdout_content = stdout_buffer.getvalue()
    if stdout_content:
        print(stdout_content)
    else:
        print("(no stdout captured)")
    
    print("\n=== CAPTURED STDERR ===")
    stderr_content = stderr_buffer.getvalue()
    if stderr_content:
        print(stderr_content)
    else:
        print("(no stderr captured)")