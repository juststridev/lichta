"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Calendar: () => Calendar,
  DatePicker: () => DatePicker
});
module.exports = __toCommonJS(index_exports);

// src/Calendar.tsx
var import_react = __toESM(require("react"));
var import_core = require("@lichta/core");
var import_jsx_runtime = require("react/jsx-runtime");
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
  const [currentMonth, setCurrentMonth] = (0, import_react.useState)(month);
  const [currentYear, setCurrentYear] = (0, import_react.useState)(year);
  const [internalSelectedDate, setInternalSelectedDate] = (0, import_react.useState)(null);
  const selectedDate = selectedDateProp !== void 0 ? selectedDateProp : internalSelectedDate;
  (0, import_react.useEffect)(() => {
    setCurrentMonth(month);
  }, [month]);
  (0, import_react.useEffect)(() => {
    setCurrentYear(year);
  }, [year]);
  const yearInfo = (0, import_react.useMemo)(() => (0, import_core.getYearDetails)(currentYear), [currentYear]);
  const { solarMonthNames: monthNames } = (0, import_core.t)(locale);
  const weekDayLabels = (0, import_react.useMemo)(() => (0, import_core.getWeekDayLabels)(locale, firstDayOfWeek), [locale, firstDayOfWeek]);
  const calendarGrid = (0, import_react.useMemo)(
    () => (0, import_core.getCalendarGrid)(currentMonth, currentYear, selectedDate, firstDayOfWeek),
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `lich-ta-calendar lichta-theme-${theme} ${showWeekNumber ? "lich-ta-calendar--with-week-number" : ""} ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lich-ta-calendar-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "lich-ta-calendar-nav", onClick: prevMonth, "aria-label": "Th\xE1ng tr\u01B0\u1EDBc", children: "\u25C0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lich-ta-calendar-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "lich-ta-calendar-month-year", children: [
          monthNames[currentMonth - 1],
          ", ",
          currentYear
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "lich-ta-calendar-canchi", children: [
          yearInfo.can,
          " ",
          yearInfo.chi
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "lich-ta-calendar-nav", onClick: nextMonth, "aria-label": "Th\xE1ng sau", children: "\u25B6" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lich-ta-calendar-weekdays", children: [
      showWeekNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lich-ta-calendar-week-number", "aria-hidden": "true" }),
      weekDayLabels.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lich-ta-calendar-weekday", children: label }, label))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lich-ta-calendar-grid", children: calendarGrid.map((cell, idx) => {
      const weekNumberCell = showWeekNumber && idx % 7 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lich-ta-calendar-week-number", children: cell.weekNumber }, `wn-${idx}`) : null;
      if (renderDay) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.default.Fragment, { children: [
          weekNumberCell,
          renderDay(cell)
        ] }, idx);
      }
      let classes = "lich-ta-calendar-day";
      if (cell.isToday) classes += " is-today";
      if (cell.isSelected) classes += " is-selected";
      if (!cell.isCurrentMonth) classes += " is-other-month";
      if (cell.lunar.day === 1) classes += " is-first-lunar";
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.default.Fragment, { children: [
        weekNumberCell,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            className: classes,
            onClick: () => handleDayClick(cell),
            onKeyDown: (e) => handleKeydown(e, cell),
            tabIndex: cell.isCurrentMonth ? 0 : -1,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "solar-day", children: cell.solar.getDate() }),
              showLunar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lunar-day", children: cell.lunar.day === 1 ? `${cell.lunar.day}/${cell.lunar.month}${cell.lunar.isLeap ? "*" : ""}` : cell.lunar.day })
            ]
          }
        )
      ] }, idx);
    }) }),
    children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lich-ta-calendar-footer", children })
  ] });
};

// src/DatePicker.tsx
var import_react2 = require("react");
var import_core2 = require("@lichta/core");
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  const [selected, setSelected] = (0, import_react2.useState)(value);
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const anchor = selected ?? /* @__PURE__ */ new Date();
  const [viewMonth, setViewMonth] = (0, import_react2.useState)(anchor.getMonth() + 1);
  const [viewYear, setViewYear] = (0, import_react2.useState)(anchor.getFullYear());
  const rootRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    const next = value ?? null;
    setSelected(next);
    if (next) {
      setViewMonth(next.getMonth() + 1);
      setViewYear(next.getFullYear());
    }
  }, [value]);
  (0, import_react2.useEffect)(() => {
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
  const yearInfo = (0, import_react2.useMemo)(() => (0, import_core2.getYearDetails)(viewYear), [viewYear]);
  const { solarMonthNames: monthNames } = (0, import_core2.t)(locale);
  const weekDayLabels = (0, import_react2.useMemo)(() => (0, import_core2.getWeekDayLabels)(locale, firstDayOfWeek), [locale, firstDayOfWeek]);
  const grid = (0, import_react2.useMemo)(
    () => (0, import_core2.getCalendarGrid)(viewMonth, viewYear, selected, firstDayOfWeek),
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: rootRef, className: `lich-ta-datepicker lichta-theme-${theme} ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "lich-ta-datepicker-popover", role: "dialog", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "lich-ta-datepicker-calendar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "lich-ta-datepicker-calendar-header", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "lich-ta-datepicker-calendar-nav",
            onClick: prevMonth,
            "aria-label": "Th\xE1ng tr\u01B0\u1EDBc",
            children: "\u25C0"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "lich-ta-datepicker-calendar-title", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "lich-ta-datepicker-calendar-month-year", children: [
            monthNames[viewMonth - 1],
            ", ",
            viewYear
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "lich-ta-datepicker-calendar-canchi", children: [
            yearInfo.can,
            " ",
            yearInfo.chi
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "lich-ta-datepicker-calendar-weekdays", children: weekDayLabels.map((label) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "lich-ta-datepicker-calendar-weekday", children: label }, label)) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "lich-ta-datepicker-calendar-grid", children: grid.map((cell, idx) => {
        let classes = "lich-ta-datepicker-calendar-day";
        if (cell.isToday) classes += " is-today";
        if (cell.isSelected) classes += " is-selected";
        if (!cell.isCurrentMonth) classes += " is-other-month";
        if (cell.lunar.day === 1) classes += " is-first-lunar";
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: classes,
            onClick: () => handleDaySelect(cell),
            tabIndex: cell.isCurrentMonth ? 0 : -1,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "solar-day", children: cell.solar.getDate() }),
              showLunar && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "lunar-day", children: cell.lunar.day === 1 ? `${cell.lunar.day}/${cell.lunar.month}${cell.lunar.isLeap ? "*" : ""}` : cell.lunar.day })
            ]
          },
          idx
        );
      }) })
    ] }) })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Calendar,
  DatePicker
});
