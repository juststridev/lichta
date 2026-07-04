// src/index.ts
import { LichTa, getDayCanChi } from "@lichta/core";
function injectLunarDates(options, pluginOptions = {}) {
  const originalDayCellContent = options.dayCellContent;
  const {
    monthOnFirstDayOnly = false,
    showLeapMonth = true,
    showTooltip = true,
    color = "#888",
    className = "lichta-ec-lunar",
    render
  } = pluginOptions;
  options.dayCellContent = function(arg) {
    const date = arg.date;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const lunar = LichTa.toLunar(day, month, year);
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
        const canChi = getDayCanChi(lunar.jd);
        tooltipAttr = `title="Ng\xE0y ${canChi}"`;
      }
      customLunarHtml = `<div class="${className}" style="font-size: 0.8em; color: ${color}; margin-top: 2px;" ${tooltipAttr}>${lunarText}</div>`;
    }
    let originalContent = "";
    if (originalDayCellContent) {
      const orig = typeof originalDayCellContent === "function" ? originalDayCellContent(arg) : originalDayCellContent;
      if (orig?.html) {
        originalContent = orig.html;
      } else {
        originalContent = orig;
      }
    } else {
      originalContent = `<div class="ec-day-head">${day}</div>`;
    }
    return {
      html: `
        <div class="lichta-ec-cell" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
          ${originalContent}
          ${customLunarHtml}
        </div>
      `
    };
  };
  return options;
}
export {
  injectLunarDates
};
//# sourceMappingURL=index.js.map