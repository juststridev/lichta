# @lichta/core

[![@lichta/core](https://img.shields.io/npm/v/@lichta/core.svg?label=%40lichta%2Fcore)](https://www.npmjs.com/package/@lichta/core)
[![@lichta/react](https://img.shields.io/npm/v/@lichta/react.svg?label=%40lichta%2Freact)](https://www.npmjs.com/package/@lichta/react)
[![@lichta/vue](https://img.shields.io/npm/v/@lichta/vue.svg?label=%40lichta%2Fvue)](https://www.npmjs.com/package/@lichta/vue)
[![@lichta/svelte](https://img.shields.io/npm/v/@lichta/svelte.svg?label=%40lichta%2Fsvelte)](https://www.npmjs.com/package/@lichta/svelte)
[![@lichta/full-calendar](https://img.shields.io/npm/v/@lichta/full-calendar.svg?label=%40lichta%2Ffull-calendar)](https://www.npmjs.com/package/@lichta/full-calendar)
[![@lichta/event-calendar](https://img.shields.io/npm/v/@lichta/event-calendar.svg?label=%40lichta%2Fevent-calendar)](https://www.npmjs.com/package/@lichta/event-calendar)
[![@lichta/react-big-calendar](https://img.shields.io/npm/v/@lichta/react-big-calendar.svg?label=%40lichta%2Freact-big-calendar)](https://www.npmjs.com/package/@lichta/react-big-calendar)

🚀 **[Demo trực tiếp](https://lichta.zeneo.app/)**

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
import { LichTa, getYearDetails, getDayCanChi, getMonthCanChi, getHourCanChi, getAuspiciousHours, getAuspiciousHourIndices, getInauspiciousHours, getInauspiciousHourIndices } from '@lichta/core';

getYearDetails(2024);
// → { can: 'Giáp', chi: 'Thìn', menh: 'Hỏa', menhIndex: 3, fullString: 'Giáp Thìn - Mệnh Hỏa' }
// getYearDetails() nhận mọi số năm nguyên (kể cả 0 hoặc âm) — chu kỳ Can Chi 60 năm lặp vô hạn.
// menh dùng bảng tra cứu Nạp Âm 60 Hoa Giáp chuẩn (không phải công thức suy diễn) — xem mục Ngũ Hành bên dưới.

const lunar = LichTa.toLunar(10, 2, 2024);
getDayCanChi(lunar.jd);                    // 'Giáp Thìn'
getMonthCanChi(lunar.month, lunar.year);   // 'Bính Dần'
getHourCanChi(8, lunar.jd);                // giờ Thìn (7h-9h)
getAuspiciousHours(lunar.jd);              // ['Tý', 'Mão', 'Thìn', 'Ngọ', 'Dậu', 'Tuất'] — 6 giờ Hoàng Đạo (giờ tốt)
getInauspiciousHours(lunar.jd);            // ['Sửu', 'Dần', 'Tỵ', 'Mùi', 'Thân', 'Hợi'] — 6 giờ Hắc Đạo (giờ xấu), phần bù

// Mỗi hàm trên đều nhận thêm tham số `locale` tùy chọn (mặc định 'vi', không đổi hành vi cũ)
getDayCanChi(lunar.jd, 'ja');              // Can Chi bằng chữ Nhật

// Cần index Địa Chi thay vì tên (ví dụ để tự map sang UI riêng)?
getAuspiciousHourIndices(lunar.jd);        // [0, 3, 4, 6, 9, 10] — index 0-11 (0 = Tý)
getInauspiciousHourIndices(lunar.jd);      // [1, 2, 5, 7, 8, 11] — phần bù, luôn tăng dần
```

## Ngũ Hành (Nạp Âm & Tương Sinh Tương Khắc)

```typescript
import { getElementName, getDayElement, getMonthElement, getHourElement, getElementRelation, getElementRelationIndex } from '@lichta/core';

// Mệnh (Ngũ Hành Nạp Âm) cho Ngày/Tháng/Giờ — dùng chung bảng Nạp Âm 60 Hoa Giáp với getYearDetails()
getDayElement(lunar.jd);                   // 'Hỏa' (Giáp Thìn/Ất Tỵ = Phú Đăng Hỏa)
getMonthElement(lunar.month, lunar.year);  // 'Hỏa' (Bính Dần/Đinh Mão = Lư Trung Hỏa)
getHourElement(8, lunar.jd);               // 'Mộc' (giờ Mậu Thìn/Kỷ Tỵ = Đại Lâm Mộc)

// Mỗi hàm trên có bản `*Index` đi kèm, trả về index 0-4 (vào FIVE_ELEMENTS) thay vì tên:
// getDayElementIndex(jd), getMonthElementIndex(month, year), getHourElementIndex(hour, dayJd)
getElementName(3);                         // 'Hỏa' — tra tên từ index

// Tương sinh / Tương khắc giữa 2 hành (nhận index 0-4, không phải tên — dùng getElementName/*ElementIndex để chuyển đổi)
getElementRelation(1, 3);                  // 'Tương sinh' — Mộc (1) sinh Hỏa (3)
getElementRelation(3, 1);                  // 'Được sinh' — từ góc nhìn của Hỏa: được Mộc sinh
getElementRelationIndex(1, 3);             // 0 — xem bảng index bên dưới
```

**Bảng Nạp Âm 60 Hoa Giáp:** không có công thức đóng (closed-form) — đây là bảng tra cứu chuẩn theo quy ước truyền thống, `@lichta/core` dùng bảng tra cứu 30 nhóm thay vì suy diễn bằng công thức cộng (bản trước đây từng dùng công thức cộng trọng số Can+Chi, sai lệch 48/60 tổ hợp so với bảng chuẩn — đã fix).

**Index quan hệ Ngũ Hành** (`getElementRelationIndex`): `0` = sinh, `1` = được sinh, `2` = khắc, `3` = bị khắc, `4` = hòa (cùng hành).

## Tiết Khí (24 Solar Terms)

```typescript
import { getSolarTerm, getSolarTermsInYear, getSolarTermName } from '@lichta/core';

getSolarTerm(21, 6, 2024);
// → { index: 6, name: 'Hạ Chí', date: { day: 21, month: 6, year: 2024 }, jd: 2460483 }

getSolarTermsInYear(2024);
// → mảng 24 Tiết Khí trong năm 2024, theo thứ tự thời gian tăng dần, mỗi phần tử { index, name, date, jd }

getSolarTermName(18, 'en');                // 'Winter Solstice' — tra tên thuần túy theo index (0-23) + locale
```

Index 0 = Xuân Phân (kinh độ Mặt Trời 0°), tăng dần mỗi 15°; 12 index lẻ (1, 3, 5, ..., 23) là **Tiết** (Lập Xuân, Kinh Trập, ...), 12 index chẵn là **Trung Khí** (Xuân Phân, Hạ Chí, Đông Chí, ...). Ngày được tính theo quy ước: nếu thời điểm chuyển Tiết Khí rơi vào bất kỳ lúc nào trong ngày, ngày đó được xem là ngày Tiết Khí bắt đầu (khớp cách almanac truyền thống ghi ngày).

## Trực (12 Kiến Trừ)

```typescript
import { getTruc, getTrucIndex, getTrucQuality, getTrucQualityIndex } from '@lichta/core';

getTruc(lunar.jd);                         // 'Phá'
getTrucIndex(lunar.jd);                    // 6

getTrucQuality(getTrucIndex(lunar.jd));    // 'Xấu'
```

Trực được neo theo **Tiết** (12 mốc: Lập Xuân, Kinh Trập, ...) — **không** theo số tháng âm lịch, vì tháng nhuận âm lịch không tương ứng với một Tiết mới (dùng số tháng âm lịch sẽ cho kết quả sai trong các tháng nhuận). Ngày Tiết bắt đầu luôn là "Kiến", Trực tăng dần 1 mỗi ngày và reset về "Kiến" vào Tiết kế tiếp.

`getTrucQuality()`/`getTrucQualityIndex()` chỉ phân loại dứt khoát **Phá, Nguy = Xấu** và **Thành, Khai = Tốt** — 4 Trực có sự đồng thuận rất cao giữa các nguồn. 8 Trực còn lại (Kiến, Trừ, Mãn, Bình, Định, Chấp, Thu, Bế) được xếp **"Trung bình"** một cách bảo thủ, vì mức tốt/xấu chi tiết của chúng phụ thuộc vào từng việc cụ thể và có dị bản giữa các nguồn almanac.

## Kỵ — Tuổi Xung Khắc

```typescript
import { isXung, isHai, isTuHanhXung, getZodiacConflicts, getXungBranchIndex, getHaiBranchIndex, getTuHanhXungGroupMembers } from '@lichta/core';

// Tý (0) và Ngọ (6): vừa Lục Xung vừa cùng nhóm Tứ Hành Xung
getZodiacConflicts(0, 6);
// → { xung: true, hai: false, tuHanhXung: true }

isXung(0, 6);                              // true  — Lục Xung: Tý-Ngọ, Sửu-Mùi, Dần-Thân, Mão-Dậu, Thìn-Tuất, Tỵ-Hợi
isHai(0, 7);                               // true  — Lục Hại: Tý-Mùi, Sửu-Ngọ, Dần-Tỵ, Mão-Thìn, Thân-Hợi, Dậu-Tuất
isTuHanhXung(0, 3);                        // true  — Tứ Hành Xung: {Tý,Mão,Ngọ,Dậu} / {Dần,Tỵ,Thân,Hợi} / {Sửu,Thìn,Mùi,Tuất}

getXungBranchIndex(0);                     // 6 — Chi đối xung với Tý
getTuHanhXungGroupMembers(0);              // [0, 3, 6, 9] — cả nhóm chứa Tý
```

Tất cả nhận vào **index Địa Chi (0-11, 0 = Tý)**, cùng thứ tự với `getZodiacAnimal()`.

## Format & Hiển thị

```typescript
import { formatTraditional, formatLunarDate, getMonthName, getDayName } from '@lichta/core';

formatTraditional(lunar);                    // 'Mùng Một tháng Giêng năm Giáp Thìn'
formatLunarDate(lunar, 'dd/MM/yyyy');         // '01/01/2024'
formatLunarDate(lunar, 'Ngày d tháng M năm CC'); // 'Ngày 1 tháng 1 năm Giáp Thìn'

getMonthName(1);   // 'Giêng'
getDayName(15);    // 'Rằm'

// formatLunarDate nhận thêm `locale` tùy chọn (mặc định 'vi', chỉ ảnh hưởng token L)
formatLunarDate(lunar, 'dd/MM/yyyy', 'en');
```

**Format tokens:** `dd`/`d` (ngày), `MM`/`M` (tháng), `yyyy`/`yy` (năm), `CC`/`MC`/`DC` (Can Chi năm/tháng/ngày), `L` ("Nhuận" nếu là tháng nhuận).

## Lưới lịch tháng (dựng UI Calendar riêng)

Nếu bạn muốn tự dựng UI lịch tháng thay vì dùng component `Calendar` có sẵn (xem [`@lichta/react`](https://www.npmjs.com/package/@lichta/react)/[`@lichta/vue`](https://www.npmjs.com/package/@lichta/vue)/[`@lichta/svelte`](https://www.npmjs.com/package/@lichta/svelte)), `getCalendarGrid()` dựng sẵn lưới 42 ô (6 tuần) cho 1 tháng, gồm cả ngày tràn từ tháng trước/sau và ngày âm lịch tương ứng cho mỗi ô — đây cũng chính là hàm mà `Calendar` và `DatePicker` ở các package binding dùng nội bộ. Hàm này hỗ trợ cả tuần bắt đầu từ Chủ Nhật (0, mặc định) hoặc Thứ Hai (1).

```typescript
import { getCalendarGrid, getISOWeekNumber } from '@lichta/core';

// Lấy lưới lịch với tuần bắt đầu bằng Thứ Hai (1)
const grid = getCalendarGrid(2, 2024, null, 1); // tháng, năm, ngày đang chọn (hoặc null), FirstDayOfWeek (0 | 1)
// → CalendarDayCell[42], mỗi ô: { solar: Date, lunar: LunarDate, isToday, isSelected, isCurrentMonth, weekNumber: number }

// Lấy số tuần theo chuẩn ISO-8601
const weekNum = getISOWeekNumber(new Date(2024, 0, 1)); // → 1
```

## i18n

Hỗ trợ 4 ngôn ngữ cho tên Can Chi, Ngũ Hành, con giáp, tên tháng, thứ trong tuần: `vi`, `en`, `ja`, `ko`.

```typescript
import { t, getZodiacAnimal } from '@lichta/core';

t('en').fiveElements;         // ['Metal', 'Wood', 'Water', 'Fire', 'Earth']
t('ja').weekDays;             // ['日', '月', '火', '水', '木', '金', '土']
t('vi').lunarMonthNames;      // ['Giêng', 'Hai', ..., 'Chạp'] — tên tháng ÂM lịch
t('vi').solarMonthNames;      // ['Tháng 1', 'Tháng 2', ..., 'Tháng 12'] — tên tháng DƯƠNG lịch
getZodiacAnimal(0, 'vi');     // 'Chuột'
```

> `t(locale).monthNames` vẫn còn nhưng đã `@deprecated` — ngữ nghĩa của nó không nhất quán giữa các locale (với `'vi'` là tên tháng âm, với `'en'/'ja'/'ko'` lại là tên tháng dương). Luôn dùng `lunarMonthNames` hoặc `solarMonthNames` tùy ngữ cảnh cho code mới.

## API đầy đủ

| Nhóm | Hàm/Class |
|---|---|
| Solar ↔ Lunar | `LichTa.toLunar()`, `LichTa.toSolar()` |
| Julian Day Number | `jdFromDate()`, `jdToDate()` |
| Can Chi & Phong Thủy | `getYearDetails()`, `getDayCanChi()`, `getMonthCanChi()`, `getHourCanChi()`, `getAuspiciousHours()`, `getAuspiciousHourIndices()`, `getInauspiciousHours()`, `getInauspiciousHourIndices()` |
| Ngũ Hành | `getElementName()`, `getDayElement()`, `getDayElementIndex()`, `getMonthElement()`, `getMonthElementIndex()`, `getHourElement()`, `getHourElementIndex()`, `getElementRelation()`, `getElementRelationIndex()` |
| Tiết Khí | `getSolarTerm()`, `getSolarTermsInYear()`, `getSolarTermName()` |
| Trực | `getTruc()`, `getTrucIndex()`, `getTrucName()`, `getTrucQuality()`, `getTrucQualityIndex()` |
| Kỵ — Tuổi Xung Khắc | `isXung()`, `isHai()`, `isTuHanhXung()`, `getZodiacConflicts()`, `getXungBranchIndex()`, `getHaiBranchIndex()`, `getTuHanhXungGroupIndex()`, `getTuHanhXungGroupMembers()` |
| Format & Hiển thị | `formatLunarDate()`, `formatTraditional()`, `getMonthName()`, `getDayName()` |
| Lưới lịch | `getCalendarGrid()`, `getISOWeekNumber()` |
| i18n | `t()`, `getZodiacAnimal()`, `getWeekDayLabels()` |
| Types | `LunarDate`, `SolarDate`, `Locale`, `YearDetails`, `SolarTerm`, `ZodiacConflicts`, `CalendarDayCell`, `FirstDayOfWeek` |

Xem chi tiết đầy đủ (tham số, kiểu trả về, ví dụ đã chạy thật) tại trang [API Reference](https://lichta.zeneo.app/api).

## Styles (dùng chung cho Calendar/DatePicker component)

Package này cũng export sẵn CSS cho component `Calendar`/`DatePicker` ở các package binding framework — không cần thiết nếu bạn chỉ dùng logic tính toán:

```typescript
import '@lichta/core/styles/calendar-base.css';
import '@lichta/core/styles/calendar-glass.css';    // theme kính mờ cho Calendar (tùy chọn)
import '@lichta/core/styles/datepicker-base.css';   // chỉ cần nếu dùng component DatePicker
import '@lichta/core/styles/datepicker-glass.css';  // theme kính mờ cho DatePicker (tùy chọn)
```

## Thuật toán

Dựa trên thuật toán của **Hồ Ngọc Đức** (Đại học Leipzig), tham khảo các công thức thiên văn trong *"Astronomical Algorithms"* của **Jean Meeus** (1998) — chuẩn de facto cho lịch âm Việt Nam trong lập trình.

## License

[MIT](./LICENSE)
