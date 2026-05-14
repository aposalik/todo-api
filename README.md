# 🐳 Todo API — Production-Grade Node.js + Docker + CI/CD

A fully containerized REST API built with Node.js, MongoDB, and Nginx — deployed automatically via a CI/CD pipeline using GitHub Actions and Docker Hub.

---

## 🏗️ Architecture

```
Browser
   ↓
Nginx (port 80)          ← reverse proxy
   ↓
Node.js API (port 3000)  ← Express + Mongoose
   ↓
MongoDB (port 27017)     ← persistent data via Docker volume
```

All three services run in isolated Docker containers, managed by Docker Compose.

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Runtime | Node.js v18 | Server-side JavaScript |
| Framework | Express.js | HTTP routing and middleware |
| Database | MongoDB 7.0 | NoSQL document storage |
| ODM | Mongoose | Schema modeling and validation |
| Reverse Proxy | Nginx | Entry point, forwards to API |
| Containerization | Docker + Docker Compose | Multi-container orchestration |
| CI/CD | GitHub Actions | Auto build and push on every push |
| Registry | Docker Hub | Docker image storage |
| Process Manager | Nodemon | Auto-restart during development |

---

## 📁 Project Structure

```
todo-api/
├── src/
│   ├── models/
│   │   └── todo.model.js        # Mongoose schema
│   ├── routes/
│   │   └── todo.routes.js       # Route definitions
│   ├── controllers/
│   │   └── todo.controller.js   # Business logic
│   └── app.js                   # Express app + MongoDB connection
├── nginx/
│   └── nginx.conf               # Nginx reverse proxy config
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD pipeline
├── Dockerfile                   # API container definition
├── docker-compose.yml           # Multi-container orchestration
├── .dockerignore                # Files excluded from Docker build
├── .env                         # Environment variables (not committed)
└── package.json
```

---

## 📋 API Endpoints

Base URL: `http://localhost/todos`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| GET | `/todos/:id` | Get a single todo by ID |
| PUT | `/todos/:id` | Update a todo by ID |
| DELETE | `/todos/:id` | Delete a todo by ID |

### Request/Response Examples

**Create a todo:**
```bash
curl -X POST http://localhost/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker"}'
```

```json
{
  "_id": "6a025403de3ea0ae8029dbc2",
  "title": "Learn Docker",
  "completed": false,
  "createdAt": "2026-05-11T22:11:15.280Z",
  "updatedAt": "2026-05-11T22:11:15.280Z"
}
```

**Update a todo:**
```bash
curl -X PUT http://localhost/todos/:id \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

---

## 🐳 Running with Docker

### Prerequisites
- Docker Desktop installed and running
- Docker Compose v2+

### Start all containers:
```bash
docker-compose up --build
```

### Stop all containers:
```bash
docker-compose down
```

### Data persistence:
MongoDB data is persisted via a named Docker volume `mongodb_data` — your todos survive container restarts.

---

## 💻 Running Locally (without Docker)

### Prerequisites
- Node.js v18+
- MongoDB running locally

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/todos
```

> ⚠️ Never commit `.env` to version control. It is listed in `.gitignore`.

For Docker, the `MONGO_URI` uses the MongoDB service name:
```env
MONGO_URI=mongodb://mongodb:27017/todos
```

---

## 🔄 CI/CD Pipeline

Every push to `main` triggers the GitHub Actions pipeline:

```
git push to main
      ↓
GitHub Actions triggered
      ↓
Checkout code
      ↓
Login to Docker Hub
      ↓
Build Docker image
      ↓
Push to Docker Hub (aposalik/todo-api:latest)
```

### Required GitHub Secrets:

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (Read & Write) |

---

## 🔀 Nginx Reverse Proxy

Nginx acts as the single entry point to the application:

- Listens on port **80** (standard HTTP)
- Forwards all requests to the API container on port **3000**
- Containers communicate by service name — not `localhost`

```nginx
location / {
  proxy_pass http://api:3000;
}
```

---

## 🔐 Security Practices

- `.env` file is gitignored — secrets never committed to GitHub
- API port 3000 not exposed publicly — only accessible through Nginx
- Docker Hub credentials stored as GitHub Secrets
- MongoDB not exposed unnecessarily in production

---

## 📦 Docker Hub

Image available at:
```
docker pull aposalik/todo-api:latest
```

---

## 👨‍💻 Author

**Abdullah Salik**
- GitHub: [@aposalik](https://github.com/aposalik)
- Docker Hub: [aposalik](https://hub.docker.com/u/aposalik)
