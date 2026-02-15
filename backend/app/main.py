from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import routers
from app.routers import todos, health, auth
from app.core.exception_handlers import add_exception_handlers

# Create FastAPI app instance
app = FastAPI(
    title="Todo API",
    description="A secure, scalable backend API for todo management with JWT authentication",
    version="1.0.0"
)

# Add CORS middleware for frontend origin only
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("BETTER_AUTH_URL", "http://localhost:3000"),
        "http://localhost:3000",  # Local development
        "http://localhost:3001",  # Alternative local port
        "https://frontend-rh1t6eee6-musawer-khans-projects.vercel.app",  # Deployed frontend on Vercel
        "https://musawer-khan-phase2.hf.space",  # Deployed backend (for health checks, etc.)
        "http://localhost:8000",  # Local backend for testing
        "http://localhost:8001",  # Alternative local backend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(todos.router, prefix="/api/todos", tags=["todos"])

# Add exception handlers
add_exception_handlers(app)

@app.on_event("startup")
async def startup_event():
    """Initialize database connection and create tables"""
    from app.db.session import engine
    from app.models.todo import Todo  # Import models to register them
    from app.models.user import User  # Import User model to register it
    from sqlmodel import SQLModel

    # Create all tables
    SQLModel.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)