from sqlmodel import create_engine
from app.core.config import settings

# Create SQLModel engine using NEON_DB_URL
engine = create_engine(
    settings.neon_db_url,
    echo=False,  # Set to True for SQL query logging
    pool_pre_ping=True,  # Verify connections before use
    pool_size=5,  # Number of connection pools
    max_overflow=10,  # Max overflow connections
    pool_recycle=3600,  # Recycle connections after 1 hour
)

def get_session():
    """Get database session dependency"""
    from sqlmodel import Session
    with Session(engine) as session:
        yield session