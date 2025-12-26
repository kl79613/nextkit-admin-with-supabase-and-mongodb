#!/bin/bash

# Docker 部署脚本
# 使用方法: ./scripts/docker-deploy.sh [environment]
# environment: dev (默认) 或 prod

set -e

ENVIRONMENT=${1:-dev}
COMPOSE_FILE="docker-compose.yml"

if [ "$ENVIRONMENT" = "prod" ]; then
  COMPOSE_FILE="docker-compose.prod.yml"
fi

echo "🚀 开始部署应用 (环境: ${ENVIRONMENT})..."
echo "📄 使用配置文件: ${COMPOSE_FILE}"

# 检查 .env 文件
if [ ! -f .env ]; then
  echo "⚠️  警告: .env 文件不存在，请先创建并配置环境变量"
  echo "💡 提示: 可以复制 env.example 文件: cp env.example .env"
  read -p "是否继续? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# 停止现有容器
echo "🛑 停止现有容器..."
docker compose -f ${COMPOSE_FILE} down

# 构建并启动
echo "🔨 构建并启动服务..."
docker compose -f ${COMPOSE_FILE} up -d --build

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "📊 服务状态:"
docker compose -f ${COMPOSE_FILE} ps

# 检查健康状态
echo ""
echo "🏥 健康检查..."
sleep 5
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
  echo "✅ 应用健康检查通过"
else
  echo "⚠️  应用健康检查失败，请查看日志: docker compose -f ${COMPOSE_FILE} logs app"
fi

echo ""
echo "✅ 部署完成!"
echo "📋 查看日志: docker compose -f ${COMPOSE_FILE} logs -f"
echo "🌐 应用地址: http://localhost:3000"

