import { useEffect, useRef, useState } from "react";
import { Sparkles, Settings, Upload, Globe, ArrowUpRight, CheckCircle2, Lightbulb } from "lucide-react";

const translations = {
  en: {
    badge: "AI Page Publisher",
    heroTitle: ["Publish AI pages", "in one push."],
    heroSubtitle:
      "A clean template for turning any AI-generated React artifact into a live website. Replace one file. Push to GitHub. Done.",
    ctaPrimary: "Use this template",
    ctaSecondary: "Read the README",
    readmeUrl: "https://github.com/EugeneYip/aiweb#readme",
    includedLabel: "Included",
    includedTitle: "What you get",
    includes: [
      "40+ shadcn/ui components",
      "80+ pre-installed packages",
      "Tailwind CSS, ready to use",
      "GitHub Actions deployment",
      "Custom domain support",
      "Auto base path detection",
    ],
    howItWorksLabel: "How it works",
    howItWorksTitle: "Three steps to go live",
    howItWorksSubtitle:
      "No coding experience needed. Ask any AI for JSX, paste it, push, done.",
    steps: [
      {
        number: "01",
        title: "Ask your AI for JSX",
        body: "Tell Claude, ChatGPT, or any AI to generate the page you want as a React component in JSX format.",
      },
      {
        number: "02",
        title: "Set up your repo",
        body: "Use this template to create your own repository. Go to Settings → Pages and set Source to GitHub Actions.",
      },
      {
        number: "03",
        title: "Replace and push",
        body: "Paste the JSX into src/App.jsx and push to main. GitHub Actions builds and publishes your site automatically.",
      },
    ],
    filesLabel: "Your files",
    filesTitle: "What you'll change",
    filesSubtitle:
      "Most of the time you only touch one file. The other two are optional.",
    files: [
      { name: "src/App.jsx", tag: "Required", desc: "Paste your AI-generated JSX here. This is the only file you need to change.", required: true },
      { name: "index.html", tag: "Optional", desc: "Update the page title and meta description to match your site.", required: false },
      { name: "public/CNAME", tag: "Optional", desc: "Set your custom domain. Leave as-is if you don't need one.", required: false },
    ],
    tipLabel: "Tip",
    tipText: "If your AI code uses a package not included in the template, run",
    tipCommand: "npm run check",
    tipAfter: "to find and fix missing dependencies.",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "All Rights Reserved.",
    langLabel: "Language",
  },
  zh: {
    badge: "AI Page Publisher",
    heroTitle: ["Push 一次", "AI 頁面就上線"],
    heroSubtitle:
      "把 AI 生成的 React 成品直接變成線上網站的簡潔範本。換掉一個檔案，push 到 GitHub，就這樣。",
    ctaPrimary: "使用這個範本",
    ctaSecondary: "看 README",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.zh.md",
    includedLabel: "內建項目",
    includedTitle: "範本包含甚麼",
    includes: [
      "40+ 個 shadcn/ui 元件",
      "80+ 個預裝套件",
      "Tailwind CSS，開箱即用",
      "GitHub Actions 自動部署",
      "支援自訂網域",
      "自動偵測 base path",
    ],
    howItWorksLabel: "運作方式",
    howItWorksTitle: "三步就上線",
    howItWorksSubtitle:
      "不需要寫程式經驗。請 AI 生成 JSX，貼上，push，搞定。",
    steps: [
      {
        number: "01",
        title: "請 AI 生成 JSX",
        body: "告訴 Claude、ChatGPT 或任何 AI，請它用 JSX 格式幫你生成想要的 React 頁面。",
      },
      {
        number: "02",
        title: "建立你的 repo",
        body: "用這個範本建立自己的 repo。到 Settings → Pages 把 Source 設成 GitHub Actions。",
      },
      {
        number: "03",
        title: "貼上、push",
        body: "把 JSX 貼進 src/App.jsx，push 到 main。GitHub Actions 會自動 build 並把網站發佈出去。",
      },
    ],
    filesLabel: "你的檔案",
    filesTitle: "需要改的檔案",
    filesSubtitle: "通常只需要動一個檔案，其餘兩個是進階選用。",
    files: [
      { name: "src/App.jsx", tag: "必要", desc: "把 AI 生成的 JSX 貼到這裡。這是唯一需要改的檔案。", required: true },
      { name: "index.html", tag: "選用", desc: "改一下頁面標題和描述，讓它符合你的網站。", required: false },
      { name: "public/CNAME", tag: "選用", desc: "設定你的自訂網域。不需要的話就不用動。", required: false },
    ],
    tipLabel: "小提示",
    tipText: "如果 AI 的程式碼用到了範本沒預裝的套件，執行",
    tipCommand: "npm run check",
    tipAfter: "就能找到並修復缺少的相依套件。",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "版權所有。",
    langLabel: "語言",
  },
  es: {
    badge: "AI Page Publisher",
    heroTitle: ["Publica páginas de IA", "con un solo push."],
    heroSubtitle:
      "Una plantilla sencilla para llevar cualquier componente de React generado por IA directo a la web. Cambias un archivo, haces push a GitHub y listo.",
    ctaPrimary: "Usar esta plantilla",
    ctaSecondary: "Leer el README",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.es.md",
    includedLabel: "Incluido",
    includedTitle: "Lo que obtienes",
    includes: [
      "Más de 40 componentes de shadcn/ui",
      "Más de 80 paquetes preinstalados",
      "Tailwind CSS, listo para usar",
      "Despliegue con GitHub Actions",
      "Soporte para dominio personalizado",
      "Detección automática de base path",
    ],
    howItWorksLabel: "Cómo funciona",
    howItWorksTitle: "Tres pasos y listo",
    howItWorksSubtitle:
      "No necesitas saber programar. Pide JSX a la IA, pégalo, haz push y ya.",
    steps: [
      {
        number: "01",
        title: "Pide JSX a tu IA",
        body: "Dile a Claude, ChatGPT o la IA que prefieras que te genere la página que quieres como componente React en formato JSX.",
      },
      {
        number: "02",
        title: "Arma tu repo",
        body: "Usa esta plantilla para crear tu propio repo. Ve a Settings → Pages y pon Source en GitHub Actions.",
      },
      {
        number: "03",
        title: "Pega y haz push",
        body: "Pega el JSX en src/App.jsx y haz push a main. GitHub Actions se encarga de compilar y publicar tu sitio solito.",
      },
    ],
    filesLabel: "Tus archivos",
    filesTitle: "Qué vas a cambiar",
    filesSubtitle:
      "Casi siempre solo tocas un archivo. Los otros dos son opcionales.",
    files: [
      { name: "src/App.jsx", tag: "Obligatorio", desc: "Pega aquí el JSX que te generó la IA. Es el único archivo que tienes que cambiar.", required: true },
      { name: "index.html", tag: "Opcional", desc: "Cambia el título y la descripción de la página para que vayan con tu sitio.", required: false },
      { name: "public/CNAME", tag: "Opcional", desc: "Configura tu dominio personalizado. Si no lo necesitas, déjalo como está.", required: false },
    ],
    tipLabel: "Tip",
    tipText: "Si el código de tu IA usa un paquete que no viene en la plantilla, corre",
    tipCommand: "npm run check",
    tipAfter: "para encontrar y arreglar las dependencias que faltan.",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "Todos los derechos reservados.",
    langLabel: "Idioma",
  },
  ja: {
    badge: "AI Page Publisher",
    heroTitle: ["ワンプッシュで", "AIページを公開。"],
    heroSubtitle:
      "AI が生成した React コードを、そのままウェブサイトとして公開できるシンプルなテンプレート。ファイルを 1 つ差し替えて、GitHub に push するだけ。",
    ctaPrimary: "このテンプレートを使う",
    ctaSecondary: "README を読む",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.ja.md",
    includedLabel: "含まれるもの",
    includedTitle: "テンプレートの中身",
    includes: [
      "shadcn/ui コンポーネント 40 種以上",
      "80 以上のパッケージをプリインストール",
      "Tailwind CSS をそのまま利用可能",
      "GitHub Actions で自動デプロイ",
      "カスタムドメイン対応",
      "ベースパスを自動検出",
    ],
    howItWorksLabel: "仕組み",
    howItWorksTitle: "3 ステップで公開",
    howItWorksSubtitle:
      "プログラミングの経験は不要。AI に JSX を頼んで、貼り付けて、push するだけ。",
    steps: [
      {
        number: "01",
        title: "AI に JSX を頼む",
        body: "Claude、ChatGPT、お好きな AI に、作りたいページを JSX 形式の React コンポーネントとして書いてもらいます。",
      },
      {
        number: "02",
        title: "リポジトリを準備",
        body: "このテンプレートで自分のリポジトリを作成。Settings → Pages で Source を GitHub Actions に設定。",
      },
      {
        number: "03",
        title: "貼り付けて push",
        body: "JSX を src/App.jsx に貼り付けて main に push。GitHub Actions が自動でビルドして公開してくれます。",
      },
    ],
    filesLabel: "ファイル",
    filesTitle: "変更するファイル",
    filesSubtitle:
      "ほとんどの場合、触るのは 1 ファイルだけ。残り 2 つは任意です。",
    files: [
      { name: "src/App.jsx", tag: "必須", desc: "AI が生成した JSX をここに貼り付けます。変更が必要なのはこのファイルだけです。", required: true },
      { name: "index.html", tag: "任意", desc: "ページのタイトルや説明を自分のサイトに合わせて変更します。", required: false },
      { name: "public/CNAME", tag: "任意", desc: "カスタムドメインを設定します。不要ならそのままで OK。", required: false },
    ],
    tipLabel: "ヒント",
    tipText: "AI のコードがテンプレートに含まれないパッケージを使っている場合は",
    tipCommand: "npm run check",
    tipAfter: "を実行すれば、足りない依存を見つけて修正できます。",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "All Rights Reserved.",
    langLabel: "言語",
  },
  pt: {
    badge: "AI Page Publisher",
    heroTitle: ["Publique páginas de IA", "com um único push."],
    heroSubtitle:
      "Um template simples para transformar qualquer componente React gerado por IA em um site no ar. Troque um arquivo. Faça push no GitHub. Pronto.",
    ctaPrimary: "Usar este template",
    ctaSecondary: "Ler o README",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.pt.md",
    includedLabel: "Incluído",
    includedTitle: "O que você recebe",
    includes: [
      "40+ componentes shadcn/ui",
      "80+ pacotes pré-instalados",
      "Tailwind CSS, pronto para usar",
      "Deploy com GitHub Actions",
      "Suporte a domínio personalizado",
      "Detecção automática de base path",
    ],
    howItWorksLabel: "Como funciona",
    howItWorksTitle: "Três passos para o ar",
    howItWorksSubtitle:
      "Não precisa saber programar. Peça JSX à IA, cole, faça push e pronto.",
    steps: [
      {
        number: "01",
        title: "Peça JSX à sua IA",
        body: "Diga ao Claude, ChatGPT ou qualquer IA para gerar a página que você quer como componente React em formato JSX.",
      },
      {
        number: "02",
        title: "Configure seu repo",
        body: "Use este template para criar seu repositório. Vá em Settings → Pages e defina Source como GitHub Actions.",
      },
      {
        number: "03",
        title: "Cole e faça push",
        body: "Cole o JSX em src/App.jsx e faça push para main. O GitHub Actions compila e publica seu site automaticamente.",
      },
    ],
    filesLabel: "Seus arquivos",
    filesTitle: "O que você vai mudar",
    filesSubtitle:
      "Na maioria das vezes você só mexe em um arquivo. Os outros dois são opcionais.",
    files: [
      { name: "src/App.jsx", tag: "Obrigatório", desc: "Cole o JSX gerado pela IA aqui. Este é o único arquivo que você precisa mudar.", required: true },
      { name: "index.html", tag: "Opcional", desc: "Atualize o título e a descrição da página para combinar com seu site.", required: false },
      { name: "public/CNAME", tag: "Opcional", desc: "Configure seu domínio personalizado. Se não precisar, deixe como está.", required: false },
    ],
    tipLabel: "Dica",
    tipText: "Se o código da IA usa um pacote que não está no template, execute",
    tipCommand: "npm run check",
    tipAfter: "para encontrar e corrigir dependências faltantes.",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "Todos os direitos reservados.",
    langLabel: "Idioma",
  },
  ar: {
    badge: "AI Page Publisher",
    heroTitle: ["انشر صفحات الذكاء الاصطناعي", "بضغطة واحدة."],
    heroSubtitle:
      "قالب بسيط لتحويل أي مكوّن React مولّد بالذكاء الاصطناعي إلى موقع ويب. استبدل ملفاً واحداً. ادفع إلى GitHub. انتهى.",
    ctaPrimary: "استخدم هذا القالب",
    ctaSecondary: "اقرأ الـ README",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.ar.md",
    includedLabel: "مُتضمَّن",
    includedTitle: "ما الذي تحصل عليه",
    includes: [
      "أكثر من 40 مكوّن shadcn/ui",
      "أكثر من 80 حزمة مثبّتة مسبقاً",
      "Tailwind CSS جاهز للاستخدام",
      "نشر تلقائي عبر GitHub Actions",
      "دعم النطاق المخصص",
      "اكتشاف تلقائي لمسار القاعدة",
    ],
    howItWorksLabel: "كيف يعمل",
    howItWorksTitle: "ثلاث خطوات للنشر",
    howItWorksSubtitle:
      "لا تحتاج خبرة في البرمجة. اطلب JSX من الذكاء الاصطناعي، الصقه، ادفعه، انتهى.",
    steps: [
      {
        number: "01",
        title: "اطلب JSX من الذكاء الاصطناعي",
        body: "اطلب من Claude أو ChatGPT أو أي ذكاء اصطناعي أن يولّد صفحتك كمكوّن React بتنسيق JSX.",
      },
      {
        number: "02",
        title: "أعدّ مستودعك",
        body: "استخدم هذا القالب لإنشاء مستودعك الخاص. اذهب إلى Settings → Pages واضبط Source على GitHub Actions.",
      },
      {
        number: "03",
        title: "الصق وادفع",
        body: "الصق كود JSX في src/App.jsx وادفع إلى main. سيقوم GitHub Actions بالبناء والنشر تلقائياً.",
      },
    ],
    filesLabel: "ملفاتك",
    filesTitle: "ما الذي ستغيّره",
    filesSubtitle:
      "في أغلب الأحيان ستعدّل ملفاً واحداً فقط. الملفان الآخران اختياريان.",
    files: [
      { name: "src/App.jsx", tag: "مطلوب", desc: "الصق كود JSX المولّد بالذكاء الاصطناعي هنا. هذا هو الملف الوحيد الذي تحتاج تغييره.", required: true },
      { name: "index.html", tag: "اختياري", desc: "حدّث عنوان الصفحة والوصف ليتوافقا مع موقعك.", required: false },
      { name: "public/CNAME", tag: "اختياري", desc: "اضبط نطاقك المخصص. اتركه كما هو إن لم تحتج واحداً.", required: false },
    ],
    tipLabel: "نصيحة",
    tipText: "إذا استخدم كود الذكاء الاصطناعي حزمة غير موجودة في القالب، نفّذ",
    tipCommand: "npm run check",
    tipAfter: "لاكتشاف وإصلاح التبعيات المفقودة.",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "جميع الحقوق محفوظة.",
    langLabel: "اللغة",
  },
  fr: {
    badge: "AI Page Publisher",
    heroTitle: ["Publiez des pages IA", "en un seul push."],
    heroSubtitle:
      "Un template simple pour transformer n'importe quel composant React généré par IA en site web. Remplacez un fichier. Pushez sur GitHub. C'est fait.",
    ctaPrimary: "Utiliser ce template",
    ctaSecondary: "Lire le README",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.fr.md",
    includedLabel: "Inclus",
    includedTitle: "Ce que vous obtenez",
    includes: [
      "Plus de 40 composants shadcn/ui",
      "Plus de 80 paquets préinstallés",
      "Tailwind CSS, prêt à l'emploi",
      "Déploiement via GitHub Actions",
      "Support de domaine personnalisé",
      "Détection automatique du base path",
    ],
    howItWorksLabel: "Comment ça marche",
    howItWorksTitle: "Trois étapes pour publier",
    howItWorksSubtitle:
      "Aucune expérience en programmation requise. Demandez du JSX à l'IA, collez-le, pushez, c'est fait.",
    steps: [
      {
        number: "01",
        title: "Demandez du JSX à votre IA",
        body: "Dites à Claude, ChatGPT ou n'importe quelle IA de générer la page que vous voulez en tant que composant React au format JSX.",
      },
      {
        number: "02",
        title: "Configurez votre dépôt",
        body: "Utilisez ce template pour créer votre propre dépôt. Allez dans Settings → Pages et définissez Source sur GitHub Actions.",
      },
      {
        number: "03",
        title: "Collez et pushez",
        body: "Collez le JSX dans src/App.jsx et pushez vers main. GitHub Actions compile et publie votre site automatiquement.",
      },
    ],
    filesLabel: "Vos fichiers",
    filesTitle: "Ce que vous allez modifier",
    filesSubtitle:
      "La plupart du temps, vous ne touchez qu'un seul fichier. Les deux autres sont optionnels.",
    files: [
      { name: "src/App.jsx", tag: "Requis", desc: "Collez le JSX généré par l'IA ici. C'est le seul fichier que vous devez modifier.", required: true },
      { name: "index.html", tag: "Optionnel", desc: "Mettez à jour le titre et la description de la page pour correspondre à votre site.", required: false },
      { name: "public/CNAME", tag: "Optionnel", desc: "Configurez votre domaine personnalisé. Laissez tel quel si vous n'en avez pas besoin.", required: false },
    ],
    tipLabel: "Astuce",
    tipText: "Si le code de l'IA utilise un paquet non inclus dans le template, exécutez",
    tipCommand: "npm run check",
    tipAfter: "pour trouver et corriger les dépendances manquantes.",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "Tous droits réservés.",
    langLabel: "Langue",
  },
  hi: {
    badge: "AI Page Publisher",
    heroTitle: ["AI पेज पब्लिश करें", "एक ही push में।"],
    heroSubtitle:
      "AI से बना कोई भी React कंपोनेंट सीधे लाइव वेबसाइट में बदलने का आसान टेम्पलेट। एक फ़ाइल बदलें। GitHub पर push करें। बस।",
    ctaPrimary: "यह टेम्पलेट इस्तेमाल करें",
    ctaSecondary: "README पढ़ें",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.hi.md",
    includedLabel: "शामिल है",
    includedTitle: "आपको क्या मिलता है",
    includes: [
      "40+ shadcn/ui कंपोनेंट",
      "80+ पैकेज पहले से इंस्टॉल",
      "Tailwind CSS, तुरंत इस्तेमाल के लिए तैयार",
      "GitHub Actions से डिप्लॉयमेंट",
      "कस्टम डोमेन सपोर्ट",
      "ऑटो base path डिटेक्शन",
    ],
    howItWorksLabel: "कैसे काम करता है",
    howItWorksTitle: "तीन स्टेप में लाइव",
    howItWorksSubtitle:
      "कोडिंग का अनुभव ज़रूरी नहीं। AI से JSX माँगें, पेस्ट करें, push करें, बस।",
    steps: [
      {
        number: "01",
        title: "AI से JSX माँगें",
        body: "Claude, ChatGPT या किसी भी AI से अपना पेज JSX फ़ॉर्मेट में React कंपोनेंट के रूप में बनवाएँ।",
      },
      {
        number: "02",
        title: "अपना repo सेट करें",
        body: "इस टेम्पलेट से अपना रिपॉज़िटरी बनाएँ। Settings → Pages में जाकर Source को GitHub Actions पर सेट करें।",
      },
      {
        number: "03",
        title: "पेस्ट करें और push करें",
        body: "JSX को src/App.jsx में पेस्ट करें और main पर push करें। GitHub Actions ऑटोमैटिक बिल्ड और पब्लिश कर देगा।",
      },
    ],
    filesLabel: "आपकी फ़ाइलें",
    filesTitle: "क्या बदलना है",
    filesSubtitle:
      "ज़्यादातर सिर्फ़ एक फ़ाइल बदलनी होती है। बाकी दो वैकल्पिक हैं।",
    files: [
      { name: "src/App.jsx", tag: "ज़रूरी", desc: "AI द्वारा बनाया गया JSX यहाँ पेस्ट करें। बस यही एक फ़ाइल बदलनी है।", required: true },
      { name: "index.html", tag: "वैकल्पिक", desc: "पेज का टाइटल और विवरण अपनी साइट के अनुसार अपडेट करें।", required: false },
      { name: "public/CNAME", tag: "वैकल्पिक", desc: "अपना कस्टम डोमेन सेट करें। ज़रूरत न हो तो ऐसे ही छोड़ दें।", required: false },
    ],
    tipLabel: "सुझाव",
    tipText: "अगर AI का कोड ऐसा पैकेज इस्तेमाल करता है जो टेम्पलेट में नहीं है, तो चलाएँ",
    tipCommand: "npm run check",
    tipAfter: "गायब डिपेंडेंसी खोजने और ठीक करने के लिए।",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "सर्वाधिकार सुरक्षित।",
    langLabel: "भाषा",
  },
  ko: {
    badge: "AI Page Publisher",
    heroTitle: ["AI 페이지를 배포하세요,", "단 한 번의 push로."],
    heroSubtitle:
      "AI가 생성한 React 컴포넌트를 바로 라이브 웹사이트로 만드는 간결한 템플릿. 파일 하나만 교체하고 GitHub에 push하면 끝.",
    ctaPrimary: "이 템플릿 사용하기",
    ctaSecondary: "README 읽기",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.ko.md",
    includedLabel: "포함 항목",
    includedTitle: "무엇이 들어있나요",
    includes: [
      "40개 이상의 shadcn/ui 컴포넌트",
      "80개 이상의 사전 설치 패키지",
      "Tailwind CSS, 바로 사용 가능",
      "GitHub Actions 자동 배포",
      "커스텀 도메인 지원",
      "자동 base path 감지",
    ],
    howItWorksLabel: "작동 방식",
    howItWorksTitle: "세 단계로 배포",
    howItWorksSubtitle:
      "코딩 경험이 없어도 됩니다. AI에게 JSX를 요청하고, 붙여넣고, push하면 끝.",
    steps: [
      {
        number: "01",
        title: "AI에게 JSX 요청",
        body: "Claude, ChatGPT 또는 아무 AI에게 원하는 페이지를 JSX 형식의 React 컴포넌트로 생성해 달라고 하세요.",
      },
      {
        number: "02",
        title: "저장소 설정",
        body: "이 템플릿으로 자신만의 저장소를 만드세요. Settings → Pages에서 Source를 GitHub Actions로 설정하세요.",
      },
      {
        number: "03",
        title: "붙여넣고 push",
        body: "JSX를 src/App.jsx에 붙여넣고 main에 push하세요. GitHub Actions가 자동으로 빌드하고 배포합니다.",
      },
    ],
    filesLabel: "파일",
    filesTitle: "변경할 파일",
    filesSubtitle:
      "대부분의 경우 파일 하나만 수정하면 됩니다. 나머지 둘은 선택사항입니다.",
    files: [
      { name: "src/App.jsx", tag: "필수", desc: "AI가 생성한 JSX를 여기에 붙여넣으세요. 변경이 필요한 유일한 파일입니다.", required: true },
      { name: "index.html", tag: "선택", desc: "페이지 제목과 설명을 사이트에 맞게 수정하세요.", required: false },
      { name: "public/CNAME", tag: "선택", desc: "커스텀 도메인을 설정하세요. 필요 없으면 그대로 두세요.", required: false },
    ],
    tipLabel: "팁",
    tipText: "AI 코드가 템플릿에 포함되지 않은 패키지를 사용하는 경우 실행하세요",
    tipCommand: "npm run check",
    tipAfter: "누락된 의존성을 찾아 수정할 수 있습니다.",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "All Rights Reserved.",
    langLabel: "언어",
  },
  vi: {
    badge: "AI Page Publisher",
    heroTitle: ["Một lần push,", "trang AI đã lên web."],
    heroSubtitle:
      "Một template gọn gàng để biến code React do AI sinh ra thành website đang chạy. Thay đúng một file, push lên GitHub, xong.",
    ctaPrimary: "Dùng template này",
    ctaSecondary: "Đọc README",
    readmeUrl: "https://github.com/EugeneYip/aiweb/blob/main/README.vi.md",
    includedLabel: "Có sẵn",
    includedTitle: "Trong template có gì",
    includes: [
      "40+ component shadcn/ui",
      "80+ package cài sẵn",
      "Tailwind CSS, dùng được ngay",
      "Deploy bằng GitHub Actions",
      "Hỗ trợ custom domain",
      "Tự detect base path",
    ],
    howItWorksLabel: "Cách hoạt động",
    howItWorksTitle: "Ba bước là lên web",
    howItWorksSubtitle:
      "Không cần biết lập trình. Nhờ AI sinh JSX, dán vào, push, xong.",
    steps: [
      {
        number: "01",
        title: "Nhờ AI sinh JSX",
        body: "Bảo Claude, ChatGPT hay AI nào đó sinh trang bạn muốn dưới dạng component React định dạng JSX.",
      },
      {
        number: "02",
        title: "Tạo repo của bạn",
        body: "Dùng template này để tạo repo riêng. Vào Settings → Pages đặt Source là GitHub Actions.",
      },
      {
        number: "03",
        title: "Dán vào, push",
        body: "Dán JSX vào src/App.jsx rồi push lên main. GitHub Actions sẽ tự build và publish site cho bạn.",
      },
    ],
    filesLabel: "File của bạn",
    filesTitle: "Cần thay đổi gì",
    filesSubtitle:
      "Hầu hết bạn chỉ cần đổi một file. Hai file còn lại là tuỳ chọn.",
    files: [
      { name: "src/App.jsx", tag: "Bắt buộc", desc: "Dán JSX do AI sinh ra vào đây. Đây là file duy nhất bạn cần thay.", required: true },
      { name: "index.html", tag: "Tuỳ chọn", desc: "Đổi tiêu đề và mô tả trang cho phù hợp với site của bạn.", required: false },
      { name: "public/CNAME", tag: "Tuỳ chọn", desc: "Cài custom domain. Không cần thì để nguyên.", required: false },
    ],
    tipLabel: "Mẹo",
    tipText: "Nếu code AI dùng package chưa có sẵn trong template, chạy",
    tipCommand: "npm run check",
    tipAfter: "để tìm và sửa các dependency còn thiếu.",
    footerLine1: "© 2026 Eugene Yip.",
    footerLine2: "All Rights Reserved.",
    langLabel: "Ngôn ngữ",
  },
};

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文", short: "中" },
  { code: "es", label: "Español", short: "ES" },
  { code: "ja", label: "日本語", short: "日" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "ar", label: "العربية", short: "ع" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "hi", label: "हिन्दी", short: "हि" },
  { code: "ko", label: "한국어", short: "한" },
  { code: "vi", label: "Tiếng Việt", short: "VI" },
];

const RTL_LANGS = new Set(["ar"]);

const STEP_ICONS = [
  <Sparkles className="h-5 w-5" />,
  <Settings className="h-5 w-5" />,
  <Upload className="h-5 w-5" />,
];

const HTML_LANG = {
  en: "en",
  zh: "zh",
  es: "es",
  ja: "ja",
  pt: "pt",
  ar: "ar",
  fr: "fr",
  hi: "hi",
  ko: "ko",
  vi: "vi",
};

function detectInitialLang() {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem("aiweb-lang");
    if (stored && translations[stored]) return stored;
  } catch (_) {
    // ignore storage errors
  }
  const browser = (window.navigator.language || "en").toLowerCase();
  if (browser.startsWith("zh")) return "zh";
  if (browser.startsWith("es")) return "es";
  if (browser.startsWith("ja")) return "ja";
  if (browser.startsWith("pt")) return "pt";
  if (browser.startsWith("ar")) return "ar";
  if (browser.startsWith("fr")) return "fr";
  if (browser.startsWith("hi")) return "hi";
  if (browser.startsWith("ko")) return "ko";
  if (browser.startsWith("vi")) return "vi";
  return "en";
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const switcherRef = useRef(null);

  useEffect(() => {
    setLang(detectInitialLang());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("aiweb-lang", lang);
    } catch (_) {
      // ignore storage errors
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = HTML_LANG[lang] || "en";
      document.documentElement.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
    }
  }, [lang]);

  useEffect(() => {
    if (!langOpen) return;
    function onClickAway(e) {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setLangOpen(false);
    }
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const t = translations[lang];
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-[#FCFAF2] text-[#2F2A24] antialiased">
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2rem] border border-[#E9E0D2] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(252,250,242,0.92)_100%)] shadow-[0_18px_70px_rgba(54,42,27,0.08)]">
          <div className="grid gap-6 px-5 py-6 sm:gap-8 sm:px-8 sm:py-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:py-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E3D8C7] bg-white/85 px-3 py-1.5 text-xs font-medium text-[#5E564C]">
                <span className="h-2 w-2 rounded-full bg-[#A67B5B]" />
                {t.badge}
              </div>

              <h1 className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.15] tracking-tight text-[#241F1A] sm:text-5xl lg:text-6xl">
                {t.heroTitle[0]}
                <br />
                {t.heroTitle[1]}
              </h1>

              <p className="mt-5 max-w-xl text-[0.938rem] leading-7 text-[#4B443C] sm:text-base sm:leading-8">
                {t.heroSubtitle}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="https://github.com/EugeneYip/aiweb"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F2A24] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1F1A16]"
                >
                  {t.ctaPrimary}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={t.readmeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9CEBD] bg-white/80 px-5 py-3 text-sm font-medium text-[#2F2A24] transition hover:bg-white"
                >
                  {t.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#E9E0D2] bg-white/80 p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between border-b border-[#F0E7DA] pb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#7A6F63]">{t.includedLabel}</p>
                  <h2 className="mt-1.5 text-lg font-semibold text-[#241F1A]">{t.includedTitle}</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4EEE1] text-[#5C5247]">
                  <Globe className="h-5 w-5" />
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {t.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl bg-[#FCFAF2] px-3.5 py-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A67B5B]" />
                    <span className="text-sm font-medium text-[#241F1A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-6 rounded-[2rem] border border-[#E9E0D2] bg-white/65 px-5 py-6 shadow-[0_8px_30px_rgba(54,42,27,0.04)] sm:mt-8 sm:px-8 sm:py-9 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B6257]">{t.howItWorksLabel}</p>
            <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-[#241F1A] sm:text-3xl">
              {t.howItWorksTitle}
            </h2>
            <p className="mt-3 text-[0.938rem] leading-7 text-[#4B443C] sm:text-base">
              {t.howItWorksSubtitle}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3">
            {t.steps.map((step, idx) => (
              <div
                key={step.number}
                className="rounded-2xl border border-[#E9E0D2] bg-white/75 p-5 shadow-[0_8px_30px_rgba(54,42,27,0.05)] backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EEE1] text-[#5C5247]">
                    {STEP_ICONS[idx]}
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#A89A87]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#241F1A] sm:text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4B443C]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Files You'll Change */}
        <section className="mt-6 rounded-[2rem] border border-[#E9E0D2] bg-white/65 px-5 py-6 shadow-[0_8px_30px_rgba(54,42,27,0.04)] sm:mt-8 sm:px-8 sm:py-9 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B6257]">{t.filesLabel}</p>
            <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-[#241F1A] sm:text-3xl">
              {t.filesTitle}
            </h2>
            <p className="mt-3 text-[0.938rem] leading-7 text-[#4B443C] sm:text-base">
              {t.filesSubtitle}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3">
            {t.files.map((file) => (
              <div
                key={file.name}
                className={`rounded-2xl border p-5 ${
                  file.required
                    ? "border-[#D4C4AB] bg-white/90 shadow-[0_8px_30px_rgba(54,42,27,0.06)]"
                    : "border-[#E9E0D2] bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <code className="rounded-lg bg-[#F4EEE1] px-2.5 py-1 font-mono text-xs font-medium text-[#241F1A]">
                    {file.name}
                  </code>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      file.required
                        ? "bg-[#A67B5B]/15 text-[#A67B5B]"
                        : "bg-[#E9E0D2]/70 text-[#8A7F72]"
                    }`}
                  >
                    {file.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#4B443C]">{file.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#EFE5D8] bg-[#FCFAF2] px-4 py-3">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#A67B5B]" />
            <p className="text-sm leading-6 text-[#4B443C]">
              <span className="font-semibold text-[#241F1A]">{t.tipLabel}</span>
              {" — "}
              {t.tipText}{" "}
              <code className="rounded bg-[#F4EEE1] px-1.5 py-0.5 font-mono text-xs text-[#241F1A]">
                {t.tipCommand}
              </code>{" "}
              {t.tipAfter}
            </p>
          </div>
        </section>

        <footer className="mt-8 pb-20 text-center text-sm text-[#6B6257]">
          {t.footerLine1} <br className="sm:hidden" />
          {t.footerLine2}
        </footer>
      </main>

      {/* Language switcher */}
      <div ref={switcherRef} className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        {langOpen && (
          <div
            role="listbox"
            aria-label={t.langLabel}
            className="mb-2.5 min-w-[9.5rem] overflow-hidden rounded-2xl border border-[#E9E0D2] bg-white/95 shadow-[0_18px_50px_rgba(54,42,27,0.15)] backdrop-blur-sm"
          >
            {LANGUAGES.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLang(l.code);
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-[#F4EEE1] font-semibold text-[#241F1A]"
                      : "text-[#4B443C] hover:bg-[#FCFAF2]"
                  }`}
                >
                  <span className="w-4 font-mono text-[11px] text-[#A89A87]">{l.short}</span>
                  <span>{l.label}</span>
                  {active && <CheckCircle2 className="ml-auto h-4 w-4 text-[#A67B5B]" />}
                </button>
              );
            })}
          </div>
        )}
        <button
          type="button"
          onClick={() => setLangOpen((v) => !v)}
          aria-label={t.langLabel}
          aria-expanded={langOpen}
          className="flex h-11 items-center gap-2 rounded-full border border-[#E3D8C7] bg-white/90 px-3.5 text-[#5C5247] shadow-[0_10px_30px_rgba(54,42,27,0.12)] backdrop-blur-sm transition hover:bg-white"
        >
          <Globe className="h-4.5 w-4.5" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#5C5247]">
            {currentLang.short}
          </span>
        </button>
      </div>
    </div>
  );
}
