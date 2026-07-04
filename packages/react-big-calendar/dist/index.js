// src/index.tsx
import { LichTa, getDayCanChi } from "@lichta/core";
import { jsx, jsxs } from "react/jsx-runtime";
function injectLunarDates(originalComponents = {}, pluginOptions = {}) {
  const {
    monthOnFirstDayOnly = false,
    showLeapMonth = true,
    showTooltip = true,
    color = "#888",
    className = "lichta-rbc-lunar",
    render
  } = pluginOptions;
  const OriginalDateHeader = originalComponents?.month?.dateHeader;
  const LunarDateHeader = (props) => {
    const { date, label } = props;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const lunar = LichTa.toLunar(day, month, year);
    let customLunarNode = null;
    if (render) {
      customLunarNode = render(lunar);
    } else {
      let lunarText = `${lunar.day}`;
      if (!monthOnFirstDayOnly || lunar.day === 1) {
        lunarText = `${lunar.day}/${lunar.month}`;
      }
      if (showLeapMonth && lunar.isLeap) {
        lunarText += " (Nhu\u1EADn)";
      }
      let tooltipAttr = showTooltip ? `Ng\xE0y ${getDayCanChi(lunar.jd)}` : void 0;
      customLunarNode = /* @__PURE__ */ jsx(
        "div",
        {
          className,
          style: { fontSize: "0.8em", color, marginTop: "2px" },
          title: tooltipAttr,
          children: lunarText
        }
      );
    }
    return /* @__PURE__ */ jsxs("div", { className: "lichta-rbc-cell", style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
      OriginalDateHeader ? /* @__PURE__ */ jsx(OriginalDateHeader, { ...props }) : /* @__PURE__ */ jsx("span", { className: "rbc-button-link", children: label }),
      customLunarNode
    ] });
  };
  return {
    ...originalComponents,
    month: {
      ...originalComponents?.month || {},
      dateHeader: LunarDateHeader
    }
  };
}
export {
  injectLunarDates
};
//# sourceMappingURL=index.js.map