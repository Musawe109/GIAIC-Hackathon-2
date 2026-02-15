# Configuration for pytest
import sys
import os

# Add the backend directory to the path so tests can import from app
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))