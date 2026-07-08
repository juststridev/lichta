"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LichTa: () => LichTa,
  formatLunarDate: () => formatLunarDate,
  formatTraditional: () => formatTraditional,
  getAuspiciousHourIndices: () => getAuspiciousHourIndices,
  getAuspiciousHours: () => getAuspiciousHours,
  getCalendarGrid: () => getCalendarGrid,
  getDayCanChi: () => getDayCanChi,
  getDayName: () => getDayName,
  getHourCanChi: () => getHourCanChi,
  getMonthCanChi: () => getMonthCanChi,
  getMonthName: () => getMonthName,
  getYearDetails: () => getYearDetails,
  getZodiacAnimal: () => getZodiacAnimal,
  jdFromDate: () => jdFromDate,
  jdToDate: () => jdToDate,
  t: () => t
});
module.exports = __toCommonJS(index_exports);

// src/constants/heavenly-stems.ts
var HEAVENLY_STEMS = [
  "Gi\xE1p",
  "\u1EA4t",
  "B\xEDnh",
  "\u0110inh",
  "M\u1EADu",
  "K\u1EF7",
  "Canh",
  "T\xE2n",
  "Nh\xE2m",
  "Qu\xFD"
];
function getStemWeight(index) {
  return Math.floor(index / 2) + 1;
}

// src/constants/earthly-branches.ts
var EARTHLY_BRANCHES = [
  "T\xFD",
  "S\u1EEDu",
  "D\u1EA7n",
  "M\xE3o",
  "Th\xECn",
  "T\u1EF5",
  "Ng\u1ECD",
  "M\xF9i",
  "Th\xE2n",
  "D\u1EADu",
  "Tu\u1EA5t",
  "H\u1EE3i"
];
function getBranchWeight(index) {
  const normalizedIndex = index % 6;
  return Math.floor(normalizedIndex / 2);
}

// src/core/lunar.ts
var PI = Math.PI;
function INT(d) {
  return Math.floor(d);
}
function jdFromDate(dd, mm, yy) {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  }
  return jd;
}
function jdToDate(jd) {
  let a, b, c;
  if (jd > 2299160) {
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT(b * 146097 / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = INT((4 * c + 3) / 1461);
  const e = c - INT(1461 * d / 4);
  const m = INT((5 * e + 2) / 153);
  const day = e - INT((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * INT(m / 10);
  const year = b * 100 + d - 4800 + INT(m / 10);
  return [day, month, year];
}
function NewMoon(k) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let Jd1 = 241502075933e-5 + 29.53058868 * k + 1178e-7 * T2 - 155e-9 * T3;
  Jd1 = Jd1 + 33e-5 * Math.sin((166.56 + 132.87 * T - 9173e-6 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 333e-7 * T2 - 347e-8 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 1236e-8 * T3;
  const F = 21.2964 + 390.67050646 * k - 16528e-7 * T2 - 239e-8 * T3;
  let C1 = (0.1734 - 393e-6 * T) * Math.sin(M * dr) + 21e-4 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 4e-4 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 51e-4 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 74e-4 * Math.sin(dr * (M - Mpr)) + 4e-4 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 4e-4 * Math.sin(dr * (2 * F - M)) - 6e-4 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 1e-3 * Math.sin(dr * (2 * F - Mpr)) + 5e-4 * Math.sin(dr * (2 * Mpr + M));
  const JdNew = Jd1 + C1;
  return JdNew;
}
function getNewMoonDay(k, timeZone) {
  return INT(NewMoon(k) + 0.5 + timeZone / 24);
}
function getSunLongitude(jdn, timeZone) {
  const T = (jdn - 24515455e-1 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 1559e-7 * T2 - 48e-8 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 3032e-7 * T2;
  let DL = (1.9146 - 4817e-6 * T - 14e-6 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 101e-6 * T) * Math.sin(dr * 2 * M) + 29e-5 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L - 360 * INT(L / 360);
  return INT(L / 30);
}
function getLunarMonth11(yy, timeZone) {
  const off = jdFromDate(31, 12, yy) - 2415021076998695e-9;
  const k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}
function getLeapMonthOffset(a11, timeZone) {
  const k = INT((a11 - 2415021076998695e-9) / 29.530588853 + 0.5);
  let last;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  last = arc;
  while (i < 14) {
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    if (arc !== last) {
      last = arc;
    } else {
      break;
    }
  }
  return i - 1;
}
function getYearCanChi(lunarYear) {
  const stemIndex = (lunarYear + 6) % 10;
  const branchIndex = (lunarYear + 8) % 12;
  return `${HEAVENLY_STEMS[stemIndex]} ${EARTHLY_BRANCHES[branchIndex]}`;
}
function getMonthCanChiInternal(lunarMonth, lunarYear) {
  const yearStemIndex = (lunarYear + 6) % 10;
  const monthStemOffset = yearStemIndex % 5 * 2 + 2;
  const monthStemIndex = (monthStemOffset + lunarMonth - 1) % 10;
  const monthBranchIndex = (lunarMonth + 1) % 12;
  return `${HEAVENLY_STEMS[monthStemIndex]} ${EARTHLY_BRANCHES[monthBranchIndex]}`;
}
function getDayCanChiInternal(jd) {
  const stemIndex = (jd + 9) % 10;
  const branchIndex = (jd + 1) % 12;
  return `${HEAVENLY_STEMS[stemIndex]} ${EARTHLY_BRANCHES[branchIndex]}`;
}
var LichTa = class {
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
  static toLunar(day, month, year, timeZone = 7) {
    if (year < 1800 || year > 2199) {
      throw new RangeError(`Lichta: Year must be between 1800 and 2199, got ${year}`);
    }
    if (month < 1 || month > 12) {
      throw new RangeError(`Lichta: Month must be between 1 and 12, got ${month}`);
    }
    if (day < 1 || day > 31) {
      throw new RangeError(`Lichta: Day must be between 1 and 31, got ${day}`);
    }
    const dayNumber = jdFromDate(day, month, year);
    const k = INT((dayNumber - 2415021076998695e-9) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    let a11 = getLunarMonth11(year, timeZone);
    let b11 = a11;
    let lunarYear;
    if (a11 >= monthStart) {
      lunarYear = year;
      a11 = getLunarMonth11(year - 1, timeZone);
    } else {
      lunarYear = year + 1;
      b11 = getLunarMonth11(year + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    let lunarLeap = false;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = true;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth -= 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    const yearCanChi = getYearCanChi(lunarYear);
    const monthCanChi = getMonthCanChiInternal(lunarMonth, lunarYear);
    const dayCanChi = getDayCanChiInternal(dayNumber);
    return {
      day: lunarDay,
      month: lunarMonth,
      year: lunarYear,
      isLeap: lunarLeap,
      jd: dayNumber,
      dayCanChi,
      monthCanChi,
      yearCanChi
    };
  }
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
  static toSolar(lunarDay, lunarMonth, lunarYear, isLeap = false, timeZone = 7) {
    if (lunarYear < 1800 || lunarYear > 2199) {
      throw new RangeError(`Lichta: Year must be between 1800 and 2199, got ${lunarYear}`);
    }
    let a11, b11;
    if (lunarMonth < 11) {
      a11 = getLunarMonth11(lunarYear - 1, timeZone);
      b11 = getLunarMonth11(lunarYear, timeZone);
    } else {
      a11 = getLunarMonth11(lunarYear, timeZone);
      b11 = getLunarMonth11(lunarYear + 1, timeZone);
    }
    const k = INT(0.5 + (a11 - 2415021076998695e-9) / 29.530588853);
    let off = lunarMonth - 11;
    if (off < 0) {
      off += 12;
    }
    if (b11 - a11 > 365) {
      const leapOff = getLeapMonthOffset(a11, timeZone);
      let leapMonth = leapOff - 2;
      if (leapMonth < 0) leapMonth += 12;
      if (isLeap && lunarMonth !== leapMonth) {
        throw new RangeError(
          `Lichta: Month ${lunarMonth} is not a leap month in lunar year ${lunarYear}`
        );
      } else if (isLeap || off >= leapOff) {
        off += 1;
      }
    }
    const nm = getNewMoonDay(k + off, timeZone);
    const jd = nm + lunarDay - 1;
    const [day, month, year] = jdToDate(jd);
    return { day, month, year };
  }
};

// src/constants/five-elements.ts
var FIVE_ELEMENTS = ["Kim", "M\u1ED9c", "Th\u1EE7y", "H\u1ECFa", "Th\u1ED5"];

// src/constants/i18n.ts
var translations = {
  vi: {
    heavenlyStems: ["Gi\xE1p", "\u1EA4t", "B\xEDnh", "\u0110inh", "M\u1EADu", "K\u1EF7", "Canh", "T\xE2n", "Nh\xE2m", "Qu\xFD"],
    earthlyBranches: ["T\xFD", "S\u1EEDu", "D\u1EA7n", "M\xE3o", "Th\xECn", "T\u1EF5", "Ng\u1ECD", "M\xF9i", "Th\xE2n", "D\u1EADu", "Tu\u1EA5t", "H\u1EE3i"],
    fiveElements: ["Kim", "M\u1ED9c", "Th\u1EE7y", "H\u1ECFa", "Th\u1ED5"],
    zodiacAnimals: ["Chu\u1ED9t", "Tr\xE2u", "C\u1ECDp", "Th\u1ECF", "R\u1ED3ng", "R\u1EAFn", "Ng\u1EF1a", "D\xEA", "Kh\u1EC9", "G\xE0", "Ch\xF3", "Heo"],
    // @deprecated Ngữ nghĩa không nhất quán giữa các locale (xem lunarMonthNames/solarMonthNames).
    monthNames: ["Gi\xEAng", "Hai", "Ba", "T\u01B0", "N\u0103m", "S\xE1u", "B\u1EA3y", "T\xE1m", "Ch\xEDn", "M\u01B0\u1EDDi", "M\u1ED9t", "Ch\u1EA1p"],
    lunarMonthNames: ["Gi\xEAng", "Hai", "Ba", "T\u01B0", "N\u0103m", "S\xE1u", "B\u1EA3y", "T\xE1m", "Ch\xEDn", "M\u01B0\u1EDDi", "M\u1ED9t", "Ch\u1EA1p"],
    solarMonthNames: ["Th\xE1ng 1", "Th\xE1ng 2", "Th\xE1ng 3", "Th\xE1ng 4", "Th\xE1ng 5", "Th\xE1ng 6", "Th\xE1ng 7", "Th\xE1ng 8", "Th\xE1ng 9", "Th\xE1ng 10", "Th\xE1ng 11", "Th\xE1ng 12"],
    weekDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    leapLabel: "Nhu\u1EADn",
    yearLabel: "N\u0103m",
    monthLabel: "Th\xE1ng",
    destiny: "M\u1EC7nh"
  },
  en: {
    heavenlyStems: ["Gi\xE1p", "\u1EA4t", "B\xEDnh", "\u0110inh", "M\u1EADu", "K\u1EF7", "Canh", "T\xE2n", "Nh\xE2m", "Qu\xFD"],
    earthlyBranches: ["T\xFD", "S\u1EEDu", "D\u1EA7n", "M\xE3o", "Th\xECn", "T\u1EF5", "Ng\u1ECD", "M\xF9i", "Th\xE2n", "D\u1EADu", "Tu\u1EA5t", "H\u1EE3i"],
    fiveElements: ["Metal", "Wood", "Water", "Fire", "Earth"],
    zodiacAnimals: ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"],
    // @deprecated Ngữ nghĩa không nhất quán giữa các locale (xem lunarMonthNames/solarMonthNames).
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    lunarMonthNames: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"],
    solarMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    leapLabel: "Leap",
    yearLabel: "Year",
    monthLabel: "Month",
    destiny: "Destiny"
  },
  ja: {
    heavenlyStems: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],
    earthlyBranches: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],
    fiveElements: ["\u91D1", "\u6728", "\u6C34", "\u706B", "\u571F"],
    zodiacAnimals: ["\u9F20", "\u725B", "\u864E", "\u514E", "\u7ADC", "\u86C7", "\u99AC", "\u7F8A", "\u733F", "\u9D8F", "\u72AC", "\u732A"],
    // @deprecated Ngữ nghĩa không nhất quán giữa các locale (xem lunarMonthNames/solarMonthNames).
    monthNames: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
    lunarMonthNames: ["\u65E7\u66A61\u6708", "\u65E7\u66A62\u6708", "\u65E7\u66A63\u6708", "\u65E7\u66A64\u6708", "\u65E7\u66A65\u6708", "\u65E7\u66A66\u6708", "\u65E7\u66A67\u6708", "\u65E7\u66A68\u6708", "\u65E7\u66A69\u6708", "\u65E7\u66A610\u6708", "\u65E7\u66A611\u6708", "\u65E7\u66A612\u6708"],
    solarMonthNames: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
    weekDays: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
    leapLabel: "\u958F",
    yearLabel: "\u5E74",
    monthLabel: "\u6708",
    destiny: "\u547D"
  },
  ko: {
    heavenlyStems: ["\uAC11", "\uC744", "\uBCD1", "\uC815", "\uBB34", "\uAE30", "\uACBD", "\uC2E0", "\uC784", "\uACC4"],
    earthlyBranches: ["\uC790", "\uCD95", "\uC778", "\uBB18", "\uC9C4", "\uC0AC", "\uC624", "\uBBF8", "\uC2E0", "\uC720", "\uC220", "\uD574"],
    fiveElements: ["\uAE08", "\uBAA9", "\uC218", "\uD654", "\uD1A0"],
    zodiacAnimals: ["\uC950", "\uC18C", "\uD638\uB791\uC774", "\uD1A0\uB07C", "\uC6A9", "\uBC40", "\uB9D0", "\uC591", "\uC6D0\uC22D\uC774", "\uB2ED", "\uAC1C", "\uB3FC\uC9C0"],
    // @deprecated Ngữ nghĩa không nhất quán giữa các locale (xem lunarMonthNames/solarMonthNames).
    monthNames: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"],
    lunarMonthNames: ["\uC74C\uB825 1\uC6D4", "\uC74C\uB825 2\uC6D4", "\uC74C\uB825 3\uC6D4", "\uC74C\uB825 4\uC6D4", "\uC74C\uB825 5\uC6D4", "\uC74C\uB825 6\uC6D4", "\uC74C\uB825 7\uC6D4", "\uC74C\uB825 8\uC6D4", "\uC74C\uB825 9\uC6D4", "\uC74C\uB825 10\uC6D4", "\uC74C\uB825 11\uC6D4", "\uC74C\uB825 12\uC6D4"],
    solarMonthNames: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"],
    weekDays: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
    leapLabel: "\uC724",
    yearLabel: "\uB144",
    monthLabel: "\uC6D4",
    destiny: "\uBA85"
  }
};
function t(locale) {
  return translations[locale];
}
function getZodiacAnimal(branchIndex, locale = "vi") {
  return translations[locale].zodiacAnimals[branchIndex % 12];
}

// src/core/feng-shui.ts
function mod(n, m) {
  return (n % m + m) % m;
}
function getYearDetails(year) {
  const stemIndex = mod(year - 4, 10);
  const branchIndex = mod(year - 4, 12);
  const stemWeight = getStemWeight(stemIndex);
  const branchWeight = getBranchWeight(branchIndex);
  let elementValue = stemWeight + branchWeight;
  if (elementValue > 5) {
    elementValue -= 5;
  }
  const elementIndex = elementValue - 1;
  return {
    can: HEAVENLY_STEMS[stemIndex],
    chi: EARTHLY_BRANCHES[branchIndex],
    menh: FIVE_ELEMENTS[elementIndex],
    fullString: `${HEAVENLY_STEMS[stemIndex]} ${EARTHLY_BRANCHES[branchIndex]} - M\u1EC7nh ${FIVE_ELEMENTS[elementIndex]}`
  };
}
function getDayCanChi(jd, locale = "vi") {
  const stemIndex = (jd + 9) % 10;
  const branchIndex = (jd + 1) % 12;
  const { heavenlyStems, earthlyBranches } = t(locale);
  return `${heavenlyStems[stemIndex]} ${earthlyBranches[branchIndex]}`;
}
function getMonthCanChi(lunarMonth, lunarYear, locale = "vi") {
  const yearStemIndex = (lunarYear + 6) % 10;
  const monthStemOffset = yearStemIndex % 5 * 2 + 2;
  const monthStemIndex = (monthStemOffset + lunarMonth - 1) % 10;
  const monthBranchIndex = (lunarMonth + 1) % 12;
  const { heavenlyStems, earthlyBranches } = t(locale);
  return `${heavenlyStems[monthStemIndex]} ${earthlyBranches[monthBranchIndex]}`;
}
function getHourCanChi(hour, dayJd, locale = "vi") {
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  const dayStemIndex = (dayJd + 9) % 10;
  const hourStemOffset = dayStemIndex % 5 * 2;
  const hourStemIndex = (hourStemOffset + hourBranchIndex) % 10;
  const { heavenlyStems, earthlyBranches } = t(locale);
  return `${heavenlyStems[hourStemIndex]} ${earthlyBranches[hourBranchIndex]}`;
}
var AUSPICIOUS_HOURS_TABLE = [
  [0, 1, 3, 6, 7, 9],
  // Ngày Tý (0) / Ngọ (6)
  [2, 3, 5, 8, 9, 11],
  // Ngày Sửu (1) / Mùi (7)
  [0, 1, 4, 5, 7, 10],
  // Ngày Dần (2) / Thân (8)
  [1, 2, 4, 7, 8, 10],
  // Ngày Mão (3) / Dậu (9)
  [0, 3, 4, 6, 9, 10],
  // Ngày Thìn (4) / Tuất (10)
  [2, 5, 6, 8, 11, 0]
  // Ngày Tỵ (5) / Hợi (11)
];
function getAuspiciousHours(dayJd, locale = "vi") {
  const branchIndex = (dayJd + 1) % 12;
  const groupIndex = branchIndex % 6;
  const hourIndices = AUSPICIOUS_HOURS_TABLE[groupIndex];
  const { earthlyBranches } = t(locale);
  return hourIndices.map((i) => earthlyBranches[i]);
}
function getAuspiciousHourIndices(dayJd) {
  const branchIndex = (dayJd + 1) % 12;
  const groupIndex = branchIndex % 6;
  return [...AUSPICIOUS_HOURS_TABLE[groupIndex]];
}

// src/utils/format.ts
var MONTH_NAMES = [
  "Gi\xEAng",
  "Hai",
  "Ba",
  "T\u01B0",
  "N\u0103m",
  "S\xE1u",
  "B\u1EA3y",
  "T\xE1m",
  "Ch\xEDn",
  "M\u01B0\u1EDDi",
  "M\u1ED9t",
  "Ch\u1EA1p"
];
var DAY_UNITS = [
  "",
  "M\u1ED9t",
  "Hai",
  "Ba",
  "B\u1ED1n",
  "N\u0103m",
  "S\xE1u",
  "B\u1EA3y",
  "T\xE1m",
  "Ch\xEDn",
  "M\u01B0\u1EDDi"
];
function getMonthName(month) {
  if (month < 1 || month > 12) {
    throw new RangeError(`Lichta: Month must be between 1 and 12, got ${month}`);
  }
  return MONTH_NAMES[month - 1];
}
function getDayName(day) {
  if (day < 1 || day > 30) {
    throw new RangeError(`Lichta: Day must be between 1 and 30, got ${day}`);
  }
  if (day === 15) return "R\u1EB1m";
  if (day <= 10) {
    return `M\xF9ng ${DAY_UNITS[day]}`;
  }
  if (day < 20) {
    if (day === 11) return "M\u01B0\u1EDDi M\u1ED9t";
    if (day === 14) return "M\u01B0\u1EDDi B\u1ED1n";
    return `M\u01B0\u1EDDi ${DAY_UNITS[day - 10]}`;
  }
  if (day === 20) return "Hai M\u01B0\u01A1i";
  if (day < 30) {
    if (day === 21) return "H\u0103m M\u1ED1t";
    if (day === 24) return "H\u0103m T\u01B0";
    if (day === 25) return "H\u0103m L\u0103m";
    return `H\u0103m ${DAY_UNITS[day - 20]}`;
  }
  return "Ba M\u01B0\u01A1i";
}
function formatLunarDate(lunar, pattern, locale = "vi") {
  let result = pattern;
  result = result.replace(/yyyy/g, String(lunar.year));
  result = result.replace(/yy/g, String(lunar.year).slice(-2));
  result = result.replace(/dd/g, String(lunar.day).padStart(2, "0"));
  result = result.replace(/MM/g, String(lunar.month).padStart(2, "0"));
  result = result.replace(/CC/g, lunar.yearCanChi ?? "");
  result = result.replace(/DC/g, lunar.dayCanChi ?? "");
  result = result.replace(/MC/g, lunar.monthCanChi ?? "");
  result = result.replace(/L/g, lunar.isLeap ? t(locale).leapLabel : "");
  result = result.replace(/(?<![0-9])d(?![0-9d])/g, String(lunar.day));
  result = result.replace(/(?<![0-9])M(?![0-9MC])/g, String(lunar.month));
  return result.trim();
}
function formatTraditional(lunar) {
  const dayName = getDayName(lunar.day);
  const monthName = getMonthName(lunar.month);
  const leapSuffix = lunar.isLeap ? " Nhu\u1EADn" : "";
  const yearCanChi = lunar.yearCanChi ?? "";
  return `${dayName} th\xE1ng ${monthName}${leapSuffix} n\u0103m ${yearCanChi}`.trim();
}

// src/utils/calendar-grid.ts
function dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function getCalendarGrid(month, year, selectedDate) {
  const grid = [];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const todayKey = dateKey(/* @__PURE__ */ new Date());
  const selectedKey = selectedDate ? dateKey(selectedDate) : "";
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
  const pushCell = (solar, d, m, y, isCurrentMonth) => {
    grid.push({
      solar,
      lunar: LichTa.toLunar(d, m, y),
      isToday: dateKey(solar) === todayKey,
      isSelected: dateKey(solar) === selectedKey,
      isCurrentMonth
    });
  };
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    const m = month - 1 < 1 ? 12 : month - 1;
    const y = month - 1 < 1 ? year - 1 : year;
    pushCell(new Date(y, m - 1, d), d, m, y, false);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    pushCell(new Date(year, month - 1, d), d, month, year, true);
  }
  const remaining = 42 - grid.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month + 1 > 12 ? 1 : month + 1;
    const y = month + 1 > 12 ? year + 1 : year;
    pushCell(new Date(y, m - 1, d), d, m, y, false);
  }
  return grid;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LichTa,
  formatLunarDate,
  formatTraditional,
  getAuspiciousHourIndices,
  getAuspiciousHours,
  getCalendarGrid,
  getDayCanChi,
  getDayName,
  getHourCanChi,
  getMonthCanChi,
  getMonthName,
  getYearDetails,
  getZodiacAnimal,
  jdFromDate,
  jdToDate,
  t
});
//# sourceMappingURL=index.js.map