# @lichta/svelte

[![npm version](https://img.shields.io/npm/v/@lichta/svelte.svg)](https://www.npmjs.com/package/@lichta/svelte)

Component `Calendar`/`Formatter` (lịch tháng có ngày âm lịch) cho Svelte 5, đóng gói trên [`@lichta/core`](https://www.npmjs.com/package/@lichta/core).

Khác với `@lichta/react`/`@lichta/vue`, package này **re-export toàn bộ API của `@lichta/core`** (`LichTa`, `getYearDetails`, `formatTraditional`, `t`, ...) — bạn không cần cài `@lichta/core` riêng, chỉ cần import thẳng từ `@lichta/svelte`.

## Cài đặt

```bash
pnpm add @lichta/svelte
```

Bạn cần cài `svelte` (peer dependency, `^5.0.0`) nếu dự án chưa có.

## Sử dụng

```svelte
<script>
	import { Calendar, Formatter } from '@lichta/svelte';
	import '@lichta/core/styles/calendar-base.css';
	import '@lichta/core/styles/calendar-glass.css'; // theme "glass" (tùy chọn)
</script>

<!-- Lịch tháng đầy đủ -->
<Calendar theme="glass" locale="vi" onSelect={(date, lunar) => console.log(date, lunar)} />

<!-- Hiển thị ngày âm lịch cho 1 ngày cụ thể -->
<Formatter date={new Date()} />
```

> ⚠️ `Calendar`/`Formatter` chỉ export class CSS (`lich-ta-calendar`, ...) — bạn **phải tự import** file CSS ở trên (hoặc CSS tương đương của riêng bạn), nếu không lịch sẽ hiển thị không có style.

### Custom render cho mỗi ô ngày

```svelte
<Calendar>
	{#snippet dayCell(cell)}
		<div>
			<span>{cell.solar.getDate()}</span>
			{#if cell.isCurrentMonth}<span>{cell.lunar.day}</span>{/if}
		</div>
	{/snippet}
</Calendar>
```

`cell` có kiểu `DayCellData`: `{ solar: Date, lunar: LunarDate, isToday: boolean, isSelected: boolean, isCurrentMonth: boolean }`.

## Props

### `Calendar`

| Prop           | Kiểu                                     | Mặc định       | Mô tả                             |
| -------------- | ---------------------------------------- | -------------- | --------------------------------- |
| `month`        | `number`                                 | Tháng hiện tại | Tháng hiển thị ban đầu (1–12)     |
| `year`         | `number`                                 | Năm hiện tại   | Năm hiển thị ban đầu              |
| `selectedDate` | `Date \| null`                           | `null`         | Ngày được chọn (controlled)       |
| `showLunar`    | `boolean`                                | `true`         | Hiện ngày âm lịch dưới ngày dương |
| `locale`       | `'vi' \| 'en' \| 'ja' \| 'ko'`           | `'vi'`         | Ngôn ngữ nhãn thứ trong tuần      |
| `theme`        | `'classic' \| 'glass'`                   | `'classic'`    | Giao diện lịch                    |
| `onSelect`     | `(date: Date, lunar: LunarDate) => void` | —              | Callback khi chọn ngày            |
| `dayCell`      | `Snippet<[DayCellData]>`                 | —              | Custom snippet cho mỗi ô ngày     |
| `children`     | `Snippet`                                | —              | Nội dung footer tùy chỉnh         |

### `Formatter`

| Prop       | Kiểu      | Mặc định     | Mô tả                            |
| ---------- | --------- | ------------ | -------------------------------- |
| `date`     | `Date`    | `new Date()` | Ngày dương lịch cần hiển thị     |
| `children` | `Snippet` | —            | Nội dung tùy chỉnh (render prop) |

## Dùng logic thuần (không cần component)

Vì `@lichta/svelte` re-export toàn bộ `@lichta/core`, bạn có thể import thẳng logic tính toán từ đây thay vì cài thêm `@lichta/core`:

```typescript
import { LichTa, getYearDetails, formatTraditional, t } from '@lichta/svelte';

const lunar = LichTa.toLunar(10, 2, 2024);
```

Xem đầy đủ API tại README của [`@lichta/core`](https://www.npmjs.com/package/@lichta/core).

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
