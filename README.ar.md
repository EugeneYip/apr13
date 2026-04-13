<div dir="rtl">

# AI Page Publisher

> انشر صفحات React المولّدة بالذكاء الاصطناعي على الويب بضغطة واحدة.

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

أنشئ صفحة باستخدام Claude أو ChatGPT أو أي ذكاء اصطناعي. الصقها في `src/App.jsx`. ادفعها. انتهى الأمر.

## البداية السريعة

1. **اطلب JSX من الذكاء الاصطناعي** — اطلب من Claude أو ChatGPT أو أي ذكاء اصطناعي أن يولّد صفحتك كمكوّن React بـ**تنسيق JSX**
2. **استخدم هذا القالب** لإنشاء مستودعك الخاص
3. **فعّل GitHub Pages** — اذهب إلى **Settings → Pages** واضبط Source على **GitHub Actions**
4. **استبدل** [`src/App.jsx`](src/App.jsx) بكود JSX الذي ولّده الذكاء الاصطناعي
5. **ادفع** إلى `main` — موقعك سيكون متاحاً على `https://<اسم-المستخدم>.github.io/<اسم-المستودع>/`

## تخصيص (اختياري)

| الإعداد | الطريقة |
| :-- | :-- |
| عنوان الصفحة والوصف | عدّل `<title>` و `<meta name="description">` في [`index.html`](index.html) |
| نطاق مخصص | استبدل النص في [`public/CNAME`](public/CNAME) بنطاقك (مثلاً `mysite.com`)، واضبط DNS ليشير إلى GitHub Pages، ثم أدخل النطاق نفسه في **Settings → Pages → Custom domain**. أو أنشئ متغيّر مستودع باسم `CUSTOM_DOMAIN` في **Settings → Secrets and variables → Actions → Variables** |

## ما يتضمّنه القالب

هذا القالب مجهّز مسبقاً بكل ما تحتاجه الصفحات المولّدة بالذكاء الاصطناعي:

- **React 18 + Vite + Tailwind CSS 3** — بناء حديث وسريع بدون إعدادات
- **أكثر من 40 مكوّن shadcn/ui** مثبّتة مسبقاً في `src/components/ui/`
- **جميع عناصر Radix UI** لتفاعلات يسهل الوصول إليها
- **أيقونات** — `lucide-react`، `react-icons`، `@heroicons/react`
- **رسوم بيانية** — `recharts`، `chart.js` مع `react-chartjs-2`
- **حركات** — `framer-motion`، `react-spring`، `tailwindcss-animate`
- **نماذج** — `react-hook-form` مع `@hookform/resolvers` و `zod`
- **ثلاثي الأبعاد** — `three`، `@react-three/fiber`، `@react-three/drei`
- **أدوات مساعدة** — `date-fns`، `lodash`، `axios`، `zustand`، `react-router-dom` والمزيد

> يضمن tree-shaking أن الحزم التي تستخدمها فعلاً هي فقط التي تُضمّن في الملف النهائي.

## فحص الاستيرادات المفقودة

إذا استخدم كود الذكاء الاصطناعي حزمة غير مثبّتة مسبقاً، نفّذ:

```bash
npm run check
```

سيفحص ملفاتك ويُبلغك عن أي تبعيات مفقودة، مع أمر `npm install` الدقيق لإصلاحها.

## كيف يعمل مسار القاعدة

البناء يكتشف مسار القاعدة الصحيح تلقائياً:

| السيناريو | مسار القاعدة |
| :-- | :-- |
| نطاق مخصص (CNAME يحتوي نطاقاً) | `/` |
| GitHub Pages (بدون نطاق مخصص) | `/<اسم-المستودع>/` |
| التطوير المحلي | `/` |

لا حاجة لأي إعداد يدوي.

## هيكل الملفات

```
├── src/
│   ├── App.jsx              ← استبدل هذا الملف
│   ├── main.jsx             ← نقطة الدخول (لا تعدّله)
│   ├── index.css            ← Tailwind + سمة shadcn
│   ├── lib/utils.js         ← أداة cn()
│   ├── hooks/use-toast.js   ← خطّاف Toast
│   └── components/ui/       ← مكوّنات shadcn/ui
├── public/
│   ├── CNAME                ← نطاق مخصص (اختياري)
│   └── favicon.svg          ← أيقونة الموقع
├── scripts/
│   └── check-imports.js     ← اكتشاف التبعيات المفقودة
├── .github/workflows/
│   └── deploy.yml           ← نشر بواسطة GitHub Actions
├── index.html               ← عنوان الصفحة ووسوم meta
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## إضافة مكوّنات shadcn/ui أخرى

القالب يتضمّن أكثر من 40 مكوّن shadcn. إذا احتجت المزيد:

```bash
npx shadcn@latest add <اسم-المكوّن>
```

ملف `components.json` مُعدّ مسبقاً.

## التطوير المحلي

```bash
npm install
npm run dev
```

افتح `http://localhost:5173` في المتصفح.

## استكشاف الأخطاء

**فشل البناء بسبب أخطاء استيراد.**
نفّذ `npm run check` لمعرفة الحزم المفقودة ثم ثبّتها.

**الصفحة فارغة بعد النشر.**
تأكد أن مصدر GitHub Pages مضبوط على **GitHub Actions** وليس على "Deploy from a branch".

**النطاق المخصص لا يعمل.**
تحقق أن `public/CNAME` يحتوي نطاقك فقط. راجع سجلات DNS.

</div>
