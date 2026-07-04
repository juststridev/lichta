import { LunarDate } from '@lichta/core';

interface LichTaOptions {
    /**
     * Chỉ hiển thị tháng khi là mùng 1 âm lịch (ví dụ: "1/4" thay vì "1").
     * Mặc định: false
     */
    monthOnFirstDayOnly?: boolean;
    /**
     * Hiển thị chữ "Nhuận" nếu rơi vào tháng nhuận âm lịch.
     * Mặc định: true
     */
    showLeapMonth?: boolean;
    /**
     * Hiển thị Can Chi của ngày khi hover chuột vào (Tooltip).
     * Mặc định: true
     */
    showTooltip?: boolean;
    /**
     * Màu chữ tùy chỉnh cho ngày âm lịch.
     * Mặc định: '#888'
     */
    color?: string;
    /**
     * Class CSS tùy chỉnh cho thẻ div chứa ngày âm lịch.
     */
    className?: string;
    /**
     * Tùy chọn render HTML nâng cao. Nếu được truyền vào, plugin sẽ dùng kết quả
     * của hàm này thay vì template mặc định.
     */
    render?: (lunar: LunarDate) => string;
}
/**
 * Attaches LichTa lunar dates to EventCalendar options.
 * Modifies the provided calendar options or returns a new config object.
 */
declare function injectLunarDates(options: any, pluginOptions?: LichTaOptions): any;

export { type LichTaOptions, injectLunarDates };
