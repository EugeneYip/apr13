# AI Page Publisher

> Publica páginas de React hechas con IA en la web, con un solo push.

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Genera una página con Claude, ChatGPT o la IA que prefieras. Pégala en `src/App.jsx`. Haz push. Ya.

## Inicio rápido

1. **Pide JSX a tu IA** — dile a Claude, ChatGPT o la IA que uses que te genere la página como un componente React en **formato JSX**
2. **Usa esta plantilla** para crear tu propio repo
3. **Activa GitHub Pages** — ve a **Settings → Pages** y pon Source en **GitHub Actions**
4. **Reemplaza** [`src/App.jsx`](src/App.jsx) con el JSX que te generó la IA
5. **Haz push** a `main` — tu sitio va a quedar en `https://<usuario>.github.io/<nombre-del-repo>/`

## Personalizar (Opcional)

| Qué | Cómo |
| :-- | :-- |
| Título y descripción de la página | Edita `<title>` y `<meta name="description">` en [`index.html`](index.html) |
| Dominio personalizado | Reemplaza el placeholder en [`public/CNAME`](public/CNAME) con tu dominio (ej. `misitio.com`), configura tu DNS para GitHub Pages y pon el mismo dominio en **Settings → Pages → Custom domain**. También puedes crear una variable de repositorio llamada `CUSTOM_DOMAIN` en **Settings → Secrets and variables → Actions → Variables** |

## Qué incluye

La plantilla ya viene con todo lo que las páginas hechas con IA suelen ocupar:

- **React 18 + Vite + Tailwind CSS 3** — build moderno, rápido y sin configurar nada
- **Más de 40 componentes de shadcn/ui** preinstalados en `src/components/ui/`
- **Todas las primitivas de Radix UI** para interacciones accesibles
- **Iconos** — `lucide-react`, `react-icons`, `@heroicons/react`
- **Gráficas** — `recharts`, `chart.js` con `react-chartjs-2`
- **Animación** — `framer-motion`, `react-spring`, `tailwindcss-animate`
- **Formularios** — `react-hook-form` con `@hookform/resolvers` y `zod`
- **3D** — `three`, `@react-three/fiber`, `@react-three/drei`
- **Utilidades** — `date-fns`, `lodash`, `axios`, `zustand`, `react-router-dom` y muchas más

> Con tree-shaking, al bundle final solo llegan los paquetes que de verdad usas.

## Revisar imports que falten

Si el código que te generó la IA usa algún paquete que no viene preinstalado, corre:

```bash
npm run check
```

Esto escanea tus archivos y te dice qué dependencias faltan, con el comando exacto de `npm install` para instalarlas.

## Cómo funciona el base path

El build detecta automáticamente el base path correcto:

| Escenario | Base path |
| :-- | :-- |
| Dominio personalizado (CNAME con dominio) | `/` |
| GitHub Pages (sin dominio personalizado) | `/<nombre-del-repo>/` |
| Desarrollo local | `/` |

No hay que configurar nada a mano.

## Estructura de archivos

```
├── src/
│   ├── App.jsx              ← REEMPLAZA ESTE ARCHIVO
│   ├── main.jsx             ← Punto de entrada (no tocar)
│   ├── index.css            ← Tailwind y tema de shadcn
│   ├── lib/utils.js         ← Utilidad cn()
│   ├── hooks/use-toast.js   ← Hook de toast
│   └── components/ui/       ← Componentes de shadcn/ui
├── public/
│   ├── CNAME                ← Dominio personalizado (opcional)
│   └── favicon.svg          ← Icono del sitio
├── scripts/
│   └── check-imports.js     ← Detecta dependencias faltantes
├── .github/workflows/
│   └── deploy.yml           ← Deploy con GitHub Actions
├── index.html               ← Título de la página y meta tags
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Agregar más componentes de shadcn/ui

La plantilla ya trae más de 40 componentes de shadcn. Si te faltan más, corre:

```bash
npx shadcn@latest add <nombre-del-componente>
```

`components.json` ya viene configurado.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## Solución de problemas

**El build truena por errores de import.**
Corre `npm run check` para ver qué paquetes faltan y los instalas.

**La página sale en blanco después del deploy.**
Revisa que la Source de GitHub Pages esté en **GitHub Actions**, no en "Deploy from a branch".

**El dominio personalizado no jala.**
Verifica que `public/CNAME` tenga solo tu dominio, y revisa tus registros DNS.
