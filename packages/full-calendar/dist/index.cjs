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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  injectLunarDates: () => injectLunarDates
});
module.exports = __toCommonJS(index_exports);
var import_core = require("@lichta/core");
function injectLunarDates(options, pluginOptions = {}) {
  const originalDayCellContent = options.dayCellContent;
  const {
    monthOnFirstDayOnly = false,
    showLeapMonth = true,
    showTooltip = true,
    color = "#888",
    className = "lichta-fc-lunar",
    render
  } = pluginOptions;
  options.dayCellContent = function(arg) {
    const date = arg.date;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const lunar = import_core.LichTa.toLunar(day, month, year);
    let customLunarHtml = "";
    if (render) {
      customLunarHtml = render(lunar);
    } else {
      let lunarText = `${lunar.day}`;
      if (!monthOnFirstDayOnly || lunar.day === 1) {
        lunarText = `${lunar.day}/${lunar.month}`;
      }
      if (showLeapMonth && lunar.isLeap) {
        lunarText += " (Nhu\u1EADn)";
      }
      let tooltipAttr = "";
      if (showTooltip) {
        const canChi = (0, import_core.getDayCanChi)(lunar.jd);
        tooltipAttr = `title="Ng\xE0y ${canChi}"`;
      }
      customLunarHtml = `<div class="${className}" style="font-size: 0.8em; color: ${color}; margin-top: 2px;" ${tooltipAttr}>${lunarText}</div>`;
    }
    let originalContent = "";
    if (originalDayCellContent) {
      const orig = typeof originalDayCellContent === "function" ? originalDayCellContent(arg) : originalDayCellContent;
      if (orig?.html) {
        originalContent = orig.html;
      } else if (typeof orig === "string") {
        originalContent = orig;
      }
    } else {
      originalContent = `<div class="lichta-fc-day-text" style="padding: 0; text-decoration: none;">${day}</div>`;
    }
    return {
      html: `
        <div class="lichta-fc-cell" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          ${originalContent}
          ${customLunarHtml}
        </div>
      `
    };
  };
  return options;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  injectLunarDates
});
//# sourceMappingURL=index.cjs.map