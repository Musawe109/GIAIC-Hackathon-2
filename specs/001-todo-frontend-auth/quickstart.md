# Quickstart Guide: Todo Frontend Application

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Access to the backend API (configured via environment variables)

## Setup Instructions

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
```bash
cd frontend
npm install
# or
yarn install
```

### 3. Environment Configuration
Copy the environment template and configure:
```bash
cp .env.example .env.local
```

Configure the following environment variables:
- `NEXT_PUBLIC_API_BASE_URL`: Base URL of the backend API (e.g., http://localhost:8000/api/v1)
- `NEXTAUTH_SECRET`: Secret for JWT signing (generate with `openssl rand -base64 32`)

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Application will be available at `http://localhost:3000`

## Key Commands

### Development
```bash
npm run dev        # Start development server with hot reload
```

### Production
```bash
npm run build      # Build for production
npm run start      # Start production server
```

## Project Structure Overview

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and API client
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
└── ...
```

## Key Features

### Authentication Flow
1. Visit `/login` to authenticate
2. Upon successful authentication, redirected to `/dashboard/todos`
3. JWT stored securely and attached to API requests
4. Protected routes automatically redirect unauthenticated users

### Todo Operations
- **View Todos**: Dashboard shows all user's todos
- **Create Todo**: Form on dashboard to add new items
- **Edit Todo**: Click on any todo to edit details
- **Toggle Completion**: Checkbox to mark complete/incomplete
- **Delete Todo**: Confirmation modal before deletion

## API Integration
The application uses a centralized API client that:
- Attaches JWT to all authenticated requests
- Handles common error responses
- Manages loading states
- Implements retry logic for failed requests

## Common Issues

### Environment Variables Missing
Ensure all required environment variables are set in `.env.local`

### Authentication Issues
- Verify backend API is running and accessible
- Check JWT configuration matches backend expectations

### API Connection Errors
- Confirm API base URL is correct in environment variables
- Ensure backend is running and accessible from frontend