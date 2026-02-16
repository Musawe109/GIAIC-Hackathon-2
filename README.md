# GIAIC-Hackathon-2

This repository contains the project for the GIAIC Hackathon-2.

## Project Structure

-   `backend/`: Contains the backend services and logic.
-   `frontend/`: Contains the frontend application.
-   `specs/`: Contains specifications and documentation for the project.
-   `history/`: Contains development history and prompts.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   **Python 3.x** (for the backend)
*   **Node.js & npm** (for the frontend)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment (recommended):
    ```bash
    python -m venv venv
    ./venv/Scripts/activate # On Windows
    source venv/bin/activate # On macOS/Linux
    ```
3.  Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the backend server:
    ```bash
    python start_server.py
    ```

### Frontend Setup

11. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
12. Install the Node.js dependencies:
    ```bash
    npm install
    ```
13. Run the frontend application:
    ```bash
    npm run dev
    ```
    (You might need to check `frontend/package.json` for the exact script name, common ones are `dev`, `start`, or `serve`).
