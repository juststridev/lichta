# Đóng góp cho LichTa

Trước tiên, cảm ơn bạn đã quan tâm và muốn đóng góp cho LichTa! Chính những người như bạn đã giúp LichTa trở thành một công cụ tốt hơn cho cộng đồng.

## Cấu trúc dự án & Mã nguồn

LichTa hoạt động theo mô hình **mã nguồn đóng nhưng phân phối công khai**.

Kho lưu trữ (repository) mà bạn đang xem (`github.com/zeforc/lichta`) đóng vai trò là nơi phân phối các bản build công khai và theo dõi lỗi (issue tracker). Nó chứa các thư mục đã được biên dịch (`dist/`) của từng package cùng các file cấu hình để phát hành lên npm — không chứa mã nguồn TypeScript gốc.

**Vì mã nguồn được giữ private, chúng tôi không nhận Pull Request sửa đổi code trực tiếp từ các bản fork của repository này.**

## Cách thức đóng góp

Mặc dù mã nguồn là private, vẫn có nhiều cách để bạn đóng góp tích cực cho dự án:

### 1. Báo cáo lỗi (Report Bugs) 🐛

Nếu bạn tìm thấy lỗi, vui lòng [tạo một issue](https://github.com/zeforc/lichta/issues) trên GitHub. Cung cấp càng nhiều thông tin chi tiết càng tốt để giúp chúng tôi tái tạo và sửa lỗi:

- Bạn đang cố gắng làm gì (ví dụ: `LichTa.toLunar(...)` với input nào).
- Điều gì thực sự đã xảy ra (kết quả sai / lỗi hiện ra sao).
- Kết quả bạn mong đợi.
- Package và version đang dùng (`@lichta/core`, `@lichta/react`, ...), môi trường (Node.js version, trình duyệt, framework).

### 2. Yêu cầu tính năng (Request Features) 💡

Bạn có ý tưởng để làm LichTa tốt hơn? Chúng tôi rất muốn nghe! [Tạo một yêu cầu tính năng](https://github.com/zeforc/lichta/issues) và giải thích:

- Tính năng đó là gì.
- Tại sao nó lại hữu ích.
- Ví dụ về cách nó sẽ hoạt động (API mong muốn, nếu có).

### 3. Tham gia thảo luận (Join Discussions) 💬

Bạn có thể giúp đỡ những người khác và chia sẻ ý tưởng của mình trong phần [Discussions](https://github.com/zeforc/lichta/discussions):

- Trả lời câu hỏi từ các lập trình viên khác.
- Chia sẻ cách bạn áp dụng LichTa vào dự án của mình.
- Bàn luận về tính năng sắp tới hoặc ý tưởng kiến trúc.

## Quy trình phát triển (dành riêng cho core team)

Đối với các thành viên nội bộ có quyền truy cập vào monorepo private:

1. Clone private repository về máy.
2. Đảm bảo đã cài `pnpm` (v8+) và `Node.js` (v20+).
3. Chạy `pnpm install`, rồi `pnpm dev:<package>` để khởi động môi trường local.
4. Mọi thay đổi ở `@lichta/core` (đặc biệt `packages/core/src/core/lunar.ts` — thuật toán chuyển đổi) đều phải kèm test hồi quy cho ít nhất 1 năm nhuận đã biết (2020, 2023, 2025) và vượt qua `pnpm test:all` + `pnpm lint:all` trước khi merge.
5. Publish qua `pnpm --filter <package> publish --access public`, sau đó đồng bộ bản build mới nhất sang repository này.

---

Cảm ơn bạn đã trở thành một phần của cộng đồng LichTa!
