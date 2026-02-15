# Action 02: Simulation Load
**Action:** The browser opens `/dojo/simulation/:id` and the page starts "booting up".

## 1. Frontend "Boot" Cycle
*   **File:** [dojo-simulation.ejs](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/views/dojo-simulation.ejs)
*   **Trigger:** `document.addEventListener('DOMContentLoaded', init)`
*   **Function Flow:**
    1.  `init()`: The main entry point.
    2.  `loadSession()`: The first big data fetch.
    3.  `updateUI()`: Sets up the header.
    4.  `startTimer()`: Starts the 5-minute clock.

---

## 2. Requesting the Session Data
*   **Request Type:** `GET /dojo/session/:sessionId`
*   **Parameter `:sessionId`**: The ID from the URL.
*   **Backend Logic:**
    *   **File:** [dojoController.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/controllers/dojoController.js)
    *   **Function**: `getDojoSession(req, res)`
    *   **Logic**: `ChatSession.findById(req.params.id)`. Simply fetches everything MongoDB knows about this play-through.

---

## 3. The Response (res) Structure
As it arrives in the browser:
```json
{
  "success": true,
  "data": {
    "messages": [], // Might be empty or have history
    "persona": { "name": "Sarah", "mood": "Tense", ... },
    "scenarioProgress": { "currentScenario": 1, ... },
    "metrics": { "competency1": 0, ... }
  }
}
```

---

## 4. UI Population Logic

### A. Updating visuals (`updateUI` & `updateMoodDisplay`)
*   **Parameters**: Uses `currentSession`.
*   **Logic**: 
    1.  Checks `scenarioProgress.currentScenario`.
    2.  Pulls the character name and current mood level (e.g., 50).
    3.  Moves the progress bar and sets the Emoji.

### B. Loading Message History (`renderMessage`)
*   **Logic**: If `data.data.messages` already has items (e.g., if you refreshed the page), it loops through them and draws them on screen.

### C. First MCQ Generation (`generateInitialMCQs`)
*   **Trigger**: If `messages.length` is 0.
*   **Logic**: It sends an empty response to the backend just to trigger the AI to give us the first 3 conversation options (MCQs).

---

## 5. Visual Flow Summary
1.  **Blank Page** loads.
2.  **API Call** fetches the character and goal.
3.  **UI Updates** with the character name and the first question.
4.  **Timer Starts** at `05:00`.
