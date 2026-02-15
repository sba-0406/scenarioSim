# Deep Dive: Frontend Script Documentation
This document provides an exhaustive catalog of every function inside `dojo-simulation.ejs` to help you visualize exactly how your code works.

---

## 1. The Core Variable Store
At the top of the script, these "Global" variables hold the brain of your current session:
*   `sessionId`: The unique database ID passed from the backend.
*   `chatFeed`: Reference to the scrolling message area.
*   `mcqContainer`: Reference to where the choice buttons appear.
*   `customInput`: Reference to the text typing box.
*   `timeLeft`: Integer tracking remaining seconds (starts at 300).
*   `currentSession`: The full JSON data object from MongoDB.

---

## 2. Complete Function Catalog

| Function | Parameters | Logic & Role |
| :--- | :--- | :--- |
| **`init()`** | None | The "Ignition". Runs immediately when the page ready. Calls `loadSession`, `startTimer`, and `setupInput`. |
| **`loadSession()`** | None | Calls `GET /dojo/session/ID`. If the session is `completed`, it jumps straight to showing the report; otherwise, it populates the chat feed. |
| **`updateUI()`** | None | Updates the "Scenario 1 / 3" text and the character name in the header based on `currentSession` data. |
| **`updateMoodDisplay()`** | `level` (0-100) | Logic for the mood bar. Based on the number, it picks 😠, 😐, or 😊 and changes the CSS color. |
| **`startTimer()`** | None | Runs a `setInterval` every 1000ms. Decrements `timeLeft` and updates the `mm:ss` display on screen. |
| **`onTimeout()`** | None | Triggered when `timeLeft` hits 0. Simply calls `showResolution('timeout')`. |
| **`setupInput()`** | None | Attaches the "Send" button click and "Enter" key listeners to the input box. |
| **`skipScenario()`** | None | Asks for confirmation via `confirm()`. If yes, it calls `advanceScenario('skipped')`. |
| **`handleResponse()`** | `text`, `choice` | **The Heavy Lifter**. 1. Renders your message locally. 2. Shows the "Thinking" indicator. 3. Sends data to `/dojo/respond`. 4. Updates AI text/mood upon return. |
| **`renderMCQs()`** | `options` (arr) | Loops through the 3 options provided by AI. Creates `<button>` elements with icons (💡, 🤝, etc.) and attaches click events. |
| **`generateInitialMCQs()`**| None | A "Pre-fetch" tool. If you load a fresh scenario with no messages, it calls the backend with an empty message to get the first set of 3 questions. |
| **`renderMessage()`** | `msg` (obj) | Creates a `<div>` with the class `msg ai` or `msg user`. Uses `insertBefore` to put it above the typing indicator. |
| **`renderInitialMessage()`**| None | Injects the system "Mission Start" message at the very top of the chat. |
| **`scrollToBottom()`** | None | Calculations to move the `scrollTop` of the chat feed so the newest message is always visible. |
| **`showResolution()`** | `type`, `isLast` | Shows the "Scenario Resolved" popup. Decides if the button should say "Next Stakeholder" or "Finish". |
| **`advanceScenario()`** | `reason` | Calls `POST /dojo/next`. If there are more scenarios, it **reloads the page** to reset the state for the next character. |
| **`finalizeSession()`** | None | The final API call to `/dojo/finalize`. It gets the calculated Grade (S, A, B...) and the Gap Analysis. |
| **`showFinalReport()`** | `report` (obj) | Transforms the `resolutionOverlay` into a big scoreboard showing your final Grade and career recommendations. |

---

## 3. Data Flow Pyramid

1.  **State Layer**: `currentSession` (The source of truth).
2.  **Logic Layer**: `handleResponse` & `advanceScenario` (Thinking).
3.  **UI Layer**: `renderMessage` & `updateUI` (Seeing).

**Why its complex**: Because every time you talk, the code has to update **4 things at once**: the Chat history, the Mood bar, the MCQ buttons, and the underlying Database session.
