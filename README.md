Built a Full-Stack Task Management Platform using the MERN stack with JWT authentication, Kanban board UI, Redis caching, rate limiting, 
Winston logging, Jest testing (9/9), and Swagger documentation. Deployed on Vercel + Render.

# Feature
✅Full-Stack MERN Application
✅JWT Authentication (Register/Login)
✅Kanban Board με 3 columns
✅Filter & Search Tasks
✅Rate Limiting
✅Redis Caching
✅Winston Logging
✅Jest Tests (9/9 pass)
✅Swagger API Docs
✅Deploy σε Vercel + Render

🌐 Live App:  https://task-manager-indol-delta.vercel.app
💻 GitHub:    https://github.com/geo14150/task-manager
📡 API Docs:  https://taskflow-backend-0krt.onrender.com/api-docs

# 🛠️ Tech Stack
Frontend
TechnologyPurposeReact 18 + ViteUI FrameworkReact Router DOMClient-side routingTailwind CSSStylingAxiosHTTP requestsContext APIGlobal state (auth)
Backend
TechnologyPurposeNode.js + ExpressServer & REST APIMongoDB + MongooseDatabaseRedis (Upstash)CachingJWT + bcryptjsAuthenticationexpress-rate-limitRate limitingWinston + MorganLoggingJest + SupertestTestingSwagger UIAPI Documentation

# 🚀 Local Development

Node.js v18+
MongoDB Atlas account (δωρεάν)
Git

Εγκατάσταση

# Clone το repository

git clone https://github.com/geo14150/task-manager.git

cd task-manager

# Backend Setup

cd backend

npm install

Δημιούργησε backend/.env:

MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?appName=Cluster0
PORT=5000

JWT_SECRET=your_super_secret_jwt_key

REDIS_URL=rediss://default:<password>@<host>:6379 

npm run dev

Server: http://localhost:5000

Frontend Setup

cd frontend

npm install

npm run dev

App: http://localhost:5173

# 🧪 Tests

cd backend

npm test

Αναμενόμενο αποτέλεσμα:

Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
