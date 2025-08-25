# Full Stack Docker Application

A modern containerized full-stack application with **Next.js frontend** and **Express backend** using Docker for easy development and deployment.

## 🚀 Tech Stack
- **Frontend**: Next.js (React framework)
- **Backend**: Node.js + Express
- **Containerization**: Docker & Docker Compose
- **Build System**: Makefile for streamlined commands

## 📁 Project Structure

```
project-root/
├── client/                          # Next.js frontend application
│   ├── src/app
│   │   └── page.js                # Main homepage
│   ├── package.json                # Frontend dependencies
│   └── Dockerfile                  # Frontend container config
├── server/                          # Express backend application
│   ├── app.js                      # Main server file
│   ├── package.json                # Backend dependencies
│   └── Dockerfile                  # Backend container config
├── config/                          # Next.js frontend application
│   ├── autoload
│   │   └── dist
│   │   └── local         
│   ├── loader.json                
├── .env                            # Environment configuration
├── docker-compose.yml              # Container orchestration
├── Makefile                        # Build automation commands
└── README.md                       # This file
```

## 🛠️ Prerequisites

Before getting started, ensure you have installed:

- ✅ [Docker](https://docs.docker.com/get-docker/) (version 20.0+)
- ✅ [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)
- ✅ [Make](https://www.gnu.org/software/make/) (usually pre-installed on Linux/Mac)
- ✅ [Git](https://git-scm.com/) for version control

**Verify installations:**
```bash
docker --version          # Should show Docker version
docker-compose --version  # Should show Docker Compose version  
make --version            # Should show Make version
```

---

## 🚀 Quick Start (5 Minutes Setup)

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd <project-name>
```

### 2. One-Command Setup
```bash
# This will build and start both containers
make simple
```

### 3. Access Your Application
- **🌐 Frontend**: http://localhost:3000
- **🔗 Backend API**: http://localhost:5001
- **💚 Health Check**: http://localhost:5001/health

**That's it! Your full-stack application is now running in Docker containers! 🎉**

---

## 🎯 Makefile Commands Reference

### 🚀 **Most Used Commands**

| Command | Description | Use Case |
|---------|-------------|----------|
| `make simple` | Build and start both containers | **First time setup, daily use** |
| `make stop` | Stop both containers | **End of work day** |
| `make logs` | View real-time logs | **Debugging, monitoring** |
| `make status` | Check container health | **Quick status check** |
| `make check-env` | Check current environment | **Environment verification** |

### 🌍 **Environment Commands**

| Command | Description | Environment |
|---------|-------------|-------------|
| `make dev` | Development mode with logs | `NODE_ENV=development` |
| `make staging` | Staging environment | `NODE_ENV=staging` |
| `make prod` | Production environment | `NODE_ENV=production` |

### 🐳 **Docker Management**

| Command | Description | When to Use |
|---------|-------------|-------------|
| `make build` | Build containers only | After code changes |
| `make start` | Start existing containers | Resume stopped containers |
| `make stop` | Stop running containers | Pause work |
| `make restart` | Restart containers | Quick restart |
| `make reset` | Complete reset rebuild | Major changes, troubleshooting |
| `make clean` | Clean restart | Clear rebuild needed |

### 📊 **Monitoring & Debugging**

| Command | Description | Output |
|---------|-------------|--------|
| `make logs` | Live container logs | Real-time log stream |
| `make status` | Container status + health | Status table + HTTP checks |
| `make info` | System information | Images, containers, disk usage |
| `make health` | Quick health check | ✅/❌ status of both services |
| `make stats` | Resource usage | CPU, memory usage |
| `make check-env` | Current environment | Environment variables and status |

---

## 📖 Complete Usage Guide

### 🏁 **First Time Setup**
```bash
# Clone and enter project
git clone <repo-url>
cd <project-name>

# Build and start everything
make simple

# Verify it's working
make status
make health
make check-env
```

### 💼 **Daily Development Workflow**
```bash
# Start your day
make simple

# Check current environment
make check-env

# Make code changes...
# (Edit files in client/ or server/)

# See changes (auto-reload in development)
make logs

# Stop when done
make stop
```

### 🔄 **After Making Changes**
```bash
# Quick restart with rebuild
make clean

# Or complete reset if needed
make reset

# Check if everything is working
make health
make status
```

### 🌍 **Environment Management**

#### Check Current Environment
```bash
make check-env
```

#### Development Environment
```bash
# Start with live logs (foreground)
make dev

# Or start in background
NODE_ENV=development make start
make logs  # View logs separately
```

#### Staging Environment  
```bash
# Start staging environment
make staging

# Check status
make status

# View logs
make logs
```

#### Production Environment
```bash
# Start production environment
make prod

# Monitor
make stats
make health
```

---

## ⚙️ Configuration

### Environment Variables (.env)

The `.env` file contains all environment configuration:

```bash
# Application Settings
NODE_ENV=development
APP_NAME=fullstack-docker-app

# Port Configuration
FRONTEND_PORT=3000
BACKEND_PORT=5001

# Database Configuration (if needed)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=postgres
DB_PASSWORD=password

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=7d

# External URLs
API_BASE_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000

# Feature Flags
ENABLE_LOGGING=true
ENABLE_CORS=true
```

## 🔍 Monitoring & Troubleshooting

### 🏥 **Health Checks**

```bash
# Quick health check
make health

# Check current environment
make check-env

# Detailed status
make status

# Live monitoring
make logs
```

### 🐛 **Common Issues & Solutions**

#### ❌ **"Port already in use"**
```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :5001

# Stop conflicting processes or change ports in .env
make stop
make start
```

#### ❌ **"Container won't start"**
```bash
# Check logs for errors
make logs

# Try clean restart
make clean

# Nuclear option
make reset
```

#### ❌ **"Frontend can't connect to backend"**
```bash
# Check both containers are running
make status

# Test backend directly
curl http://localhost:5001/health

# Check network connectivity
docker-compose exec frontend curl http://backend:5001
```

#### ❌ **"Build failures"**
```bash
# Clean build without cache
make reset

# Check Docker disk space
make info

# Clean Docker system
docker system prune -f
```

#### ❌ **"Wrong environment running"**
```bash
# Check current environment
make check-env

# Change environment in .env file
echo "NODE_ENV=production" > .env

# Or use environment-specific commands
make prod    # Production
make dev     # Development
make staging # Staging
```

### 🔧 **Advanced Debugging**

#### Enter Running Container
```bash
# Enter frontend container
docker-compose exec frontend sh

# Enter backend container  
docker-compose exec backend sh

# Run commands inside container
npm list                # Check installed packages
env                     # Check environment variables
ls -la                  # Check files
```

#### Manual Container Management
```bash
# Start specific container only
docker-compose up frontend
docker-compose up backend

# View specific container logs
docker-compose logs frontend
docker-compose logs backend

# Restart specific container
docker-compose restart frontend
```

---

## 📊 API Documentation

### Backend Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/` | GET | Main API endpoint | Environment info |
| `/health` | GET | Health check | System status |

### Response Examples

#### Health Check (`GET /health`)
```json
{
  "status": "OK",
  "environment": "development", 
  "timestamp": "2025-08-25T08:00:00.000Z"
}
```

#### Main Endpoint (`GET /`)
```json
{
  "message": "Hello from Express backend! (development)",
  "environment": "development"
}
```
---

## 🔒 Security Best Practices

### Environment Variables
- ✅ **Never commit** `.env` files with real secrets
- ✅ **Use different** `.env` files for different environments  
- ✅ **Store production secrets** in secure vault systems
- ✅ **Rotate secrets** regularly

### Docker Security
- ✅ **Use specific image tags** instead of `latest`
- ✅ **Run containers as non-root** when possible
- ✅ **Regularly update** base images for security patches
- ✅ **Scan images** for vulnerabilities

### Network Security
- ✅ **Use CORS** properly configured for your domains
- ✅ **Validate inputs** on API endpoints
- ✅ **Use HTTPS** in production
- ✅ **Implement rate limiting**

---

## 🚀 Deployment Guide

### Development Deployment
```bash
# Start development environment
make dev

# Access via:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5001
```

### Staging Deployment  
```bash
# Start staging environment
make staging

# Configure load balancer to point to:
# - Frontend: http://your-server:3000
# - Backend: http://your-server:5001
```

### Production Deployment
```bash
# Update .env with production values
cp .env .env.production
# Edit .env with production settings

# Start production environment
make prod

# Monitor
make health
make stats
```

### Docker Hub Deployment
```bash
# Tag images
docker tag myapp-frontend:latest yourname/myapp-frontend:v1.0
docker tag myapp-backend:latest yourname/myapp-backend:v1.0

# Push to registry
docker push yourname/myapp-frontend:v1.0  
docker push yourname/myapp-backend:v1.0
```

---

## 🔧 Development Customization

### Adding New Backend Endpoints

1. **Edit `server/app.js`**:
```javascript
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});
```

2. **Restart backend**:
```bash
make restart
```

3. **Test endpoint**:
```bash
curl http://localhost:5001/api/users
```

### Adding Frontend Pages

1. **Create `client/pages/about.js`**:
```javascript
export default function About() {
  return <h1>About Page</h1>;
}
```

2. **Restart frontend**:
```bash
docker-compose restart frontend
```

3. **Access**: http://localhost:3000/about

### Adding Environment Variables

1. **Add to `.env`**:
```bash
NEW_FEATURE=true
API_KEY=your-api-key
```

2. **Use in backend (`server/app.js`)**:
```javascript
const newFeature = process.env.NEW_FEATURE === 'true';
const apiKey = process.env.API_KEY;
```

3. **Restart containers**:
```bash
make reset
```

---

## 🆘 Getting Help

### Quick Diagnostics
```bash
# Run these commands and share output if asking for help
make info         # System information
make status       # Container status
make logs         # Recent logs
make health       # Health check
make check-env    # Environment check

# System versions
docker --version
docker-compose --version
make --version
```

### Common Support Commands
```bash
# Show all available commands
make help

# Create backup before major changes
make backup
```

### Reset to Working State
```bash
# Clean restart (safe)
make clean

# Complete reset (removes containers)
make reset

# Nuclear option (removes everything)
make nuke
make simple
```

---

## 🤝 Contributing

### Development Setup for Contributors
```bash
# Fork repository and clone
git clone <your-fork-url>
cd <project-name>

# Start development environment
make dev

# Make changes...

# Test changes
make health
make logs

# Commit and push
git add .
git commit -m "feat: description of changes"
git push origin feature-branch-name
```

### Code Standards
- ✅ **Test locally** before pushing
- ✅ **Follow existing** file structure
- ✅ **Update documentation** for new features
- ✅ **Use meaningful** commit messages

---

## 🎉 Quick Reference Card

### **Essential Commands**
```bash
make simple      # Build and start everything
make stop        # Stop containers
make logs        # View logs
make status      # Check health
make reset       # Complete restart
make check-env   # Check current environment
make health      # Quick health check
```

### **Environment Commands**
```bash
make dev         # Development with logs
make staging     # Staging environment
make prod        # Production environment
```

### **URLs**
- 🌐 **Frontend**: http://localhost:3000
- 🔗 **Backend**: http://localhost:5001  
- 💚 **Health**: http://localhost:5001/health

### **Environment Check**
```bash
make check-env   # Shows current NODE_ENV, ports, container status
```

**🚀 Happy Coding! Your full-stack Docker application is ready for development!**

*Last updated: August 25, 2025*