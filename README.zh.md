# AI Page Publisher

> Push 一次，把 AI 生成的 React 頁面直接發佈上線。

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

用 Claude、ChatGPT 或任何 AI 生成你要的頁面，貼進 `src/App.jsx`，push 上去就完成了。

## 快速開始

1. **請 AI 生成 JSX** — 告訴 Claude、ChatGPT 或任何 AI，請它用 **JSX 格式**幫你生成想要的 React 頁面
2. **使用這個範本**建立自己的 repo
3. **啟用 GitHub Pages** — 到 **Settings → Pages**，把 Source 設成 **GitHub Actions**
4. 把 [`src/App.jsx`](src/App.jsx) **換成** AI 剛剛生成的 JSX
5. **Push** 到 `main` — 網站就會上線在 `https://<使用者名稱>.github.io/<repo 名稱>/`

## 自訂設定（選用）

| 項目 | 做法 |
| :-- | :-- |
| 頁面標題和描述 | 編輯 [`index.html`](index.html) 裡的 `<title>` 和 `<meta name="description">` |
| 自訂網域 | 把 [`public/CNAME`](public/CNAME) 裡的內容換成你的網域（例如 `mysite.com`），設定 DNS 指向 GitHub Pages，再到 **Settings → Pages → Custom domain** 填上同一個網域。或者到 **Settings → Secrets and variables → Actions → Variables** 新增名為 `CUSTOM_DOMAIN` 的 repository variable |

## 內建項目

這個範本已經預先裝好了 AI 生成頁面常用的所有套件：

- **React 18 + Vite + Tailwind CSS 3** — 現代、快速、零設定的 build 流程
- **40+ 個 shadcn/ui 元件** 已預裝在 `src/components/ui/`
- **所有 Radix UI 底層元件**，提供無障礙互動
- **圖示** — `lucide-react`、`react-icons`、`@heroicons/react`
- **圖表** — `recharts`、`chart.js` 搭配 `react-chartjs-2`
- **動畫** — `framer-motion`、`react-spring`、`tailwindcss-animate`
- **表單** — `react-hook-form` 搭配 `@hookform/resolvers` 與 `zod`
- **3D** — `three`、`@react-three/fiber`、`@react-three/drei`
- **常用工具** — `date-fns`、`lodash`、`axios`、`zustand`、`react-router-dom` 等等

> Tree-shaking 會自動把你沒用到的套件從最終的 bundle 裡拿掉。

## 檢查缺少的套件

如果 AI 生成的程式碼用到了沒預裝的套件，執行：

```bash
npm run check
```

這會掃描原始檔，把缺少的套件列出來，同時附上完整的 `npm install` 指令方便你直接安裝。

## Base path 是怎麼決定的

Build 的時候會自動偵測正確的 base path：

| 情境 | Base Path |
| :-- | :-- |
| 自訂網域（CNAME 有填網域） | `/` |
| GitHub Pages（沒有自訂網域） | `/<repo 名稱>/` |
| 本機開發 | `/` |

都不用自己設。

## 檔案結構

```
├── src/
│   ├── App.jsx              ← 要換的就是這個
│   ├── main.jsx             ← 進入點（不要動）
│   ├── index.css            ← Tailwind 與 shadcn 主題
│   ├── lib/utils.js         ← cn() 工具函式
│   ├── hooks/use-toast.js   ← Toast hook
│   └── components/ui/       ← shadcn/ui 元件
├── public/
│   ├── CNAME                ← 自訂網域（選用）
│   └── favicon.svg          ← 網站圖示
├── scripts/
│   └── check-imports.js     ← 偵測缺少的套件
├── .github/workflows/
│   └── deploy.yml           ← GitHub Actions 部署
├── index.html               ← 頁面標題與 meta 標籤
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 新增更多 shadcn/ui 元件

範本已經包含 40+ 個 shadcn 元件。需要更多的話，執行：

```bash
npx shadcn@latest add <元件名稱>
```

`components.json` 已經配好了。

## 本機開發

```bash
npm install
npm run dev
```

在瀏覽器打開 `http://localhost:5173`。

## 疑難排解

**Build 因為 import 錯誤失敗。**
執行 `npm run check` 看看缺了哪些套件，照提示裝就好。

**部署完頁面一片空白。**
確認 GitHub Pages 的 Source 是設在 **GitHub Actions**，不是「Deploy from a branch」。

**自訂網域沒 work。**
確認 `public/CNAME` 裡面只有你的網域，然後檢查一下 DNS 記錄。
