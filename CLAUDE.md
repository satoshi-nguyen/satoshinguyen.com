# CLAUDE.md — satoshinguyen.com

Hướng dẫn cho Claude Code khi làm việc trên repo này. **Đọc kỹ trước khi sửa bất cứ thứ gì.**

## Repo này là gì
Static site (**Astro 6**, output `static`) cho **satoshinguyen.com** — trang cá nhân + nhà trực tuyến của sách *"Python cho AI Engineering"* (tác giả **Nguyễn Phương Ngọc**). Deploy trên **Cloudflare Pages**.
Đây là repo **WEBSITE** — KHÁC repo mã nguồn của sách (`satoshi-nguyen/...`, MIT).

---

## ⚠️ RÀNG BUỘC SỐ 1 — BẤT KHẢ XÂM PHẠM (never-404)

`public/_redirects` chứa:
```
/b/pyai1    /books/python-for-ai-engineering-volume-1    301
```
- URL `satoshinguyen.com/b/pyai1` **đã in trong sách giấy + mã hoá trong QR**. Nếu nó 404 hoặc đổi đích → link trong **mọi bản in đã phát hành sẽ chết, KHÔNG sửa lại được.**
- **TUYỆT ĐỐI KHÔNG:**
  - Xoá/sửa dòng redirect trên, hay đổi `301` thành mã khác.
  - Đổi tên / di chuyển / xoá thư mục `src/pages/books/python-for-ai-engineering-volume-1/` hoặc slug của nó.
- Khi refactor cấu trúc routes/thư mục: **PHẢI giữ nguyên** path `/b/pyai1` và slug đích `/books/python-for-ai-engineering-volume-1`. Nếu một thay đổi đụng tới chúng → **DỪNG và hỏi tác giả**, đừng tự xử lý.
- Sau mỗi `build`, kiểm `dist/_redirects` còn nguyên dòng đó (nên thêm assert/test).

---

## Lệnh
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/ (gồm dist/_redirects)
npm run preview
```
⚠️ Cú **301 chỉ chạy trên Cloudflare Pages** (tính năng biên) — KHÔNG test được bằng server tĩnh cục bộ (`/b/pyai1` sẽ trả 404 cục bộ, đúng như dự kiến). Test thật **sau deploy**: `curl -sIL https://satoshinguyen.com/b/pyai1`.

## Cấu trúc
```
public/_redirects                                       # redirect #1 — đừng đụng
src/styles/global.css                                   # TOKEN bìa + component tái dùng (nguồn style chung)
src/layouts/Base.astro                                  # head, nav, footer, toggle VI/EN
src/pages/index.astro                                   # Home / About
src/pages/books/python-for-ai-engineering-volume-1/     # landing Cuốn 1  [slug ĐÔNG CỨNG]
  └─ updates/index.astro                                # phụ bản "lớp dễ-lạc-hậu"
```

---

## Quy ước thiết kế (đồng bộ bìa sách — đừng tự chế)
- Dùng **CSS variables trong `global.css`** cho màu (navy `--navy-900/800`, cyan `--cyan/--cyan-pale`, hổ phách `--amber`). **KHÔNG hardcode màu mới, KHÔNG đổi token.**
- Font: **Be Vietnam Pro** (sans, đủ dấu Việt) + **Lora** (serif italic). Không thêm font khác.
- Motif **cầu dây văng** = brand-mark trang trí, **KHÔNG làm headline**.
- Tái dùng component sẵn có: `.bookcard` · `.proj`/`.proj-grid` · `.res`/`.res-grid` · `.posts`/`.post` · `.supp`/`.upd-rows` · `.cover` · `.btn`(`.btn-primary`/`.btn-ghost`) · `.status-pill` · `.two`. Thêm component mới chỉ khi thật cần.
- Song ngữ: **VI là chính**; toggle VI/EN hiện chỉ swap phần khung (chrome) qua `data-i18n` trong `Base.astro`. Nội dung EN đầy đủ là việc sau.
- Khi mở rộng phụ bản/blog: ưu tiên **Astro content collections** (mỗi mục = 1 file) để "lớp dễ-lạc-hậu" dễ sửa.

## Red-line NỘI DUNG (giọng thương hiệu — bắt buộc)
- **Tên:** chỉ "Nguyễn Phương Ngọc". **KHÔNG "TS."** (chưa có học vị tiến sĩ). **KHÔNG PII** (CCCD/SĐT/địa chỉ).
- **Không superlative định vị:** không "đầu tiên / duy nhất / tốt nhất" về người/sản phẩm/sách. Không hạ thấp người/đối thủ khác.
- **Giọng:** thẳng, khiêm tốn, đứng bằng việc làm được — đồng nhất qua cả site.
- **Trụ Poker (khi dựng):** không hứa "chắc thắng / chắc lời / bất khả chiến bại"; có khung **chơi có trách nhiệm** (variance / bankroll / rủi ro) ở nơi phù hợp; không cổ vũ RTA.
- **Crypto/fintech (AceFlow GTO, HyperEdge.fi, …):** mô tả **trung tính, factual** — KHÔNG ngôn ngữ đầu tư/lợi nhuận, KHÔNG lời khuyên tài chính, KHÔNG superlative.

## Chiến lược tên (đã chốt)
- Xương sống site = **tên thật Nguyễn Phương Ngọc** (headline · `<title>` · OG · footer).
- **"Satoshi Nguyen"** = brand/bút danh **poker**, chỉ sống trong trụ Poker + trên sách poker.
- Domain `satoshinguyen.com` = địa chỉ/handle trung tính, **không** phải tiêu đề danh tính.
- Quy tắc cũ "'satoshi' không xuất hiện như tên tác giả" CHỈ áp cho mảng AI/học thuật, **KHÔNG** áp trụ Poker.

## Kỷ luật làm việc
- **Verify-thật, đừng tin trí nhớ:** tên model · cú pháp SDK · giá API · version thư viện đổi nhanh → tìm/kiểm hiện hành trước khi viết. Cấm SDK chết.
- **Build phải pass** trước khi báo xong. Render/kiểm thật, đừng tả chay.
- **Minimal-diff:** đừng viết lại phần đã đạt "cho hay".
- **KHÔNG bịa:** tên/trạng thái sách poker · mô tả project · kết quả live tour · link — chỉ dùng thứ tác giả cấp; chỗ trống đánh dấu **"chờ tác giả"**.
- **Tác giả = thẩm quyền cuối** mọi câu chữ/danh tính/thứ public. Claude Code soạn + trình, **KHÔNG tự quyết thay**.

## Roadmap (đang mở)
- **A (xong):** redirect never-404 + landing Cuốn 1 (tên thật). Còn lại: **deploy thật** — delegate NS Namecheap→Cloudflare · Pages (build `npm run build`, output `dist`) · gắn **apex canonical** + `www` · Redirect Rule `www→apex` · test 301 + quét QR.
- **B/C:** đổi nav `Cuốn 1`→`Sách` + thêm `Poker · Projects · Viết`; Home tái định vị **đa-mảng**; dựng shell `/books` (kệ) · `/poker` · `/projects` · `/blog`. **Additive — KHÔNG đụng redirect/slug Cuốn 1.**
- **D:** đổ nội dung tác giả cấp (sách poker · projects + link thật · live tour) theo minimal-diff.

> Chi tiết deploy + trạng thái: xem `README.md`.
