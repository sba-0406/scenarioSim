# Simulation Life Cycle Summary
This folder contains the complete documentation for every major interaction within the Leadership Dojo.

## 1. The 5 Major Actions
Follow the links below to see the microscopic detail of each phase:

1.  **[01 Initiation](file:///c:/Users/shaik/.gemini/antigravity/brain/9b0e678c-e6f9-4c56-a41f-96493a3f47e9/flows/01_initiation.md)**: From the Roles page to the database session creation.
2.  **[02 Simulation Load](file:///c:/Users/shaik/.gemini/antigravity/brain/9b0e678c-e6f9-4c56-a41f-96493a3f47e9/flows/02_simulation_load.md)**: How the page "boots" and fetches the character data.
3.  **[03 User Interaction](file:///c:/Users/shaik/.gemini/antigravity/brain/9b0e678c-e6f9-4c56-a41f-96493a3f47e9/flows/03_interaction.md)**: The complex loop of Messaging -> AI Grading -> Character Reply -> New MCQs.
4.  **[04 Advancement](file:///c:/Users/shaik/.gemini/antigravity/brain/9b0e678c-e6f9-4c56-a41f-96493a3f47e9/flows/04_advancement.md)**: How the system transitions from Stakeholder #1 to #2.
5.  **[05 Finalization](file:///c:/Users/shaik/.gemini/antigravity/brain/9b0e678c-e6f9-4c56-a41f-96493a3f47e9/flows/05_finalization.md)**: The end-of-career calculation and grading logic.

---

## 2. Key Takeaways
*   **Stateful Backend**: The backend [ChatSession](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/models/ChatSession.js) model is the "source of truth". The frontend always asks the backend "what is the state?" before drawing anything.
*   **The Controller (Orchestrator)**: [dojoController.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/controllers/dojoController.js) is where the magic happens. It coordinates MongoDB, AI Services, and the Frontend.
*   **AI Resilience**: If an AI call fails, the [chatService.js](file:///c:/Users/shaik/Downloads/dojo-app-backend-frontend/backend/services/chatService.js) has "Fallbacks" (Mocks) to ensure the game doesn't crash for the user.

**Visualization Tip**: Look at the `res` structure in each file to see how the data object changes from a simple state (Initiation) to a complex one (User Interaction) and finally to an analytical one (Finalization).
