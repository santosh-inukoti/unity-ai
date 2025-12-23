# Unity AI

Unity AI is Enverus' internal AI agentic solution built to drive revenue, increase retention, and make our teams more efficient.

## Overview

This web application allows internal users to log in using their Enverus SSO credentials and access specialized AI agents based on their department. The application features:

- **Enverus SSO Authentication**: Secure login using company credentials
- **Group-Based Access**: Users select their department to view relevant AI agents
- **Multiple Departments**: Support for Sales, Marketing, Customer Success, Product & Engineering, Finance, Operations, and Executive teams
- **AI Agent Integration**: Each agent has API endpoints that can be connected to for real-world usage

## Architecture

The application consists of two main components:

### Backend (Node.js/Express)
- RESTful API for authentication and agent management
- JWT-based authentication
- Group-based authorization
- Mock SSO integration (ready for production Enverus SSO)

### Frontend (React)
- Modern React application with routing
- Responsive design
- Protected routes with authentication
- Group selection and agent dashboard

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/santosh-inukoti/unity-ai.git
cd unity-ai
```

2. Install dependencies:
```bash
npm run install-all
```

3. **Set up environment variables (IMPORTANT):**

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env and replace placeholder values with actual secrets
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Edit .env if you need to change the API URL
```

**⚠️ NEVER commit `.env` files to git!**

### Running the Application

#### Development Mode

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:3001
- Frontend application on http://localhost:3000

#### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the backend:
```bash
npm start
```

### Manual Start

You can also run frontend and backend separately:

**Backend:**
```bash
cd backend
npm start       # Production
npm run dev     # Development with auto-reload
```

**Frontend:**
```bash
cd frontend
npm start       # Development server
npm run build   # Production build
```

## Usage

1. **Login**: Navigate to http://localhost:3000 and log in with any valid email address (mock authentication)
   - Example: `user@enverus.com` with any password

2. **Select Group**: Choose your department from the available groups:
   - Sales
   - Marketing
   - Customer Success
   - Product & Engineering
   - Finance
   - Operations
   - Executive

3. **Access Agents**: View and connect to AI agents available for your department

## Available AI Agents

### Sales
- Lead Qualifier
- Deal Analyzer
- Pipeline Manager

### Marketing
- Campaign Optimizer
- Content Generator
- Audience Insights

### Customer Success
- Churn Predictor
- Health Score Monitor
- Support Assistant

### Product & Engineering
- Code Reviewer
- Bug Analyzer
- Feature Prioritizer

### Finance
- Forecast Analyzer
- Expense Optimizer
- Risk Assessor

### Operations
- Process Optimizer
- Resource Allocator
- Workflow Analyzer

### Executive (All executives have access to all agents plus)
- Strategic Advisor
- Performance Dashboard

## API Documentation

### Authentication Endpoints

#### POST `/auth/login`
Login with credentials
```json
{
  "email": "user@enverus.com",
  "password": "password"
}
```

#### POST `/auth/logout`
Logout current user

#### GET `/auth/verify`
Verify authentication token

### Agent Endpoints

#### GET `/api/groups`
Get all available groups

#### GET `/api/agents/:group`
Get agents for a specific group

#### GET `/api/agents`
Get all agents

#### GET `/api/agent/:id`
Get specific agent details

## Configuration

### Backend Environment Variables
- `PORT`: Backend server port (default: 3001)
- `JWT_SECRET`: Secret key for JWT tokens
- `FRONTEND_URL`: Frontend application URL
- `SSO_*`: SSO configuration for production

### Frontend Environment Variables
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3001)

## Security

- JWT-based authentication
- Protected routes
- Token verification
- Ready for production SSO integration (SAML/OAuth2)

## Production Deployment

For production deployment with real Enverus SSO:

1. Configure SSO settings in backend `.env`:
   - Set `SSO_ENTRY_POINT` to your SSO provider URL
   - Set `SSO_ISSUER` and `SSO_CALLBACK_URL`
   - Add your SSO certificate

2. Update authentication flow to use SAML/OAuth2 instead of mock login

3. Build frontend for production:
   ```bash
   cd frontend
   npm run build
   ```

4. Deploy backend with environment variables configured

## Contributing

This is an internal Enverus project. For contributions, please follow the internal development guidelines.

## License

UNLICENSED - Internal Enverus Use Only

