# Docker 部署文档

本文档介绍如何使用 Docker 部署 NextKit Next.js 应用。

## 📋 目录

- [前置要求](#前置要求)
- [快速开始](#快速开始)
- [环境变量配置](#环境变量配置)
- [部署方式](#部署方式)
  - [方式一：使用 Docker Compose（推荐）](#方式一使用-docker-compose推荐)
  - [方式二：单独使用 Docker](#方式二单独使用-docker)
- [生产环境部署](#生产环境部署)
- [常见问题](#常见问题)
- [维护与监控](#维护与监控)

---

## 🔧 前置要求

### 必需软件

- **Docker**: 版本 20.10 或更高
- **Docker Compose**: 版本 2.0 或更高（如果使用 docker-compose）
- **Node.js**: 22.x（仅用于本地开发）

### 验证安装

```bash
# 检查 Docker 版本
docker --version

# 检查 Docker Compose 版本
docker compose version
```

---

## 🚀 快速开始

### 方式一：使用部署脚本（推荐）

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd nextkit-nextjs-prisma-mongodb

# 2. 配置环境变量
cp env.example .env
# 编辑 .env 文件，设置必要的环境变量

# 3. 使用部署脚本一键部署
./scripts/docker-deploy.sh dev

# 4. 访问应用
# 应用地址: http://localhost:3000
```

### 方式二：手动部署

#### 1. 克隆项目

```bash
git clone <your-repo-url>
cd nextkit-nextjs-prisma-mongodb
```

#### 2. 配置环境变量

复制环境变量示例文件并修改配置：

```bash
cp env.example .env
```

编辑 `.env` 文件，设置以下关键变量：

```env
DATABASE_URL=mongodb://admin:password123@mongodb:27017/nextkit?authSource=admin
EXTERNAL_API_BASE_URL=http://your-api-server:port
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password123
```

#### 3. 启动服务

```bash
# 使用 Docker Compose 启动所有服务
docker compose up -d

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f app
```

#### 4. 访问应用

- **应用地址**: http://localhost:3000
- **MongoDB Express** (如果启用): http://localhost:8081

---

## ⚙️ 环境变量配置

### 必需环境变量

| 变量名                  | 说明               | 示例                                                                 |
| ----------------------- | ------------------ | -------------------------------------------------------------------- |
| `DATABASE_URL`          | MongoDB 连接字符串 | `mongodb://admin:password123@mongodb:27017/nextkit?authSource=admin` |
| `EXTERNAL_API_BASE_URL` | 外部 API 基础 URL  | `http://api.example.com`                                             |
| `NODE_ENV`              | 运行环境           | `production`                                                         |

### 可选环境变量

| 变量名                | 说明                | 默认值        |
| --------------------- | ------------------- | ------------- |
| `MONGO_ROOT_USERNAME` | MongoDB root 用户名 | `admin`       |
| `MONGO_ROOT_PASSWORD` | MongoDB root 密码   | `password123` |
| `MONGO_DATABASE`      | MongoDB 数据库名    | `nextkit`     |
| `PORT`                | 应用端口            | `3000`        |

### DATABASE_URL 格式说明

```
mongodb://[username:password@]host[:port][/database][?options]
```

**示例**：

- 本地 MongoDB: `mongodb://admin:password123@mongodb:27017/nextkit?authSource=admin`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/nextkit?retryWrites=true&w=majority`

---

## 🐳 部署方式

### 方式一：使用 Docker Compose（推荐）

Docker Compose 方式会自动管理应用和数据库的依赖关系，适合开发和中小型生产环境。

#### 启动服务

```bash
# 构建并启动所有服务
docker compose up -d

# 仅启动应用和数据库（不启动 mongo-express）
docker compose --profile tools up -d
```

#### 停止服务

```bash
# 停止所有服务
docker compose down

# 停止服务并删除数据卷（⚠️ 会删除数据库数据）
docker compose down -v
```

#### 查看日志

```bash
# 查看所有服务日志
docker compose logs -f

# 查看特定服务日志
docker compose logs -f app
docker compose logs -f mongodb
```

#### 重启服务

```bash
# 重启所有服务
docker compose restart

# 重启特定服务
docker compose restart app
```

#### 更新应用

```bash
# 重新构建并启动
docker compose up -d --build

# 仅重新构建应用（不重建数据库）
docker compose build app
docker compose up -d app
```

### 方式二：单独使用 Docker

如果需要更精细的控制，或者数据库已经单独部署，可以使用单独的 Docker 命令。

#### 1. 构建镜像

```bash
docker build -t nextkit-app:latest .
```

#### 2. 运行 MongoDB（如果未单独部署）

```bash
docker run -d \
  --name nextkit-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -e MONGO_INITDB_DATABASE=nextkit \
  -v mongodb_data:/data/db \
  mongo:7.0
```

#### 3. 运行应用

```bash
docker run -d \
  --name nextkit-app \
  -p 3000:3000 \
  --link nextkit-mongodb:mongodb \
  -e DATABASE_URL=mongodb://admin:password123@mongodb:27017/nextkit?authSource=admin \
  -e EXTERNAL_API_BASE_URL=http://your-api-server:port \
  -e NODE_ENV=production \
  nextkit-app:latest
```

#### 4. 使用环境变量文件

```bash
docker run -d \
  --name nextkit-app \
  -p 3000:3000 \
  --link nextkit-mongodb:mongodb \
  --env-file .env \
  nextkit-app:latest
```

---

## 🏭 生产环境部署

### 1. 安全配置

#### 修改默认密码

**⚠️ 重要**: 生产环境必须修改所有默认密码！

```env
# .env 文件
MONGO_ROOT_USERNAME=your_secure_username
MONGO_ROOT_PASSWORD=your_secure_password_here
MONGO_EXPRESS_USERNAME=admin
MONGO_EXPRESS_PASSWORD=another_secure_password
```

#### 使用外部数据库

如果使用 MongoDB Atlas 或其他托管数据库服务：

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/nextkit?retryWrites=true&w=majority
```

然后修改 `docker-compose.yml`，移除 `depends_on: mongodb` 和 `mongodb` 服务。

### 2. 使用反向代理（Nginx）

创建 `nginx.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. 使用 HTTPS（Let's Encrypt）

```bash
# 使用 certbot 获取 SSL 证书
certbot --nginx -d your-domain.com
```

### 4. 资源限制

在 `docker-compose.yml` 中添加资源限制：

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 1G
        reservations:
          cpus: "0.5"
          memory: 512M
```

### 5. 数据备份

#### MongoDB 备份脚本

创建 `backup-mongodb.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

docker exec nextkit-mongodb mongodump \
  --username admin \
  --password password123 \
  --authenticationDatabase admin \
  --out /data/backup/$DATE

docker cp nextkit-mongodb:/data/backup/$DATE $BACKUP_DIR/$DATE
docker exec nextkit-mongodb rm -rf /data/backup/$DATE

# 删除 7 天前的备份
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
```

设置定时任务（crontab）:

```bash
# 每天凌晨 2 点备份
0 2 * * * /path/to/backup-mongodb.sh
```

---

## 🔍 常见问题

### 1. 应用无法连接到数据库

**问题**: 应用启动后无法连接到 MongoDB

**解决方案**:

- 检查 `DATABASE_URL` 是否正确
- 确认 MongoDB 容器已启动: `docker compose ps`
- 检查网络连接: `docker compose exec app ping mongodb`
- 查看 MongoDB 日志: `docker compose logs mongodb`

### 2. Prisma Client 生成失败

**问题**: 构建时 Prisma Client 生成失败

**解决方案**:

```bash
# 确保 DATABASE_URL 在构建时可用
docker build --build-arg DATABASE_URL=$DATABASE_URL -t nextkit-app .
```

### 3. 端口已被占用

**问题**: 端口 3000 或 27017 已被占用

**解决方案**:

- 修改 `docker-compose.yml` 中的端口映射:
  ```yaml
  ports:
    - "3001:3000" # 使用 3001 端口
  ```

### 4. 容器内存不足

**问题**: 容器因内存不足被杀死

**解决方案**:

- 增加 Docker 内存限制
- 优化应用代码
- 使用资源限制配置（见生产环境部署）

### 5. 静态资源无法加载

**问题**: 图片、CSS 等静态资源 404

**解决方案**:

- 检查 `public` 目录是否正确复制到镜像
- 确认 Next.js 配置中的 `output: 'standalone'` 已启用

### 6. 环境变量未生效

**问题**: 修改 `.env` 后环境变量未更新

**解决方案**:

```bash
# 重新构建并启动
docker compose down
docker compose up -d --build
```

---

## 🛠️ 便捷脚本

项目提供了两个便捷脚本，简化 Docker 操作：

### 构建脚本 (`scripts/docker-build.sh`)

用于构建 Docker 镜像：

```bash
# 使用默认标签 (latest)
./scripts/docker-build.sh

# 使用自定义标签
./scripts/docker-build.sh v1.0.0
```

### 部署脚本 (`scripts/docker-deploy.sh`)

用于一键部署应用：

```bash
# 开发环境部署
./scripts/docker-deploy.sh dev

# 生产环境部署
./scripts/docker-deploy.sh prod
```

脚本会自动：

- 检查环境变量文件
- 停止现有容器
- 构建并启动服务
- 执行健康检查
- 显示服务状态

---

## 📊 维护与监控

### 查看容器状态

```bash
# 查看所有容器状态
docker compose ps

# 查看资源使用情况
docker stats
```

### 健康检查

应用包含健康检查配置，可以通过以下方式检查：

```bash
# 检查应用健康状态
curl http://localhost:3000/api/health

# 检查容器健康状态
docker inspect nextkit-app | grep -A 10 Health
```

### 日志管理

#### 查看实时日志

```bash
# 查看所有服务日志
docker compose logs -f

# 查看最近 100 行日志
docker compose logs --tail=100 app
```

#### 日志轮转

在 `docker-compose.yml` 中添加日志配置：

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 数据库管理

#### 使用 MongoDB Express（已包含）

```bash
# 启动 MongoDB Express
docker compose --profile tools up -d mongo-express

# 访问 http://localhost:8081
```

#### 使用 MongoDB Shell

```bash
# 进入 MongoDB Shell
docker compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin

# 查看数据库
show dbs

# 切换到数据库
use nextkit

# 查看集合
show collections
```

### 性能优化

1. **启用 Next.js 缓存**: 确保 `.next` 目录被正确缓存
2. **使用 CDN**: 将静态资源部署到 CDN
3. **数据库索引**: 在 Prisma schema 中添加适当的索引
4. **连接池**: 配置 MongoDB 连接池大小

---

## 📝 更新日志

### 版本 1.0.0

- 初始 Docker 部署配置
- 支持 Docker Compose 一键部署
- 包含 MongoDB 和 MongoDB Express
- 健康检查配置
- 生产环境优化

---

## 🔗 相关资源

- [Next.js Docker 部署文档](https://nextjs.org/docs/deployment#docker-image)
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [MongoDB Docker 镜像](https://hub.docker.com/_/mongo)
- [Prisma 部署指南](https://www.prisma.io/docs/guides/deployment)

---

## 📧 支持

如有问题，请提交 Issue 或联系项目维护者。
