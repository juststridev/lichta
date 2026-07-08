# @lichta/full-calendar

[![npm version](https://img.shields.io/npm/v/@lichta/full-calendar.svg)](https://www.npmjs.com/package/@lichta/full-calendar)
[![npm version](https://img.shields.io/npm/v/@lichta/core.svg)](https://www.npmjs.com/package/@lichta/core)

🚀 **[Demo trực tiếp](https://lichta.zeneo.app/)**

Plugin/Adapter tích hợp lịch âm Việt Nam (LichTa) vào thư viện [FullCalendar](https://fullcalendar.io/).

## Cài đặt

```bash
pnpm add @lichta/full-calendar @fullcalendar/core @fullcalendar/daygrid
```

## Cách sử dụng cơ bản

Bạn chỉ cần bọc cấu hình gốc của FullCalendar bằng hàm `injectLunarDates`. Adapter sẽ tự động tính toán và tiêm (inject) ngày âm lịch vào các ô ngày trên giao diện lịch.

```typescript
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { injectLunarDates } from '@lichta/full-calendar';

const calendarEl = document.getElementById('calendar');

const calendarOptions = injectLunarDates({
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth'
    // ... các options gốc của FullCalendar
});

let calendar = new Calendar(calendarEl, calendarOptions);
calendar.render();
```

## Tùy chọn giao diện (Options)

Hàm `injectLunarDates(options, pluginOptions)` nhận đối số thứ hai để cấu hình giao diện cho ngày âm lịch:

```typescript
const calendarOptions = injectLunarDates(baseOptions, {
    // Chỉ hiển thị tháng khi là mùng 1 (vd: "1/4" thay vì "1")
    monthOnFirstDayOnly: false, 
    
    // Hiển thị "(Nhuận)" cho các tháng nhuận âm lịch
    showLeapMonth: true,        
    
    // Hiển thị Can Chi khi hover chuột vào (Tooltip)
    showTooltip: true,          
    
    // Tùy chỉnh màu chữ
    color: '#888',              
    
    // Tùy chỉnh class CSS (hữu ích khi dùng Tailwind)
    className: 'lichta-fc-lunar', 
});
```

### Tùy chỉnh hoàn toàn bằng hàm `render`

Nếu bạn muốn kiểm soát hoàn toàn mã HTML của phần hiển thị ngày âm lịch, hãy sử dụng thuộc tính `render`:

```typescript
const calendarOptions = injectLunarDates(baseOptions, {
    render: (lunarDate) => {
        return `<div class="custom-lunar">
            🌙 ${lunarDate.day}/${lunarDate.month}
        </div>`;
    }
});
```

## Phụ thuộc (Dependencies)
- **@lichta/core**: workspace dependency (tự động cài kèm)
- **@fullcalendar/core**: ^6.0.0 (peer dependency)

## License

[MIT](./LICENSE)
