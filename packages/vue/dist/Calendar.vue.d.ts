import { type LunarDate, type Locale, type CalendarDayCell, type FirstDayOfWeek } from '@lichta/core';
interface Props {
    month?: number;
    year?: number;
    /** Ngày được chọn (controlled). Bỏ qua thì Calendar tự quản lý selection nội bộ (uncontrolled). */
    selectedDate?: Date | null;
    showLunar?: boolean;
    locale?: Locale;
    /** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai */
    firstDayOfWeek?: FirstDayOfWeek;
    /** Hiển thị số tuần (ISO-8601) ở đầu mỗi hàng */
    showWeekNumber?: boolean;
    theme?: 'classic' | 'glass';
}
export type DayCellData = CalendarDayCell;
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (date: Date, lunar: LunarDate) => any;
    "month-change": (month: number, year: number) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onSelect?: ((date: Date, lunar: LunarDate) => any) | undefined;
    "onMonth-change"?: ((month: number, year: number) => any) | undefined;
}>, {
    month: number;
    year: number;
    selectedDate: Date | null;
    showLunar: boolean;
    locale: Locale;
    firstDayOfWeek: FirstDayOfWeek;
    showWeekNumber: boolean;
    theme: "classic" | "glass";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
