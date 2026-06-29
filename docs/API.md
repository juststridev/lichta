# LichTa API Reference

> 🇻🇳 [Phiên bản Tiếng Việt (Vietnamese version)](./API.vi.md)

This document provides detailed information about the functions, parameters, and return types exposed by the `lichta` library.

## Core Module (`lichta/core`)

### `LichTa.toLunar(solarDay, solarMonth, solarYear, timezone?)`
Converts a Solar date to a Lunar date.

- **Parameters:**
  - `solarDay` *(number)*: Solar day (1-31).
  - `solarMonth` *(number)*: Solar month (1-12).
  - `solarYear` *(number)*: Solar year (1800-2199).
  - `timezone` *(number, optional)*: Timezone offset. Defaults to `7` (Vietnam).
- **Returns:** `LunarDate` object.

### `LichTa.toSolar(lunarDay, lunarMonth, lunarYear, isLeapMonth, timezone?)`
Converts a Lunar date to a Solar date.

- **Parameters:**
  - `lunarDay` *(number)*: Lunar day.
  - `lunarMonth` *(number)*: Lunar month.
  - `lunarYear` *(number)*: Lunar year.
  - `isLeapMonth` *(boolean)*: Whether the given month is a leap month.
  - `timezone` *(number, optional)*: Timezone offset. Defaults to `7`.
- **Returns:** `SolarDate` object.

*(More API documentation to be populated...)*
