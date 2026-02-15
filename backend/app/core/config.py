from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    neon_db_url: str
    better_auth_secret: str
    better_auth_url: Optional[str] = "http://localhost:3000"

    class Config:
        env_file = ".env"


settings = Settings()