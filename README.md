# 🌙 LichTa

**Thư viện chuyển đổi Dương lịch ↔ Âm lịch Việt Nam cho JavaScript/TypeScript.**

Hỗ trợ Svelte 5 components ăn liền, đồng thời export pure TypeScript core cho React, Vue, Angular, và vanilla JS.

[![npm version](https://img.shields.io/npm/v/lichta)](https://www.npmjs.com/package/lichta)
[![license](https://img.shields.io/npm/l/lichta)](https://github.com/juststridev/lichta/blob/main/LICENSE)

🚀 **[Live Demo](https://lich-ta.vercel.app/)**

---

## ✨ Tính năng

- 🔄 **Chuyển đổi Solar ↔ Lunar** — Thuật toán Hồ Ngọc Đức (phạm vi 1800–2199)
- 🐉 **Can Chi** — Tính Can Chi cho năm, tháng, ngày, giờ
- 🔮 **Ngũ Hành & Mệnh** — Tính mệnh theo năm sinh
- ⏰ **Giờ Hoàng Đạo** — 6 giờ tốt trong ngày
- 📅 **Calendar Component** — Lịch tháng Svelte 5 với ngày âm lịch
- 🎨 **Format** — Hiển thị ngày âm lịch truyền thống (Mùng Một tháng Giêng...)
- 🌐 **i18n** — Hỗ trợ Việt–Anh–Nhật–Hàn (vi, en, ja, ko)
- 📦 **Multi-framework** — Svelte 5, React, Vue, Angular, vanilla JS

---

## 📦 Cài đặt

```bash
npm install lichta
```

---

## 🚀 Sử dụng

### Core Logic (mọi framework)

Import từ `lichta/core` để sử dụng **pure TypeScript** — không phụ thuộc Svelte:

```typescript
import { LichTa, getYearDetails } from 'lichta/core';

// Dương lịch → Âm lịch
const lunar = LichTa.toLunar(10, 2, 2024);
// → {
//     day: 1, month: 1, year: 2024,
//     isLeap: false,
//     yearCanChi: 'Giáp Thìn',
//     monthCanChi: 'Bính Dần',
//     dayCanChi: '...',
//     jd: 2460350
//   }

// Âm lịch → Dương lịch
const solar = LichTa.toSolar(1, 1, 2024, false);
// → { day: 10, month: 2, year: 2024 }

// Múi giờ tùy chỉnh (mặc định GMT+7)
const lunarChina = LichTa.toLunar(10, 2, 2024, 8); // GMT+8
```

### Can Chi & Phong Thủy

```typescript
import { getYearDetails, getDayCanChi, getMonthCanChi, getHourCanChi, getAuspiciousHours } from 'lichta/core';

// Can Chi + Mệnh theo năm
getYearDetails(2024);
// → { can: 'Giáp', chi: 'Thìn', menh: 'Hỏa',
//     fullString: 'Giáp Thìn - Mệnh Hỏa' }

// Can Chi ngày (cần Julian Day Number)
const lunar = LichTa.toLunar(10, 2, 2024);
getDayCanChi(lunar.jd);  // → 'Giáp Tý'

// Can Chi tháng
getMonthCanChi(1, 2024); // → tháng Giêng năm Giáp Thìn

// Can Chi giờ
getHourCanChi(8, lunar.jd); // → giờ Thìn (7h-9h)

// Giờ Hoàng Đạo
getAuspiciousHours(lunar.jd);
// → ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Mùi', 'Dậu']
```

### Format & Hiển thị

```typescript
import { formatTraditional, formatLunarDate, getMonthName, getDayName } from 'lichta/utils';

const lunar = LichTa.toLunar(10, 2, 2024);

// Format truyền thống
formatTraditional(lunar);
// → 'Mùng Một tháng Giêng năm Giáp Thìn'

// Format theo pattern
formatLunarDate(lunar, 'dd/MM/yyyy');  // → '01/01/2024'
formatLunarDate(lunar, 'CC');           // → 'Giáp Thìn'
formatLunarDate(lunar, 'Ngày DC');      // → 'Ngày Giáp Tý'

// Tên truyền thống
getMonthName(1);  // → 'Giêng'
getMonthName(12); // → 'Chạp'
getDayName(1);    // → 'Mùng Một'
getDayName(15);   // → 'Rằm'
getDayName(30);   // → 'Ba Mươi'
```

**Format tokens:**

| Token  | Mô tả                         | Ví dụ        |
|--------|-------------------------------|--------------|
| `dd`   | Ngày 2 chữ số                 | 01, 15       |
| `d`    | Ngày                          | 1, 15        |
| `MM`   | Tháng 2 chữ số                | 01, 12       |
| `M`    | Tháng                         | 1, 12        |
| `yyyy` | Năm 4 chữ số                  | 2024         |
| `yy`   | Năm 2 chữ số cuối             | 24           |
| `CC`   | Can Chi năm                   | Giáp Thìn    |
| `DC`   | Can Chi ngày                  | Giáp Tý      |
| `MC`   | Can Chi tháng                 | Bính Dần     |
| `L`    | "Nhuận" nếu tháng nhuận       | Nhuận        |

### Svelte 5 Components

```svelte
<script>
  import { Calendar, Formatter } from 'lichta';
</script>

<!-- Lịch tháng đầy đủ -->
<Calendar
  showLunar={true}
  locale="vi"
  onSelect={(date, lunar) => console.log(date, lunar)}
/>

<!-- Hiển thị ngày âm lịch -->
<Formatter date={new Date()} />
```

#### Calendar Props

| Prop           | Type                                          | Mặc định          | Mô tả                         |
|----------------|-----------------------------------------------|-------------------|-------------------------------|
| `month`        | `number`                                      | Tháng hiện tại    | Tháng hiển thị (1-12)         |
| `year`         | `number`                                      | Năm hiện tại      | Năm hiển thị                  |
| `selectedDate` | `Date \| null`                                | `null`            | Ngày được chọn                |
| `onSelect`     | `(date: Date, lunar: LunarDate) => void`      | —                 | Callback khi chọn ngày        |
| `showLunar`    | `boolean`                                     | `true`            | Hiển thị ngày âm lịch         |
| `locale`       | `'vi' \| 'en' \| 'ja' \| 'ko'`                | `'vi'`            | Ngôn ngữ                      |
| `dayCell`      | `Snippet`                                     | —                 | Custom snippet cho ô ngày     |

#### Theming

Calendar hỗ trợ CSS custom properties:

```css
:root {
  --lichta-primary: #d4a373;
  --lichta-bg: #fffcf7;
  --lichta-text: #2c1810;
  --lichta-today-bg: #d4a373;
  --lichta-selected-bg: #a0522d;
  --lichta-lunar-text: #b08968;
  --lichta-radius: 8px;
  --lichta-font: 'Inter', sans-serif;
}
```

### i18n

```typescript
import { t, getZodiacAnimal } from 'lichta';

// Lấy bộ dịch
const vi = t('vi');
vi.heavenlyStems;   // ['Giáp', 'Ất', ...]
vi.earthlyBranches; // ['Tý', 'Sửu', ...]
vi.fiveElements;    // ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']
vi.monthNames;      // ['Giêng', 'Hai', ..., 'Chạp']

const en = t('en');
en.fiveElements;    // ['Metal', 'Wood', 'Water', 'Fire', 'Earth']
en.zodiacAnimals;   // ['Rat', 'Ox', 'Tiger', ...]

const ja = t('ja');
ja.weekDays;        // ['日', '月', '火', '水', '木', '金', '土']

const ko = t('ko');
ko.fiveElements;    // ['금', '목', '수', '화', '토']

// Con giáp theo năm
getZodiacAnimal(0, 'vi'); // → 'Chuột'
getZodiacAnimal(4, 'en'); // → 'Dragon'
getZodiacAnimal(0, 'ja'); // → '鼠'
```

---

## 📁 Import Paths

| Path            | Nội dung                          | Dùng cho                      |
|-----------------|-----------------------------------|-------------------------------|
| `lichta`        | Toàn bộ API + Svelte components   | Svelte 5 projects             |
| `lichta/core`   | Pure TypeScript logic             | React, Vue, Angular, vanilla  |
| `lichta/utils`  | Format utilities                  | Mọi framework                 |

```typescript
// Svelte 5 — import tất cả
import { LichTa, Calendar, Formatter, formatTraditional } from 'lichta';

// React / Vue / Angular — chỉ import core logic
import { LichTa, getYearDetails } from 'lichta/core';
import { formatTraditional, getDayName } from 'lichta/utils';
```

---

## 📐 Thuật toán

LichTa sử dụng thuật toán chuyển đổi âm lịch của **Hồ Ngọc Đức** (Đại học Leipzig), dựa trên:

- **Julian Day Number** — Hệ tọa độ ngày liên tục cho tính toán thiên văn
- **Điểm Sóc (New Moon)** — Xác định mùng 1 âm lịch
- **Trung Khí (Solar Terms)** — Xác định tháng và tháng nhuận
- **Jean Meeus, "Astronomical Algorithms"** — Công thức thiên văn chính xác

**Phạm vi**: 1800 – 2199 | **Múi giờ mặc định**: GMT+7 (Việt Nam)

Xem chi tiết trong [docs/ALGORITHM.md](./docs/ALGORITHM.md).

---

## 📄 License

[MIT](./LICENSE)

---

## 🙏 Credits

- **Hồ Ngọc Đức** — Thuật toán gốc ([informatik.uni-leipzig.de](http://www.informatik.uni-leipzig.de/~duc/amlich/))
- **Jean Meeus** — *Astronomical Algorithms* (1998)
