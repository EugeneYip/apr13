# AI Page Publisher

> Publiez des pages React générées par IA sur le web en un seul push.

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Générez une page avec Claude, ChatGPT ou n'importe quelle IA. Collez-la dans `src/App.jsx`. Pushez. C'est fait.

## Démarrage rapide

1. **Demandez du JSX à votre IA** — dites à Claude, ChatGPT ou n'importe quelle IA de générer votre page en tant que composant React au **format JSX**
2. **Utilisez ce template** pour créer votre propre dépôt
3. **Activez GitHub Pages** — allez dans **Settings → Pages** et définissez Source sur **GitHub Actions**
4. **Remplacez** [`src/App.jsx`](src/App.jsx) par le JSX généré par l'IA
5. **Pushez** vers `main` — votre site sera en ligne à `https://<utilisateur>.github.io/<nom-du-dépôt>/`

## Personnaliser (Optionnel)

| Quoi | Comment |
| :-- | :-- |
| Titre et description de la page | Modifiez `<title>` et `<meta name="description">` dans [`index.html`](index.html) |
| Domaine personnalisé | Remplacez le placeholder dans [`public/CNAME`](public/CNAME) par votre domaine (ex : `monsite.com`), configurez le DNS pour GitHub Pages, et entrez le même domaine dans **Settings → Pages → Custom domain**. Vous pouvez aussi créer une variable de dépôt `CUSTOM_DOMAIN` dans **Settings → Secrets and variables → Actions → Variables** |

## Ce qui est inclus

Ce template est préconfiguré avec tout ce que les pages générées par IA utilisent couramment :

- **React 18 + Vite + Tailwind CSS 3** — build moderne, rapide, sans configuration
- **Plus de 40 composants shadcn/ui** préinstallés dans `src/components/ui/`
- **Toutes les primitives Radix UI** pour des interactions accessibles
- **Icônes** — `lucide-react`, `react-icons`, `@heroicons/react`
- **Graphiques** — `recharts`, `chart.js` avec `react-chartjs-2`
- **Animation** — `framer-motion`, `react-spring`, `tailwindcss-animate`
- **Formulaires** — `react-hook-form` avec `@hookform/resolvers` et `zod`
- **3D** — `three`, `@react-three/fiber`, `@react-three/drei`
- **Utilitaires** — `date-fns`, `lodash`, `axios`, `zustand`, `react-router-dom` et bien d'autres

> Le tree-shaking garantit que seuls les paquets réellement utilisés se retrouvent dans le bundle final.

## Vérifier les imports manquants

Si le code généré par l'IA utilise un paquet non préinstallé, exécutez :

```bash
npm run check
```

Cela analyse vos fichiers et signale les dépendances manquantes, avec la commande `npm install` exacte pour les corriger.

## Comment fonctionne le base path

Le build détecte automatiquement le bon base path :

| Scénario | Base path |
| :-- | :-- |
| Domaine personnalisé (CNAME avec un domaine) | `/` |
| GitHub Pages (sans domaine personnalisé) | `/<nom-du-dépôt>/` |
| Développement local | `/` |

Aucune configuration manuelle n'est nécessaire.

## Structure des fichiers

```
├── src/
│   ├── App.jsx              ← REMPLACEZ CE FICHIER
│   ├── main.jsx             ← Point d'entrée (ne pas toucher)
│   ├── index.css            ← Tailwind + thème shadcn
│   ├── lib/utils.js         ← Utilitaire cn()
│   ├── hooks/use-toast.js   ← Hook toast
│   └── components/ui/       ← Composants shadcn/ui
├── public/
│   ├── CNAME                ← Domaine personnalisé (optionnel)
│   └── favicon.svg          ← Icône du site
├── scripts/
│   └── check-imports.js     ← Détecte les dépendances manquantes
├── .github/workflows/
│   └── deploy.yml           ← Déploiement via GitHub Actions
├── index.html               ← Titre de la page et balises meta
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Ajouter plus de composants shadcn/ui

Le template inclut plus de 40 composants shadcn. Si vous en avez besoin de plus :

```bash
npx shadcn@latest add <nom-du-composant>
```

Le fichier `components.json` est préconfiguré.

## Développement local

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:5173` dans votre navigateur.

## Dépannage

**Le build échoue avec des erreurs d'import.**
Exécutez `npm run check` pour voir quels paquets manquent, puis installez-les.

**La page est blanche après le déploiement.**
Vérifiez que la source de GitHub Pages est définie sur **GitHub Actions**, pas sur « Deploy from a branch ».

**Le domaine personnalisé ne fonctionne pas.**
Vérifiez que `public/CNAME` contient uniquement votre domaine. Vérifiez vos enregistrements DNS.
