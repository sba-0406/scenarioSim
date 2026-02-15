# Action 01: Dojo Initiation
**Action:** User clicks "Enter Simulation" on the Roles Selection page.

## 1. Frontend Trigger
*   **File:** [dojo-roles.ejs](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/views/dojo-roles.ejs)
*   **Function:** `enterSimulation(role)`
    *   **Parameter `role`**: A string (e.g., `"Manager"`, `"Developer"`). It tells the backend which set of scenarios to generate.
    *   **Logic**: 
        1.  Calls `fetch('/dojo/start')` with a `POST` method.
        2.  Sends the `role` in the JSON body.
        3.  Wait for the response.
        4.  If successful, redirects the browser to the new simulation URL.

---

## 2. The Request (req) Body
As it leaves the browser:
```json
{
  "role": "Manager"
}
```

---

## 3. Backend Journey

### A. Routing
*   **File:** [dojoRoutes.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/routes/dojoRoutes.js)
*   **Logic**: Matches the `POST /start` path and routes it to `dojoController.startDojoSession`.
*   **Middleware**: Before hitting the controller, `authMiddleware.protect` runs and adds `req.user` to the request object.

### B. Business Logic (Controller)
*   **File:** [dojoController.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/controllers/dojoController.js)
*   **Function**: `startDojoSession(req, res)`
    *   **Parameters**: `req` (Request object), `res` (Response object).
    *   **Detailed Steps**:
        1.  Extracts `role` from `req.body`.
        2.  Calls `chatService.generateScenarioSet(role)` to get the 3 scenario templates for that role.
        3.  Calls `ChatSession.create({...})` to save the new session in MongoDB.
        4.  **Important**: It uses `req.user._id` (added by middleware) to link the session to the user.

### C. Logic Layer (Service)
*   **File:** [chatService.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/services/chatService.js)
*   **Function**: `generateScenarioSet(role)`
    *   **Logic**: Looks up hardcoded scenario templates in `SCENARIO_TEMPLATES`. It returns an array of 3 scenario objects with `status: 'pending'` or `'in-progress'`.

---

## 4. The Response (res) Object
Sent back to the browser:
```json
{
  "success": true,
  "data": {
    "_id": "65cad...", // The MongoDB ID of the new session
    "archetype": { "role": "Manager", "type": "MULTI_SCENARIO_DOJO", ... },
    "scenarioProgress": { "currentScenario": 1, ... },
    "status": "active"
  }
}
```

---

## 5. Final Frontend Action
*   **Logic**: Inside the `.then()` of the fetch, it sees `data.success === true`.
*   **Execution**: `window.location.href = "/dojo/simulation/65cad..."`.
*   **Result**: The browser leaves the roles page and loads the interactive simulation interface.
