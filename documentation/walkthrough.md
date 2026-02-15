# Standalone Chat Feature Walkthrough

The chat feature is now configured for standalone execution. You can run it independently of the rest of the original project.

## Changes Made
1.  **Server Fixes**: Relocated `app.js` and `server.js` to the `backend` root. Resolved circular dependencies and corrected internal paths for models, routes, and public assets.
2.  **Auth Bypass**: Commented out authentication middleware in `dojoRoutes.js` and configured `app.js` to run in a standalone, session-less mode.
3.  **UI Cleanup & Redirection**: Commented out the navbar and updated "Return to Dashboard" buttons to redirect to `/dojo/roles` in `dojo-simulation.ejs` and `dojo-roles.ejs`.
4.  **Dependency Management**: Commented out non-existent route and model references in `app.js` to ensure a crash-free boot.

## How to Run

### 1. Install Dependencies
Ensure you are in the `backend` directory and run:
```bash
npm install
```

### 2. Configure Environment
Make sure your `.env` file in the root directory contains your API keys:
```env
GROQ_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
MONGO_URI=your_mongodb_uri
```

### 3. Start the Server
Run the following command from the project root:
```bash
npm run dev
```

### 4. Access the Feature
Once the server is running, open your browser and navigate directly to:
`http://localhost:4000/dojo/roles`

From there, you can select a role and start the simulation.
