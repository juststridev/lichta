// src/Calendar.tsx
import React, { useState, useMemo } from "react";
import { LichTa, getYearDetails } from "@lichta/core";
import { jsx, jsxs } from "react/jsx-runtime";
var monthNames = [
  "Th\xE1ng 1",
  "Th\xE1ng 2",
  "Th\xE1ng 3",
  "Th\xE1ng 4",
  "Th\xE1ng 5",
  "Th\xE1ng 6",
  "Th\xE1ng 7",
  "Th\xE1ng 8",
  "Th\xE1ng 9",
  "Th\xE1ng 10",
  "Th\xE1ng 11",
  "Th\xE1ng 12"
];
var weekDayLabelsByLocale = {
  vi: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ja: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ko: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};
var Calendar = ({
  month = (/* @__PURE__ */ new Date()).getMonth() + 1,
  year = (/* @__PURE__ */ new Date()).getFullYear(),
  onSelect,
  showLunar = true,
  locale = "vi",
  theme = "classic",
  className = "",
  children,
  renderDay
}) => {
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [selectedDate, setSelectedDate] = useState(null);
  const yearInfo = useMemo(() => getYearDetails(currentYear), [currentYear]);
  const weekDayLabels = weekDayLabelsByLocale[locale];
  const calendarGrid = useMemo(() => {
    const grid = [];
    const firstDay = new Date(currentYear, currentMonth - 1, 1);
    const lastDay = new Date(currentYear, currentMonth, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const today = /* @__PURE__ */ new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let selStr = "";
    if (selectedDate) {
      selStr = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    }
    const prevMonthLastDay = new Date(currentYear, currentMonth - 1, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const m = currentMonth - 1 < 1 ? 12 : currentMonth - 1;
      const y = currentMonth - 1 < 1 ? currentYear - 1 : currentYear;
      const solar = new Date(y, m - 1, d);
      const lunar = LichTa.toLunar(d, m, y);
      const dateStr = `${y}-${m}-${d}`;
      grid.push({
        solar,
        lunar,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selStr,
        isCurrentMonth: false
      });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const solar = new Date(currentYear, currentMonth - 1, d);
      const lunar = LichTa.toLunar(d, currentMonth, currentYear);
      const dateStr = `${currentYear}-${currentMonth}-${d}`;
      grid.push({
        solar,
        lunar,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selStr,
        isCurrentMonth: true
      });
    }
    const remaining = 42 - grid.length;
    for (let d = 1; d <= remaining; d++) {
      const m = currentMonth + 1 > 12 ? 1 : currentMonth + 1;
      const y = currentMonth + 1 > 12 ? currentYear + 1 : currentYear;
      const solar = new Date(y, m - 1, d);
      const lunar = LichTa.toLunar(d, m, y);
      const dateStr = `${y}-${m}-${d}`;
      grid.push({
        solar,
        lunar,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selStr,
        isCurrentMonth: false
      });
    }
    return grid;
  }, [currentMonth, currentYear, selectedDate]);
  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };
  const handleDayClick = (cell) => {
    setSelectedDate(cell.solar);
    if (onSelect) {
      onSelect(cell.solar, cell.lunar);
    }
  };
  const handleKeydown = (event, cell) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleDayClick(cell);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `lich-ta-calendar lichta-theme-${theme} ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "lich-ta-calendar-header", children: [
      /* @__PURE__ */ jsx("button", { className: "lich-ta-calendar-nav", onClick: prevMonth, "aria-label": "Th\xE1ng tr\u01B0\u1EDBc", children: "\u25C0" }),
      /* @__PURE__ */ jsxs("div", { className: "lich-ta-calendar-title", children: [
        /* @__PURE__ */ jsxs("span", { className: "lich-ta-calendar-month-year", children: [
          monthNames[currentMonth - 1],
          ", ",
          currentYear
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "lich-ta-calendar-canchi", children: [
          yearInfo.can,
          " ",
          yearInfo.chi
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "lich-ta-calendar-nav", onClick: nextMonth, "aria-label": "Th\xE1ng sau", children: "\u25B6" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-weekdays", children: weekDayLabels.map((label) => /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-weekday", children: label }, label)) }),
    /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-grid", children: calendarGrid.map((cell, idx) => {
      if (renderDay) {
        return /* @__PURE__ */ jsx(React.Fragment, { children: renderDay(cell) }, idx);
      }
      let classes = "lich-ta-calendar-day";
      if (cell.isToday) classes += " is-today";
      if (cell.isSelected) classes += " is-selected";
      if (!cell.isCurrentMonth) classes += " is-other-month";
      if (cell.lunar.day === 1) classes += " is-first-lunar";
      return /* @__PURE__ */ jsxs(
        "button",
        {
          className: classes,
          onClick: () => handleDayClick(cell),
          onKeyDown: (e) => handleKeydown(e, cell),
          tabIndex: cell.isCurrentMonth ? 0 : -1,
          children: [
            /* @__PURE__ */ jsx("span", { className: "solar-day", children: cell.solar.getDate() }),
            showLunar && /* @__PURE__ */ jsx("span", { className: "lunar-day", children: cell.lunar.day === 1 ? `${cell.lunar.day}/${cell.lunar.month}${cell.lunar.isLeap ? "*" : ""}` : cell.lunar.day })
          ]
        },
        idx
      );
    }) }),
    children && /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-footer", children })
  ] });
};
export {
  Calendar
};
