# AI Page Publisher

> AI가 생성한 React 페이지를 한 번의 push로 웹에 배포하세요.

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Claude, ChatGPT 또는 아무 AI로 페이지를 생성하세요. `src/App.jsx`에 붙여넣으세요. Push하면 끝.

## 빠른 시작

1. **AI에게 JSX 요청** — Claude, ChatGPT 등 AI에게 원하는 페이지를 **JSX 형식**의 React 컴포넌트로 생성해 달라고 하세요
2. **이 템플릿을 사용**하여 자신만의 저장소를 만드세요
3. **GitHub Pages 활성화** — **Settings → Pages**에서 Source를 **GitHub Actions**로 설정하세요
4. [`src/App.jsx`](src/App.jsx)를 AI가 생성한 JSX로 **교체**하세요
5. `main`에 **push** — 사이트가 `https://<사용자명>.github.io/<저장소명>/`에 게시됩니다

## 커스터마이즈 (선택사항)

| 항목 | 방법 |
| :-- | :-- |
| 페이지 제목과 설명 | [`index.html`](index.html)에서 `<title>`과 `<meta name="description">`을 수정하세요 |
| 커스텀 도메인 | [`public/CNAME`](public/CNAME)의 placeholder를 도메인으로 교체하고 (예: `mysite.com`), DNS를 GitHub Pages로 설정한 뒤, **Settings → Pages → Custom domain**에 같은 도메인을 입력하세요. 또는 **Settings → Secrets and variables → Actions → Variables**에서 `CUSTOM_DOMAIN` repository variable을 생성하세요 |

## 포함 항목

이 템플릿은 AI 생성 페이지에서 흔히 사용하는 모든 것이 사전 구성되어 있습니다:

- **React 18 + Vite + Tailwind CSS 3** — 현대적이고 빠른 제로 설정 빌드
- **40개 이상의 shadcn/ui 컴포넌트** `src/components/ui/`에 사전 설치
- **모든 Radix UI 프리미티브** 접근성 있는 인터랙션 지원
- **아이콘** — `lucide-react`, `react-icons`, `@heroicons/react`
- **차트** — `recharts`, `chart.js` + `react-chartjs-2`
- **애니메이션** — `framer-motion`, `react-spring`, `tailwindcss-animate`
- **폼** — `react-hook-form` + `@hookform/resolvers` + `zod`
- **3D** — `three`, `@react-three/fiber`, `@react-three/drei`
- **유틸리티** — `date-fns`, `lodash`, `axios`, `zustand`, `react-router-dom` 등 다수

> Tree-shaking 덕분에 실제로 사용하는 패키지만 최종 번들에 포함됩니다.

## 누락된 import 확인

AI 생성 코드가 사전 설치되지 않은 패키지를 사용하는 경우 실행하세요:

```bash
npm run check
```

소스 파일을 스캔하여 누락된 의존성을 정확한 `npm install` 명령어와 함께 알려줍니다.

## Base path 작동 방식

빌드 시 올바른 base path가 자동으로 감지됩니다:

| 시나리오 | Base path |
| :-- | :-- |
| 커스텀 도메인 (CNAME에 도메인 있음) | `/` |
| GitHub Pages (커스텀 도메인 없음) | `/<저장소명>/` |
| 로컬 개발 | `/` |

수동 설정이 필요 없습니다.

## 파일 구조

```
├── src/
│   ├── App.jsx              ← 이 파일을 교체하세요
│   ├── main.jsx             ← 진입점 (수정하지 마세요)
│   ├── index.css            ← Tailwind + shadcn 테마
│   ├── lib/utils.js         ← cn() 유틸리티
│   ├── hooks/use-toast.js   ← Toast hook
│   └── components/ui/       ← shadcn/ui 컴포넌트
├── public/
│   ├── CNAME                ← 커스텀 도메인 (선택사항)
│   └── favicon.svg          ← 사이트 아이콘
├── scripts/
│   └── check-imports.js     ← 누락된 의존성 감지
├── .github/workflows/
│   └── deploy.yml           ← GitHub Actions 배포
├── index.html               ← 페이지 제목과 meta 태그
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## shadcn/ui 컴포넌트 추가

템플릿에 40개 이상의 shadcn 컴포넌트가 포함되어 있습니다. 더 필요하면:

```bash
npx shadcn@latest add <컴포넌트명>
```

`components.json`이 이미 구성되어 있습니다.

## 로컬 개발

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`을 여세요.

## 문제 해결

**import 오류로 빌드 실패.**
`npm run check`를 실행하여 누락된 패키지를 확인하고 설치하세요.

**배포 후 페이지가 빈 화면.**
GitHub Pages의 Source가 "Deploy from a branch"가 아닌 **GitHub Actions**로 설정되어 있는지 확인하세요.

**커스텀 도메인이 작동하지 않음.**
`public/CNAME`에 도메인만 있는지 확인하세요. DNS 레코드도 점검하세요.
