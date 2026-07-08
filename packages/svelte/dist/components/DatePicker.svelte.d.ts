import type { LunarDate, Locale } from '@lichta/core';
interface Props {
    /** Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) */
    value?: Date | null;
    /** Gọi khi người dùng chọn 1 ngày trong popover */
    onSelect?: (date: Date, lunar: LunarDate) => void;
    placeholder?: string;
    locale?: Locale;
    theme?: 'classic' | 'glass';
    showLunar?: boolean;
    format?: (date: Date) => string;
    disabled?: boolean;
}
declare const DatePicker: import("svelte").Component<Props, {}, "">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
