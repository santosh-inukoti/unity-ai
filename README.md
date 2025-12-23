# Unity AI

**Enverus' Internal AI Agentic Solution** - Driving revenue, increasing retention, and making teams more efficient.

## Overview

Unity AI is a secure, team-aware AI agent platform for internal Enverus use. Features include:

- **SSO Authentication**: Enverus SSO integration for secure access
- **Team-Based Access Control**: Role-based agent access by team
- **Admin Dashboard**: Manage users and view cross-team agents
- **Specialized AI Agents**: Purpose-built agents for business functions
- **Modern UI**: Dark theme with responsive design

## Phase 1 Agents

| Agent | Purpose | Access |
|-------|---------|--------|
| **Net Promoter Score** | Customer satisfaction tracking & analysis | Sales, Marketing, CS, P&E, Exec |
| **Product Release Notes** | Product updates & communications | Sales, Marketing, CS, P&E, Exec |
| **Clari Calls** | Sales call analysis & transcription | Sales, CS, P&E, Exec |
| **Third Party Stories** | Customer success story collection | Sales, Marketing, CS, P&E, Exec |

## Architecture

### Backend
- **Framework**: Node.js/Express
- **Auth**: JWT tokens + SSO integration
- **API**: RESTful endpoints with team-based access control
- **Features**: Rate limiting, input validation, error logging

### Frontend
- **Framework**: React 19 with Context API
- **Routing**: React Router v7 with protected routes
- **Styling**: CSS with dark theme
- **Features**: Responsive design, team filtering, admin dashboard

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

**Backend** - Create `.env` file:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with:
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=unity-ai-secret-key-change-in-production
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=unity-ai-session-secret-change-in-production
```

**Frontend** - Create `.env` file:
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env` with:
```env
REACT_APP_API_URL=http://localhost:3001
```

**⚠️ NEVER commit `.env` files to git!**

### Running the Application

#### Quick Start

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:3001
- Frontend application on http://localhost:3000

#### Using the Start Script

Windows users can use the batch file:
```bash
start.bat
```

#### Manual Start

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

### Troubleshooting

**Port already in use:**
```bash
# Kill processes on ports 3000 and 3001
kill-ports.bat
```

Or manually:
```bash
# Find process on port
netstat -ano | findstr :3001
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

## Usage

### Login

1. Navigate to http://localhost:3000
2. Enter your Enverus email address
3. Click "Sign in with SSO"

**Mock Users for Testing:**
- `santosh.inukoti@enverus.com` - Admin (can see all teams)
- `john.doe@enverus.com` - Sales team
- `jane.smith@enverus.com` - Customer Success team
- Any `@enverus.com` email - Defaults to Sales team

### Dashboard

After login, you'll see:
- **At a Glance**: Metrics showing total agents, active chats, sessions
- **Quick Start**: Actions to browse agents or create workspaces
- **Single-Topic Agents**: Available agents for your team

### Agents Page

Browse all agents available to your team:
- Filter by Single or Multi-Agent
- Search agents by name or description
- View team access permissions
- Start conversations with agents

### Settings

Configure your preferences:
- View your profile and team assignment
- **Admin Only**: Switch between teams to view different agents
- Adjust display settings
- Manage notifications

## Team Access Control

### How It Works

- Users are assigned a team during authentication
- Each agent has specific team access permissions
- Users only see agents available to their team
- Admin users can view agents from all teams

### Teams

- Sales
- Marketing
- Customer Success
- Product & Engineering
- HR
- Finance
- Operations
- Executive

### Adding Team Assignments

Update the `mockUsers` object in `backend/src/routes/auth.js`:

```javascript
const mockUsers = {
  'user@enverus.com': {
    team: 'Sales',
    isAdmin: false,
    name: 'User Name'
  }
};
```

## Adding New Agents

To add a new agent, update `backend/src/config/agents.js`:

```javascript
{
  id: 'unique-agent-id',
  name: 'Agent Name',
  description: 'What the agent does',
  groups: ['Sales', 'Marketing'], // Teams with access
  apiEndpoint: 'https://api.unity-ai.enverus.com/agents/endpoint',
  category: 'Category Name',
  isMultiAgent: false // true for multi-agent systems
}
```

The agent will automatically appear for users in the specified teams.

## API Documentation

### Authentication Endpoints

#### POST `/auth/login`
Login with email (mock SSO)
```json
{
  "email": "user@enverus.com",
  "password": "mock-password"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt-token",
  "user": { "id": "123", "email": "user@enverus.com", "name": "User" },
  "team": "Sales",
  "isAdmin": false
}
```

#### POST `/auth/logout`
Logout current user

#### GET `/auth/verify`
Verify authentication token

### Agent Endpoints

#### GET `/api/groups`
Get all available teams

#### GET `/api/agents/:group`
Get agents for a specific team

#### GET `/api/agents`
Get all agents

#### GET `/api/agent/:id`
Get specific agent details

## Security

### Current Implementation
- JWT-based authentication with 24-hour expiration
- Team-based authorization
- Protected API routes
- Admin role for elevated permissions
- Mock SSO (ready for production integration)

### Production Requirements
- Replace mock SSO with real Enverus SSO (SAML/OAuth2)
- Generate strong JWT secrets (256-bit minimum)
- Enable HTTPS only
- Configure production CORS
- Add rate limiting
- Implement proper session management

See `PRODUCTION-SETUP.md` for complete production checklist.

## Project Structure

```
unity-ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── agents.js          # Agent definitions
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT verification
│   │   ├── routes/
│   │   │   ├── auth.js             # Authentication routes
│   │   │   └── agents.js           # Agent routes
│   │   └── index.js                # Express server
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.js          # Navigation sidebar
│   │   │   ├── TopHeader.js        # Header with search & user menu
│   │   │   └── ProtectedRoute.js   # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js      # Authentication state
│   │   ├── pages/
│   │   │   ├── Login.js            # Login page
│   │   │   ├── Dashboard.js        # Home dashboard
│   │   │   ├── Agents.js           # Agents listing
│   │   │   ├── Settings.js         # User settings
│   │   │   ├── Workspaces.js       # Workspaces (Phase 2)
│   │   │   └── Reports.js          # Reports (Phase 2)
│   │   ├── services/
│   │   │   └── api.js              # API client
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json
├── start.bat                       # Windows startup script
├── kill-ports.bat                  # Port cleanup script
└── README.md
```

## Development Roadmap

### Phase 1 (Current) ✅
- ✅ SSO-based authentication
- ✅ Team-based access control
- ✅ Admin permissions
- ✅ 4 single-topic agents
- ✅ Dashboard and agents pages
- ✅ Settings page
- ✅ Dark theme UI

### Phase 2 (Planned)
- [ ] Real Enverus SSO integration
- [ ] Workspaces for active conversations
- [ ] Reports and analytics
- [ ] Multi-agent systems
- [ ] Agent conversation interface
- [ ] Real-time notifications

### Phase 3 (Future)
- [ ] Database integration
- [ ] Chat history persistence
- [ ] Agent performance metrics
- [ ] Team collaboration features
- [ ] Mobile application

## Contributing

This is an internal Enverus project. For contributions:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Get approval from project maintainers

## Support

For issues or questions:
- Technical issues: Contact IT Support
- Feature requests: Contact Product Team
- Security concerns: Contact security@enverus.com

## License

UNLICENSED - Internal Enverus Use Only

---

**Version:** 1.0.0 (Phase 1)  
**Last Updated:** January 2025  
**Maintained by:** Enverus Product Team

