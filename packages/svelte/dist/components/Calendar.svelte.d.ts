import type { LunarDate, CalendarDayCell } from '@lichta/core';
import type { Snippet } from 'svelte';
import type { Locale } from '@lichta/core';
/**
 * Dữ liệu cho mỗi ô ngày trong lưới lịch
 */
type DayCellData = CalendarDayCell;
interface Props {
    /** Tháng hiển thị (1-12). Mặc định: tháng hiện tại */
    month?: number;
    /** Năm hiển thị. Mặc định: năm hiện tại */
    year?: number;
    /** Ngày được chọn */
    selectedDate?: Date | null;
    /** Callback khi chọn ngày */
    onSelect?: (date: Date, lunar: LunarDate) => void;
    /** Hiển thị ngày âm lịch bên dưới ngày dương */
    showLunar?: boolean;
    /** Locale (vi | en | ja | ko) */
    locale?: Locale;
    /** Custom snippet cho mỗi ô ngày */
    dayCell?: Snippet<[DayCellData]>;
    children?: Snippet;
    /** Theme cho calendar */
    theme?: 'classic' | 'glass';
}
declare const Calendar: import("svelte").Component<Props, {}, "">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
