# @lichta/react

[![@lichta/react](https://img.shields.io/npm/v/@lichta/react.svg?label=%40lichta%2Freact)](https://www.npmjs.com/package/@lichta/react)
[![@lichta/core](https://img.shields.io/npm/v/@lichta/core.svg?label=%40lichta%2Fcore)](https://www.npmjs.com/package/@lichta/core)

🚀 **[Demo trực tiếp](https://lichta.zeneo.app/)**

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
| `firstDayOfWeek` | `0 \| 1` | `0` | Ngày bắt đầu tuần: `0` = Chủ Nhật, `1` = Thứ Hai |
| `showWeekNumber` | `boolean` | `false` | Hiện số tuần (ISO-8601) ở đầu mỗi hàng |
| `theme` | `'classic' \| 'glass'` | `'classic'` | Giao diện lịch |
| `className` | `string` | `''` | Class CSS bổ sung cho container |
| `onSelect` | `(date: Date, lunar: LunarDate) => void` | — | Callback khi chọn ngày |
| `onMonthChange` | `(month: number, year: number) => void` | — | Callback khi điều hướng tháng qua nút prev/next trong header |
| `renderDay` | `(cell: DayCellData) => React.ReactNode` | — | Custom render cho mỗi ô ngày |
| `children` | `React.ReactNode` | — | Nội dung footer tùy chỉnh |

> `month`/`year` là controlled prop — component tự đồng bộ lại khi cha đổi giá trị. Kết hợp với `onMonthChange` để đồng bộ 2 chiều với 1 nguồn điều hướng khác (ví dụ FullCalendar).

## DatePicker

Component `DatePicker` (input + popover chọn ngày, dựng trên `Calendar` ở trên).

```tsx
import { DatePicker } from '@lichta/react';
import '@lichta/core/styles/calendar-base.css';
import '@lichta/core/styles/calendar-glass.css'; // theme "glass" (tùy chọn)
import '@lichta/core/styles/datepicker-base.css';
import '@lichta/core/styles/datepicker-glass.css'; // theme "glass" (tùy chọn)

export default function App() {
  return (
    <DatePicker
      theme="glass"
      locale="vi"
      onSelect={(date, lunar) => console.log(date, lunar)}
    />
  );
}
```

> ⚠️ Cần import cả CSS của `Calendar` (dùng trong popover) lẫn `DatePicker` (input + popover chrome) — thiếu 1 trong 2 sẽ hiển thị thiếu style.

### Props

| Prop | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `value` | `Date \| null` | `null` | Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) |
| `onSelect` | `(date: Date, lunar: LunarDate) => void` | — | Callback khi chọn ngày trong popover |
| `onMonthChange` | `(month: number, year: number) => void` | — | Callback khi điều hướng tháng qua nút prev/next trong popover |
| `placeholder` | `string` | `'Chọn ngày'` | Placeholder khi chưa chọn ngày |
| `locale` | `'vi' \| 'en' \| 'ja' \| 'ko'` | `'vi'` | Ngôn ngữ hiển thị trong popover |
| `firstDayOfWeek` | `0 \| 1` | `0` | Ngày bắt đầu tuần: `0` = Chủ Nhật, `1` = Thứ Hai |
| `theme` | `'classic' \| 'glass'` | `'classic'` | Giao diện input + popover |
| `showLunar` | `boolean` | `true` | Hiện ngày âm lịch trong popover |
| `format` | `(date: Date) => string` | `dd/MM/yyyy` | Hàm format ngày hiển thị trên input |
| `disabled` | `boolean` | `false` | Vô hiệu hoá input |
| `className` | `string` | `''` | Class CSS bổ sung cho container |

Popover tự đóng khi: chọn xong 1 ngày, click ra ngoài, hoặc nhấn phím `Escape`.

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

`DatePicker` dùng chung biến CSS `--lichta-*` ở trên — không cần custom class riêng.

## License

[MIT](./LICENSE)
