# 🌙 LichTa

**Vietnamese Solar ↔ Lunar Calendar conversion library for JavaScript/TypeScript.**

Supports ready-to-use Svelte 5 components, while exporting a pure TypeScript core for React, Vue, Angular, and vanilla JS.

[![npm version](https://img.shields.io/npm/v/lichta)](https://www.npmjs.com/package/lichta)
[![license](https://img.shields.io/npm/l/lichta)](https://github.com/juststridev/lichta/blob/main/LICENSE)

🚀 **[Live Demo](https://lich-ta.vercel.app/)**

> 🇻🇳 [Phiên bản Tiếng Việt (Vietnamese version)](./README.vi.md)

---

## ✨ Features

- 🔄 **Solar ↔ Lunar Conversion** — Ho Ngoc Duc algorithm (range 1800–2199)
- 🐉 **Sexagenary Cycle (Can Chi)** — Calculate Can Chi for year, month, day, and hour
- 🔮 **Five Elements (Ngũ Hành)** — Calculate destiny element based on birth year
- ⏰ **Auspicious Hours (Giờ Hoàng Đạo)** — 6 auspicious hours in a day
- 📅 **Calendar Component** — Svelte 5 monthly calendar with lunar dates
- 🎨 **Format** — Display traditional lunar dates (Mùng Một tháng Giêng...)
- 🌐 **i18n** — Vietnamese–English–Japanese–Korean support (vi, en, ja, ko)
- 📦 **Multi-framework** — Svelte 5, React, Vue, Angular, vanilla JS

---

## 📦 Installation

```bash
npm install lichta
```

---

## 🚀 Usage

### Core Logic (Any framework)

Import from `lichta/core` to use **pure TypeScript** — no Svelte dependency:

```typescript
import { LichTa, getYearDetails } from 'lichta/core';

// Solar → Lunar
const lunar = LichTa.toLunar(10, 2, 2024);
// → {
//     day: 1, month: 1, year: 2024,
//     isLeap: false,
//     yearCanChi: 'Giáp Thìn',
//     monthCanChi: 'Bính Dần',
//     dayCanChi: '...',
//     jd: 2460350
//   }

// Lunar → Solar
const solar = LichTa.toSolar(1, 1, 2024, false);
// → { day: 10, month: 2, year: 2024 }

// Custom timezone (default is GMT+7)
const lunarChina = LichTa.toLunar(10, 2, 2024, 8); // GMT+8
```

### Sexagenary Cycle & Feng Shui (Can Chi & Phong Thủy)

```typescript
import { getYearDetails, getDayCanChi, getMonthCanChi, getHourCanChi, getAuspiciousHours } from 'lichta/core';

// Can Chi + Element for the year
getYearDetails(2024);
// → { can: 'Giáp', chi: 'Thìn', menh: 'Hỏa',
//     fullString: 'Giáp Thìn - Mệnh Hỏa' }

// Day Can Chi (requires Julian Day Number)
const lunar = LichTa.toLunar(10, 2, 2024);
getDayCanChi(lunar.jd);  // → 'Giáp Tý'

// Month Can Chi
getMonthCanChi(1, 2024); // → month Giêng year Giáp Thìn

// Hour Can Chi
getHourCanChi(8, lunar.jd); // → hour Thìn (7h-9h)

// Auspicious Hours
getAuspiciousHours(lunar.jd);
// → ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Mùi', 'Dậu']
```

### Format & Display

```typescript
import { formatTraditional, formatLunarDate, getMonthName, getDayName } from 'lichta/utils';

const lunar = LichTa.toLunar(10, 2, 2024);

// Traditional format
formatTraditional(lunar);
// → 'Mùng Một tháng Giêng năm Giáp Thìn'

// Pattern format
formatLunarDate(lunar, 'dd/MM/yyyy');  // → '01/01/2024'
formatLunarDate(lunar, 'CC');           // → 'Giáp Thìn'
formatLunarDate(lunar, 'Ngày DC');      // → 'Ngày Giáp Tý'

// Traditional names
getMonthName(1);  // → 'Giêng'
getMonthName(12); // → 'Chạp'
getDayName(1);    // → 'Mùng Một'
getDayName(15);   // → 'Rằm'
getDayName(30);   // → 'Ba Mươi'
```

**Format tokens:**

| Token  | Description                   | Example      |
|--------|-------------------------------|--------------|
| `dd`   | 2-digit day                   | 01, 15       |
| `d`    | Day                           | 1, 15        |
| `MM`   | 2-digit month                 | 01, 12       |
| `M`    | Month                         | 1, 12        |
| `yyyy` | 4-digit year                  | 2024         |
| `yy`   | Last 2 digits of year         | 24           |
| `CC`   | Year Can Chi                  | Giáp Thìn    |
| `DC`   | Day Can Chi                   | Giáp Tý      |
| `MC`   | Month Can Chi                 | Bính Dần     |
| `L`    | "Nhuận" if leap month         | Nhuận        |

### Svelte 5 Components

```svelte
<script>
  import { Calendar, Formatter } from 'lichta';
</script>

<!-- Full monthly calendar -->
<Calendar
  showLunar={true}
  locale="vi"
  onSelect={(date, lunar) => console.log(date, lunar)}
/>

<!-- Lunar date formatter -->
<Formatter date={new Date()} />
```

#### Calendar Props

| Prop           | Type                                          | Default           | Description                   |
|----------------|-----------------------------------------------|-------------------|-------------------------------|
| `month`        | `number`                                      | Current month     | Displayed month (1-12)        |
| `year`         | `number`                                      | Current year      | Displayed year                |
| `selectedDate` | `Date \| null`                                | `null`            | Selected date                 |
| `onSelect`     | `(date: Date, lunar: LunarDate) => void`      | —                 | Callback on date select       |
| `showLunar`    | `boolean`                                     | `true`            | Show lunar dates              |
| `locale`       | `'vi' \| 'en' \| 'ja' \| 'ko'`                | `'vi'`            | Language                      |
| `dayCell`      | `Snippet`                                     | —                 | Custom snippet for day cell   |

#### Theming

The Calendar supports CSS custom properties:

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

// Get dictionary
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

// Zodiac animal by year
getZodiacAnimal(0, 'vi'); // → 'Chuột'
getZodiacAnimal(4, 'en'); // → 'Dragon'
getZodiacAnimal(0, 'ja'); // → '鼠'
```

---

## 📁 Import Paths

| Path            | Content                           | Used for                      |
|-----------------|-----------------------------------|-------------------------------|
| `lichta`        | Full API + Svelte components      | Svelte 5 projects             |
| `lichta/core`   | Pure TypeScript logic             | React, Vue, Angular, vanilla  |
| `lichta/utils`  | Format utilities                  | Any framework                 |

```typescript
// Svelte 5 — import everything
import { LichTa, Calendar, Formatter, formatTraditional } from 'lichta';

// React / Vue / Angular — import core logic only
import { LichTa, getYearDetails } from 'lichta/core';
import { formatTraditional, getDayName } from 'lichta/utils';
```

---

## 📐 Algorithm

LichTa uses the lunar conversion algorithm by **Ho Ngoc Duc** (Leipzig University), based on:

- **Julian Day Number** — Continuous day coordinate system for astronomical calculations
- **New Moon** — Determines the 1st day of the lunar month
- **Solar Terms** — Determines months and leap months
- **Jean Meeus, "Astronomical Algorithms"** — Precise astronomical formulas

**Range**: 1800 – 2199 | **Default timezone**: GMT+7 (Vietnam)

See details in [docs/ALGORITHM.md](./docs/ALGORITHM.md).

---

## 📄 License

[MIT](./LICENSE)

---

## 🙏 Credits

- **Ho Ngoc Duc** — Original algorithm ([informatik.uni-leipzig.de](http://www.informatik.uni-leipzig.de/~duc/amlich/))
- **Jean Meeus** — *Astronomical Algorithms* (1998)
