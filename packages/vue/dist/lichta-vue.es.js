import { defineComponent as V, ref as f, computed as y, watch as K, openBlock as l, createElementBlock as s, normalizeClass as L, createElementVNode as a, toDisplayString as t, Fragment as m, renderList as x, createTextVNode as E, createCommentVNode as S, renderSlot as O, onMounted as z, onBeforeUnmount as A } from "vue";
import { getYearDetails as P, t as N, getCalendarGrid as G } from "@lichta/core";
const U = { class: "lich-ta-calendar-header" }, j = { class: "lich-ta-calendar-title" }, q = { class: "lich-ta-calendar-month-year" }, H = { class: "lich-ta-calendar-canchi" }, J = { class: "lich-ta-calendar-weekdays" }, Q = { class: "lich-ta-calendar-grid" }, R = ["tabindex", "onClick", "onKeydown"], W = { class: "solar-day" }, X = {
  key: 0,
  class: "lunar-day"
}, Z = {
  key: 0,
  class: "lich-ta-calendar-footer"
}, pe = /* @__PURE__ */ V({
  __name: "Calendar",
  props: {
    month: { default: (/* @__PURE__ */ new Date()).getMonth() + 1 },
    year: { default: (/* @__PURE__ */ new Date()).getFullYear() },
    selectedDate: { default: void 0 },
    showLunar: { type: Boolean, default: !0 },
    locale: { default: "vi" },
    theme: { default: "classic" }
  },
  emits: ["select"],
  setup(r, { emit: k }) {
    const e = r, d = f(e.month), i = f(e.year), h = f(null), _ = y(
      () => e.selectedDate !== void 0 ? e.selectedDate : h.value
    );
    K(() => e.month, (o) => {
      d.value = o;
    }), K(() => e.year, (o) => {
      i.value = o;
    });
    const g = y(() => P(i.value)), u = k, p = y(() => N(e.locale).weekDays), b = y(() => N(e.locale).solarMonthNames), T = y(
      () => G(d.value, i.value, _.value)
    );
    function Y() {
      d.value === 1 ? (d.value = 12, i.value -= 1) : d.value -= 1;
    }
    function B() {
      d.value === 12 ? (d.value = 1, i.value += 1) : d.value += 1;
    }
    function C(o) {
      e.selectedDate === void 0 && (h.value = o.solar), u("select", o.solar, o.lunar);
    }
    function F(o, $) {
      (o.key === "Enter" || o.key === " ") && (o.preventDefault(), C($));
    }
    return (o, $) => (l(), s("div", {
      class: L(["lich-ta-calendar", `lichta-theme-${e.theme}`])
    }, [
      a("div", U, [
        a("button", {
          class: "lich-ta-calendar-nav",
          "aria-label": "Tháng trước",
          onClick: Y
        }, "◀"),
        a("div", j, [
          a("span", q, t(b.value[d.value - 1]) + ", " + t(i.value), 1),
          a("span", H, t(g.value.can) + " " + t(g.value.chi), 1)
        ]),
        a("button", {
          class: "lich-ta-calendar-nav",
          "aria-label": "Tháng sau",
          onClick: B
        }, "▶")
      ]),
      a("div", J, [
        (l(!0), s(m, null, x(p.value, (n) => (l(), s("div", {
          key: n,
          class: "lich-ta-calendar-weekday"
        }, t(n), 1))), 128))
      ]),
      a("div", Q, [
        (l(!0), s(m, null, x(T.value, (n, M) => (l(), s("button", {
          key: M,
          class: L(["lich-ta-calendar-day", {
            "is-today": n.isToday,
            "is-selected": n.isSelected,
            "is-other-month": !n.isCurrentMonth,
            "is-first-lunar": n.lunar.day === 1
          }]),
          tabindex: n.isCurrentMonth ? 0 : -1,
          onClick: (w) => C(n),
          onKeydown: (w) => F(w, n)
        }, [
          a("span", W, t(n.solar.getDate()), 1),
          e.showLunar ? (l(), s("span", X, [
            n.lunar.day === 1 ? (l(), s(m, { key: 0 }, [
              E(t(n.lunar.day) + "/" + t(n.lunar.month) + t(n.lunar.isLeap ? "*" : ""), 1)
            ], 64)) : (l(), s(m, { key: 1 }, [
              E(t(n.lunar.day), 1)
            ], 64))
          ])) : S("", !0)
        ], 42, R))), 128))
      ]),
      o.$slots.default ? (l(), s("div", Z, [
        O(o.$slots, "default")
      ])) : S("", !0)
    ], 2));
  }
}), ee = ["disabled", "placeholder", "value", "aria-expanded"], ae = {
  key: 0,
  class: "lich-ta-datepicker-popover",
  role: "dialog"
}, te = { class: "lich-ta-datepicker-calendar" }, ne = { class: "lich-ta-datepicker-calendar-header" }, le = { class: "lich-ta-datepicker-calendar-title" }, se = { class: "lich-ta-datepicker-calendar-month-year" }, oe = { class: "lich-ta-datepicker-calendar-canchi" }, ce = { class: "lich-ta-datepicker-calendar-weekdays" }, ie = { class: "lich-ta-datepicker-calendar-grid" }, re = ["tabindex", "onClick"], de = { class: "solar-day" }, ue = {
  key: 0,
  class: "lunar-day"
}, fe = /* @__PURE__ */ V({
  __name: "DatePicker",
  props: {
    value: { default: null },
    placeholder: { default: "Chọn ngày" },
    locale: { default: "vi" },
    theme: { default: "classic" },
    showLunar: { type: Boolean, default: !0 },
    format: { type: Function, default: (r) => {
      const k = String(r.getDate()).padStart(2, "0"), e = String(r.getMonth() + 1).padStart(2, "0");
      return `${k}/${e}/${r.getFullYear()}`;
    } },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["select"],
  setup(r, { emit: k }) {
    const e = r, d = k, i = f(e.value), h = f(!1), _ = f(null), g = i.value ?? /* @__PURE__ */ new Date(), u = f(g.getMonth() + 1), p = f(g.getFullYear());
    K(
      () => e.value,
      (v) => {
        const D = v ?? null;
        i.value = D, D && (u.value = D.getMonth() + 1, p.value = D.getFullYear());
      }
    );
    const b = y(() => P(p.value)), T = y(() => N(e.locale).weekDays), Y = y(() => N(e.locale).solarMonthNames), B = y(() => G(u.value, p.value, i.value)), C = y(() => i.value ? e.format(i.value) : "");
    function F() {
      e.disabled || (h.value = !h.value);
    }
    function o() {
      u.value === 1 ? (u.value = 12, p.value -= 1) : u.value -= 1;
    }
    function $() {
      u.value === 12 ? (u.value = 1, p.value += 1) : u.value += 1;
    }
    function n(v) {
      i.value = v.solar, h.value = !1, d("select", v.solar, v.lunar);
    }
    function M(v) {
      _.value && !_.value.contains(v.target) && (h.value = !1);
    }
    function w(v) {
      v.key === "Escape" && (h.value = !1);
    }
    return z(() => {
      document.addEventListener("mousedown", M), document.addEventListener("keydown", w);
    }), A(() => {
      document.removeEventListener("mousedown", M), document.removeEventListener("keydown", w);
    }), (v, D) => (l(), s("div", {
      ref_key: "rootEl",
      ref: _,
      class: L(["lich-ta-datepicker", `lichta-theme-${r.theme}`])
    }, [
      a("input", {
        type: "text",
        class: "lich-ta-datepicker-input",
        readonly: "",
        disabled: r.disabled,
        placeholder: r.placeholder,
        value: C.value,
        "aria-haspopup": "dialog",
        "aria-expanded": h.value,
        onClick: F
      }, null, 8, ee),
      h.value ? (l(), s("div", ae, [
        a("div", te, [
          a("div", ne, [
            a("button", {
              type: "button",
              class: "lich-ta-datepicker-calendar-nav",
              "aria-label": "Tháng trước",
              onClick: o
            }, " ◀ "),
            a("div", le, [
              a("span", se, t(Y.value[u.value - 1]) + ", " + t(p.value), 1),
              a("span", oe, t(b.value.can) + " " + t(b.value.chi), 1)
            ]),
            a("button", {
              type: "button",
              class: "lich-ta-datepicker-calendar-nav",
              "aria-label": "Tháng sau",
              onClick: $
            }, " ▶ ")
          ]),
          a("div", ce, [
            (l(!0), s(m, null, x(T.value, (c) => (l(), s("div", {
              key: c,
              class: "lich-ta-datepicker-calendar-weekday"
            }, t(c), 1))), 128))
          ]),
          a("div", ie, [
            (l(!0), s(m, null, x(B.value, (c, I) => (l(), s("button", {
              key: I,
              type: "button",
              class: L(["lich-ta-datepicker-calendar-day", {
                "is-today": c.isToday,
                "is-selected": c.isSelected,
                "is-other-month": !c.isCurrentMonth,
                "is-first-lunar": c.lunar.day === 1
              }]),
              tabindex: c.isCurrentMonth ? 0 : -1,
              onClick: (he) => n(c)
            }, [
              a("span", de, t(c.solar.getDate()), 1),
              r.showLunar ? (l(), s("span", ue, [
                c.lunar.day === 1 ? (l(), s(m, { key: 0 }, [
                  E(t(c.lunar.day) + "/" + t(c.lunar.month) + t(c.lunar.isLeap ? "*" : ""), 1)
                ], 64)) : (l(), s(m, { key: 1 }, [
                  E(t(c.lunar.day), 1)
                ], 64))
              ])) : S("", !0)
            ], 10, re))), 128))
          ])
        ])
      ])) : S("", !0)
    ], 2));
  }
});
export {
  pe as Calendar,
  fe as DatePicker
};
