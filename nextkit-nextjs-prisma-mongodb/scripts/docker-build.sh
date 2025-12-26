#!/bin/bash

# Docker 构建脚本
# 使用方法: ./scripts/docker-build.sh [tag]

set -e

# 默认标签
TAG=${1:-latest}
IMAGE_NAME="nextkit-app"

echo "🚀 开始构建 Docker 镜像..."
echo "📦 镜像名称: ${IMAGE_NAME}:${TAG}"

# 构建镜像
docker build -t ${IMAGE_NAME}:${TAG} .

echo "✅ 构建完成!"
echo "📋 镜像信息:"
docker images | grep ${IMAGE_NAME} | head -1

echo ""
echo "💡 运行镜像:"
echo "   docker run -d -p 3000:3000 --env-file .env ${IMAGE_NAME}:${TAG}"
echo ""
echo "💡 推送到仓库:"
echo "   docker tag ${IMAGE_NAME}:${TAG} your-registry/${IMAGE_NAME}:${TAG}"
echo "   docker push your-registry/${IMAGE_NAME}:${TAG}"

