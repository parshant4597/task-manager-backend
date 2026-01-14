Task Management System
Overview

The Task Management System is a full-stack web application designed to help individuals efficiently manage their daily tasks.
Users can register, log in securely, create and manage tasks, set priorities and due dates, track task status, and monitor progress through a dashboard.

The application focuses on simplicity, usability, and reliability, avoiding unnecessary complexity while still providing all essential task-management features.

Tech Stack

Frontend: React.js, Bootstrap, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT (JSON Web Tokens)

API Documentation: Swagger (OpenAPI)

Setup Instructions
Backend

Clone the repository

git clone <repository-url>


Navigate to backend directory

cd backend


Install dependencies

npm install


Configure environment variables (.env)

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the server

npm run dev


Swagger API documentation will be available at

http://localhost:5000/api-docs

Frontend

Navigate to frontend directory

cd frontend


Install dependencies

npm install


Configure API base URL (if needed) in Axios setup

Start the development server

npm run dev


Open the app in browser

http://localhost:5173

Features Implemented
Authentication

User registration and login

JWT-based authentication

Protected routes for authenticated users only

Task Management

Create, read, update, and delete tasks

Task categories and priority levels (High, Medium, Low)

Task status tracking (Pending, In Progress, Completed)

Due date support

Automatic overdue task detection

Dashboard

Task statistics (total, pending, completed, overdue)

Visual highlighting of overdue tasks

Responsive dashboard layout

API & Backend

RESTful API design

Secure user-specific data access

Swagger documentation for all endpoints

Future Enhancements

Email or in-app notifications for overdue tasks

Advanced search and sorting

Task reminders

Role-based access (teams / shared tasks)

Challenges and Solutions
1. Handling Overdue Tasks Correctly

Challenge:
Determining overdue tasks without adding unnecessary database fields.

Solution:
Overdue status was calculated dynamically based on the task’s due date and completion status. This avoided redundant data storage and ensured real-time accuracy.

2. Swagger Documentation Errors

Challenge:
Swagger UI initially failed due to YAML indentation and parameter definition issues.

Solution:
The API documentation was carefully refactored to follow strict YAML syntax rules. Query parameters were explicitly defined, ensuring correct rendering and easier API testing.

Live Demo & Submission

Live Deployment: https://task-manager-backend-yiqo.onrender.com/api-docs/#/Tasks/put_api_tasks__id_

API Documentation: Swagger UI

Video Demo: (2–3 minute walkthrough)

Repository: https://github.com/parshant4597/task-manager-backend
