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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  injectLunarDates: () => injectLunarDates
});
module.exports = __toCommonJS(index_exports);
var import_core = require("@lichta/core");
var import_jsx_runtime = require("react/jsx-runtime");
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
    const lunar = import_core.LichTa.toLunar(day, month, year);
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
      let tooltipAttr = showTooltip ? `Ng\xE0y ${(0, import_core.getDayCanChi)(lunar.jd)}` : void 0;
      customLunarNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className,
          style: { fontSize: "0.8em", color, marginTop: "2px" },
          title: tooltipAttr,
          children: lunarText
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lichta-rbc-cell", style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
      OriginalDateHeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginalDateHeader, { ...props }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rbc-button-link", children: label }),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  injectLunarDates
});
//# sourceMappingURL=index.cjs.map