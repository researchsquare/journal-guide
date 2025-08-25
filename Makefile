.PHONY: help build start stop restart logs status clean reset dev staging prod git-config simple nuke info check-env health

include .env
export

help:
	@echo "🐳 Docker Full Stack Management"
	@echo "==============================="
	@echo ""
	@echo "🚀 Environment Commands:"
	@echo "  make dev       - Run in development environment"
	@echo "  make staging   - Run in staging environment" 
	@echo "  make prod      - Run in production environment"
	@echo ""
	@echo "🔧 Docker Commands:"
	@echo "  make simple    - Simple build and start"
	@echo "  make build     - Build both containers"
	@echo "  make start     - Start both containers"
	@echo "  make stop      - Stop both containers"
	@echo "  make restart   - Restart both containers"
	@echo "  make reset     - Reset (stop, remove, rebuild, start)"
	@echo ""
	@echo "📊 Monitoring Commands:"
	@echo "  make logs      - View container logs"
	@echo "  make status    - Check container status"
	@echo "  make check-env - Check current environment"
	@echo "  make health    - Quick health check"
	@echo "  make info      - Show system information"
	@echo ""
	@echo "🔧 Maintenance Commands:"
	@echo "  make clean     - Clean restart with rebuild"
	@echo "  make nuke      - Nuclear option (remove everything)"
	@echo "  make git-config - Check config files for current environment"

simple: build start
	@echo "🎉 Simple setup complete!"
	@echo "🌐 Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "🔗 Backend: http://localhost:$(BACKEND_PORT)"

build:
	@echo "🏗️  Building both containers..."
	docker-compose build
	@echo "✅ Build complete!"

start:
	@echo "▶️  Starting containers ($(NODE_ENV) environment)..."
	docker-compose up -d
	@echo "✅ Containers started!"
	@echo "🌐 Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "🔗 Backend: http://localhost:$(BACKEND_PORT)"

stop:
	@echo "⏹️  Stopping both containers..."
	docker-compose stop
	@echo "✅ Containers stopped!"

restart:
	@echo "🔄 Restarting both containers..."
	docker-compose restart
	@echo "✅ Containers restarted!"

reset:
	@echo "🔄 Resetting application (stop → remove → rebuild → start)..."
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
	@echo "✅ Reset complete!"
	@echo "🌐 Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "🔗 Backend: http://localhost:$(BACKEND_PORT)"

dev:
	@echo "🚀 Starting in development environment..."
	@echo "Setting NODE_ENV=development"
	NODE_ENV=development docker-compose up --build

staging:
	@echo "🏗️  Starting in staging environment..."
	@echo "Setting NODE_ENV=staging"
	NODE_ENV=staging docker-compose up --build -d
	@echo "✅ Staging environment started!"
	@echo "🌐 Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "🔗 Backend: http://localhost:$(BACKEND_PORT)"

prod:
	@echo "🏭 Starting in production environment..."
	@echo "Setting NODE_ENV=production"
	NODE_ENV=production docker-compose up --build -d
	@echo "✅ Production environment started!"
	@echo "🌐 Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "🔗 Backend: http://localhost:$(BACKEND_PORT)"

logs:
	@echo "📊 Showing container logs (Ctrl+C to exit)..."
	docker-compose logs -f --timestamps

status:
	@echo "📈 Container Status (Environment: $(NODE_ENV)):"
	@echo ""
	@docker-compose ps
	@echo ""
	@echo "🔍 Port Check:"
	@echo "Frontend ($(FRONTEND_PORT)): $$(curl -s -o /dev/null -w "%%{http_code}" http://localhost:$(FRONTEND_PORT) 2>/dev/null || echo "Not accessible")"
	@echo "Backend ($(BACKEND_PORT)):  $$(curl -s -o /dev/null -w "%%{http_code}" http://localhost:$(BACKEND_PORT) 2>/dev/null || echo "Not accessible")"

clean:
	@echo "🧹 Clean restart (down → build → up)..."
	docker-compose down
	docker-compose build
	docker-compose up -d
	@echo "✅ Clean restart complete!"
	@echo "🌐 Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "🔗 Backend: http://localhost:$(BACKEND_PORT)"

nuke:
	@echo "💥 Nuclear option - destroying everything..."
	@echo "⚠️  This will remove containers, images, and volumes!"
	@read -p "Are you sure? [y/N]: " confirm && [ "$$confirm" = "y" ]
	docker-compose down -v
	docker rmi -f myapp-frontend:latest myapp-backend:latest || true
	docker system prune -f
	@echo "💀 Everything destroyed!"
	@echo "💡 Run 'make simple' to rebuild everything"

info:
	@echo "ℹ️  Docker System Information"
	@echo "============================="
	@echo ""
	@echo "🖼️  Project Images:"
	@docker images | grep -E "(myapp-|REPOSITORY)" || echo "No project images found"
	@echo ""
	@echo "📦 Containers:"
	@docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(journal-guide|NAMES)" || echo "No project containers found"
	@echo ""
	@echo "🔧 Current Environment:"
	@echo "NODE_ENV: $(NODE_ENV)"
	@echo "FRONTEND_PORT: $(FRONTEND_PORT)" 
	@echo "BACKEND_PORT: $(BACKEND_PORT)"
	@echo "APP_NAME: $(APP_NAME)"
	@echo ""
	@echo "💾 Docker Disk Usage:"
	@docker system df

git-config:
	@echo "📋 Git Status for $(NODE_ENV) Environment Config Files"
	@echo "======================================================"
	@echo ""
	@echo "🔍 Checking .env file:"
	@git status --porcelain .env 2>/dev/null || echo "  .env: Not in git repository"
	@echo ""
	@echo "🔍 Checking docker-compose.yml:"
	@git status --porcelain docker-compose.yml 2>/dev/null || echo "  docker-compose.yml: Not in git repository"
	@echo ""
	@echo "🔍 Checking Dockerfile files:"
	@git status --porcelain */Dockerfile 2>/dev/null || echo "  Dockerfiles: Not in git repository"
	@echo ""
	@echo "🔍 Current environment files to track:"
	@echo "  Environment: $(NODE_ENV)"
	@echo ""
	@echo "💡 Git commands:"
	@echo "  git add .                    # Add all changes"
	@echo "  git commit -m 'Update config' # Commit changes"
	@echo "  git status                   # Check status"

health:
	@echo "🏥 Health Check"
	@echo "=============="
	@echo "Frontend: $$(curl -s http://localhost:$(FRONTEND_PORT) >/dev/null && echo "✅ OK" || echo "❌ DOWN")"
	@echo "Backend:  $$(curl -s http://localhost:$(BACKEND_PORT)/health >/dev/null && echo "✅ OK" || echo "❌ DOWN")"

check-env:
	@echo "🔍 Current Environment Check"
	@echo "==========================="
	@echo "NODE_ENV: ${NODE_ENV:-development}"
	@echo "Frontend Port: ${FRONTEND_PORT}"
	@echo "Backend Port: ${BACKEND_PORT}"
	@echo ""
	@echo "📊 Container Status:"
	@docker-compose ps 2>/dev/null | grep -E "(frontend|backend)" || echo "No containers running"
	@echo ""
	@echo "🌐 API Environment Check:"
	@curl -s http://localhost:${BACKEND_PORT}/health 2>/dev/null | grep -o '"environment":"[^"]*"' || echo "Backend not accessible"

stats:
	@echo "📊 Container Resource Usage:"
	@docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" 2>/dev/null || echo "No running containers"

backup:
	@echo "💾 Creating backup of current configuration..."
	@mkdir -p backups
	@tar -czf backups/config-backup-$$(date +%Y%m%d-%H%M%S).tar.gz .env docker-compose.yml */Dockerfile */package.json 2>/dev/null || true
	@echo "✅ Backup created in backups/ directory"
