import sys
import traceback
from contextlib import redirect_stderr
from io import StringIO

# Capture stderr to see any errors
stderr_capture = StringIO()
with redirect_stderr(stderr_capture):
    try:
        import uvicorn
        from app.main import app
        
        print("Attempting to start server...")
        
        # Try to trigger any import errors now
        from app.routers.auth import signup
        from app.dependencies import get_session
        from app.db.session import get_session
        
        print("All modules imported successfully")
        
        # Start the server
        if __name__ == "__main__":
            uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
            
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        sys.exit(1)

# If we get here, print any captured stderr
stderr_output = stderr_capture.getvalue()
if stderr_output:
    print(f"Captured stderr: {stderr_output}")