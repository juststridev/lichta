/** Kết quả chuyển đổi sang Âm lịch */
interface LunarDate {
    day: number;
    month: number;
    year: number;
    isLeap: boolean;
    jd: number;
    dayCanChi?: string;
    monthCanChi?: string;
    yearCanChi?: string;
}
/** Kết quả chuyển đổi sang Dương lịch */
interface SolarDate {
    day: number;
    month: number;
    year: number;
}
/** Một lần xuất hiện Tiết Khí (Solar Term) trong năm dương lịch */
interface SolarTerm {
    index: number;
    name: string;
    date: SolarDate;
    jd: number;
}

declare class LichTa {
    /**
     * Chuyển đổi ngày Dương lịch sang Âm lịch.
     *
     * Sử dụng thuật toán Hồ Ngọc Đức để tìm Điểm Sóc và Tiết Khí,
     * từ đó xác định ngày, tháng, năm âm lịch tương ứng.
     *
     * @param day - Ngày dương lịch (1-31)
     * @param month - Tháng dương lịch (1-12)
     * @param year - Năm dương lịch (1800-2199)
     * @param timeZone - Múi giờ (mặc định: 7 cho GMT+7 Việt Nam)
     * @returns Đối tượng LunarDate chứa thông tin ngày âm lịch
     * @throws {RangeError} Khi input ngoài phạm vi hợp lệ
     *
     * @example
     * ```typescript
     * const lunar = LichTa.toLunar(10, 2, 2024);
     * // → { day: 1, month: 1, year: 2024, isLeap: false, yearCanChi: 'Giáp Thìn' }
     * ```
     */
    static toLunar(day: number, month: number, year: number, timeZone?: number): LunarDate;
    /**
     * Chuyển đổi ngày Âm lịch sang Dương lịch.
     *
     * @param lunarDay - Ngày âm lịch
     * @param lunarMonth - Tháng âm lịch
     * @param lunarYear - Năm âm lịch
     * @param isLeap - Có phải tháng nhuận không
     * @param timeZone - Múi giờ (mặc định: 7 cho GMT+7 Việt Nam)
     * @returns Đối tượng SolarDate
     * @throws {RangeError} Khi năm ngoài phạm vi 1800-2199
     *
     * @example
     * ```typescript
     * const solar = LichTa.toSolar(1, 1, 2024, false);
     * // → { day: 10, month: 2, year: 2024 }
     * ```
     */
    static toSolar(lunarDay: number, lunarMonth: number, lunarYear: number, isLeap?: boolean, timeZone?: number): SolarDate;
}

/**
 * Thuật toán thiên văn nền tảng cho chuyển đổi Dương lịch ↔ Âm lịch Việt Nam
 * Dựa trên công trình của Hồ Ngọc Đức (Đại học Leipzig)
 * Tham khảo: Jean Meeus, "Astronomical Algorithms" (1998)
 *
 * Copyright (c) 2006 Ho Ngoc Duc. All Rights Reserved.
 * TypeScript adaptation for Lichta library.
 */
/**
 * Chuyển ngày Gregorian sang Julian Day Number.
 *
 * @param dd - Ngày (1-31)
 * @param mm - Tháng (1-12)
 * @param yy - Năm
 */
declare function jdFromDate(dd: number, mm: number, yy: number): number;
/**
 * Chuyển Julian Day Number sang ngày Gregorian.
 *
 * @param jd - Julian Day Number
 * @returns Tuple [day, month, year]
 */
declare function jdToDate(jd: number): [number, number, number];

/** Một ô ngày trong lưới lịch tháng. */
interface CalendarDayCell {
    solar: Date;
    lunar: LunarDate;
    isToday: boolean;
    isSelected: boolean;
    isCurrentMonth: boolean;
    /** Số tuần trong năm (ISO-8601) của hàng chứa ô này — giống nhau cho cả 7 ô trong hàng. */
    weekNumber: number;
}
/** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định, giống `Date.getDay()`), 1 = Thứ Hai. */
type FirstDayOfWeek = 0 | 1;
/**
 * Tính số tuần theo chuẩn ISO-8601: tuần bắt đầu Thứ Hai, tuần 1 của năm là
 * tuần chứa Thứ Năm đầu tiên (tương đương: tuần chứa ngày 4/1).
 */
declare function getISOWeekNumber(date: Date): number;
/**
 * Dựng lưới 42 ô (6 tuần x 7 ngày) cho 1 tháng dương lịch, gồm ngày tràn từ
 * tháng trước/sau để lấp đầy tuần đầu/cuối, mỗi ô kèm ngày âm tương ứng.
 *
 * Logic này trước đây bị lặp lại độc lập ở Calendar.tsx/vue/svelte — tách ra
 * đây để có 1 nguồn tính toán duy nhất (tránh 3 bản có thể lệch nhau khi sửa
 * riêng lẻ), dùng chung cho cả Calendar và DatePicker ở mọi framework.
 *
 * @param month - Tháng dương lịch (1-12)
 * @param year - Năm dương lịch
 * @param selectedDate - Ngày đang được chọn (nếu có), dùng để đánh dấu `isSelected`
 * @param firstDayOfWeek - Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai
 */
declare function getCalendarGrid(month: number, year: number, selectedDate?: Date | null, firstDayOfWeek?: FirstDayOfWeek): CalendarDayCell[];

/**
 * Internationalization — Hỗ trợ song ngữ Việt-Anh
 */
type Locale = 'vi' | 'en' | 'ja' | 'ko';
/**
 * Lấy bộ dịch theo locale
 * @param locale - Ngôn ngữ ('vi' | 'en' | 'ja' | 'ko')
 */
declare function t(locale: Locale): {
    readonly heavenlyStems: readonly ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    readonly earthlyBranches: readonly ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    readonly fiveElements: readonly ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
    readonly zodiacAnimals: readonly ["Chuột", "Trâu", "Cọp", "Thỏ", "Rồng", "Rắn", "Ngựa", "Dê", "Khỉ", "Gà", "Chó", "Heo"];
    readonly monthNames: readonly ["Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Một", "Chạp"];
    readonly lunarMonthNames: readonly ["Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Một", "Chạp"];
    readonly solarMonthNames: readonly ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    readonly weekDays: readonly ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    readonly leapLabel: "Nhuận";
    readonly yearLabel: "Năm";
    readonly monthLabel: "Tháng";
    readonly destiny: "Mệnh";
    readonly solarTermNames: readonly ["Xuân Phân", "Thanh Minh", "Cốc Vũ", "Lập Hạ", "Tiểu Mãn", "Mang Chủng", "Hạ Chí", "Tiểu Thử", "Đại Thử", "Lập Thu", "Xử Thử", "Bạch Lộ", "Thu Phân", "Hàn Lộ", "Sương Giáng", "Lập Đông", "Tiểu Tuyết", "Đại Tuyết", "Đông Chí", "Tiểu Hàn", "Đại Hàn", "Lập Xuân", "Vũ Thủy", "Kinh Trập"];
    readonly trucNames: readonly ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"];
    readonly elementRelationNames: readonly ["Tương sinh", "Được sinh", "Tương khắc", "Bị khắc", "Tương hòa"];
    readonly trucQualityNames: readonly ["Xấu", "Trung bình", "Tốt"];
} | {
    readonly heavenlyStems: readonly ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    readonly earthlyBranches: readonly ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    readonly fiveElements: readonly ["Metal", "Wood", "Water", "Fire", "Earth"];
    readonly zodiacAnimals: readonly ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    readonly monthNames: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    readonly lunarMonthNames: readonly ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"];
    readonly solarMonthNames: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    readonly weekDays: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    readonly leapLabel: "Leap";
    readonly yearLabel: "Year";
    readonly monthLabel: "Month";
    readonly destiny: "Destiny";
    readonly solarTermNames: readonly ["Spring Equinox", "Clear and Bright", "Grain Rain", "Start of Summer", "Grain Full", "Grain in Ear", "Summer Solstice", "Minor Heat", "Major Heat", "Start of Autumn", "End of Heat", "White Dew", "Autumn Equinox", "Cold Dew", "Frost's Descent", "Start of Winter", "Minor Snow", "Major Snow", "Winter Solstice", "Minor Cold", "Major Cold", "Start of Spring", "Rain Water", "Awakening of Insects"];
    readonly trucNames: readonly ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"];
    readonly elementRelationNames: readonly ["Generates", "Generated By", "Overcomes", "Overcome By", "Same Element"];
    readonly trucQualityNames: readonly ["Bad", "Neutral", "Good"];
} | {
    readonly heavenlyStems: readonly ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    readonly earthlyBranches: readonly ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    readonly fiveElements: readonly ["金", "木", "水", "火", "土"];
    readonly zodiacAnimals: readonly ["鼠", "牛", "虎", "兎", "竜", "蛇", "馬", "羊", "猿", "鶏", "犬", "猪"];
    readonly monthNames: readonly ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    readonly lunarMonthNames: readonly ["旧暦1月", "旧暦2月", "旧暦3月", "旧暦4月", "旧暦5月", "旧暦6月", "旧暦7月", "旧暦8月", "旧暦9月", "旧暦10月", "旧暦11月", "旧暦12月"];
    readonly solarMonthNames: readonly ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    readonly weekDays: readonly ["日", "月", "火", "水", "木", "金", "土"];
    readonly leapLabel: "閏";
    readonly yearLabel: "年";
    readonly monthLabel: "月";
    readonly destiny: "命";
    readonly solarTermNames: readonly ["春分", "清明", "穀雨", "立夏", "小満", "芒種", "夏至", "小暑", "大暑", "立秋", "処暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", "小寒", "大寒", "立春", "雨水", "啓蟄"];
    readonly trucNames: readonly ["建", "除", "満", "平", "定", "執", "破", "危", "成", "収", "開", "閉"];
    readonly elementRelationNames: readonly ["相生", "被生", "相克", "被克", "比和"];
    readonly trucQualityNames: readonly ["凶", "普通", "吉"];
} | {
    readonly heavenlyStems: readonly ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
    readonly earthlyBranches: readonly ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
    readonly fiveElements: readonly ["금", "목", "수", "화", "토"];
    readonly zodiacAnimals: readonly ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];
    readonly monthNames: readonly ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    readonly lunarMonthNames: readonly ["음력 1월", "음력 2월", "음력 3월", "음력 4월", "음력 5월", "음력 6월", "음력 7월", "음력 8월", "음력 9월", "음력 10월", "음력 11월", "음력 12월"];
    readonly solarMonthNames: readonly ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    readonly weekDays: readonly ["일", "월", "화", "수", "목", "금", "토"];
    readonly leapLabel: "윤";
    readonly yearLabel: "년";
    readonly monthLabel: "월";
    readonly destiny: "명";
    readonly solarTermNames: readonly ["춘분", "청명", "곡우", "입하", "소만", "망종", "하지", "소서", "대서", "입추", "처서", "백로", "추분", "한로", "상강", "입동", "소설", "대설", "동지", "소한", "대한", "입춘", "우수", "경칩"];
    readonly trucNames: readonly ["건", "제", "만", "평", "정", "집", "파", "위", "성", "수", "개", "폐"];
    readonly elementRelationNames: readonly ["상생", "피생", "상극", "피극", "비화"];
    readonly trucQualityNames: readonly ["흉", "보통", "길"];
};
/**
 * Lấy tên con giáp theo locale
 * @param branchIndex - Index Địa Chi (0-11)
 * @param locale - Ngôn ngữ
 */
declare function getZodiacAnimal(branchIndex: number, locale?: Locale): string;
/**
 * Lấy nhãn thứ trong tuần theo locale, xoay vòng theo ngày bắt đầu tuần.
 * @param locale - Ngôn ngữ
 * @param firstDayOfWeek - Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai
 */
declare function getWeekDayLabels(locale: Locale, firstDayOfWeek?: FirstDayOfWeek): string[];

/**
 * Tính Can Chi ngày từ Julian Day Number.
 *
 * @param jd - Julian Day Number
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi', giữ nguyên hành vi cũ)
 * @returns Chuỗi Can Chi (ví dụ: "Giáp Tý")
 */
declare function getDayCanChi(jd: number, locale?: Locale): string;
/**
 * Tính Can Chi tháng từ tháng và năm âm lịch.
 * Can tháng phụ thuộc vào Can của năm (quy tắc Ngũ Hổ Độn):
 *   - Năm Giáp/Kỷ  → Tháng Giêng bắt đầu bằng Bính (index 2)
 *   - Năm Ất/Canh  → Tháng Giêng bắt đầu bằng Mậu (index 4)
 *   - Năm Bính/Tân → Tháng Giêng bắt đầu bằng Canh (index 6)
 *   - Năm Đinh/Nhâm → Tháng Giêng bắt đầu bằng Nhâm (index 8)
 *   - Năm Mậu/Quý  → Tháng Giêng bắt đầu bằng Giáp (index 0)
 *
 * @param lunarMonth - Tháng âm lịch (1-12)
 * @param lunarYear - Năm âm lịch
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi', giữ nguyên hành vi cũ)
 */
declare function getMonthCanChi(lunarMonth: number, lunarYear: number, locale?: Locale): string;
/**
 * Tính Can Chi giờ từ giờ (0-23) và Julian Day Number của ngày.
 *
 * 12 canh giờ (mỗi canh = 2 tiếng):
 *   Tý: 23h-01h, Sửu: 01h-03h, Dần: 03h-05h, ...
 *
 * Can giờ Tý phụ thuộc Can ngày (quy tắc Ngũ Thử Độn):
 *   - Ngày Giáp/Kỷ → Giờ Tý bắt đầu bằng Giáp
 *   - Ngày Ất/Canh → Giờ Tý bắt đầu bằng Bính
 *   - Ngày Bính/Tân → Giờ Tý bắt đầu bằng Mậu
 *   - Ngày Đinh/Nhâm → Giờ Tý bắt đầu bằng Canh
 *   - Ngày Mậu/Quý → Giờ Tý bắt đầu bằng Nhâm
 *
 * @param hour - Giờ (0-23)
 * @param dayJd - Julian Day Number của ngày
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi', giữ nguyên hành vi cũ)
 */
declare function getHourCanChi(hour: number, dayJd: number, locale?: Locale): string;

/**
 * Lấy tên Ngũ Hành theo index và locale.
 *
 * @param index - Index Ngũ Hành (0-4, vào FIVE_ELEMENTS: Kim, Mộc, Thủy, Hỏa, Thổ)
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getElementName(index: number, locale?: Locale): string;
/**
 * Tính index Ngũ Hành Nạp Âm (0-4, vào FIVE_ELEMENTS) của ngày, dùng chung bảng
 * Nạp Âm 60 Hoa Giáp với `getYearDetails` (almanac.ts). Chỉ số Can/Chi tính giống hệt
 * {@link import('./can-chi.js').getDayCanChi}.
 *
 * @param jd - Julian Day Number
 */
declare function getDayElementIndex(jd: number): number;
/**
 * Tính Mệnh (Ngũ Hành Nạp Âm) của ngày theo locale (xem {@link getDayElementIndex}).
 *
 * @param jd - Julian Day Number
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getDayElement(jd: number, locale?: Locale): string;
/**
 * Tính index Ngũ Hành Nạp Âm (0-4, vào FIVE_ELEMENTS) của tháng âm lịch. Chỉ số
 * Can/Chi tính giống hệt {@link import('./can-chi.js').getMonthCanChi}.
 *
 * @param lunarMonth - Tháng âm lịch (1-12)
 * @param lunarYear - Năm âm lịch
 */
declare function getMonthElementIndex(lunarMonth: number, lunarYear: number): number;
/**
 * Tính Mệnh (Ngũ Hành Nạp Âm) của tháng âm lịch theo locale (xem {@link getMonthElementIndex}).
 *
 * @param lunarMonth - Tháng âm lịch (1-12)
 * @param lunarYear - Năm âm lịch
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getMonthElement(lunarMonth: number, lunarYear: number, locale?: Locale): string;
/**
 * Tính index Ngũ Hành Nạp Âm (0-4, vào FIVE_ELEMENTS) của giờ. Chỉ số Can/Chi tính
 * giống hệt {@link import('./can-chi.js').getHourCanChi}.
 *
 * @param hour - Giờ (0-23)
 * @param dayJd - Julian Day Number của ngày
 */
declare function getHourElementIndex(hour: number, dayJd: number): number;
/**
 * Tính Mệnh (Ngũ Hành Nạp Âm) của giờ theo locale (xem {@link getHourElementIndex}).
 *
 * @param hour - Giờ (0-23)
 * @param dayJd - Julian Day Number của ngày
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getHourElement(hour: number, dayJd: number, locale?: Locale): string;
/**
 * Tính quan hệ Ngũ Hành từ `fromIndex` tới `toIndex`, trả về index 0-4:
 *   0 = sinh (from sinh to)      2 = khắc (from khắc to)      4 = hòa (cùng hành)
 *   1 = được sinh (to sinh from) 3 = bị khắc (to khắc from)
 *
 * Với 5 hành, 2 hành khác nhau bất kỳ luôn rơi vào đúng 1 trong 4 quan hệ trên
 * (mỗi hành có đúng 1 hành sinh nó, 1 hành nó sinh, 1 hành khắc nó, 1 hành nó khắc)
 * — không có trường hợp mơ hồ.
 *
 * @param fromIndex - Index Ngũ Hành thứ nhất (0-4, vào FIVE_ELEMENTS)
 * @param toIndex - Index Ngũ Hành thứ hai (0-4, vào FIVE_ELEMENTS)
 */
declare function getElementRelationIndex(fromIndex: number, toIndex: number): number;
/**
 * Lấy tên quan hệ Ngũ Hành giữa 2 hành theo locale (xem {@link getElementRelationIndex}).
 *
 * @param fromIndex - Index Ngũ Hành thứ nhất (0-4, vào FIVE_ELEMENTS)
 * @param toIndex - Index Ngũ Hành thứ hai (0-4, vào FIVE_ELEMENTS)
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 *
 * @example
 * ```typescript
 * // Mộc (1) và Hỏa (3): Mộc sinh Hỏa
 * getElementRelation(1, 3); // → 'Tương sinh'
 * getElementRelation(3, 1); // → 'Được sinh' (từ góc nhìn của Hỏa: được Mộc sinh)
 * ```
 */
declare function getElementRelation(fromIndex: number, toIndex: number, locale?: Locale): string;

/**
 * Tính index Trực (0-11: Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế)
 * tại một ngày dương lịch (Julian Day Number).
 *
 * Theo đúng phép Kiến Trừ thập nhị khách truyền thống, mỗi Tiết trong 12 Tiết (Lập
 * Xuân, Kinh Trập, Thanh Minh, ... — tức các index lẻ trong 24 Tiết Khí, xem
 * {@link import('./tiet-khi.js').getSolarTermsInYear}) ứng với một Chi "Kiến" CỐ ĐỊNH
 * (Lập Xuân → Kiến Dần, Kinh Trập → Kiến Mão, Thanh Minh → Kiến Thìn, ..., Tiểu Hàn →
 * Kiến Sửu). Trực của một ngày = độ lệch giữa Chi của chính ngày đó và Chi Kiến của
 * Tiết đang hiệu lực — KHÔNG phải số ngày đã trôi qua kể từ khi Tiết bắt đầu.
 *
 * Hai cách tính chỉ trùng nhau khi ngày bắt đầu Tiết tình cờ có đúng Chi Kiến của Tiết
 * đó (không phải lúc nào cũng vậy — ví dụ Tiểu Thử 2026 rơi vào ngày Nhâm Ngọ chứ không
 * phải ngày Mùi). Vì vậy KHÔNG được gán "Kiến" (index 0) cho chính ngày bắt đầu Tiết
 * một cách mặc định.
 *
 * Cũng dùng Tiết (không dùng số tháng âm lịch) để neo, vì tháng nhuận âm lịch không
 * tương ứng với một Tiết mới (dùng số tháng âm lịch sẽ cho kết quả sai trong các
 * tháng nhuận).
 *
 * Dùng `getSolarTermOccurrencesInYear` (dữ liệu thô, có cache theo năm+timeZone)
 * thay vì `getSolarTermsInYear` công khai — tránh tính tên/locale không cần dùng
 * tới, và tránh quét lại kinh độ Mặt Trời mỗi lần gọi khi hàm này được gọi lặp lại
 * cho nhiều ngày cùng năm (vd. dựng lịch Trực cho cả tháng/năm).
 *
 * @param jd - Julian Day Number của ngày cần tra
 * @param timeZone - Múi giờ (mặc định: 7 cho GMT+7 Việt Nam)
 */
declare function getTrucIndex(jd: number, timeZone?: number): number;
/**
 * Lấy tên Trực theo index và locale.
 *
 * @param index - Index Trực (0-11, xem {@link getTrucIndex})
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getTrucName(index: number, locale?: Locale): string;
/**
 * Lấy tên Trực tại một ngày dương lịch (Julian Day Number).
 *
 * @param jd - Julian Day Number của ngày cần tra
 * @param timeZone - Múi giờ (mặc định: 7 cho GMT+7 Việt Nam)
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getTruc(jd: number, timeZone?: number, locale?: Locale): string;
/**
 * Lấy index mức tốt/xấu (0-2) của một Trực — xem giải thích độ tin cậy ở
 * {@link TRUC_QUALITY_INDEX}.
 *
 * @param trucIndex - Index Trực (0-11, xem {@link getTrucIndex})
 */
declare function getTrucQualityIndex(trucIndex: number): number;
/**
 * Lấy tên mức tốt/xấu của một Trực theo locale (xem {@link getTrucQualityIndex}).
 *
 * @param trucIndex - Index Trực (0-11, xem {@link getTrucIndex})
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getTrucQuality(trucIndex: number, locale?: Locale): string;
/**
 * Lấy Chi đối xung (Lục Xung) với một Chi cho trước — 2 Chi cách nhau đúng 6 vị
 * trí trong vòng tròn 12 Chi: Tý-Ngọ, Sửu-Mùi, Dần-Thân, Mão-Dậu, Thìn-Tuất, Tỵ-Hợi.
 *
 * @param branchIndex - Index Địa Chi (0-11, vào EARTHLY_BRANCHES)
 * @returns Index Địa Chi đối xung
 */
declare function getXungBranchIndex(branchIndex: number): number;
/**
 * Kiểm tra 2 Chi (tuổi) có phạm Lục Xung với nhau không.
 *
 * @param branchIndexA - Index Địa Chi thứ nhất (0-11)
 * @param branchIndexB - Index Địa Chi thứ hai (0-11)
 */
declare function isXung(branchIndexA: number, branchIndexB: number): boolean;
/**
 * Lấy Chi bị Lục Hại với một Chi cho trước (xem {@link HAI_BRANCH_TARGET}).
 *
 * @param branchIndex - Index Địa Chi (0-11, vào EARTHLY_BRANCHES)
 * @returns Index Địa Chi bị hại
 */
declare function getHaiBranchIndex(branchIndex: number): number;
/**
 * Kiểm tra 2 Chi (tuổi) có phạm Lục Hại với nhau không.
 *
 * @param branchIndexA - Index Địa Chi thứ nhất (0-11)
 * @param branchIndexB - Index Địa Chi thứ hai (0-11)
 */
declare function isHai(branchIndexA: number, branchIndexB: number): boolean;
/**
 * Lấy nhóm Tứ Hành Xung (0-2) chứa một Chi cho trước.
 *
 * @param branchIndex - Index Địa Chi (0-11, vào EARTHLY_BRANCHES)
 * @returns Index nhóm (0-2, xem {@link getTuHanhXungGroupMembers})
 */
declare function getTuHanhXungGroupIndex(branchIndex: number): number;
/**
 * Lấy 4 Chi thuộc cùng nhóm Tứ Hành Xung với một Chi cho trước (bao gồm cả chính nó).
 *
 * @param branchIndex - Index Địa Chi (0-11, vào EARTHLY_BRANCHES)
 * @returns Mảng 4 index Địa Chi cùng nhóm
 */
declare function getTuHanhXungGroupMembers(branchIndex: number): number[];
/**
 * Kiểm tra 2 Chi (tuổi) khác nhau có cùng nhóm Tứ Hành Xung không.
 *
 * @param branchIndexA - Index Địa Chi thứ nhất (0-11)
 * @param branchIndexB - Index Địa Chi thứ hai (0-11)
 */
declare function isTuHanhXung(branchIndexA: number, branchIndexB: number): boolean;
/** Kết quả trả về của {@link getZodiacConflicts}. */
interface ZodiacConflicts {
    xung: boolean;
    hai: boolean;
    tuHanhXung: boolean;
}
/**
 * Kiểm tra toàn bộ quan hệ "kỵ tuổi" (Lục Xung, Lục Hại, Tứ Hành Xung) giữa 2 tuổi
 * (Chi năm sinh). Không loại trừ lẫn nhau — 1 cặp Chi có thể vừa Lục Xung vừa cùng
 * nhóm Tứ Hành Xung (vd. Tý-Ngọ là cả 2).
 *
 * @param branchIndexA - Index Địa Chi (con giáp) thứ nhất (0-11)
 * @param branchIndexB - Index Địa Chi (con giáp) thứ hai (0-11)
 *
 * @example
 * ```typescript
 * getZodiacConflicts(0, 6); // Tý (0) và Ngọ (6)
 * // → { xung: true, hai: false, tuHanhXung: true }
 * ```
 */
declare function getZodiacConflicts(branchIndexA: number, branchIndexB: number): ZodiacConflicts;

/** Kết quả trả về của {@link getYearDetails}. */
interface YearDetails {
    can: string;
    chi: string;
    menh: string;
    /** Index Ngũ Hành của `menh` (0-4, vào FIVE_ELEMENTS) — dùng cho `getElementRelation` (ngu-hanh.ts). */
    menhIndex: number;
    fullString: string;
}
/**
 * Lấy ra chuỗi mô tả toàn bộ Can, Chi và Mệnh dựa vào số năm (Ví dụ: 2024)
 * Theo quy ước: Năm 4 (sau CN) là năm Giáp Tý (Can index 0, Chi index 0)
 *
 * Công thức Can Chi là chu kỳ 60 năm lặp lại vô hạn nên nhận mọi số năm nguyên,
 * kể cả năm 0 hoặc âm (trước Công Nguyên) — không giới hạn phạm vi như
 * `LichTa.toLunar` (phạm vi đó là do thuật toán tìm Điểm Sóc, không áp
 * dụng cho công thức Can Chi thuần).
 *
 * @param year - Năm (số nguyên bất kỳ, kể cả 0 hoặc âm)
 *
 * @example
 * ```typescript
 * getYearDetails(2024);
 * // → { can: 'Giáp', chi: 'Thìn', menh: 'Hỏa', menhIndex: 3, fullString: 'Giáp Thìn - Mệnh Hỏa' }
 * ```
 */
declare function getYearDetails(year: number): YearDetails;
/**
 * Lấy danh sách 6 giờ Hoàng Đạo trong ngày.
 * Giờ Hoàng Đạo phụ thuộc vào Địa Chi của ngày.
 *
 * @param dayJd - Julian Day Number của ngày
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi', giữ nguyên hành vi cũ)
 * @returns Mảng 6 chuỗi tên Địa Chi (ví dụ: ["Tý", "Sửu", "Mão", "Ngọ", "Mùi", "Dậu"])
 */
declare function getAuspiciousHours(dayJd: number, locale?: Locale): string[];
/**
 * Lấy index (0-11, theo thứ tự Địa Chi Tý→Hợi) của 6 giờ Hoàng Đạo trong ngày.
 *
 * Dùng khi cần một khoá ổn định, không phụ thuộc ngôn ngữ — ví dụ để map sang
 * icon riêng, hoặc tự tra bảng dịch của bạn thay vì dùng chuỗi tên có sẵn từ
 * {@link getAuspiciousHours}. Cả hai hàm dùng chung thứ tự dữ liệu nên
 * `getAuspiciousHourIndices(jd)[i]` luôn tương ứng với `getAuspiciousHours(jd)[i]`.
 *
 * @param dayJd - Julian Day Number của ngày
 * @returns Mảng 6 index Địa Chi (ví dụ: [0, 1, 3, 6, 7, 9])
 */
declare function getAuspiciousHourIndices(dayJd: number): number[];
/**
 * Lấy index (0-11, theo thứ tự Địa Chi Tý→Hợi) của 6 giờ Hắc Đạo (giờ xấu) trong
 * ngày — phần bù của {@link getAuspiciousHourIndices} trong 12 canh giờ (6 giờ
 * Hoàng Đạo + 6 giờ Hắc Đạo = đủ 12 canh).
 *
 * @param dayJd - Julian Day Number của ngày
 * @returns Mảng 6 index Địa Chi, tăng dần
 */
declare function getInauspiciousHourIndices(dayJd: number): number[];
/**
 * Lấy danh sách 6 giờ Hắc Đạo (giờ xấu) trong ngày theo locale (xem
 * {@link getInauspiciousHourIndices}).
 *
 * @param dayJd - Julian Day Number của ngày
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 * @returns Mảng 6 chuỗi tên Địa Chi
 */
declare function getInauspiciousHours(dayJd: number, locale?: Locale): string[];

/**
 * Lấy tên Tiết Khí theo index và locale.
 *
 * @param index - Index Tiết Khí (0-23, xem {@link getSolarTermIndex} trong astronomical.ts;
 *   0 = Xuân Phân, 18 = Đông Chí, 21 = Lập Xuân, ...)
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 */
declare function getSolarTermName(index: number, locale?: Locale): string;
/**
 * Lấy Tiết Khí đang hiệu lực tại một ngày dương lịch cho trước.
 *
 * `getSolarTermIndex` (astronomical.ts) trả về kinh độ Mặt Trời tại thời điểm 00:00 (đầu
 * ngày) của `jdn`. Theo quy ước almanac truyền thống, một ngày được tính là "ngày
 * Tiết Khí X" nếu thời điểm chuyển Tiết Khí rơi vào bất kỳ lúc nào trong ngày đó —
 * tức là dùng giá trị tại 00:00 của ngày **kế tiếp** mới phản ánh đúng Tiết Khí đã
 * "chốt" cho ngày hiện tại. Vì vậy hàm này tra cứu tại `jd + 1`, không phải `jd`.
 *
 * @param day - Ngày dương lịch (1-31)
 * @param month - Tháng dương lịch (1-12)
 * @param year - Năm dương lịch
 * @param timeZone - Múi giờ (mặc định: 7 cho GMT+7 Việt Nam)
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 *
 * @example
 * ```typescript
 * getSolarTerm(21, 6, 2024);
 * // → { index: 6, name: 'Hạ Chí', date: { day: 21, month: 6, year: 2024 }, jd: ... }
 * ```
 */
declare function getSolarTerm(day: number, month: number, year: number, timeZone?: number, locale?: Locale): SolarTerm;
/**
 * Liệt kê toàn bộ Tiết Khí bắt đầu trong một năm dương lịch (thường 24 hoặc 25 lần
 * xuất hiện tùy năm, do các Tiết Khí không rơi đúng vào ranh giới năm).
 *
 * @param year - Năm dương lịch
 * @param timeZone - Múi giờ (mặc định: 7 cho GMT+7 Việt Nam)
 * @param locale - Ngôn ngữ hiển thị (mặc định: 'vi')
 * @returns Mảng {@link SolarTerm} theo thứ tự thời gian tăng dần
 */
declare function getSolarTermsInYear(year: number, timeZone?: number, locale?: Locale): SolarTerm[];

/**
 * Lấy tên tháng âm lịch dạng chữ truyền thống.
 *
 * @param month - Tháng âm lịch (1-12)
 * @returns Tên tháng (ví dụ: 1 → "Giêng", 12 → "Chạp")
 *
 * @example
 * ```typescript
 * getMonthName(1);  // "Giêng"
 * getMonthName(12); // "Chạp"
 * ```
 */
declare function getMonthName(month: number): string;
/**
 * Lấy tên ngày âm lịch theo cách gọi truyền thống Việt Nam.
 *
 * - 1-10: "Mùng Một", "Mùng Hai", ..., "Mùng Mười"
 * - 11-20: "Mười Một", ..., "Hai Mươi"
 * - 21-30: "Hăm Mốt", "Hăm Hai", ..., "Ba Mươi"
 *
 * @param day - Ngày âm lịch (1-30)
 *
 * @example
 * ```typescript
 * getDayName(1);  // "Mùng Một"
 * getDayName(15); // "Rằm"
 * getDayName(30); // "Ba Mươi"
 * ```
 */
declare function getDayName(day: number): string;
/**
 * Format ngày âm lịch theo pattern.
 *
 * **Patterns hỗ trợ:**
 * | Token | Mô tả                                    | Ví dụ          |
 * |-------|------------------------------------------|----------------|
 * | `dd`  | Ngày 2 chữ số                            | 01, 15, 30     |
 * | `d`   | Ngày                                     | 1, 15, 30      |
 * | `MM`  | Tháng 2 chữ số                           | 01, 12         |
 * | `M`   | Tháng                                    | 1, 12          |
 * | `yyyy`| Năm 4 chữ số                             | 2024           |
 * | `yy`  | Năm 2 chữ số cuối                        | 24             |
 * | `L`   | Nhãn tháng nhuận theo `locale` (xem tham số `locale`), "" nếu không phải tháng nhuận | Nhuận |
 * | `CC`  | Can Chi năm                              | Giáp Thìn      |
 * | `DC`  | Can Chi ngày                             | Giáp Tý        |
 * | `MC`  | Can Chi tháng                            | Bính Dần       |
 *
 * @param lunar - Đối tượng LunarDate
 * @param pattern - Chuỗi pattern
 * @param locale - Ngôn ngữ cho token `L` (mặc định: 'vi', giữ nguyên hành vi cũ — "Nhuận")
 *
 * @example
 * ```typescript
 * formatLunarDate(lunar, 'dd/MM/yyyy');
 * // → "01/01/2024"
 *
 * formatLunarDate(lunar, 'Ngày d tháng M năm CC');
 * // → "Ngày 1 tháng 1 năm Giáp Thìn"
 * ```
 */
declare function formatLunarDate(lunar: LunarDate, pattern: string, locale?: Locale): string;
/**
 * Format ngày âm lịch theo kiểu truyền thống Việt Nam.
 *
 * @param lunar - Đối tượng LunarDate
 * @returns Chuỗi truyền thống (ví dụ: "Mùng Một tháng Giêng năm Giáp Thìn")
 *
 * @example
 * ```typescript
 * formatTraditional(lunar);
 * // → "Mùng Một tháng Giêng năm Giáp Thìn"
 * ```
 */
declare function formatTraditional(lunar: LunarDate): string;

export { type CalendarDayCell, type FirstDayOfWeek, LichTa, type Locale, type LunarDate, type SolarDate, type SolarTerm, type YearDetails, type ZodiacConflicts, formatLunarDate, formatTraditional, getAuspiciousHourIndices, getAuspiciousHours, getCalendarGrid, getDayCanChi, getDayElement, getDayElementIndex, getDayName, getElementName, getElementRelation, getElementRelationIndex, getHaiBranchIndex, getHourCanChi, getHourElement, getHourElementIndex, getISOWeekNumber, getInauspiciousHourIndices, getInauspiciousHours, getMonthCanChi, getMonthElement, getMonthElementIndex, getMonthName, getSolarTerm, getSolarTermName, getSolarTermsInYear, getTruc, getTrucIndex, getTrucName, getTrucQuality, getTrucQualityIndex, getTuHanhXungGroupIndex, getTuHanhXungGroupMembers, getWeekDayLabels, getXungBranchIndex, getYearDetails, getZodiacAnimal, getZodiacConflicts, isHai, isTuHanhXung, isXung, jdFromDate, jdToDate, t };
