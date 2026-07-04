# @lichta/react-big-calendar

[![npm version](https://img.shields.io/npm/v/@lichta/react-big-calendar.svg)](https://www.npmjs.com/package/@lichta/react-big-calendar)

Plugin/Adapter tích hợp lịch âm Việt Nam (LichTa) vào thư viện [React Big Calendar](https://github.com/jquense/react-big-calendar).

## Cài đặt

```bash
pnpm add @lichta/react-big-calendar react-big-calendar
```

## Cách sử dụng cơ bản

React Big Calendar cho phép tùy chỉnh giao diện thông qua props `components`. Hàm `injectLunarDates` sẽ nhận vào object components hiện tại của bạn và tự động gắn thêm phần hiển thị ngày âm lịch.

```tsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { injectLunarDates } from '@lichta/react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  // Tạo components được tích hợp sẵn LichTa
  const customComponents = injectLunarDates();
  
  // Nếu bạn đã có components custom trước đó, bạn có thể truyền nó vào:
  // const customComponents = injectLunarDates({ ...yourComponents });

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={customComponents}
      />
    </div>
  );
};
```

## Tùy chọn giao diện (Options)

Hàm `injectLunarDates(components, pluginOptions)` nhận đối số thứ hai để cấu hình giao diện cho ngày âm lịch:

```typescript
const customComponents = injectLunarDates({}, {
    // Chỉ hiển thị tháng khi là mùng 1 (vd: "1/4" thay vì "1")
    monthOnFirstDayOnly: false, 
    
    // Hiển thị "(Nhuận)" cho các tháng nhuận âm lịch
    showLeapMonth: true,        
    
    // Hiển thị Can Chi khi hover chuột vào (Tooltip)
    showTooltip: true,          
    
    // Tùy chỉnh màu chữ
    color: '#888',              
    
    // Tùy chỉnh class CSS (hữu ích khi dùng Tailwind)
    className: 'lichta-rbc-lunar', 
});
```

### Tùy chỉnh hoàn toàn bằng hàm `render`

Nếu bạn muốn kiểm soát hoàn toàn mã React Node của phần hiển thị ngày âm lịch, hãy sử dụng thuộc tính `render`:

```tsx
const customComponents = injectLunarDates({}, {
    render: (lunarDate) => {
        return (
          <div className="custom-lunar" style={{ fontStyle: 'italic' }}>
            🌙 {lunarDate.day}/{lunarDate.month}
          </div>
        );
    }
});
```

## Phụ thuộc (Dependencies)
- **@lichta/core**: workspace dependency (tự động cài kèm)
- **react-big-calendar**: ^1.0.0 (peer dependency)
- **react**: ^17 || ^18 || ^19 (peer dependency)

## License

[MIT](./LICENSE)
