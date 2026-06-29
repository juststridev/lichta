# Tài liệu API LichTa

> 🇬🇧 [English version](./API.md)

Tài liệu này cung cấp thông tin chi tiết về các hàm, tham số và kiểu dữ liệu trả về của thư viện `lichta`.

## Core Module (`lichta/core`)

### `LichTa.toLunar(solarDay, solarMonth, solarYear, timezone?)`
Chuyển đổi ngày Dương lịch sang Âm lịch.

- **Tham số:**
  - `solarDay` *(number)*: Ngày dương (1-31).
  - `solarMonth` *(number)*: Tháng dương (1-12).
  - `solarYear` *(number)*: Năm dương (1800-2199).
  - `timezone` *(number, optional)*: Múi giờ. Mặc định là `7` (Việt Nam).
- **Trả về:** Object `LunarDate`.

### `LichTa.toSolar(lunarDay, lunarMonth, lunarYear, isLeapMonth, timezone?)`
Chuyển đổi ngày Âm lịch sang Dương lịch.

- **Tham số:**
  - `lunarDay` *(number)*: Ngày âm.
  - `lunarMonth` *(number)*: Tháng âm.
  - `lunarYear` *(number)*: Năm âm.
  - `isLeapMonth` *(boolean)*: Xác định tháng truyền vào có phải là tháng nhuận không.
  - `timezone` *(number, optional)*: Múi giờ. Mặc định là `7`.
- **Trả về:** Object `SolarDate`.

*(Tài liệu API chi tiết sẽ được cập nhật thêm...)*
