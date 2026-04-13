# AI Page Publisher

> Publish AI-generated React pages to the web in one push.

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Generate a page with Claude, ChatGPT, or any LLM. Paste it into `src/App.jsx`. Push. Done.

## Quick Start

1. **Ask your AI for JSX** — tell Claude, ChatGPT, or any LLM to generate your page as a React component in **JSX format**
2. **Use this template** to create your own repository
3. **Enable GitHub Pages** — go to **Settings → Pages** and set Source to **GitHub Actions**
4. **Replace** [`src/App.jsx`](src/App.jsx) with the JSX your AI generated
5. **Push** to `main` — your site will be live at `https://<username>.github.io/<repo-name>/`

## Customize (Optional)

| What | How |
| :-- | :-- |
| Page title & description | Edit `<title>` and `<meta name="description">` in [`index.html`](index.html) |
| Custom domain | Replace the placeholder in [`public/CNAME`](public/CNAME) with your domain (e.g. `mysite.com`), configure DNS for GitHub Pages, and set the same domain in **Settings → Pages → Custom domain**. Alternatively, set a repository variable named `CUSTOM_DOMAIN` in **Settings → Secrets and variables → Actions → Variables** |

## What's Included

This template comes pre-configured with everything AI artifacts commonly use:

- **React 18 + Vite + Tailwind CSS 3** — modern, fast, zero-config build
- **40+ shadcn/ui components** pre-installed in `src/components/ui/`
- **All Radix UI primitives** for accessible interactions
- **Icons** — `lucide-react`, `react-icons`, `@heroicons/react`
- **Charts** — `recharts`, `chart.js` + `react-chartjs-2`
- **Animation** — `framer-motion`, `react-spring`, `tailwindcss-animate`
- **Forms** — `react-hook-form` + `@hookform/resolvers` + `zod`
- **3D** — `three`, `@react-three/fiber`, `@react-three/drei`
- **Utilities** — `date-fns`, `lodash`, `axios`, `zustand`, `react-router-dom`, and many more

> Tree-shaking ensures only the packages your artifact actually uses end up in the final bundle.

## Check for Missing Imports

If your AI-generated artifact uses a package that is not pre-installed, run:

```bash
npm run check
```

This scans your source files and reports any missing dependencies, with the exact `npm install` command to fix them.

## How the Base Path Works

The build automatically detects the correct base path:

| Scenario | Base Path |
| :-- | :-- |
| Custom domain (CNAME has a domain) | `/` |
| GitHub Pages (no custom domain) | `/<repo-name>/` |
| Local development | `/` |

No manual configuration is needed.

## File Structure

```
├── src/
│   ├── App.jsx              ← REPLACE THIS FILE
│   ├── main.jsx             ← Entry point (do not touch)
│   ├── index.css            ← Tailwind + shadcn theme
│   ├── lib/utils.js         ← cn() utility
│   ├── hooks/use-toast.js   ← Toast hook
│   └── components/ui/       ← shadcn/ui components
├── public/
│   ├── CNAME                ← Custom domain (optional)
│   └── favicon.svg          ← Site icon
├── scripts/
│   └── check-imports.js     ← Detect missing dependencies
├── .github/workflows/
│   └── deploy.yml           ← GitHub Actions deployment
├── index.html               ← Page title and meta tags
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Adding More shadcn/ui Components

The template includes 40+ shadcn components. If you need more:

```bash
npx shadcn@latest add <component-name>
```

The `components.json` is pre-configured.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Troubleshooting

**Build fails with import errors.**
Run `npm run check` to see which packages are missing, then install them.

**Page is blank after deploy.**
Make sure GitHub Pages source is set to **GitHub Actions**, not "Deploy from a branch".

**Custom domain not working.**
Verify `public/CNAME` contains only your domain. Check your DNS records.
