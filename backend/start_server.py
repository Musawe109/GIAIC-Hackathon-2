import uvicorn
from app.main import app

if __name__ == "__main__":
    print("Starting server on http://localhost:8001...")
    uvicorn.run(app, host="0.0.0.0", port=8001)