🚀 Project Overview

This is a full-stack authentication system built using React (frontend) and Node.js (backend).
It shows how users can securely register, login, and access protected routes.

🛠️ Tech Stack
🔹 Frontend
React.js (Vite)
Tailwind CSS
Axios
React Router DOM
🔹 Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT (JSON Web Token)
dotenv
📂 Project Structure
project-root/
│
├── frontend/        # React frontend (UI + API calls)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│
├── backend/         # Node.js backend (API + Auth)
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── index.js
🔑 Features
User Registration & Login
JWT-based Authentication
Protected Routes (Frontend + Backend)
Secure API communication
Clean folder structure (MVC)
Environment variables for security
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
🔧 Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev
🎨 Frontend Setup
cd frontend
npm install
npm run dev

👉 Frontend runs on: http://localhost:5173
👉 Backend runs on: http://localhost:5000

🔐 Authentication Flow (Simple)
User registers via frontend form
Data sent to backend API
Backend stores user in MongoDB
User logs in → JWT token generated
Token stored on client (localStorage)
Protected routes verify token using middleware
🔌 API Integration (Frontend ↔ Backend)
Axios is used to send requests
Token is sent in headers for protected routes
Backend verifies token before sending data
📌 Example API Routes
POST /api/register → Register user
POST /api/login → Login user
GET /api/profile → Protected route
🧠 What I Learned
Full-stack project structure
Connecting frontend with backend APIs
JWT authentication flow
Secure handling of environment variables
Real-world development practices
