# Task Manager Application (MEAN Stack)

A Full-Stack Task Manager Web Application that allows users to  
register, login and manage their personal tasks securely.

The application is built using:

- Angular (Frontend)
- Node.js & Express.js (Backend)
- MongoDB (Database)
- JWT Authentication

This project follows a clean Full-Stack architecture with protected APIs, reusable frontend services, route guards, filtering, pagination and cloud database support.

---

# Features

## Authentication

- User Registration
- User Login
- JWT-based Authentication
- Secure password hashing using bcrypt
- Token stored in Browser Local Storage
- Protected Angular Routes using Auth Guard
- Secure Logout

---

## Task Management (CRUD)

- Create New Tasks
- View Personal Task List
- Mark Tasks as Done
- Delete Tasks
- Task Status (Todo / Done)
- Task Priority (Low / Medium / High)
- Due Date Support
- Tasks accessible only by logged-in user

---

## Dashboard Features

- Responsive Task Dashboard
- Professional Sidebar Layout
- Loading State while fetching tasks
- Empty State when no tasks available
- Confirmation Modal for Delete / Logout / Mark Done
- Toast Notifications

---

## Advanced Features

- Filter Tasks by Status
- Filter Tasks by Priority
- Server-side Pagination
- Latest Tasks First Sorting
- Reusable Angular Services
- Automatic Token Header Injection using Interceptor

---

# Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | Angular |
| Backend    | Node.js, Express.js |
| Database   | MongoDB |
| Auth       | JWT |
| Styling    | CSS |
| Cloud      | AWS EC2 |

---

# Project Structure

```text
TaskManager-MEAN/
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── tasks.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
└── client/
    ├── src/
    │   ├── app/
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── tasks/
    │   │   ├── create-task/
    │   │   ├── layout/
    │   │   ├── services/
    │   │   ├── guards/
    │   │   └── interceptors/
    │   │
    │   └── main.ts
    │
    ├── angular.json
    ├── package.json
    └── package-lock.json 


Prerequisites

Ensure the following are installed:

Node.js (v18 or above)
MongoDB (Local / Atlas / EC2 Hosted)
Angular CLI
npm install -g @angular/cli
Backend Setup
(i) Navigate to backend folder
cd server
(ii) Install dependencies
npm install
(iii) Create .env file
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
JWT_SECRET=your_jwt_secret

For AWS EC2:

MONGO_URI=mongodb://100.26.33.224:27017/taskdb
(iv) Start backend server
node src/server.js

Backend runs on:

http://localhost:5000
Frontend Setup
(i) Navigate to frontend folder
cd client
(ii) Install dependencies
npm install
(iii) Start Angular app
ng serve

Frontend runs on:

http://localhost:4200
Application Routes
Route	Description
/login	User Login
/register	User Registration
/dashboard	Task Dashboard
/create-task	Create Task
API Endpoints
Authentication APIs
Method	Endpoint	Description
POST	/auth/register	Register User
POST	/auth/login	Login User
Task APIs (Protected)
Method	Endpoint	Description
GET	/tasks	Get User Tasks
POST	/tasks	Create Task
PUT	/tasks/:id	Update Task
DELETE	/tasks/:id	Delete Task
Protected API Authentication

Include JWT token in header:

Authorization: Bearer <JWT_TOKEN>
Pagination Support

Backend supports:

/tasks?page=1&limit=5

Example:

/tasks?page=2&limit=5
Filtering Support

By Status:

/tasks?status=todo
/tasks?status=done

By Priority:

/tasks?priority=high
/tasks?priority=medium
/tasks?priority=low

Combined:

/tasks?status=todo&priority=high
Security Features
Password hashing using bcrypt
JWT Authentication
Protected Backend APIs
Protected Frontend Routes
Token-based session management
User-specific task isolation
Environment variable protection
AWS EC2 MongoDB Support

MongoDB database can be hosted on AWS EC2.

Used Features:

Remote MongoDB Hosting
Security Groups
Port 27017 Access
Real-world deployment experience
UI Features
Modern Sidebar Layout
Dashboard Cards
Task Status Badges
Priority Color Indicators
Confirmation Popup Modal
Responsive Design
Learning Outcomes

This project demonstrates:

Full Stack Development
Angular Component Architecture
Angular Routing & Guards
Angular Services & Interceptors
RESTful API Design
MongoDB CRUD Operations
JWT Authentication Flow
AWS EC2 Cloud Usage
Real-Time UI Updates
Clean separation of Backend & Frontend