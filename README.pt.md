# AI Page Publisher

> Publique páginas React geradas por IA na web com um único push.

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Gere uma página com o Claude, ChatGPT ou qualquer IA. Cole em `src/App.jsx`. Faça push. Pronto.

## Início rápido

1. **Peça JSX à sua IA** — diga ao Claude, ChatGPT ou qualquer IA para gerar a página que você quer como componente React em **formato JSX**
2. **Use este template** para criar o seu próprio repositório
3. **Ative o GitHub Pages** — vá em **Settings → Pages** e defina Source como **GitHub Actions**
4. **Substitua** [`src/App.jsx`](src/App.jsx) pelo JSX que a IA gerou
5. **Faça push** para `main` — seu site estará no ar em `https://<usuario>.github.io/<nome-do-repo>/`

## Personalizar (Opcional)

| O quê | Como |
| :-- | :-- |
| Título e descrição da página | Edite `<title>` e `<meta name="description">` em [`index.html`](index.html) |
| Domínio personalizado | Substitua o placeholder em [`public/CNAME`](public/CNAME) pelo seu domínio (ex: `meusite.com`), configure o DNS para o GitHub Pages e coloque o mesmo domínio em **Settings → Pages → Custom domain**. Ou crie uma variável de repositório chamada `CUSTOM_DOMAIN` em **Settings → Secrets and variables → Actions → Variables** |

## O que está incluído

Este template já vem com tudo que páginas geradas por IA costumam usar:

- **React 18 + Vite + Tailwind CSS 3** — build moderno, rápido e sem configuração
- **40+ componentes shadcn/ui** pré-instalados em `src/components/ui/`
- **Todas as primitivas Radix UI** para interações acessíveis
- **Ícones** — `lucide-react`, `react-icons`, `@heroicons/react`
- **Gráficos** — `recharts`, `chart.js` com `react-chartjs-2`
- **Animação** — `framer-motion`, `react-spring`, `tailwindcss-animate`
- **Formulários** — `react-hook-form` com `@hookform/resolvers` e `zod`
- **3D** — `three`, `@react-three/fiber`, `@react-three/drei`
- **Utilitários** — `date-fns`, `lodash`, `axios`, `zustand`, `react-router-dom` e muitos mais

> O tree-shaking garante que só os pacotes que você realmente usa vão para o bundle final.

## Verificar imports faltantes

Se o código gerado pela IA usa um pacote que não veio pré-instalado, execute:

```bash
npm run check
```

Isso escaneia seus arquivos e lista as dependências que estão faltando, com o comando exato de `npm install` para corrigir.

## Como o base path funciona

O build detecta automaticamente o base path correto:

| Cenário | Base path |
| :-- | :-- |
| Domínio personalizado (CNAME com domínio) | `/` |
| GitHub Pages (sem domínio personalizado) | `/<nome-do-repo>/` |
| Desenvolvimento local | `/` |

Nenhuma configuração manual é necessária.

## Estrutura de arquivos

```
├── src/
│   ├── App.jsx              ← SUBSTITUA ESTE ARQUIVO
│   ├── main.jsx             ← Ponto de entrada (não mexa)
│   ├── index.css            ← Tailwind + tema shadcn
│   ├── lib/utils.js         ← Utilitário cn()
│   ├── hooks/use-toast.js   ← Hook de toast
│   └── components/ui/       ← Componentes shadcn/ui
├── public/
│   ├── CNAME                ← Domínio personalizado (opcional)
│   └── favicon.svg          ← Ícone do site
├── scripts/
│   └── check-imports.js     ← Detecta dependências faltantes
├── .github/workflows/
│   └── deploy.yml           ← Deploy com GitHub Actions
├── index.html               ← Título da página e meta tags
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Adicionar mais componentes shadcn/ui

O template já inclui 40+ componentes shadcn. Se precisar de mais:

```bash
npx shadcn@latest add <nome-do-componente>
```

O `components.json` já está configurado.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

## Solução de problemas

**Build falha com erros de import.**
Execute `npm run check` para ver quais pacotes estão faltando e instale-os.

**Página em branco após o deploy.**
Verifique se o Source do GitHub Pages está em **GitHub Actions**, não em "Deploy from a branch".

**Domínio personalizado não funciona.**
Confirme que `public/CNAME` contém apenas o seu domínio. Verifique seus registros DNS.
