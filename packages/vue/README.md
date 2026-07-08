# @lichta/vue

[![npm version](https://img.shields.io/npm/v/@lichta/vue.svg)](https://www.npmjs.com/package/@lichta/vue)
[![npm version](https://img.shields.io/npm/v/@lichta/core.svg)](https://www.npmjs.com/package/@lichta/core)

🚀 **[Demo trực tiếp](https://lichta.zeneo.app/)**

Component `Calendar` (lịch tháng có ngày âm lịch) cho Vue 3, đóng gói trên [`@lichta/core`](https://www.npmjs.com/package/@lichta/core).

## Cài đặt

```bash
pnpm add @lichta/vue
```

`@lichta/core` được cài kèm tự động (dependency thường), nhưng bạn cần cài `vue` (peer dependency, `^3.0.0`) nếu dự án chưa có.

## Sử dụng

```vue
<script setup lang="ts">
import { Calendar } from '@lichta/vue';
import '@lichta/core/styles/calendar-base.css';
import '@lichta/core/styles/calendar-glass.css'; // theme "glass" (tùy chọn)
import type { LunarDate } from '@lichta/core';

function onSelect(date: Date, lunar: LunarDate) {
  console.log(date, lunar);
}
</script>

<template>
  <Calendar theme="glass" locale="vi" @select="onSelect" />
</template>
```

> ⚠️ `Calendar` chỉ export class CSS (`lich-ta-calendar`, ...) — bạn **phải tự import** file CSS ở trên (hoặc CSS tương đương của riêng bạn), nếu không lịch sẽ hiển thị không có style.

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `month` | `number` | Tháng hiện tại | Tháng hiển thị ban đầu (1–12) |
| `year` | `number` | Năm hiện tại | Năm hiển thị ban đầu |
| `showLunar` | `boolean` | `true` | Hiện ngày âm lịch dưới ngày dương |
| `locale` | `'vi' \| 'en' \| 'ja' \| 'ko'` | `'vi'` | Ngôn ngữ nhãn thứ trong tuần |
| `theme` | `'classic' \| 'glass'` | `'classic'` | Giao diện lịch |

## Events

| Event | Payload | Mô tả |
|---|---|---|
| `select` | `(date: Date, lunar: LunarDate)` | Bắn ra khi người dùng chọn 1 ngày |

> Khác với `@lichta/react`/`@lichta/svelte` (dùng prop `onSelect`), Vue theo đúng convention của framework nên dùng `emit`/`@select` thay vì prop callback. Component cũng chưa hỗ trợ custom render cho từng ô ngày (có ở React/Svelte qua `renderDay`/`dayCell`) hay điều khiển `month`/`year` như controlled prop — thay đổi prop sau khi mount chưa tự động cập nhật lại lịch đang hiển thị.

## DatePicker

Component `DatePicker` (input + popover chọn ngày, dựng trên `Calendar` ở trên).

```vue
<script setup>
import { DatePicker } from '@lichta/vue';
import '@lichta/core/styles/calendar-base.css';
import '@lichta/core/styles/calendar-glass.css'; // theme "glass" (tùy chọn)
import '@lichta/core/styles/datepicker-base.css';
import '@lichta/core/styles/datepicker-glass.css'; // theme "glass" (tùy chọn)

function onSelect(date, lunar) {
  console.log(date, lunar);
}
</script>

<template>
  <DatePicker theme="glass" locale="vi" @select="onSelect" />
</template>
```

> ⚠️ Cần import cả CSS của `Calendar` (dùng trong popover) lẫn `DatePicker` (input + popover chrome) — thiếu 1 trong 2 sẽ hiển thị thiếu style.

### Props / Events

| Prop | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `value` | `Date \| null` | `null` | Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) |
| `placeholder` | `string` | `'Chọn ngày'` | Placeholder khi chưa chọn ngày |
| `locale` | `'vi' \| 'en' \| 'ja' \| 'ko'` | `'vi'` | Ngôn ngữ hiển thị trong popover |
| `theme` | `'classic' \| 'glass'` | `'classic'` | Giao diện input + popover |
| `showLunar` | `boolean` | `true` | Hiện ngày âm lịch trong popover |
| `format` | `(date: Date) => string` | `dd/MM/yyyy` | Hàm format ngày hiển thị trên input |
| `disabled` | `boolean` | `false` | Vô hiệu hoá input |

| Event | Payload | Mô tả |
|---|---|---|
| `select` | `(date: Date, lunar: LunarDate)` | Bắn khi chọn ngày trong popover |

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
