import { type LunarDate, type Locale } from '@lichta/core';
interface Props {
    /** Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) */
    value?: Date | null;
    placeholder?: string;
    locale?: Locale;
    theme?: 'classic' | 'glass';
    showLunar?: boolean;
    format?: (date: Date) => string;
    disabled?: boolean;
}
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (date: Date, lunar: LunarDate) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onSelect?: ((date: Date, lunar: LunarDate) => any) | undefined;
}>, {
    showLunar: boolean;
    locale: Locale;
    theme: "classic" | "glass";
    value: Date | null;
    placeholder: string;
    format: (date: Date) => string;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
