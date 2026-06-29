# Changelog

Tất cả các thay đổi đáng chú ý đối với dự án này sẽ được ghi lại trong tệp này.

> 🇬🇧 [English version](./CHANGELOG.md)

Định dạng của changelog này được dựa trên [Keep a Changelog](https://keepachangelog.com/vi/1.0.0/),
và dự án này tuân thủ [Semantic Versioning](https://semver.org/lang/vi/).

## [1.0.0-beta] - 2026-06-16

### Thêm mới (Added)
- **Thuật toán chuyển đổi Dương lịch ↔ Âm lịch**: Sử dụng thuật toán Hồ Ngọc Đức với độ chính xác cao (phạm vi từ năm 1800 đến 2199).
- **Can Chi**: Hỗ trợ tính Can Chi chi tiết cho năm, tháng, ngày và giờ.
- **Ngũ Hành & Mệnh**: Tính toán và hiển thị mệnh (Kim, Mộc, Thủy, Hỏa, Thổ) theo năm sinh.
- **Giờ Hoàng Đạo**: Xác định chính xác 6 giờ tốt (hoàng đạo) trong ngày.
- **Calendar Component**: Cung cấp component Lịch tháng cho Svelte 5 có tích hợp sẵn hiển thị ngày âm lịch.
- **Format Utilities**: Các hàm tiện ích giúp định dạng hiển thị ngày âm lịch truyền thống (ví dụ: Mùng Một tháng Giêng) và hỗ trợ format theo pattern (`dd/MM/yyyy`, `CC`, `DC`,...).
- **Đa ngôn ngữ (i18n)**: Hỗ trợ 4 ngôn ngữ bao gồm tiếng Việt (vi), tiếng Anh (en), tiếng Nhật (ja), và tiếng Hàn (ko).
- **Multi-framework Support**: Tách biệt core logic thành pure TypeScript (`lichta/core` và `lichta/utils`), giúp dễ dàng tích hợp với React, Vue, Angular và Vanilla JS mà không bị phụ thuộc vào Svelte.
