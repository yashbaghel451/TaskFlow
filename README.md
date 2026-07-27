# 🚀 TaskFlow – Full Stack Task Management Application

TaskFlow is a full-stack task management application built using the MERN stack. It allows users to securely register and log in, create and manage tasks,
track task completion, and monitor productivity through a personalized dashboard.

The project includes a modern React frontend, a Node.js and Express.js backend, MongoDB database integration, and JWT-based authentication.

---

## 🌐 Live Demo

### Frontend
https://taskflow-frontend-bv2q.onrender.com

### Backend API
https://taskflow-backend-fnjl.onrender.com/api

### GitHub Repository
https://github.com/yashbaghel451/TaskFlow

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration
- Secure user login
- JWT-based authentication
- Protected routes
- Logout functionality
- User-specific task management

### 📋 Task Management
- Create new tasks
- View all tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed or incomplete
- Task priority management
- Task category management
- Due date support

### 📊 Dashboard
- Personalized user dashboard
- Task statistics
- Total tasks overview
- Completed and pending task tracking
- Recent tasks display
- Productivity overview

### 👤 User Profile
- View user information
- Personalized profile section
- Secure user session

### 🌙 UI Features
- Responsive user interface
- Dark mode / Light mode
- Mobile-friendly design
- Clean and modern layout
- Interactive navigation

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- React Router
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- REST API

### Tools & Deployment
- Git
- GitHub
- VS Code
- Postman
- Render
- MongoDB Atlas

---

## 📁 Project Structure

```text
TaskFlow/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md

## ⚙️ Installation & Setup

Follow the steps below to run TaskFlow locally on your system.

---

### 1. Clone the Repository

Clone the TaskFlow repository from GitHub:

```bash
git clone https://github.com/yashbaghel451/TaskFlow.git

Navigate to the project directory:

cd TaskFlow
🔧 Backend Setup
Step 1: Navigate to the Backend Folder

Open a terminal and run:

cd Backend
Step 2: Install Backend Dependencies

Install all required Node.js packages:

npm install
Step 3: Configure Environment Variables

Create a .env file inside the Backend folder.

Add the following environment variables:

PORT=8000
JWT_SECRET_KEY=your_jwt_secret_key
MONGODB_URL=your_mongodb_connection_string

Replace:

your_jwt_secret_key with your JWT secret key.
your_mongodb_connection_string with your MongoDB Atlas connection string.

⚠️ Do not share your MongoDB connection string or JWT secret publicly.

Step 4: Start the Backend Server

Run the following command:

npm run dev

The backend server will start at:

http://localhost:8000
💻 Frontend Setup

Open a new terminal while keeping the backend server running.

Step 1: Navigate to the Frontend Folder

From the project root directory, run:

cd Frontend
Step 2: Install Frontend Dependencies

Install all required frontend packages:

npm install
Step 3: Configure Environment Variables

Create a .env file inside the Frontend folder.

For local development, add:

VITE_API_URL=http://localhost:8000/api

This URL connects the React frontend to the locally running backend API.

Step 4: Start the Frontend Development Server

Run:

npm run dev

The frontend application will be available at:

http://localhost:5173
🔑 Environment Variables

TaskFlow uses environment variables to securely manage configuration and sensitive information.

Backend Environment Variables

Create a .env file inside the Backend folder:

PORT=8000
JWT_SECRET_KEY=your_jwt_secret_key
MONGODB_URL=your_mongodb_connection_string
Frontend Environment Variables
Local Development

Create a .env file inside the Frontend folder:

VITE_API_URL=http://localhost:8000/api
Production

For the deployed application, configure the following environment variable in your hosting platform:

VITE_API_URL=https://your-backend-url.onrender.com/api

Replace your-backend-url.onrender.com with your actual deployed backend URL.

⚠️ Important: Never commit .env files, MongoDB credentials, JWT secrets, or other sensitive information to GitHub.

🔄 Application Flow

The overall architecture of TaskFlow works as follows:

                    User
                      │
                      ▼
              React Frontend
                      │
                      │ Axios API Requests
                      ▼
          Node.js + Express.js Backend
                      │
                      │ Mongoose
                      ▼
                MongoDB Atlas
Authentication Flow

The authentication process works as follows:

User Registration
       │
       ▼
Backend Validation
       │
       ▼
Password Hashing
       │
       ▼
MongoDB Database
       │
       ▼
JWT Token Generation
       │
       ▼
Authenticated User

After successful authentication, the JWT token is stored on the client side and used to authorize protected API requests.

🔒 Security

TaskFlow implements the following security practices:

JWT-based user authentication
Password hashing using bcrypt
Protected backend API routes
Token-based API authorization
Environment variables for sensitive configuration
User-specific task access
Authentication middleware for protected resources
Secure communication between frontend and backend APIs

🔐 Sensitive credentials such as MongoDB connection strings and JWT secrets should always be stored in environment variables and never committed to the public repository.

🚀 Deployment

TaskFlow is deployed using Render, with MongoDB Atlas used as the cloud database.

Frontend Deployment

Platform: Render
Framework: React + Vite

Root Directory:

Frontend

Build Command:

npm install && npm run build

Publish Directory:

dist

Environment Variable:

VITE_API_URL=https://your-backend-url.onrender.com/api
Backend Deployment

Platform: Render
Runtime: Node.js

Root Directory:

Backend

Build Command:

npm install

Start Command:

npm start

Required Environment Variables:

PORT=8000
JWT_SECRET_KEY=your_jwt_secret_key
MONGODB_URL=your_mongodb_connection_string
Database

TaskFlow uses MongoDB Atlas as its cloud database.

The backend connects to MongoDB Atlas using the MONGODB_URL environment variable.

MONGODB_URL=your_mongodb_connection_string
🧪 API Testing

The TaskFlow backend provides RESTful APIs that can be tested using Postman.

Base API URL

For local development:

http://localhost:8000/api

For production:

https://your-backend-url.onrender.com/api
🔐 Authentication API
Register a New User
POST /api/auth/register

Used to create a new user account.

Request Body Example:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
User Login
POST /api/auth/login

Used to authenticate an existing user and generate an authentication token.

Request Body Example:

{
  "email": "john@example.com",
  "password": "password123"
}
📋 Task API Endpoints
Get All Tasks
GET /api/tasks

Fetches all tasks belonging to the authenticated user.

Create a New Task
POST /api/tasks

Creates a new task for the authenticated user.

Get a Single Task
GET /api/tasks/:id

Fetches details of a specific task using its ID.

Update a Task
PUT /api/tasks/:id

Updates an existing task using its unique ID.

Delete a Task
DELETE /api/tasks/:id

Deletes a specific task using its unique ID.

🔐 Authorization

Protected task endpoints require a valid JWT token.

Add the token in the request headers:

Authorization: Bearer YOUR_JWT_TOKEN

Example:

Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
📌 API Routes Summary
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login an existing user
GET	/api/tasks	Get all user tasks
POST	/api/tasks	Create a new task
GET	/api/tasks/:id	Get a specific task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task

Note: Task-related endpoints require JWT authentication.

📦 Running the Project

To run the complete TaskFlow application locally, you need two terminals.

Terminal 1 – Backend
cd TaskFlow/Backend
npm install
npm run dev

Backend:

http://localhost:8000
Terminal 2 – Frontend
cd TaskFlow/Frontend
npm install
npm run dev

Frontend:

http://localhost:5173

Once both servers are running, open the frontend URL in your browser:

http://localhost:5173

You can now register, login, create tasks, update tasks, complete tasks, and delete tasks.

⚠️ Important Notes
Make sure MongoDB Atlas is accessible from your backend environment.
Make sure the MONGODB_URL is correctly configured.
Make sure JWT_SECRET_KEY is configured before starting the backend.
Make sure the frontend VITE_API_URL points to the correct backend URL.
After changing frontend environment variables in production, redeploy the frontend.
Never commit .env files to GitHub.
Never expose database passwords or secret keys publicly.
