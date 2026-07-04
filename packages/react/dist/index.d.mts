import React from 'react';
import { LunarDate, Locale } from '@lichta/core';

interface CalendarProps {
    month?: number;
    year?: number;
    onSelect?: (date: Date, lunar: LunarDate) => void;
    showLunar?: boolean;
    locale?: Locale;
    theme?: 'classic' | 'glass';
    className?: string;
    children?: React.ReactNode;
    renderDay?: (cell: DayCellData) => React.ReactNode;
}
interface DayCellData {
    solar: Date;
    lunar: LunarDate;
    isToday: boolean;
    isSelected: boolean;
    isCurrentMonth: boolean;
}
declare const Calendar: React.FC<CalendarProps>;

export { Calendar, type CalendarProps };
