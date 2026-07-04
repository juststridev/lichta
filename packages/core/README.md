# @lichta/core

[![npm version](https://img.shields.io/npm/v/@lichta/core.svg)](https://www.npmjs.com/package/@lichta/core)

Thư viện lõi tính toán chuyển đổi **Dương lịch ↔ Âm lịch Việt Nam** cho JavaScript/TypeScript. Thuần TypeScript, **0 dependency**, không phụ thuộc framework nào — dùng được ở Node.js, trình duyệt, hoặc làm nền cho các binding framework khác ([`@lichta/react`](https://www.npmjs.com/package/@lichta/react), [`@lichta/vue`](https://www.npmjs.com/package/@lichta/vue), [`@lichta/svelte`](https://www.npmjs.com/package/@lichta/svelte)).

## Cài đặt

```bash
pnpm add @lichta/core
# hoặc: npm install @lichta/core / yarn add @lichta/core / bun add @lichta/core
```

## Sử dụng cơ bản

```typescript
import { LichTa } from '@lichta/core';

// Dương lịch → Âm lịch
const lunar = LichTa.toLunar(10, 2, 2024);
// → { day: 1, month: 1, year: 2024, isLeap: false, jd: 2460351,
//     dayCanChi: 'Giáp Thìn', monthCanChi: 'Bính Dần', yearCanChi: 'Giáp Thìn' }

// Âm lịch → Dương lịch (isLeap bắt buộc truyền đúng nếu là tháng nhuận)
const solar = LichTa.toSolar(1, 1, 2024, false);
// → { day: 10, month: 2, year: 2024 }

// Múi giờ tùy chỉnh (mặc định GMT+7 Việt Nam)
const lunarGmt8 = LichTa.toLunar(10, 2, 2024, 8);
```

`toLunar`/`toSolar` throw `RangeError` nếu ngày/tháng/năm ngoài phạm vi hợp lệ (năm **1800–2199**) — nên bọc trong `try/catch` khi nhận input từ người dùng.

## Can Chi & Phong Thủy

```typescript
import { LichTa, getYearDetails, getDayCanChi, getMonthCanChi, getHourCanChi, getAuspiciousHours } from '@lichta/core';

getYearDetails(2024);
// → { can: 'Giáp', chi: 'Thìn', menh: 'Thủy', fullString: 'Giáp Thìn - Mệnh Thủy' }

const lunar = LichTa.toLunar(10, 2, 2024);
getDayCanChi(lunar.jd);                    // 'Giáp Thìn'
getMonthCanChi(lunar.month, lunar.year);   // 'Bính Dần'
getHourCanChi(8, lunar.jd);                // giờ Thìn (7h-9h)
getAuspiciousHours(lunar.jd);               // 6 giờ Hoàng Đạo trong ngày
```

## Format & Hiển thị

```typescript
import { formatTraditional, formatLunarDate, getMonthName, getDayName } from '@lichta/core';

formatTraditional(lunar);                    // 'Mùng Một tháng Giêng năm Giáp Thìn'
formatLunarDate(lunar, 'dd/MM/yyyy');         // '01/01/2024'
formatLunarDate(lunar, 'Ngày d tháng M năm CC'); // 'Ngày 1 tháng 1 năm Giáp Thìn'

getMonthName(1);   // 'Giêng'
getDayName(15);    // 'Rằm'
```

**Format tokens:** `dd`/`d` (ngày), `MM`/`M` (tháng), `yyyy`/`yy` (năm), `CC`/`MC`/`DC` (Can Chi năm/tháng/ngày), `L` ("Nhuận" nếu là tháng nhuận).

## i18n

Hỗ trợ 4 ngôn ngữ cho tên Can Chi, Ngũ Hành, con giáp, tên tháng, thứ trong tuần: `vi`, `en`, `ja`, `ko`.

```typescript
import { t, getZodiacAnimal } from '@lichta/core';

t('en').fiveElements;       // ['Metal', 'Wood', 'Water', 'Fire', 'Earth']
t('ja').weekDays;           // ['日', '月', '火', '水', '木', '金', '土']
getZodiacAnimal(0, 'vi');   // 'Chuột'
```

## API đầy đủ

| Nhóm | Hàm/Class |
|---|---|
| Solar ↔ Lunar | `LichTa.toLunar()`, `LichTa.toSolar()` |
| Julian Day Number | `jdFromDate()`, `jdToDate()` |
| Can Chi & Phong Thủy | `getYearDetails()`, `getDayCanChi()`, `getMonthCanChi()`, `getHourCanChi()`, `getAuspiciousHours()` |
| Format & Hiển thị | `formatLunarDate()`, `formatTraditional()`, `getMonthName()`, `getDayName()` |
| i18n | `t()`, `getZodiacAnimal()` |
| Types | `LunarDate`, `SolarDate`, `Locale` |

Xem chi tiết đầy đủ (tham số, kiểu trả về, ví dụ đã chạy thật) tại trang [API Reference](https://lichta.zeneo.app/api).

## Styles (dùng chung cho Calendar component)

Package này cũng export sẵn CSS cho component `Calendar` ở các package binding framework — không cần thiết nếu bạn chỉ dùng logic tính toán:

```typescript
import '@lichta/core/styles/calendar-base.css';
import '@lichta/core/styles/calendar-glass.css'; // theme kính mờ (tùy chọn)
```

## Thuật toán

Dựa trên thuật toán của **Hồ Ngọc Đức** (Đại học Leipzig), tham khảo các công thức thiên văn trong *"Astronomical Algorithms"* của **Jean Meeus** (1998) — chuẩn de facto cho lịch âm Việt Nam trong lập trình.

## License

[MIT](./LICENSE)
