import { type LunarDate, type Locale } from '@lichta/core';
interface Props {
    month?: number;
    year?: number;
    showLunar?: boolean;
    locale?: Locale;
    theme?: 'classic' | 'glass';
}
export interface DayCellData {
    solar: Date;
    lunar: LunarDate;
    isToday: boolean;
    isSelected: boolean;
    isCurrentMonth: boolean;
}
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (date: Date, lunar: LunarDate) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onSelect?: ((date: Date, lunar: LunarDate) => any) | undefined;
}>, {
    month: number;
    year: number;
    showLunar: boolean;
    locale: Locale;
    theme: "classic" | "glass";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
