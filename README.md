# 羽毛球今日技术卡

一个用于抖音、小红书短视频录屏的羽毛球训练抽卡网页工具。打开网页后可以随机抽取「今日宜杀球」「今日忌抡大臂」「今日挑战高远球100颗」等技术卡，并支持拍摄模式、保存 PNG、复制视频标题。

## 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- html2canvas
- 本地静态卡片数据，不需要数据库、不需要登录

## 环境要求

建议使用：

- Node.js 20.11 或更高版本
- npm 10 或更高版本

如果你使用 nvm，可以执行：

```bash
nvm use
```

项目根目录的 `.nvmrc` 推荐使用 Node 22。

## 在另一台电脑运行

1. 克隆或下载项目到本地。
2. 进入项目目录。
3. 安装依赖：

```bash
npm install
```

4. 启动开发环境：

```bash
npm run dev
```

5. 打开浏览器访问：

```text
http://localhost:3000
```

如果 3000 端口被占用，可以换端口：

```bash
npm run dev -- --port 3010
```

然后访问：

```text
http://localhost:3010
```

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 如何修改

- 修改卡片数据：`src/data/cards.ts`
- 修改卡片字段类型：`src/types/card.ts`
- 修改首页逻辑：`src/app/page.tsx`
- 修改全局样式和 9:16 舞台：`src/app/globals.css`
- 修改卡片展示：`src/components/TechniqueCardView.tsx`
- 修改背景光效：`src/components/ArenaBackground.tsx`
- 修改卡组切换：`src/components/CategoryTabs.tsx`
- 修改按钮样式：`src/components/ActionButton.tsx`

## 功能

- 8 个卡组，每组 10 张卡，共 80 张。
- 点击「开始抽卡」触发 1.5 秒翻转和随机文字动画。
- 支持重新抽卡、切换卡组。
- 拍摄模式会隐藏常规控件，只保留背景和卡片，点击屏幕继续抽下一张。
- 保存图片会用 html2canvas 导出 9:16 竖屏 PNG。
- 复制标题会复制当前卡片的视频开场钩子。

## 录屏建议

移动端竖屏打开页面，进入「拍摄模式」后录屏。页面按照 9:16 舞台构图设计，适合 1080×1920 短视频封面和素材拍摄。

## 说明

仓库没有提交 `node_modules/` 和 `.next/`。换电脑后执行 `npm install` 即可安装依赖。
