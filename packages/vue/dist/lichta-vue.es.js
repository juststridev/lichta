import { defineComponent as T, ref as _, computed as k, watch as B, openBlock as l, createElementBlock as s, normalizeClass as N, createElementVNode as t, toDisplayString as n, createCommentVNode as w, Fragment as p, renderList as x, createTextVNode as W, renderSlot as I, onMounted as z, onBeforeUnmount as A } from "vue";
import { getYearDetails as F, getWeekDayLabels as K, t as V, getCalendarGrid as P } from "@lichta/core";
const U = { class: "lich-ta-calendar-header" }, j = { class: "lich-ta-calendar-title" }, q = { class: "lich-ta-calendar-month-year" }, H = { class: "lich-ta-calendar-canchi" }, J = { class: "lich-ta-calendar-weekdays" }, Q = {
  key: 0,
  class: "lich-ta-calendar-week-number",
  "aria-hidden": "true"
}, R = { class: "lich-ta-calendar-grid" }, X = {
  key: 0,
  class: "lich-ta-calendar-week-number"
}, Z = ["tabindex", "onClick", "onKeydown"], ee = { class: "solar-day" }, ae = {
  key: 0,
  class: "lunar-day"
}, te = {
  key: 0,
  class: "lich-ta-calendar-footer"
}, pe = /* @__PURE__ */ T({
  __name: "Calendar",
  props: {
    month: { default: (/* @__PURE__ */ new Date()).getMonth() + 1 },
    year: { default: (/* @__PURE__ */ new Date()).getFullYear() },
    selectedDate: { default: void 0 },
    showLunar: { type: Boolean, default: !0 },
    locale: { default: "vi" },
    firstDayOfWeek: { default: 0 },
    showWeekNumber: { type: Boolean, default: !1 },
    theme: { default: "classic" }
  },
  emits: ["select", "month-change"],
  setup(v, { emit: g }) {
    const e = v, i = _(e.month), c = _(e.year), m = _(null), b = k(
      () => e.selectedDate !== void 0 ? e.selectedDate : m.value
    );
    B(() => e.month, (a) => {
      i.value = a;
    }), B(() => e.year, (a) => {
      c.value = a;
    });
    const D = k(() => F(c.value)), d = g, h = k(() => K(e.locale, e.firstDayOfWeek)), M = k(() => V(e.locale).solarMonthNames), Y = k(
      () => P(i.value, c.value, b.value, e.firstDayOfWeek)
    );
    function E() {
      const a = i.value === 1 ? 12 : i.value - 1, f = i.value === 1 ? c.value - 1 : c.value;
      i.value = a, c.value = f, d("month-change", a, f);
    }
    function S() {
      const a = i.value === 12 ? 1 : i.value + 1, f = i.value === 12 ? c.value + 1 : c.value;
      i.value = a, c.value = f, d("month-change", a, f);
    }
    function L(a) {
      e.selectedDate === void 0 && (m.value = a.solar), d("select", a.solar, a.lunar);
    }
    function O(a, f) {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), L(f));
    }
    return (a, f) => (l(), s("div", {
      class: N(["lich-ta-calendar", `lichta-theme-${e.theme}`, { "lich-ta-calendar--with-week-number": e.showWeekNumber }])
    }, [
      t("div", U, [
        t("button", {
          class: "lich-ta-calendar-nav",
          "aria-label": "Tháng trước",
          onClick: E
        }, "◀"),
        t("div", j, [
          t("span", q, n(M.value[i.value - 1]) + ", " + n(c.value), 1),
          t("span", H, n(D.value.can) + " " + n(D.value.chi), 1)
        ]),
        t("button", {
          class: "lich-ta-calendar-nav",
          "aria-label": "Tháng sau",
          onClick: S
        }, "▶")
      ]),
      t("div", J, [
        e.showWeekNumber ? (l(), s("div", Q)) : w("", !0),
        (l(!0), s(p, null, x(h.value, (o) => (l(), s("div", {
          key: o,
          class: "lich-ta-calendar-weekday"
        }, n(o), 1))), 128))
      ]),
      t("div", R, [
        (l(!0), s(p, null, x(Y.value, (o, $) => (l(), s(p, { key: $ }, [
          e.showWeekNumber && $ % 7 === 0 ? (l(), s("div", X, n(o.weekNumber), 1)) : w("", !0),
          t("button", {
            class: N(["lich-ta-calendar-day", {
              "is-today": o.isToday,
              "is-selected": o.isSelected,
              "is-other-month": !o.isCurrentMonth,
              "is-first-lunar": o.lunar.day === 1
            }]),
            tabindex: o.isCurrentMonth ? 0 : -1,
            onClick: (C) => L(o),
            onKeydown: (C) => O(C, o)
          }, [
            t("span", ee, n(o.solar.getDate()), 1),
            e.showLunar ? (l(), s("span", ae, [
              o.lunar.day === 1 ? (l(), s(p, { key: 0 }, [
                W(n(o.lunar.day) + "/" + n(o.lunar.month) + n(o.lunar.isLeap ? "*" : ""), 1)
              ], 64)) : (l(), s(p, { key: 1 }, [
                W(n(o.lunar.day), 1)
              ], 64))
            ])) : w("", !0)
          ], 42, Z)
        ], 64))), 128))
      ]),
      a.$slots.default ? (l(), s("div", te, [
        I(a.$slots, "default")
      ])) : w("", !0)
    ], 2));
  }
}), ne = ["disabled", "placeholder", "value", "aria-expanded"], le = {
  key: 0,
  class: "lich-ta-datepicker-popover",
  role: "dialog"
}, se = { class: "lich-ta-datepicker-calendar" }, oe = { class: "lich-ta-datepicker-calendar-header" }, ce = { class: "lich-ta-datepicker-calendar-title" }, re = { class: "lich-ta-datepicker-calendar-month-year" }, ie = { class: "lich-ta-datepicker-calendar-canchi" }, de = { class: "lich-ta-datepicker-calendar-weekdays" }, ue = { class: "lich-ta-datepicker-calendar-grid" }, he = ["tabindex", "onClick"], ve = { class: "solar-day" }, ye = {
  key: 0,
  class: "lunar-day"
}, _e = /* @__PURE__ */ T({
  __name: "DatePicker",
  props: {
    value: { default: null },
    placeholder: { default: "Chọn ngày" },
    locale: { default: "vi" },
    firstDayOfWeek: { default: 0 },
    theme: { default: "classic" },
    showLunar: { type: Boolean, default: !0 },
    format: { type: Function, default: (v) => {
      const g = String(v.getDate()).padStart(2, "0"), e = String(v.getMonth() + 1).padStart(2, "0");
      return `${g}/${e}/${v.getFullYear()}`;
    } },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["select", "month-change"],
  setup(v, { emit: g }) {
    const e = v, i = g, c = _(e.value), m = _(!1), b = _(null), D = c.value ?? /* @__PURE__ */ new Date(), d = _(D.getMonth() + 1), h = _(D.getFullYear());
    B(
      () => e.value,
      (r) => {
        const y = r ?? null;
        c.value = y, y && (d.value = y.getMonth() + 1, h.value = y.getFullYear());
      }
    );
    const M = k(() => F(h.value)), Y = k(() => K(e.locale, e.firstDayOfWeek)), E = k(() => V(e.locale).solarMonthNames), S = k(() => P(d.value, h.value, c.value, e.firstDayOfWeek)), L = k(() => c.value ? e.format(c.value) : "");
    function O() {
      e.disabled || (m.value = !m.value);
    }
    function a() {
      const r = d.value === 1 ? 12 : d.value - 1, y = d.value === 1 ? h.value - 1 : h.value;
      d.value = r, h.value = y, i("month-change", r, y);
    }
    function f() {
      const r = d.value === 12 ? 1 : d.value + 1, y = d.value === 12 ? h.value + 1 : h.value;
      d.value = r, h.value = y, i("month-change", r, y);
    }
    function o(r) {
      c.value = r.solar, m.value = !1, i("select", r.solar, r.lunar);
    }
    function $(r) {
      b.value && !b.value.contains(r.target) && (m.value = !1);
    }
    function C(r) {
      r.key === "Escape" && (m.value = !1);
    }
    return z(() => {
      document.addEventListener("mousedown", $), document.addEventListener("keydown", C);
    }), A(() => {
      document.removeEventListener("mousedown", $), document.removeEventListener("keydown", C);
    }), (r, y) => (l(), s("div", {
      ref_key: "rootEl",
      ref: b,
      class: N(["lich-ta-datepicker", `lichta-theme-${v.theme}`])
    }, [
      t("input", {
        type: "text",
        class: "lich-ta-datepicker-input",
        readonly: "",
        disabled: v.disabled,
        placeholder: v.placeholder,
        value: L.value,
        "aria-haspopup": "dialog",
        "aria-expanded": m.value,
        onClick: O
      }, null, 8, ne),
      m.value ? (l(), s("div", le, [
        t("div", se, [
          t("div", oe, [
            t("button", {
              type: "button",
              class: "lich-ta-datepicker-calendar-nav",
              "aria-label": "Tháng trước",
              onClick: a
            }, " ◀ "),
            t("div", ce, [
              t("span", re, n(E.value[d.value - 1]) + ", " + n(h.value), 1),
              t("span", ie, n(M.value.can) + " " + n(M.value.chi), 1)
            ]),
            t("button", {
              type: "button",
              class: "lich-ta-datepicker-calendar-nav",
              "aria-label": "Tháng sau",
              onClick: f
            }, " ▶ ")
          ]),
          t("div", de, [
            (l(!0), s(p, null, x(Y.value, (u) => (l(), s("div", {
              key: u,
              class: "lich-ta-datepicker-calendar-weekday"
            }, n(u), 1))), 128))
          ]),
          t("div", ue, [
            (l(!0), s(p, null, x(S.value, (u, G) => (l(), s("button", {
              key: G,
              type: "button",
              class: N(["lich-ta-datepicker-calendar-day", {
                "is-today": u.isToday,
                "is-selected": u.isSelected,
                "is-other-month": !u.isCurrentMonth,
                "is-first-lunar": u.lunar.day === 1
              }]),
              tabindex: u.isCurrentMonth ? 0 : -1,
              onClick: (me) => o(u)
            }, [
              t("span", ve, n(u.solar.getDate()), 1),
              v.showLunar ? (l(), s("span", ye, [
                u.lunar.day === 1 ? (l(), s(p, { key: 0 }, [
                  W(n(u.lunar.day) + "/" + n(u.lunar.month) + n(u.lunar.isLeap ? "*" : ""), 1)
                ], 64)) : (l(), s(p, { key: 1 }, [
                  W(n(u.lunar.day), 1)
                ], 64))
              ])) : w("", !0)
            ], 10, he))), 128))
          ])
        ])
      ])) : w("", !0)
    ], 2));
  }
});
export {
  pe as Calendar,
  _e as DatePicker
};
