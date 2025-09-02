/**
 * antd v4 主题变量 到 MyBricks 变量的映射关系
 * outline 都默认对应到 border
 */
export const antdV4CssVarMap = () => {
  const prefix = "--ant-"
  const mybricksPrefix = "--mb-"

  return {
    [`${prefix}primary-color`]: `var(${mybricksPrefix}color-primary)`,
    [`${prefix}primary-color-hover`]: `var(${mybricksPrefix}color-primary-hover)`,
    [`${prefix}primary-color-active`]: `var(${mybricksPrefix}color-primary-active)`,
    [`${prefix}primary-color-outline`]: `var(${mybricksPrefix}color-primary-border)`,
    [`${prefix}primary-1`]: `var(${mybricksPrefix}color-primary-bg)`,
    [`${prefix}primary-2`]: `var(${mybricksPrefix}color-primary-bg-hover)`,
    [`${prefix}primary-3`]: `var(${mybricksPrefix}color-primary-border)`,
    [`${prefix}primary-4`]: `var(${mybricksPrefix}color-primary-border-hover)`,
    [`${prefix}primary-5`]: `var(${mybricksPrefix}color-primary-hover)`,
    [`${prefix}primary-6`]: `var(${mybricksPrefix}color-primary)`,
    [`${prefix}primary-7`]: `var(${mybricksPrefix}color-primary-active)`,
    // 废弃
    [`${prefix}primary-color-deprecated-pure`]: "",
    [`${prefix}primary-color-deprecated-l-35`]: "#cbe6ff",
    [`${prefix}primary-color-deprecated-l-20`]: "#7ec1ff",
    [`${prefix}primary-color-deprecated-t-20`]: "#46a6ff",
    [`${prefix}primary-color-deprecated-t-50`]: "#8cc8ff",
    [`${prefix}primary-color-deprecated-f-12`]: "rgba(24, 144, 255, 0.12)",
    [`${prefix}primary-color-active-deprecated-f-30`]:
      "rgba(230, 247, 255, 0.3)",
    [`${prefix}primary-color-active-deprecated-d-02`]: "#dcf4ff",

    [`${prefix}success-color`]: `var(${mybricksPrefix}color-success)`,
    [`${prefix}success-color-hover`]: `var(${mybricksPrefix}color-success-hover)`,
    [`${prefix}success-color-active`]: `var(${mybricksPrefix}color-success-active)`,
    [`${prefix}success-color-outline`]: `var(${mybricksPrefix}color-success-border)`,
    // 废弃
    [`${prefix}success-color-deprecated-bg`]: "#f6ffed",
    [`${prefix}success-color-deprecated-border`]: "#b7eb8f",

    [`${prefix}error-color`]: `var(${mybricksPrefix}color-error)`,
    [`${prefix}error-color-hover`]: `var(${mybricksPrefix}color-error-hover)`,
    [`${prefix}error-color-active`]: `var(${mybricksPrefix}color-error-active)`,
    [`${prefix}error-color-outline`]: `var(${mybricksPrefix}color-error-border)`,
    // 废弃
    [`${prefix}error-color-deprecated-bg`]: "#fff2f0",
    [`${prefix}error-color-deprecated-border`]: "#ffccc7",

    [`${prefix}warning-color`]: `var(${mybricksPrefix}color-warning)`,
    [`${prefix}warning-color-hover`]: `var(${mybricksPrefix}color-warning-hover)`,
    [`${prefix}warning-color-active`]: `var(${mybricksPrefix}color-warning-active)`,
    [`${prefix}warning-color-outline`]: `var(${mybricksPrefix}color-warning-border)`,
    // 废弃
    [`${prefix}warning-color-deprecated-bg`]: "#fffbe6",
    [`${prefix}warning-color-deprecated-border`]: "#ffe58f",

    [`${prefix}info-color`]: `var(${mybricksPrefix}color-info)`,
    // 废弃
    [`${prefix}info-color-deprecated-bg`]: "#e6f7ff",
    [`${prefix}info-color-deprecated-border`]: "#91d5ff",
  };
};
