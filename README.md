Task Manager Application (MEAN Stack)

  A Full-Stack Task Manager Web Application that allows user to 
register, login and manage their personal tasks securely.
The application id built using Angular (Frontend) , Node.js &
Express (backend), MongoDB (database) and JWT authentication.


Features

* Authentication
  -> Uer registration and login.
  -> JWT-based authentication
  -> Secure password hashing using bcrypt
  -> Token stored in browser Local Storage

*Task Management (CRUD)
  -> Create new Tasks
  -> View Task List 
  -> Mark Tasks as done
  -> Delete Tasks
  -> Tasks are protected and acccessible only by the logged-in user

Tech Stack

LAYER           TECHNOLOGY

Frontend        Angular
Backend         Node.js, Express
Database        MongoDB
Auth            JWT
Styling         CSS


Project structure

To-Do-ListApp/
│
├── backend/
│ ├── src/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── server.js
│ │
│ ├── .env
│ ├── package.json
│ └── package-lock.json
│
└── frontend/
    ├── src/
    │ ├── app/
    │ │ ├── login/
    │ │ ├── register/
    │ │ ├── tasks/
    │ │ ├── services/
    │ │ └── interceptors/
    │ │
    │ └── main.ts
    │
    ├── angular.json
    ├── package.json
    └── package-lock.json


Prerequisites

Ensure the following are installed:

* Node.js (v18 or above)

* MongoDB (Local or Atlas)

* Angular CLI
  npm install -g @angular/cli


Backedn Setup

(i) Navigate to backedn folder
 
  cd backend


(ii) Install dependencies
  
  npm install


(iii) Create .env file

  PORT=5000
  MONGO_URI=mongodb://127.0.0.1:27017/task_manager_db
  JWT_SECRET=your_jwt_secret


(iv) Start backend server

  npm run dev

Backend runs on:

  http://localhost:5000


Frontend setup

(i) Navigate to frontend folder

  cd frontend


(ii) Install dependencies

  npm install


(iii) Start Angular app

  ng serve

Frontend runs on:

  http://localhost:4200



Application Routes

ROUTE           DESCRIPTION

/login          User Login
/register       User registration
/tasks          Task dashboard


API Authentication Testing 

* For Protected APIs, include this header:

    Authorization: Bearer <JWT_TOKEN>


Conclusion

This project demonstrates:
  
  * Secure auhentication
  * RESTful API design
  * Angular services & interceptors
  * Real-Time UI updates
  * Clean seperation of Backend & Frontend