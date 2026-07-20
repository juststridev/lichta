import React from 'react';
import { LunarDate, Locale, FirstDayOfWeek, CalendarDayCell } from '@lichta/core';

interface CalendarProps {
    month?: number;
    year?: number;
    /** Ngày được chọn (controlled). Bỏ qua thì Calendar tự quản lý selection nội bộ (uncontrolled). */
    selectedDate?: Date | null;
    onSelect?: (date: Date, lunar: LunarDate) => void;
    /** Callback khi user điều hướng tháng qua nút prev/next trong header */
    onMonthChange?: (month: number, year: number) => void;
    showLunar?: boolean;
    locale?: Locale;
    /** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai */
    firstDayOfWeek?: FirstDayOfWeek;
    /** Hiển thị số tuần (ISO-8601) ở đầu mỗi hàng */
    showWeekNumber?: boolean;
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
    /** Callback khi user điều hướng tháng qua nút prev/next trong popover */
    onMonthChange?: (month: number, year: number) => void;
    /** Placeholder khi chưa chọn ngày nào */
    placeholder?: string;
    /** Ngôn ngữ hiển thị Can Chi/thứ trong tuần */
    locale?: Locale;
    /** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai */
    firstDayOfWeek?: FirstDayOfWeek;
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
