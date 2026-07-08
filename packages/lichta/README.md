# lichta (legacy)

[![npm version](https://img.shields.io/npm/v/lichta.svg)](https://www.npmjs.com/package/lichta)
[![npm version](https://img.shields.io/npm/v/@lichta/core.svg)](https://www.npmjs.com/package/@lichta/core)

🚀 **[Demo trực tiếp](https://lichta.zeneo.app/)**

> ⚠️ **Package này đã deprecated.** Đây là tên npm cũ của thư viện trước khi đổi sang các package có scope `@lichta/*`. Đừng cài package này cho dự án mới — xem bảng bên dưới để chọn đúng package thay thế.

## Vì sao package này vẫn tồn tại

Trước đây toàn bộ thư viện được publish dưới 1 package tên `lichta` duy nhất. Từ khi tách thành monorepo với các package scoped (`@lichta/core`, `@lichta/react`, `@lichta/vue`, `@lichta/svelte`, `@lichta/full-calendar`, `@lichta/event-calendar`, `@lichta/react-big-calendar`), package `lichta` được giữ lại làm cầu nối tương thích ngược cho những dự án đang cài `lichta` từ trước, tránh vỡ code đột ngột khi họ chạy `npm update`.

## Trạng thái hiện tại

**Package này hiện chỉ re-export `@lichta/svelte`:**

```javascript
// index.js
console.warn("[lichta] WARNING: The 'lichta' package is deprecated for Svelte components. ...");
export * from '@lichta/svelte';
```

Nghĩa là:
- Nếu bạn đang dùng Svelte, `import { ... } from 'lichta'` vẫn hoạt động (thực chất là `@lichta/svelte`), nhưng sẽ in cảnh báo deprecation ra console.
- Nếu bạn dùng React, Vue, hoặc chỉ cần logic tính toán thuần (vanilla JS/TS) — package này **không có đường dẫn tương thích cho bạn**, vì nó chỉ trỏ tới `@lichta/svelte`. Cài `lichta` trong trường hợp này sẽ kéo theo `svelte` như một dependency dù bạn không dùng Svelte.

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

Nếu bạn đang cài `lichta` từ trước và dùng API core (`LichTa.toLunar()`, ...), chuyển sang `@lichta/core` — API không đổi, chỉ đổi tên import:

```diff
- import { LichTa } from 'lichta';
+ import { LichTa } from '@lichta/core';
```

## License

[MIT](./LICENSE)
