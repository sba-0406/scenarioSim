The goal is to enable the chat feature to run independently. This involves bypassing authentication, hiding the navbar/navigation logic, and fixing the broken server initialization.

## User Review Required

> [!IMPORTANT]
> To run standalone, we will:
> 1. **Bypass Middleware**: The `authMiddleware.js` already uses a hardcoded demo user, but we will ensure the routes don't block access.
> 2. **Hide Navbar**: We will comment out the navbar in the EJS views and ignore the navigation logic in `main.js`.
> 3. **Fix Server Logic**: The current `utils/app.js` is invalid; we will provide a working `app.js` that correctly boots the system.

> [!TIP]
> **Database Isolation**: To avoid mixing data with your main project, you can change the name in your `MONGO_URI`. 
> Currently it is `scenario_platform`. Changing it to something like `dojo_test` will isolate this module's data.

## Identified Missing Files

### Backend Services & Logic
- [x] [aiService.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/services/aiService.js)
  *Added by user.*
- [x] [roleCompetencies.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/config/roleCompetencies.js)
  *Added by user.*
- #### [MODIFY] [utils/app.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/utils/app.js)
  *Fix circular dependency and properly initialize Express.*
- #### [MODIFY] [authMiddleware.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/middleware/authMiddleware.js)
  *Ensure it doesn't block any requests since we are in "standalone" mode.*

### Frontend Adjustments
- #### [MODIFY] [dojo-simulation.ejs](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/views/dojo-simulation.ejs)
  *Comment out the navbar element.*
- #### [MODIFY] [dojo-roles.ejs](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/views/dojo-roles.ejs)
  *Comment out the navbar element.*
- #### [MODIFY] [main.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/public/js/main.js)
  *Disable dynamic navbar and redirection logic.*

### Utilities & Config
- #### [NEW] [seedData.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/utils/seedData.js)
  *Referenced in `package.json`, useful for populating initial testing data.*

## Structural Corrections Needed
- **Package Config**: Update `package.json` main entry point from `backend/src/server.js` (which doesn't exist) to the correct server entry point.
- **Circular Dependencies**: Fix `backend/utils/app.js` which currently tries to require itself.
- **Environment Variables**: Ensure `.env` contains the necessary API keys (e.g., `GOOGLE_GENERATIVE_AI_API_KEY`) and `JWT_SECRET`.

## Verification Plan

### Manual Verification
1. Start the server using `npm run dev`.
2. Navigate to `/dojo/roles` (if accessible) or directly hit the simulation route.
3. Verify that AI responses are generated (requires `aiService.js`).
4. Check that the mood bar and competency scoring function (requires `roleCompetencies.js`).
5. Verify that the UI styles load correctly (requires `style.css`).
