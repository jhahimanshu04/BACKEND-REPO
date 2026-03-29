# User Authentication Backend

Hi, I'm Himanshu 
I'm a Backend Developer, and this project demonstrates how user authentication works in a real-world backend application.

---

## Project Overview

This project is a simple and secure backend system built using Node.js and Express.
It focuses on implementing **user authentication** using JWT (JSON Web Tokens) and MongoDB.

Users can:

* Register an account
* Login securely
* Access protected routes using a valid token

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (with Mongoose)
* JWT (JSON Web Token)
* dotenv

---

##  Project Structure

```
backend/
│
├── models/          # Database schemas (User model)
├── controllers/     # Business logic (register, login)
├── middleware/      # JWT authentication (secure routes)
├── config/          # DB connection setup
├── .env             # Environment variables (not pushed)
├── index.js         # Entry point
```

---

##  Features

* User Registration with validation
* Secure Login with JWT
* Password handling (hashed)
* Protected routes using middleware
* Clean folder structure (MVC pattern)

---

## ⚙️ Installation & Setup

1. Clone the repository:

```
git clone https://github.com/your-username/your-repo-name.git
```

2. Navigate to project:

```
cd backend
```

3. Install dependencies:

```
npm install
```

4. Create a `.env` file and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Run the server:

```
npm run dev
```

---

##  Authentication Flow (Simple Explanation)

1. User registers → data stored in MongoDB
2. User logs in → server verifies credentials
3. JWT token is generated
4. Token is sent to client
5. For protected routes → token is verified via middleware

---

##  Example Routes

* `POST /register` → Register user
* `POST /login` → Login user
* `GET /profile` → Protected route (requires token)

---

##  What I Learned

* How authentication works in backend
* JWT token generation & verification
* Middleware for route protection
* Structuring scalable backend projects
* Secure handling of environment variables

---




