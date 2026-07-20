// src/Calendar.tsx
import React, { useState, useMemo, useEffect } from "react";
import { getYearDetails, getCalendarGrid, getWeekDayLabels, t } from "@lichta/core";
import { jsx, jsxs } from "react/jsx-runtime";
var Calendar = ({
  month = (/* @__PURE__ */ new Date()).getMonth() + 1,
  year = (/* @__PURE__ */ new Date()).getFullYear(),
  selectedDate: selectedDateProp,
  onSelect,
  onMonthChange,
  showLunar = true,
  locale = "vi",
  firstDayOfWeek = 0,
  showWeekNumber = false,
  theme = "classic",
  className = "",
  children,
  renderDay
}) => {
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [internalSelectedDate, setInternalSelectedDate] = useState(null);
  const selectedDate = selectedDateProp !== void 0 ? selectedDateProp : internalSelectedDate;
  useEffect(() => {
    setCurrentMonth(month);
  }, [month]);
  useEffect(() => {
    setCurrentYear(year);
  }, [year]);
  const yearInfo = useMemo(() => getYearDetails(currentYear), [currentYear]);
  const { solarMonthNames: monthNames } = t(locale);
  const weekDayLabels = useMemo(() => getWeekDayLabels(locale, firstDayOfWeek), [locale, firstDayOfWeek]);
  const calendarGrid = useMemo(
    () => getCalendarGrid(currentMonth, currentYear, selectedDate, firstDayOfWeek),
    [currentMonth, currentYear, selectedDate, firstDayOfWeek]
  );
  const prevMonth = () => {
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const newYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };
  const nextMonth = () => {
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const newYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };
  const handleDayClick = (cell) => {
    if (selectedDateProp === void 0) {
      setInternalSelectedDate(cell.solar);
    }
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
  return /* @__PURE__ */ jsxs("div", { className: `lich-ta-calendar lichta-theme-${theme} ${showWeekNumber ? "lich-ta-calendar--with-week-number" : ""} ${className}`, children: [
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
    /* @__PURE__ */ jsxs("div", { className: "lich-ta-calendar-weekdays", children: [
      showWeekNumber && /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-week-number", "aria-hidden": "true" }),
      weekDayLabels.map((label) => /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-weekday", children: label }, label))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-grid", children: calendarGrid.map((cell, idx) => {
      const weekNumberCell = showWeekNumber && idx % 7 === 0 ? /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-week-number", children: cell.weekNumber }, `wn-${idx}`) : null;
      if (renderDay) {
        return /* @__PURE__ */ jsxs(React.Fragment, { children: [
          weekNumberCell,
          renderDay(cell)
        ] }, idx);
      }
      let classes = "lich-ta-calendar-day";
      if (cell.isToday) classes += " is-today";
      if (cell.isSelected) classes += " is-selected";
      if (!cell.isCurrentMonth) classes += " is-other-month";
      if (cell.lunar.day === 1) classes += " is-first-lunar";
      return /* @__PURE__ */ jsxs(React.Fragment, { children: [
        weekNumberCell,
        /* @__PURE__ */ jsxs(
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
          }
        )
      ] }, idx);
    }) }),
    children && /* @__PURE__ */ jsx("div", { className: "lich-ta-calendar-footer", children })
  ] });
};

// src/DatePicker.tsx
import { useState as useState2, useRef, useEffect as useEffect2, useMemo as useMemo2 } from "react";
import { getYearDetails as getYearDetails2, getCalendarGrid as getCalendarGrid2, getWeekDayLabels as getWeekDayLabels2, t as t2 } from "@lichta/core";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function defaultFormat(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}
var DatePicker = ({
  value = null,
  onSelect,
  onMonthChange,
  placeholder = "Ch\u1ECDn ng\xE0y",
  locale = "vi",
  firstDayOfWeek = 0,
  theme = "classic",
  showLunar = true,
  format = defaultFormat,
  disabled = false,
  className = ""
}) => {
  const [selected, setSelected] = useState2(value);
  const [isOpen, setIsOpen] = useState2(false);
  const anchor = selected ?? /* @__PURE__ */ new Date();
  const [viewMonth, setViewMonth] = useState2(anchor.getMonth() + 1);
  const [viewYear, setViewYear] = useState2(anchor.getFullYear());
  const rootRef = useRef(null);
  useEffect2(() => {
    const next = value ?? null;
    setSelected(next);
    if (next) {
      setViewMonth(next.getMonth() + 1);
      setViewYear(next.getFullYear());
    }
  }, [value]);
  useEffect2(() => {
    if (!isOpen) return;
    function handlePointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeydown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen]);
  const yearInfo = useMemo2(() => getYearDetails2(viewYear), [viewYear]);
  const { solarMonthNames: monthNames } = t2(locale);
  const weekDayLabels = useMemo2(() => getWeekDayLabels2(locale, firstDayOfWeek), [locale, firstDayOfWeek]);
  const grid = useMemo2(
    () => getCalendarGrid2(viewMonth, viewYear, selected, firstDayOfWeek),
    [viewMonth, viewYear, selected, firstDayOfWeek]
  );
  function prevMonth() {
    const newMonth = viewMonth === 1 ? 12 : viewMonth - 1;
    const newYear = viewMonth === 1 ? viewYear - 1 : viewYear;
    setViewMonth(newMonth);
    setViewYear(newYear);
    onMonthChange?.(newMonth, newYear);
  }
  function nextMonth() {
    const newMonth = viewMonth === 12 ? 1 : viewMonth + 1;
    const newYear = viewMonth === 12 ? viewYear + 1 : viewYear;
    setViewMonth(newMonth);
    setViewYear(newYear);
    onMonthChange?.(newMonth, newYear);
  }
  function handleDaySelect(cell) {
    setSelected(cell.solar);
    setIsOpen(false);
    onSelect?.(cell.solar, cell.lunar);
  }
  return /* @__PURE__ */ jsxs2("div", { ref: rootRef, className: `lich-ta-datepicker lichta-theme-${theme} ${className}`, children: [
    /* @__PURE__ */ jsx2(
      "input",
      {
        type: "text",
        className: "lich-ta-datepicker-input",
        readOnly: true,
        disabled,
        placeholder,
        value: selected ? format(selected) : "",
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        onClick: () => !disabled && setIsOpen((open) => !open)
      }
    ),
    isOpen && /* @__PURE__ */ jsx2("div", { className: "lich-ta-datepicker-popover", role: "dialog", children: /* @__PURE__ */ jsxs2("div", { className: "lich-ta-datepicker-calendar", children: [
      /* @__PURE__ */ jsxs2("div", { className: "lich-ta-datepicker-calendar-header", children: [
        /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            className: "lich-ta-datepicker-calendar-nav",
            onClick: prevMonth,
            "aria-label": "Th\xE1ng tr\u01B0\u1EDBc",
            children: "\u25C0"
          }
        ),
        /* @__PURE__ */ jsxs2("div", { className: "lich-ta-datepicker-calendar-title", children: [
          /* @__PURE__ */ jsxs2("span", { className: "lich-ta-datepicker-calendar-month-year", children: [
            monthNames[viewMonth - 1],
            ", ",
            viewYear
          ] }),
          /* @__PURE__ */ jsxs2("span", { className: "lich-ta-datepicker-calendar-canchi", children: [
            yearInfo.can,
            " ",
            yearInfo.chi
          ] })
        ] }),
        /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            className: "lich-ta-datepicker-calendar-nav",
            onClick: nextMonth,
            "aria-label": "Th\xE1ng sau",
            children: "\u25B6"
          }
        )
      ] }),
      /* @__PURE__ */ jsx2("div", { className: "lich-ta-datepicker-calendar-weekdays", children: weekDayLabels.map((label) => /* @__PURE__ */ jsx2("div", { className: "lich-ta-datepicker-calendar-weekday", children: label }, label)) }),
      /* @__PURE__ */ jsx2("div", { className: "lich-ta-datepicker-calendar-grid", children: grid.map((cell, idx) => {
        let classes = "lich-ta-datepicker-calendar-day";
        if (cell.isToday) classes += " is-today";
        if (cell.isSelected) classes += " is-selected";
        if (!cell.isCurrentMonth) classes += " is-other-month";
        if (cell.lunar.day === 1) classes += " is-first-lunar";
        return /* @__PURE__ */ jsxs2(
          "button",
          {
            type: "button",
            className: classes,
            onClick: () => handleDaySelect(cell),
            tabIndex: cell.isCurrentMonth ? 0 : -1,
            children: [
              /* @__PURE__ */ jsx2("span", { className: "solar-day", children: cell.solar.getDate() }),
              showLunar && /* @__PURE__ */ jsx2("span", { className: "lunar-day", children: cell.lunar.day === 1 ? `${cell.lunar.day}/${cell.lunar.month}${cell.lunar.isLeap ? "*" : ""}` : cell.lunar.day })
            ]
          },
          idx
        );
      }) })
    ] }) })
  ] });
};
export {
  Calendar,
  DatePicker
};
