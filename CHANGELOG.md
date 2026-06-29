# Changelog

All notable changes to this project will be documented in this file.

> 🇻🇳 [Phiên bản Tiếng Việt (Vietnamese version)](./CHANGELOG.vi.md)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta] - 2026-06-16

### Added
- **Solar ↔ Lunar Conversion Algorithm**: Uses the Ho Ngoc Duc algorithm with high precision (range from 1800 to 2199).
- **Sexagenary Cycle (Can Chi)**: Supports detailed calculation for year, month, day, and hour.
- **Five Elements & Destiny (Ngũ Hành & Mệnh)**: Calculates and displays the destiny element (Metal, Wood, Water, Fire, Earth) based on birth year.
- **Auspicious Hours (Giờ Hoàng Đạo)**: Accurately determines the 6 auspicious hours in a day.
- **Calendar Component**: Provides a monthly Calendar component for Svelte 5 with built-in lunar date display.
- **Format Utilities**: Utility functions to format traditional lunar dates (e.g., Mùng Một tháng Giêng) and support pattern formatting (`dd/MM/yyyy`, `CC`, `DC`,...).
- **Multi-language (i18n)**: Supports 4 languages including Vietnamese (vi), English (en), Japanese (ja), and Korean (ko).
- **Multi-framework Support**: Extracts core logic into pure TypeScript (`lichta/core` and `lichta/utils`), making it easy to integrate with React, Vue, Angular, and Vanilla JS without depending on Svelte.
