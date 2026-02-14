# 🎬 ScenarioSim - Setup & Environment

This guide covers the essential steps to get **ScenarioSim** running locally.

## ⚙️ Environment Configuration

Create a `.env` file in the `backend/` directory. You can use `.env.example` as a template.

| Variable | Description | Recommended Value |
| :--- | :--- | :--- |
| `PORT` | The port for the backend server. | `2000` |
| `MONGO_URI` | Your MongoDB connection string. | `mongodb+srv://...` |
| `GROQ_API_KEY` | Your API Key from [Groq Cloud](https://console.groq.com/). | `gsk_...` |
| `JWT_SECRET` | Secret key for signing session tokens. | `your_secret_string` |
| `NODE_ENV` | Environment mode. | `development` |

---

## 🚀 Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Run the Application**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:2000`

---

## 📝 Prerequisites
- **Node.js**: v16 or higher.
- **MongoDB**: Atlas Cluster or Local Instance.
- **Groq API Key**: Required for AI simulations and reporting.
