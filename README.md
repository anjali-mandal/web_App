# Auth Dashboard App

## Tech Stack
- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Authentication:** JWT

## Features
- User Registration & Login (JWT-based)  
- Protected Dashboard (login required)  
- Task CRUD (Add, Edit, Delete)  
- Clean and light-themed UI  
- Secure API with authentication middleware

## Project Setup

### Backend
```bash
cd Backend
npm install
cp .env.example .env   # create .env file
# Fill in your MONGO_URI, JWT_SECRET, and PORT
npm start



Frontend
cd client
npm install
npm start

Access the App

Open http://localhost:3000
 in your browser


API Endpoints

POST /api/auth/register
POST /api/auth/login
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id



PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/auth_dashboard
JWT_SECRET=your_random_strong_string_here

JWT_SECRET: Can be any strong random string. Used to sign and verify JWT tokens.

Tokens will only work in the same environment using this secret.

