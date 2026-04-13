# AI Page Publisher

> AI से बनाए गए React पेज को एक ही push में वेब पर पब्लिश करें।

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Claude, ChatGPT या किसी भी AI से पेज बनवाएँ। `src/App.jsx` में पेस्ट करें। Push करें। बस हो गया।

## शुरू करें

1. **AI से JSX माँगें** — Claude, ChatGPT या किसी भी AI से अपना पेज **JSX फ़ॉर्मेट** में React कंपोनेंट के रूप में बनवाएँ
2. **इस टेम्पलेट का उपयोग करें** अपना रिपॉज़िटरी बनाने के लिए
3. **GitHub Pages चालू करें** — **Settings → Pages** में जाएँ और Source को **GitHub Actions** पर सेट करें
4. [`src/App.jsx`](src/App.jsx) को AI द्वारा बनाए गए JSX से **बदलें**
5. `main` पर **push करें** — आपकी साइट `https://<username>.github.io/<repo-name>/` पर लाइव हो जाएगी

## कस्टमाइज़ करें (वैकल्पिक)

| क्या | कैसे |
| :-- | :-- |
| पेज का टाइटल और विवरण | [`index.html`](index.html) में `<title>` और `<meta name="description">` एडिट करें |
| कस्टम डोमेन | [`public/CNAME`](public/CNAME) में placeholder को अपने डोमेन से बदलें (जैसे `mysite.com`), DNS को GitHub Pages पर पॉइंट करें, और वही डोमेन **Settings → Pages → Custom domain** में डालें। या **Settings → Secrets and variables → Actions → Variables** में `CUSTOM_DOMAIN` नाम का repository variable बनाएँ |

## इसमें क्या शामिल है

यह टेम्पलेट AI से बने पेज में आमतौर पर इस्तेमाल होने वाली हर चीज़ के साथ पहले से तैयार है:

- **React 18 + Vite + Tailwind CSS 3** — आधुनिक, तेज़, बिना सेटअप वाला बिल्ड
- **40+ shadcn/ui कंपोनेंट** `src/components/ui/` में पहले से इंस्टॉल
- **सभी Radix UI प्रिमिटिव** एक्सेसिबल इंटरैक्शन के लिए
- **आइकन** — `lucide-react`, `react-icons`, `@heroicons/react`
- **चार्ट** — `recharts`, `chart.js` + `react-chartjs-2`
- **एनिमेशन** — `framer-motion`, `react-spring`, `tailwindcss-animate`
- **फ़ॉर्म** — `react-hook-form` + `@hookform/resolvers` + `zod`
- **3D** — `three`, `@react-three/fiber`, `@react-three/drei`
- **यूटिलिटी** — `date-fns`, `lodash`, `axios`, `zustand`, `react-router-dom` और बहुत कुछ

> Tree-shaking सुनिश्चित करता है कि फ़ाइनल बंडल में सिर्फ़ वही पैकेज जाएँ जो आप वाकई इस्तेमाल करते हैं।

## गायब इम्पोर्ट की जाँच

अगर AI का कोड ऐसा पैकेज इस्तेमाल करता है जो पहले से इंस्टॉल नहीं है, तो चलाएँ:

```bash
npm run check
```

यह आपकी सोर्स फ़ाइलों को स्कैन करता है और गायब डिपेंडेंसी बताता है, साथ में सही `npm install` कमांड भी देता है।

## Base path कैसे काम करता है

बिल्ड ऑटोमैटिक सही base path पहचानता है:

| स्थिति | Base path |
| :-- | :-- |
| कस्टम डोमेन (CNAME में डोमेन है) | `/` |
| GitHub Pages (कस्टम डोमेन नहीं) | `/<repo-name>/` |
| लोकल डेवलपमेंट | `/` |

कोई मैनुअल सेटिंग ज़रूरी नहीं।

## फ़ाइल स्ट्रक्चर

```
├── src/
│   ├── App.jsx              ← यह फ़ाइल बदलें
│   ├── main.jsx             ← एंट्री पॉइंट (न छुएँ)
│   ├── index.css            ← Tailwind + shadcn थीम
│   ├── lib/utils.js         ← cn() यूटिलिटी
│   ├── hooks/use-toast.js   ← Toast hook
│   └── components/ui/       ← shadcn/ui कंपोनेंट
├── public/
│   ├── CNAME                ← कस्टम डोमेन (वैकल्पिक)
│   └── favicon.svg          ← साइट आइकन
├── scripts/
│   └── check-imports.js     ← गायब डिपेंडेंसी पहचानें
├── .github/workflows/
│   └── deploy.yml           ← GitHub Actions डिप्लॉयमेंट
├── index.html               ← पेज टाइटल और meta टैग
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## और shadcn/ui कंपोनेंट जोड़ें

टेम्पलेट में 40+ shadcn कंपोनेंट शामिल हैं। और चाहिए तो:

```bash
npx shadcn@latest add <component-name>
```

`components.json` पहले से कॉन्फ़िगर है।

## लोकल डेवलपमेंट

```bash
npm install
npm run dev
```

ब्राउज़र में `http://localhost:5173` खोलें।

## समस्या निवारण

**इम्पोर्ट एरर से बिल्ड फ़ेल हो रहा है।**
`npm run check` चलाएँ, देखें कौन से पैकेज गायब हैं, फिर इंस्टॉल करें।

**डिप्लॉय के बाद पेज खाली दिख रहा है।**
सुनिश्चित करें कि GitHub Pages का Source **GitHub Actions** पर सेट है, "Deploy from a branch" पर नहीं।

**कस्टम डोमेन काम नहीं कर रहा।**
जाँचें कि `public/CNAME` में सिर्फ़ आपका डोमेन है। DNS रिकॉर्ड भी चेक करें।
