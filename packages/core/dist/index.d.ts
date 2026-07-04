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
 * Lấy ra chuỗi mô tả toàn bộ Can, Chi và Mệnh dựa vào số năm (Ví dụ: 2024)
 * Theo quy ước: Năm 4 (sau CN) là năm Giáp Tý (Can index 0, Chi index 0)
 */
declare function getYearDetails(year: number): {
    can: "Giáp" | "Ất" | "Bính" | "Đinh" | "Mậu" | "Kỷ" | "Canh" | "Tân" | "Nhâm" | "Quý";
    chi: "Tý" | "Sửu" | "Dần" | "Mão" | "Thìn" | "Tỵ" | "Ngọ" | "Mùi" | "Thân" | "Dậu" | "Tuất" | "Hợi";
    menh: string;
    fullString: string;
};
/**
 * Tính Can Chi ngày từ Julian Day Number.
 *
 * @param jd - Julian Day Number
 * @returns Chuỗi Can Chi (ví dụ: "Giáp Tý")
 */
declare function getDayCanChi(jd: number): string;
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
 */
declare function getMonthCanChi(lunarMonth: number, lunarYear: number): string;
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
 */
declare function getHourCanChi(hour: number, dayJd: number): string;
/**
 * Lấy danh sách 6 giờ Hoàng Đạo trong ngày.
 * Giờ Hoàng Đạo phụ thuộc vào Địa Chi của ngày.
 *
 * @param dayJd - Julian Day Number của ngày
 * @returns Mảng 6 chuỗi tên Địa Chi (ví dụ: ["Tý", "Sửu", "Mão", "Ngọ", "Mùi", "Dậu"])
 */
declare function getAuspiciousHours(dayJd: number): string[];

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
 * | `L`   | "Nhuận" nếu tháng nhuận, "" nếu không    | Nhuận          |
 * | `CC`  | Can Chi năm                              | Giáp Thìn      |
 * | `DC`  | Can Chi ngày                             | Giáp Tý        |
 * | `MC`  | Can Chi tháng                            | Bính Dần       |
 *
 * @param lunar - Đối tượng LunarDate
 * @param pattern - Chuỗi pattern
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
declare function formatLunarDate(lunar: LunarDate, pattern: string): string;
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
    readonly weekDays: readonly ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    readonly leapLabel: "Nhuận";
    readonly yearLabel: "Năm";
    readonly monthLabel: "Tháng";
    readonly destiny: "Mệnh";
} | {
    readonly heavenlyStems: readonly ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    readonly earthlyBranches: readonly ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    readonly fiveElements: readonly ["Metal", "Wood", "Water", "Fire", "Earth"];
    readonly zodiacAnimals: readonly ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    readonly monthNames: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    readonly weekDays: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    readonly leapLabel: "Leap";
    readonly yearLabel: "Year";
    readonly monthLabel: "Month";
    readonly destiny: "Destiny";
} | {
    readonly heavenlyStems: readonly ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    readonly earthlyBranches: readonly ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    readonly fiveElements: readonly ["金", "木", "水", "火", "土"];
    readonly zodiacAnimals: readonly ["鼠", "牛", "虎", "兎", "竜", "蛇", "馬", "羊", "猿", "鶏", "犬", "猪"];
    readonly monthNames: readonly ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    readonly weekDays: readonly ["日", "月", "火", "水", "木", "金", "土"];
    readonly leapLabel: "閏";
    readonly yearLabel: "年";
    readonly monthLabel: "月";
    readonly destiny: "命";
} | {
    readonly heavenlyStems: readonly ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
    readonly earthlyBranches: readonly ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
    readonly fiveElements: readonly ["금", "목", "수", "화", "토"];
    readonly zodiacAnimals: readonly ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];
    readonly monthNames: readonly ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    readonly weekDays: readonly ["일", "월", "화", "수", "목", "금", "토"];
    readonly leapLabel: "윤";
    readonly yearLabel: "년";
    readonly monthLabel: "월";
    readonly destiny: "명";
};
/**
 * Lấy tên con giáp theo locale
 * @param branchIndex - Index Địa Chi (0-11)
 * @param locale - Ngôn ngữ
 */
declare function getZodiacAnimal(branchIndex: number, locale?: Locale): string;

export { LichTa, type Locale, type LunarDate, type SolarDate, formatLunarDate, formatTraditional, getAuspiciousHours, getDayCanChi, getDayName, getHourCanChi, getMonthCanChi, getMonthName, getYearDetails, getZodiacAnimal, jdFromDate, jdToDate, t };
