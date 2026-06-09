# satoshinguyen.com

Trang cá nhân + nhà trực tuyến cho sách **Python cho AI Engineering** (tác giả **Nguyễn Phương Ngọc**).
Static site bằng **Astro**, deploy trên **Cloudflare Pages**.

---

## ⚠️ RÀNG BUỘC SỐ 1 — KHÔNG BAO GIỜ ĐƯỢC PHÁ

`public/_redirects` chứa dòng:

```
/b/pyai1    /books/python-for-ai-engineering-volume-1    301
```

- URL `satoshinguyen.com/b/pyai1` được **IN TRONG SÁCH GIẤY + mã hoá trong QR**.
- Path này **301 → landing Cuốn 1** và **KHÔNG BAO GIỜ được 404**.
- Slug đích `/books/python-for-ai-engineering-volume-1` là **ĐÔNG CỨNG** — không đổi, không xoá.
- **Domain phải auto-renew** (đăng ký tới 2036 tại Namecheap; vẫn bật auto-renew + thẻ dự phòng).
- Bất kỳ thay đổi nào cũng KHÔNG được đụng dòng redirect trên hoặc slug landing Cuốn 1.

---

## Chạy & build

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/  (gồm cả dist/_redirects)
npm run preview   # xem thử bản build
```

## Deploy (Cloudflare Pages)

1. Đẩy repo lên GitHub (handle `satoshi-nguyen`).
2. Cloudflare Pages → Create project → kết nối repo.
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Custom domain: gắn **apex `satoshinguyen.com` (canonical)** + `www`. Chờ SSL active.
4. Tại Cloudflare, thêm **Redirect Rule**: `www.satoshinguyen.com/*` → `https://satoshinguyen.com/${1}` (301).
   *(www → apex; KHÔNG đặt trong repo này.)*
5. Sau deploy, **test thật**:
   ```bash
   curl -sIL https://satoshinguyen.com/b/pyai1
   # phải thấy: 301 + location: .../books/python-for-ai-engineering-volume-1  rồi  200
   ```
   và **quét QR thật** → mở đúng landing.

> Nameserver hiện ở Namecheap (BasicDNS). Để dùng Cloudflare, delegate NS sang Cloudflare trước.

---

## Cấu trúc

```
public/_redirects                                           # redirect never-404 (#1)
src/styles/global.css                                       # token bìa + component tái dùng
src/layouts/Base.astro                                      # head, nav, footer, toggle VI/EN
src/pages/index.astro                                       # Home / About (tên thật)
src/pages/books/python-for-ai-engineering-volume-1/         # landing Cuốn 1  [slug đông cứng]
  └─ updates/index.astro                                    # phụ bản "lớp dễ-lạc-hậu" (stub)
```

## Còn để mở (chờ tác giả cấp — không tự điền)

- Link thật: GitHub · Google Scholar · LinkedIn (đang là `#`, đánh dấu `data-link`).
- Mức công bố tiểu sử (Cốc Cốc / NTU / MầmTrí …).
- CTA mua/đọc khi có đường mua.
- Nội dung phụ bản theo chương (`/updates/...`).
- **Mở rộng 3 trụ** (Sách shelf · Poker · Projects · Viết) — thêm sau, additive, KHÔNG đụng redirect/slug Cuốn 1.

## License

Mã nguồn site: MIT *(xác nhận với tác giả)*. Nội dung/branding: thuộc về tác giả.
