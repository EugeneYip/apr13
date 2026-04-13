# AI Page Publisher

> Đưa trang React do AI sinh ra lên web chỉ với một lần push.

| [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Tiếng Việt](README.vi.md) · [Português](README.pt.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Français](README.fr.md) · [हिन्दी](README.hi.md) · [한국어](README.ko.md) |
| :-- |

Nhờ Claude, ChatGPT hay AI nào cũng được sinh cho bạn một trang, dán vào `src/App.jsx`, push lên là xong.

## Bắt đầu nhanh

1. **Nhờ AI sinh JSX** — bảo Claude, ChatGPT hay AI nào đó sinh trang bạn muốn dưới dạng component React **định dạng JSX**
2. **Dùng template này** để tạo repo của riêng bạn
3. **Bật GitHub Pages** — vào **Settings → Pages**, đặt Source là **GitHub Actions**
4. **Thay** [`src/App.jsx`](src/App.jsx) bằng JSX mà AI vừa sinh ra
5. **Push** lên `main` — site của bạn sẽ lên ở `https://<tên-user>.github.io/<tên-repo>/`

## Tuỳ chỉnh (Không bắt buộc)

| Mục | Cách làm |
| :-- | :-- |
| Tiêu đề và mô tả trang | Sửa `<title>` và `<meta name="description">` trong [`index.html`](index.html) |
| Custom domain | Thay placeholder trong [`public/CNAME`](public/CNAME) bằng domain của bạn (ví dụ `mysite.com`), trỏ DNS về GitHub Pages, rồi điền domain đó vào **Settings → Pages → Custom domain**. Hoặc tạo repository variable tên `CUSTOM_DOMAIN` trong **Settings → Secrets and variables → Actions → Variables** |

## Có những gì

Template đã setup sẵn mọi thứ mà trang AI thường dùng:

- **React 18 + Vite + Tailwind CSS 3** — build hiện đại, nhanh, không cần config
- **Hơn 40 component shadcn/ui** đã cài sẵn trong `src/components/ui/`
- **Toàn bộ Radix UI primitives** cho tương tác accessible
- **Icons** — `lucide-react`, `react-icons`, `@heroicons/react`
- **Charts** — `recharts`, `chart.js` với `react-chartjs-2`
- **Animation** — `framer-motion`, `react-spring`, `tailwindcss-animate`
- **Forms** — `react-hook-form` với `@hookform/resolvers` và `zod`
- **3D** — `three`, `@react-three/fiber`, `@react-three/drei`
- **Tiện ích** — `date-fns`, `lodash`, `axios`, `zustand`, `react-router-dom` và nhiều nữa

> Tree-shaking đảm bảo chỉ những package bạn thực sự dùng mới có mặt trong bundle cuối.

## Kiểm tra import còn thiếu

Nếu code AI sinh ra dùng một package chưa được cài sẵn, chạy:

```bash
npm run check
```

Lệnh này sẽ quét file source và liệt kê các dependency còn thiếu, kèm câu lệnh `npm install` chính xác để bạn cài ngay.

## Base path hoạt động thế nào

Build sẽ tự detect đúng base path:

| Trường hợp | Base path |
| :-- | :-- |
| Custom domain (CNAME có domain) | `/` |
| GitHub Pages (không có custom domain) | `/<tên-repo>/` |
| Chạy local | `/` |

Không cần config thủ công.

## Cấu trúc file

```
├── src/
│   ├── App.jsx              ← THAY FILE NÀY
│   ├── main.jsx             ← Entry point (đừng đụng vào)
│   ├── index.css            ← Tailwind + shadcn theme
│   ├── lib/utils.js         ← Utility cn()
│   ├── hooks/use-toast.js   ← Toast hook
│   └── components/ui/       ← Component shadcn/ui
├── public/
│   ├── CNAME                ← Custom domain (tùy chọn)
│   └── favicon.svg          ← Site icon
├── scripts/
│   └── check-imports.js     ← Phát hiện dependency còn thiếu
├── .github/workflows/
│   └── deploy.yml           ← Deploy bằng GitHub Actions
├── index.html               ← Tiêu đề trang và meta tags
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Thêm component shadcn/ui

Template đã gồm hơn 40 component shadcn. Nếu cần thêm:

```bash
npx shadcn@latest add <tên-component>
```

`components.json` đã được config sẵn.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở `http://localhost:5173` trên trình duyệt.

## Khi gặp sự cố

**Build fail vì lỗi import.**
Chạy `npm run check` để xem thiếu package nào rồi cài chúng.

**Trang trắng trơn sau khi deploy.**
Kiểm tra xem Source của GitHub Pages đã chọn **GitHub Actions** chưa, đừng để ở "Deploy from a branch".

**Custom domain không chạy.**
Xem lại `public/CNAME` có đúng chỉ chứa domain của bạn không, rồi kiểm tra DNS records.
