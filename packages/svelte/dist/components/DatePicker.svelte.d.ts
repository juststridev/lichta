import type { LunarDate, Locale, FirstDayOfWeek } from '@lichta/core';
interface Props {
    /** Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) */
    value?: Date | null;
    /** Gọi khi người dùng chọn 1 ngày trong popover */
    onSelect?: (date: Date, lunar: LunarDate) => void;
    /** Callback khi user điều hướng tháng qua nút prev/next trong popover */
    onMonthChange?: (month: number, year: number) => void;
    placeholder?: string;
    locale?: Locale;
    /** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai */
    firstDayOfWeek?: FirstDayOfWeek;
    theme?: 'classic' | 'glass';
    showLunar?: boolean;
    format?: (date: Date) => string;
    disabled?: boolean;
}
declare const DatePicker: import("svelte").Component<Props, {}, "">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
