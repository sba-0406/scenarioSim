# Action 03: User Interaction (MCQ or Text)
**Action:** The user selects an MCQ choice OR types a custom response in the chat box.

## 1. Frontend Entry
*   **File:** [dojo-simulation.ejs](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/views/dojo-simulation.ejs)
*   **Function**: `handleResponse(text, mcqChoice)`
    *   **Logic**: 
        1.  Calls `renderMessage` to show the user's text immediately.
        2.  Clears the input box and hides the old MCQ buttons.
        3.  Shows "The stakeholder is thinking..." (Typing indicator).
        4.  Calls `fetch('/dojo/respond')`.

---

## 2. Request (req) Body
The body varies based on the interaction type.

**If MCQ clicked:**
```json
{
  "sessionId": "65cad...",
  "message": null,
  "mcqChoice": {
    "text": "I understand your perspective...",
    "approach": "Relationship",
    "moodDelta": 10,
    "scores": { "competency1": 85, ... }
  }
}
```

**If Custom Text typed:**
```json
{
  "sessionId": "65cad...",
  "message": "We need to fix this immediately.",
  "mcqChoice": null
}
```

---

## 3. Backend Controller Logic
*   **File:** [dojoController.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/controllers/dojoController.js)
*   **Function**: `respondToScenario(req, res)`

### Branch A: MCQ Choice (Pre-Graded)
1.  Extracts `moodDelta` and `scores` directly from the `mcqChoice` object sent in the body.
2.  Updates the Cumulative Metrics in the database.

### Branch B: Custom Text (AI Grading)
1.  Calls `chatService.evaluateResponse(userMessage, role, context)`.
2.  **Service Action**: `chatService` sends a prompt to `aiService` asking for scores (0-100) on 6 competencies.
3.  Calculates `moodDelta` based on the average score.

---

## 4. Generating the AI Character Reply
*   **File**: [chatService.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/services/chatService.js)
*   **Function**: `generateResponse(history, persona)`
*   **Logic**: 
    1.  Sends the entire conversation history to the AI.
    2.  Asks the AI to "Oppose the user" as that character.
    3.  Returns the raw string (e.g., "I don't care about your excuses, fix it!").

---

## 5. Generating Next MCQs
*   **Function**: `generateMCQOptions(history, description, currentMood)`
*   **Logic**: 
    1.  Asks AI to generate 3 new "Leadership Approaches" (Relationship, Results, Boundary).
    2.  AI returns a JSON array of 3 pre-graded choices tailored to the last message.

---

## 6. The Response (res) Object
Sent back to the browser:
```json
{
  "success": true,
  "data": {
    "message": "Character's reply text",
    "moodLevel": 60, // The NEW mood level
    "mcqOptions": [ ... ], // 3 NEW choices
    "isResolved": true/false, // True if mood >= 55
    "isLastScenario": false 
  }
}
```

---

## 7. Frontend Update
1.  **Hides** the typing indicator.
2.  Calls **`renderMessage`** to show the character's reply.
3.  Calls **`updateMoodDisplay`** to move the mood bar.
4.  Calls **`renderMCQs`** to draw the 3 new buttons.
5.  If `isResolved`, it calls **`showResolution()`** to freeze the timer and show the success popup.
