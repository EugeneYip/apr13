# AI Page Publisher

> AI が生成した React ページを、たった 1 回の push でウェブに公開。

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Claude、ChatGPT、お好きな LLM でページを生成して、`src/App.jsx` に貼り付けて push。それだけで完了です。

## クイックスタート

1. **AI に JSX で生成してもらう** — Claude、ChatGPT などに、作りたいページを **JSX 形式**の React コンポーネントとして書いてもらいます
2. **このテンプレートを使って**自分のリポジトリを作成
3. **GitHub Pages を有効化** — **Settings → Pages** で Source を **GitHub Actions** に設定
4. [`src/App.jsx`](src/App.jsx) を AI が生成した JSX に**差し替え**
5. `main` ブランチに **push** — `https://<ユーザー名>.github.io/<リポジトリ名>/` でサイトが公開されます

## カスタマイズ（任意）

| 項目 | やり方 |
| :-- | :-- |
| ページタイトルと説明 | [`index.html`](index.html) の `<title>` と `<meta name="description">` を編集 |
| カスタムドメイン | [`public/CNAME`](public/CNAME) のプレースホルダーを自分のドメイン（例: `mysite.com`）に書き換え、DNS を GitHub Pages に向けて、**Settings → Pages → Custom domain** に同じドメインを入力。または **Settings → Secrets and variables → Actions → Variables** で `CUSTOM_DOMAIN` という repository variable を追加してもOK |

## 含まれているもの

AI が作るページでよく使うものは、このテンプレートに最初からひと通り揃っています。

- **React 18 + Vite + Tailwind CSS 3** — モダンで速い、設定不要のビルド環境
- **shadcn/ui コンポーネント 40 種以上** を `src/components/ui/` にプリインストール済み
- **Radix UI のプリミティブ一式** でアクセシブルな操作に対応
- **アイコン** — `lucide-react`、`react-icons`、`@heroicons/react`
- **チャート** — `recharts`、`chart.js` と `react-chartjs-2`
- **アニメーション** — `framer-motion`、`react-spring`、`tailwindcss-animate`
- **フォーム** — `react-hook-form` と `@hookform/resolvers`、`zod`
- **3D** — `three`、`@react-three/fiber`、`@react-three/drei`
- **ユーティリティ** — `date-fns`、`lodash`、`axios`、`zustand`、`react-router-dom` など多数

> Tree-shaking が効くので、実際に使っているパッケージだけが最終バンドルに残ります。

## 足りない依存のチェック

AI が生成したコードがプリインストールされていないパッケージを使っているときは、次を実行してください。

```bash
npm run check
```

ソースファイルをスキャンして、足りない依存を `npm install` コマンドつきで一覧で教えてくれます。

## ベースパスの仕組み

ビルド時に正しいベースパスが自動で検出されます。

| シナリオ | ベースパス |
| :-- | :-- |
| カスタムドメイン（CNAME にドメインあり） | `/` |
| GitHub Pages（カスタムドメインなし） | `/<リポジトリ名>/` |
| ローカル開発 | `/` |

手動設定は必要ありません。

## ファイル構成

```
├── src/
│   ├── App.jsx              ← このファイルを差し替え
│   ├── main.jsx             ← エントリーポイント（触らない）
│   ├── index.css            ← Tailwind と shadcn テーマ
│   ├── lib/utils.js         ← cn() ユーティリティ
│   ├── hooks/use-toast.js   ← トースト hook
│   └── components/ui/       ← shadcn/ui コンポーネント
├── public/
│   ├── CNAME                ← カスタムドメイン（任意）
│   └── favicon.svg          ← サイトアイコン
├── scripts/
│   └── check-imports.js     ← 足りない依存を検出
├── .github/workflows/
│   └── deploy.yml           ← GitHub Actions デプロイ
├── index.html               ← ページタイトルと meta タグ
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## shadcn/ui コンポーネントを追加する

テンプレートには 40 以上の shadcn コンポーネントが入っています。もっと欲しい場合は次を実行してください。

```bash
npx shadcn@latest add <コンポーネント名>
```

`components.json` は設定済みです。

## ローカル開発

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

## トラブルシューティング

**ビルドが import エラーで落ちる**
`npm run check` で足りないパッケージを確認して、そのままインストールしてください。

**デプロイ後にページが真っ白**
GitHub Pages の Source が「Deploy from a branch」ではなく **GitHub Actions** になっているか確認してください。

**カスタムドメインが効かない**
`public/CNAME` に自分のドメインだけが書かれているか、DNS レコードも合わせて確認してください。
