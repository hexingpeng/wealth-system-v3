# 财富产品推荐系统 💰

## 🚀 项目简介

智能财富产品推荐系统，基于现代 Web 技术构建，提供理财产品推荐和管理功能。

## ⚡ 快速开始

### 🦕 Deno Deploy 云端部署（推荐）
1. Fork 本仓库到您的 GitHub 账户
2. 访问 [Deno Deploy](https://dash.deno.com)
3. 连接 GitHub 仓库，选择 `main-stable.ts` 作为入口文件
4. 部署完成！

### 💻 本地开发
```bash
# 安装 Deno
deno run --allow-net main-stable.ts
# 或使用传统 Node.js 方式
npm install && npm start
```

访问：https://your-project.deno.dev 或 http://localhost:8888

## 🎯 核心功能

- ✅ **智能产品推荐** - 基于风险评估的个性化推荐
- ✅ **实时市场数据** - 多数据源整合，实时更新
- ✅ **投资分析工具** - 专业的产品分析和预测
- ✅ **Excel导入导出** - 批量数据管理
- ✅ **推荐话术生成** - AI辅助销售话术
- ✅ **数据安全** - 完全本地化存储，符合合规要求

## 📱 主要界面

| 功能 | 地址 | 说明 |
|------|------|------|
| **系统首页** | http://localhost:8888 | 产品搜索和推荐 |
| **产品管理** | http://localhost:8888/product-management/ | 产品增删改查 |
| **API接口** | http://localhost:8888/api/products | RESTful API |

## 🔧 系统要求

- **操作系统**: Windows 7+ / macOS 10.12+ / Linux
- **运行环境**: Node.js 14+
- **内存**: 最低2GB，推荐4GB
- **磁盘**: 500MB可用空间

## 🛠️ 其他部署方式

### Docker部署
```bash
docker-compose up -d
```

### Windows系统服务
```bash
# 以管理员身份运行
安装为Windows服务.bat
```

## 📊 数据管理

### 数据存储
- **数据库**: SQLite (./data/database.db)
- **备份数据**: JSON格式 (./data/*.json)
- **导出文件**: Excel格式 (./exports/)

### 数据导入
1. 生成模板：访问产品管理页面
2. 填写数据：按模板格式填写
3. 批量导入：上传Excel文件

## 🔐 安全特性

- 🛡️ **数据本地化** - 所有数据存储在本地
- 🔒 **访问控制** - IP白名单和端口配置
- 📝 **审计日志** - 完整的操作记录
- 🔄 **数据备份** - 自动备份和恢复

## ⚙️ 配置说明

主要配置文件：`.env`

```env
# 基础配置
PORT=8888                    # 服务端口
NODE_ENV=production          # 运行环境

# 阿里云OSS配置（可选）
ALIYUN_ACCESS_KEY_ID=your_key
ALIYUN_ACCESS_KEY_SECRET=your_secret
ALIYUN_OSS_BUCKET=your_bucket
```

## 🆘 常见问题

### Q: 端口被占用怎么办？
A: 修改 `.env` 文件中的 `PORT=8889`

### Q: 如何重置数据？
A: 删除 `data/` 目录，重新运行 `一键部署.bat`

### Q: 如何备份数据？
A: 复制整个 `data/` 目录

### Q: 系统运行缓慢？
A: 检查内存使用，建议4GB+内存

## 📞 技术支持

- 📧 **邮件**: support@wealth-system.com
- 📱 **电话**: 400-xxx-xxxx  
- 💬 **QQ群**: xxx-xxx-xxx

## 📄 许可证

本项目仅供学习和商业使用，请勿用于非法用途。

---

> 💡 **提示**: 首次部署建议运行 `一键部署.bat`，系统会自动完成所有配置！