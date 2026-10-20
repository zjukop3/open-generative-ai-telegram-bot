# Open Generative AI Telegram Bot 🤖

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-green.svg)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)
<br/>
[🇨🇳 中文](#中文) | [🇬🇧 English](#english)

---

## 中文

### 为什么有这个项目？

[Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI) 是一个强大的开源 AI 图像与视频生成工作室，拥有 600+ 模型且无内容审查。然而，它缺少一个便捷的移动端交互方式。本机器人将其封装为 Telegram Bot，让用户可以随时随地通过聊天命令生成图像、视频和唇形同步内容，完全无审查、无订阅费。

> **这不是主项目的替代品，而是其生态的补充**：所有生成能力仍然依赖主项目（或兼容的 MuAPI 后端），本仓库只提供 Telegram 前端接口。

### ✨ 特性

- 🎨 **文生图**：使用 Flux、Midjourney、Stable Diffusion 等模型
- 🎥 **文生视频**：调用 Sora、Kling、Veo 等模型
- 👄 **唇形同步**：驱动人物照片说话
- 🔓 **无审查**：无内容滤镜，自由创作
- 🤖 **Telegram 命令**：简单直观的 /generate 命令
- 🔌 **可配置后端**：支持自托管 Open Generative AI 实例或 MuAPI 云服务
- 🌍 **多用户**：天然支持群聊和私聊

### 📦 安装

```bash
git clone https://github.com/your-username/open-generative-ai-telegram-bot.git
cd open-generative-ai-telegram-bot
npm install
```

复制 `.env.example` 为 `.env` 并填写配置：

```dotenv
# 必填 - 从 @BotFather 获取
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# 必填 - 主项目 API 地址（自托管或 MuAPI）
OPEN_GENAI_API_BASE=https://your-instance.com/api

# 可选 - MuAPI 密钥（如果使用 MuAPI）
MUAPI_KEY=your_muapi_key
```

### 🚀 快速上手

```bash
npm start
```

在 Telegram 中与你的机器人对话，发送：

```
/start
/help
/generate a cat flying in space --mode image --model flux
/generate a woman dancing on the beach --mode video --model sora
/generate make this person say hello --mode lipsync --image https://example.com/face.jpg --audio https://example.com/audio.mp3
```

### 🔗 与主项目的关系

本仓库是 [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI) 的附属项目（二创），它不是一个独立的应用，必须连接到一个 Open Generative AI 实例或兼容的 MuAPI 端点。我们尊重并感谢主项目提供的卓越能力，在此基础上提供了 Telegram 交互层，让更多用户能够方便地使用这些模型。

- 主项目地址：https://github.com/Anil-matcha/Open-Generative-AI
- 本仓库不会包含模型代码或推理逻辑，仅负责消息路由与媒体返回。

### 🗺 Roadmap

- [x] 基础 Telegram Bot 框架
- [x] 文生图、文生视频、唇形同步命令
- [ ] 多语言提示词界面
- [ ] 内联模式（@bot prompt）
- [ ] 任务队列与进度通知
- [ ] 管理员面板（查询用量、黑名单）
- [ ] 更好的模型发现与说明

### 📄 License

MIT © 2025 [Your Name]

---

## English

### Why this project?

[Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI) is a powerful open-source AI image & video generation studio with 600+ models and no content filters. However, it lacks a mobile-friendly interface. This bot wraps it into a Telegram Bot, so you can generate images, videos, and lip-sync animations from any chat, on the go, without any censorship or subscription fees.

> **This is not a replacement for the main project, but a companion** – all generation still happens through a running Open Generative AI instance (or compatible MuAPI). This repo only provides the Telegram frontend.

### ✨ Features

- 🎨 **Text-to-Image** with Flux, Midjourney, Stable Diffusion, etc.
- 🎥 **Text-to-Video** with Sora, Kling, Veo, and more
- 👄 **Lip Sync** – animate a portrait to speak an audio clip
- 🔓 **Unrestricted** – no content filters, creative freedom
- 🤖 **Telegram commands** – simple /generate syntax
- 🔌 **Configurable backend** – self-hosted Open GenAI or MuAPI cloud
- 🌍 **Multi-user** – works in groups and private chats

### 📦 Installation

```bash
git clone https://github.com/your-username/open-generative-ai-telegram-bot.git
cd open-generative-ai-telegram-bot
npm install
```

Copy `.env.example` to `.env` and fill in:

```dotenv
# Required - from @BotFather
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Required - URL of your Open Generative AI instance or MuAPI endpoint
OPEN_GENAI_API_BASE=https://your-instance.com/api

# Optional - MuAPI key if using MuAPI
MUAPI_KEY=your_muapi_key
```

### 🚀 Quick Start

```bash
npm start
```

Chat with your bot on Telegram:

```
/start
/help
/generate a cat flying in space --mode image --model flux
/generate a woman dancing on the beach --mode video --model sora
/generate make this person say hello --mode lipsync --image https://example.com/face.jpg --audio https://example.com/audio.mp3
```

### 🔗 Relationship with the main project

This is a **secondary repo** for [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI). It does not work standalone – it must be connected to a running Open Generative AI instance or a compatible MuAPI endpoint. We build on top of the main project’s incredible model coverage and unrestricted philosophy to bring it to Telegram. All respect and credit go to the original project maintainers.

- Main project: https://github.com/Anil-matcha/Open-Generative-AI
- This bot does not include model logic or inference – only message routing and media delivery.

### 🗺 Roadmap

- [x] Basic Telegram bot framework
- [x] Text-to-Image, Text-to-Video, Lip Sync commands
- [ ] Multi-language prompt UI
- [ ] Inline mode (@bot prompt)
- [ ] Job queue with progress updates
- [ ] Admin panel (usage stats, ban list)
- [ ] Better model discovery and help

### 📄 License

MIT © 2025 [Your Name]
