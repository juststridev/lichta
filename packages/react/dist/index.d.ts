import React from 'react';
import { LunarDate, Locale, CalendarDayCell } from '@lichta/core';

interface CalendarProps {
    month?: number;
    year?: number;
    /** Ngày được chọn (controlled). Bỏ qua thì Calendar tự quản lý selection nội bộ (uncontrolled). */
    selectedDate?: Date | null;
    onSelect?: (date: Date, lunar: LunarDate) => void;
    showLunar?: boolean;
    locale?: Locale;
    theme?: 'classic' | 'glass';
    className?: string;
    children?: React.ReactNode;
    renderDay?: (cell: DayCellData) => React.ReactNode;
}
type DayCellData = CalendarDayCell;
declare const Calendar: React.FC<CalendarProps>;

interface DatePickerProps {
    /** Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) */
    value?: Date | null;
    /** Gọi khi người dùng chọn 1 ngày trong popover */
    onSelect?: (date: Date, lunar: LunarDate) => void;
    /** Placeholder khi chưa chọn ngày nào */
    placeholder?: string;
    /** Ngôn ngữ hiển thị Can Chi/thứ trong tuần */
    locale?: Locale;
    /** Theme cho input + popover */
    theme?: 'classic' | 'glass';
    /** Hiển thị ngày âm lịch trong popover */
    showLunar?: boolean;
    /** Hàm format ngày hiển thị trên input, mặc định dd/MM/yyyy */
    format?: (date: Date) => string;
    disabled?: boolean;
    className?: string;
}
declare const DatePicker: React.FC<DatePickerProps>;

export { Calendar, type CalendarProps, DatePicker, type DatePickerProps };
