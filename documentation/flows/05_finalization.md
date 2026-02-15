# Action 05: Finalization (Career Report)
**Action:** The user clicks "Finish & See Career Results" after resolving the 3rd and final stakeholder.

## 1. Frontend Trigger
*   **File:** [dojo-simulation.ejs](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/frontend/views/dojo-simulation.ejs)
*   **Function**: `finalizeSession()`
    *   **Logic**: 
        1.  Calls `POST /dojo/finalize` with the `sessionId`.
        2.  Stops the simulation timer.
        3.  Wait for the exhaustive analytics report from the backend.

---

## 2. Backend Report Calculation
*   **File:** [dojoController.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/controllers/dojoController.js)
*   **Function**: `finalizeDojoSession(req, res)`
*   **Detailed Steps**:
    1.  **Name Mapping**: Calls `mapCompetenciesToNames`. This converts generic DB fields like `competency1` into role-specific names like `Empathy` or `Strategic Thinking`.
    2.  **Gap Analysis**: Compares your scores against [roleCompetencies.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/config/roleCompetencies.js) requirements. 
        *   If `Score >= Required`: Added to **Strengths**.
        *   If `Score < Required`: Added to **Improvements Needed**.
    3.  **Grading**: Runs the average of all 6 scores through `getGrade()`:
        *   90+ = **S**
        *   80+ = **A**
        *   70+ = **B**
        *   60+ = **C**
        *   ...and so on.
    4.  **Recommendations**: Pick top 3 improvement areas and attaches them to a career suggestion string.
    5.  **State Change**: Marks `session.status = 'completed'` so the session cannot be edited anymore.

---

## 3. The Response (res) Object
Sent back to the browser:
```json
{
  "success": true,
  "data": {
    "roleAssessed": "Manager",
    "overallGrade": "A",
    "competencyScores": { "Empathy": 82, "Delegation": 75, ... },
    "gapAnalysis": {
      "strengths": ["Empathy"],
      "improvements": ["Delegation (Gap: 5)"]
    },
    "recommendation": "Top-tier Manager performance..."
  }
}
```

---

## 4. Final Display (Frontend)
*   **Function**: `showFinalReport(report)`
*   **Logic**: 
    1.  Creates a large "Modal" overlay that covers the entire chat screen.
    2.  Sets the `innerHTML` of the overlay to show your **Grade** in huge text.
    3.  Lists out your Strengths and Improvements in a "Gap Analysis" box.
*   **The Exit Button**: Provides a button pointing to `/dojo/roles` so the user can try a different career path.

---

## 5. Visual Flow Summary
1.  **Click Finish**: The chat interface disappears behind a dark backdrop.
2.  **Report Generates**: The backend does the heavy math on your conversation history.
3.  **Results Appear**: You see your final Grade and professional advice.
4.  **Exit**: You choose to leave the Dojo or restart.
