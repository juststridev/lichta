# lichta (legacy)

[![lichta](https://img.shields.io/npm/v/lichta.svg?label=lichta)](https://www.npmjs.com/package/lichta)
[![@lichta/core](https://img.shields.io/npm/v/@lichta/core.svg?label=%40lichta%2Fcore)](https://www.npmjs.com/package/@lichta/core)

🚀 **[Demo trực tiếp](https://lichta.zeneo.app/)**

> ⚠️ **Package này đã deprecated.** Đây là tên npm cũ của thư viện trước khi đổi sang các package có scope `@lichta/*`. Đừng cài package này cho dự án mới — xem bảng bên dưới để chọn đúng package thay thế.

## Vì sao package này vẫn tồn tại

Trước đây toàn bộ thư viện được publish dưới 1 package tên `lichta` duy nhất. Từ khi tách thành monorepo với các package scoped (`@lichta/core`, `@lichta/react`, `@lichta/vue`, `@lichta/svelte`, `@lichta/full-calendar`, `@lichta/event-calendar`, `@lichta/react-big-calendar`), package `lichta` được giữ lại làm cầu nối tương thích ngược cho những dự án đang cài `lichta` từ trước, tránh vỡ code đột ngột khi họ chạy `npm update`.

## Trạng thái hiện tại (từ v2.2.0)

**Package này giờ chỉ re-export `@lichta/core`** (vanilla JS/TS, không phụ thuộc framework nào):

```javascript
// index.js
export * from '@lichta/core';
```

Nghĩa là:
- `import { LichTa } from 'lichta'` hoạt động tương đương `import { LichTa } from '@lichta/core'` — không kéo theo `react`/`vue`/`svelte` như một dependency dù bạn không dùng.
- Nếu bạn cần component UI (Calendar/DatePicker) cho React, Vue, hoặc Svelte — package này **không có đường dẫn tương thích cho bạn**, cài thẳng package framework tương ứng bên dưới.

> ⚠️ **Breaking change so với các bản trước v2.2.0**: trước đây `lichta` re-export `@lichta/svelte` (kèm cảnh báo deprecation). Nếu bạn đang dùng `import { Calendar } from 'lichta'` để lấy Svelte component, migrate sang `@lichta/svelte`.

## Nên làm gì

Đừng cài `lichta`. Cài thẳng package phù hợp:

| Bạn dùng | Cài package |
|---|---|
| Chỉ cần logic tính toán (vanilla JS/TS, Node.js) | [`@lichta/core`](https://www.npmjs.com/package/@lichta/core) |
| React | [`@lichta/react`](https://www.npmjs.com/package/@lichta/react) |
| Vue | [`@lichta/vue`](https://www.npmjs.com/package/@lichta/vue) |
| Svelte 5 | [`@lichta/svelte`](https://www.npmjs.com/package/@lichta/svelte) |
| FullCalendar | [`@lichta/full-calendar`](https://www.npmjs.com/package/@lichta/full-calendar) |
| EventCalendar | [`@lichta/event-calendar`](https://www.npmjs.com/package/@lichta/event-calendar) |
| React Big Calendar | [`@lichta/react-big-calendar`](https://www.npmjs.com/package/@lichta/react-big-calendar) |

Nếu bạn đang cài `lichta` từ trước và dùng API core (`LichTa.toLunar()`, ...), không cần đổi gì — `lichta` giờ chính là `@lichta/core`. Khuyến nghị đổi tên import cho rõ ràng:

```diff
- import { LichTa } from 'lichta';
+ import { LichTa } from '@lichta/core';
```

## License

[MIT](./LICENSE)
