# Action 04: Scenario Advancement
**Action:** The user clicks "Continue" or "Next Stakeholder" after resolving a challenge.

## 1. Frontend Trigger
*   **File:** [dojo-simulation.ejs](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/views/dojo-simulation.ejs)
*   **Function**: `advanceScenario(reason)`
    *   **Logic**: 
        1.  Sends a `POST` request to `/dojo/next`.
        2.  **Parameters**: `reason` (usually `'success'` or `'timeout'`).
        3.  Wait for the backend to prepare the next character.

---

## 2. Request (req) Body
```json
{
  "sessionId": "65cad...",
  "reason": "success"
}
```

---

## 3. Backend Transition Logic
*   **File:** [dojoController.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/controllers/dojoController.js)
*   **Function**: `nextScenario(req, res)`
*   **Logic Steps**:
    1.  **Closing the Old**: Finds the current scenario and marks it as `resolved` (or `failed`). Sets the `completedAt` timestamp.
    2.  **Check Progress**: Compares `currentScenario` (e.g., 1) to `totalScenarios` (3).
    3.  **Moving Forward**:
        *   Increments `currentScenario` to 2.
        *   **Reset**: Clears the `messages` array for the new conversation.
        *   **Switch Persona**: Updates the `session.persona` object with the data from the 2nd stakeholder in the template.
    4.  **Save**: Commits changes to MongoDB.

---

## 4. The Response (res) Object
Sent back to the browser:
```json
{
  "success": true,
  "data": {
    "currentScenario": 2,
    "isComplete": false // Tells the frontend there is more to do
  }
}
```

---

## 5. Frontend Refresh Logic
*   **Function**: `advanceScenario` callback.
*   **Logic**: 
    1.  If `data.data.isComplete` is `false`.
    2.  It triggers **`window.location.reload()`**.
*   **Why reload?**: This is the most reliable way to reset the countdown timer, clear the chat feed UI, and re-trigger the "Action 02: Simulation Load" flow for the new character (Stakeholder #2).
