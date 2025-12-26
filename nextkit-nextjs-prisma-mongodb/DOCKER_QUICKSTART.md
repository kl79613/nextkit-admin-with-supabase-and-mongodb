# Docker 快速开始指南

## 🚀 一键部署

```bash
# 1. 配置环境变量
cp env.example .env
# 编辑 .env 文件

# 2. 启动服务
./scripts/docker-deploy.sh dev

# 3. 访问应用
open http://localhost:3000
```

## 📋 常用命令

### 启动/停止服务

```bash
# 启动所有服务
docker compose up -d

# 停止所有服务
docker compose down

# 重启服务
docker compose restart
```

### 查看日志

```bash
# 查看所有日志
docker compose logs -f

# 查看应用日志
docker compose logs -f app

# 查看数据库日志
docker compose logs -f mongodb
```

### 进入容器

```bash
# 进入应用容器
docker compose exec app sh

# 进入数据库容器
docker compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

### 数据库备份

```bash
# 备份数据库
docker compose exec mongodb mongodump --username admin --password password123 --authenticationDatabase admin --out /data/backup

# 恢复数据库
docker compose exec mongodb mongorestore --username admin --password password123 --authenticationDatabase admin /data/backup
```

## 🔧 环境变量

必需的环境变量：

- `DATABASE_URL` - MongoDB 连接字符串
- `EXTERNAL_API_BASE_URL` - 外部 API 地址
- `NODE_ENV` - 运行环境 (production/development)

## 📚 详细文档

查看 [Docker部署文档.md](./Docker部署文档.md) 获取完整部署指南。

