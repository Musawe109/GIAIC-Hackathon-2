import asyncio
import aiohttp
from contextlib import redirect_stdout, redirect_stderr
import io
import sys
from threading import Thread
import time

# Start the server in a separate thread
def start_server():
    import uvicorn
    from app.main import app
    uvicorn.run(app, host='127.0.0.1', port=8000, log_level='debug')

# Capture stdout and stderr
stdout_capture = io.StringIO()
stderr_capture = io.StringIO()

# Start server in background
server_thread = Thread(target=start_server, daemon=True)
server_thread.start()

# Wait for server to start
time.sleep(3)

# Make a request to the problematic endpoint
async def test_signup():
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post('http://localhost:8000/api/auth/signup', 
                                  json={'name': 'Test User', 'email': 'test@example.com', 'password': 'password123'}) as resp:
                print(f"Status: {resp.status}")
                text = await resp.text()
                print(f"Response: {text}")
        except Exception as e:
            print(f"Request failed: {e}")

# Run the test
asyncio.run(test_signup())

# Give some time to see any server errors
time.sleep(5)

# Print captured output
print("\nCaptured stdout:")
print(stdout_capture.getvalue())
print("\nCaptured stderr:")
print(stderr_capture.getvalue())