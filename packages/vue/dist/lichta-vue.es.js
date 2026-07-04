import { defineComponent as q, ref as $, computed as L, openBlock as i, createElementBlock as d, normalizeClass as b, createElementVNode as l, toDisplayString as o, Fragment as T, renderList as N, createTextVNode as Y, createCommentVNode as x, renderSlot as A } from "vue";
import { getYearDetails as H, LichTa as w } from "@lichta/core";
const J = { class: "lich-ta-calendar-header" }, P = { class: "lich-ta-calendar-title" }, Q = { class: "lich-ta-calendar-month-year" }, R = { class: "lich-ta-calendar-canchi" }, U = { class: "lich-ta-calendar-weekdays" }, X = { class: "lich-ta-calendar-grid" }, Z = ["tabindex", "onClick", "onKeydown"], ee = { class: "solar-day" }, ae = {
  key: 0,
  class: "lunar-day"
}, te = {
  key: 0,
  class: "lich-ta-calendar-footer"
}, le = /* @__PURE__ */ q({
  __name: "Calendar",
  props: {
    month: { default: (/* @__PURE__ */ new Date()).getMonth() + 1 },
    year: { default: (/* @__PURE__ */ new Date()).getFullYear() },
    showLunar: { type: Boolean, default: !0 },
    locale: { default: "vi" },
    theme: { default: "classic" }
  },
  emits: ["select"],
  setup(F, { emit: B }) {
    const v = F, e = $(v.month), s = $(v.year), h = $(null), C = L(() => H(s.value)), E = B, K = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12"
    ], V = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"], I = L(() => {
      const t = [], y = new Date(s.value, e.value - 1, 1), a = new Date(s.value, e.value, 0), D = y.getDay(), g = a.getDate(), p = /* @__PURE__ */ new Date(), _ = `${p.getFullYear()}-${p.getMonth() + 1}-${p.getDate()}`;
      let f = "";
      h.value && (f = `${h.value.getFullYear()}-${h.value.getMonth() + 1}-${h.value.getDate()}`);
      const W = new Date(s.value, e.value - 1, 0).getDate();
      for (let n = D - 1; n >= 0; n--) {
        const r = W - n, c = e.value - 1 < 1 ? 12 : e.value - 1, u = e.value - 1 < 1 ? s.value - 1 : s.value, k = new Date(u, c - 1, r), m = w.toLunar(r, c, u), S = `${u}-${c}-${r}`;
        t.push({
          solar: k,
          lunar: m,
          isToday: S === _,
          isSelected: S === f,
          isCurrentMonth: !1
        });
      }
      for (let n = 1; n <= g; n++) {
        const r = new Date(s.value, e.value - 1, n), c = w.toLunar(n, e.value, s.value), u = `${s.value}-${e.value}-${n}`;
        t.push({
          solar: r,
          lunar: c,
          isToday: u === _,
          isSelected: u === f,
          isCurrentMonth: !0
        });
      }
      const j = 42 - t.length;
      for (let n = 1; n <= j; n++) {
        const r = e.value + 1 > 12 ? 1 : e.value + 1, c = e.value + 1 > 12 ? s.value + 1 : s.value, u = new Date(c, r - 1, n), k = w.toLunar(n, r, c), m = `${c}-${r}-${n}`;
        t.push({
          solar: u,
          lunar: k,
          isToday: m === _,
          isSelected: m === f,
          isCurrentMonth: !1
        });
      }
      return t;
    });
    function z() {
      e.value === 1 ? (e.value = 12, s.value -= 1) : e.value -= 1;
    }
    function G() {
      e.value === 12 ? (e.value = 1, s.value += 1) : e.value += 1;
    }
    function M(t) {
      h.value = t.solar, E("select", t.solar, t.lunar);
    }
    function O(t, y) {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), M(y));
    }
    return (t, y) => (i(), d("div", {
      class: b(["lich-ta-calendar", `lichta-theme-${v.theme}`])
    }, [
      l("div", J, [
        l("button", {
          class: "lich-ta-calendar-nav",
          "aria-label": "Tháng trước",
          onClick: z
        }, "◀"),
        l("div", P, [
          l("span", Q, o(K[e.value - 1]) + ", " + o(s.value), 1),
          l("span", R, o(C.value.can) + " " + o(C.value.chi), 1)
        ]),
        l("button", {
          class: "lich-ta-calendar-nav",
          "aria-label": "Tháng sau",
          onClick: G
        }, "▶")
      ]),
      l("div", U, [
        (i(), d(T, null, N(V, (a) => l("div", {
          key: a,
          class: "lich-ta-calendar-weekday"
        }, o(a), 1)), 64))
      ]),
      l("div", X, [
        (i(!0), d(T, null, N(I.value, (a, D) => (i(), d("button", {
          key: D,
          class: b(["lich-ta-calendar-day", {
            "is-today": a.isToday,
            "is-selected": a.isSelected,
            "is-other-month": !a.isCurrentMonth,
            "is-first-lunar": a.lunar.day === 1
          }]),
          tabindex: a.isCurrentMonth ? 0 : -1,
          onClick: (g) => M(a),
          onKeydown: (g) => O(g, a)
        }, [
          l("span", ee, o(a.solar.getDate()), 1),
          v.showLunar ? (i(), d("span", ae, [
            a.lunar.day === 1 ? (i(), d(T, { key: 0 }, [
              Y(o(a.lunar.day) + "/" + o(a.lunar.month) + o(a.lunar.isLeap ? "*" : ""), 1)
            ], 64)) : (i(), d(T, { key: 1 }, [
              Y(o(a.lunar.day), 1)
            ], 64))
          ])) : x("", !0)
        ], 42, Z))), 128))
      ]),
      t.$slots.default ? (i(), d("div", te, [
        A(t.$slots, "default")
      ])) : x("", !0)
    ], 2));
  }
});
export {
  le as Calendar
};
