# @lichta/react

[![npm version](https://img.shields.io/npm/v/@lichta/react.svg)](https://www.npmjs.com/package/@lichta/react)

Component `Calendar` (lịch tháng có ngày âm lịch) cho React, đóng gói trên [`@lichta/core`](https://www.npmjs.com/package/@lichta/core).

## Cài đặt

```bash
pnpm add @lichta/react
```

`@lichta/core` được cài kèm tự động (dependency thường), nhưng bạn cần cài `react`/`react-dom` (peer dependency, `>=18.0.0`) nếu dự án chưa có.

## Sử dụng

```tsx
import { Calendar } from '@lichta/react';
import '@lichta/core/styles/calendar-base.css';
import '@lichta/core/styles/calendar-glass.css'; // theme "glass" (tùy chọn)

export default function App() {
  return (
    <Calendar
      theme="glass"
      locale="vi"
      onSelect={(date, lunar) => console.log(date, lunar)}
    />
  );
}
```

> ⚠️ `Calendar` chỉ export class CSS (`lich-ta-calendar`, ...) — bạn **phải tự import** file CSS ở trên (hoặc CSS tương đương của riêng bạn), nếu không lịch sẽ hiển thị không có style.

### Custom render cho mỗi ô ngày

```tsx
<Calendar
  renderDay={(cell) => (
    <div>
      <span>{cell.solar.getDate()}</span>
      {cell.isCurrentMonth && <span>{cell.lunar.day}</span>}
    </div>
  )}
/>
```

`cell` có kiểu `DayCellData`: `{ solar: Date, lunar: LunarDate, isToday: boolean, isSelected: boolean, isCurrentMonth: boolean }`.

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `month` | `number` | Tháng hiện tại | Tháng hiển thị ban đầu (1–12) |
| `year` | `number` | Năm hiện tại | Năm hiển thị ban đầu |
| `showLunar` | `boolean` | `true` | Hiện ngày âm lịch dưới ngày dương |
| `locale` | `'vi' \| 'en' \| 'ja' \| 'ko'` | `'vi'` | Ngôn ngữ nhãn thứ trong tuần |
| `theme` | `'classic' \| 'glass'` | `'classic'` | Giao diện lịch |
| `className` | `string` | `''` | Class CSS bổ sung cho container |
| `onSelect` | `(date: Date, lunar: LunarDate) => void` | — | Callback khi chọn ngày |
| `renderDay` | `(cell: DayCellData) => React.ReactNode` | — | Custom render cho mỗi ô ngày |
| `children` | `React.ReactNode` | — | Nội dung footer tùy chỉnh |

> Lưu ý: `month`/`year` hiện chỉ dùng làm giá trị khởi tạo state nội bộ (uncontrolled) — thay đổi prop sau khi mount chưa tự động cập nhật lại lịch đang hiển thị.

## Theming

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

## License

[MIT](./LICENSE)
