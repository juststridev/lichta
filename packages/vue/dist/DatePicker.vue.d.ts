import { type LunarDate, type Locale, type FirstDayOfWeek } from '@lichta/core';
interface Props {
    /** Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) */
    value?: Date | null;
    placeholder?: string;
    locale?: Locale;
    /** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai */
    firstDayOfWeek?: FirstDayOfWeek;
    theme?: 'classic' | 'glass';
    showLunar?: boolean;
    format?: (date: Date) => string;
    disabled?: boolean;
}
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (date: Date, lunar: LunarDate) => any;
    "month-change": (month: number, year: number) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onSelect?: ((date: Date, lunar: LunarDate) => any) | undefined;
    "onMonth-change"?: ((month: number, year: number) => any) | undefined;
}>, {
    showLunar: boolean;
    locale: Locale;
    firstDayOfWeek: FirstDayOfWeek;
    theme: "classic" | "glass";
    value: Date | null;
    placeholder: string;
    format: (date: Date) => string;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
