export const DEFAULT_SYSTEM_ID = "mybricks@theme"
export const DEFAULT_CUSTOM_ID = "custom@theme"
export const MYBRICKS_PREFIXCLS = "mb";

export const DEFAULT_VARIABLES_TITLE = {
  [DEFAULT_SYSTEM_ID]: "系统",
  [DEFAULT_CUSTOM_ID]: "自定义"
}

export const DEFAULT_THEME = {
  "themes": [],
  "variables": [
    {
      "active": true,
      "key": "默认主题",
      "title": "默认主题",
      "variables": [
        {
          "id": DEFAULT_SYSTEM_ID,
          "title": DEFAULT_VARIABLES_TITLE[DEFAULT_SYSTEM_ID],
          "configs": [
            {
              "key": "--mb-color-primary",
              "value": "#1890ff",
              "name": "品牌色"
            },
            {
              "key": "--mb-color-primary-bg",
              "value": "#e6f7ff",
              "name": "主色浅色背景色"
            },
            {
              "key": "--mb-color-primary-bg-hover",
              "value": "#bae7ff",
              "name": "主色浅色背景悬浮态"
            },
            {
              "key": "--mb-color-primary-border",
              "value": "#91d5ff",
              "name": "主色描边色"
            },
            {
              "key": "--mb-color-primary-border-hover",
              "value": "#69c0ff",
              "name": "主色描边色悬浮态"
            },
            {
              "key": "--mb-color-primary-hover",
              "value": "#40a9ff",
              "name": "主色悬浮态"
            },
            {
              "key": "--mb-color-primary-active",
              "value": "#096dd9",
              "name": "主色激活态"
            },
            {
              "key": "--mb-color-primary-text-hover",
              "value": "#40a9ff",
              "name": "主色文本悬浮态"
            },
            {
              "key": "--mb-color-primary-text",
              "value": "#1890ff",
              "name": "主色文本"
            },
            {
              "key": "--mb-color-primary-text-active",
              "value": "#096dd9",
              "name": "主色文本激活态"
            },
            {
              "key": "--mb-color-error",
              "value": "#ff4d4f",
              "name": "错误色"
            },
            {
              "key": "--mb-color-error-bg",
              "value": "#fff2f0",
              "name": "错误色的浅色背景颜色"
            },
            {
              "key": "--mb-color-error-bg-hover",
              "value": "#fff1f0",
              "name": "错误色的浅色背景色悬浮态"
            },
            {
              "key": "--mb-color-error-border",
              "value": "#ffccc7",
              "name": "错误色的描边色"
            },
            {
              "key": "--mb-color-error-border-hover",
              "value": "#ffa39e",
              "name": "错误色的描边色悬浮态"
            },
            {
              "key": "--mb-color-error-hover",
              "value": "#ff7875",
              "name": "错误色的深色悬浮态"
            },
            {
              "key": "--mb-color-error-active",
              "value": "#d9363e",
              "name": "错误色的深色激活态"
            },
            {
              "key": "--mb-color-error-text-hover",
              "value": "#ff7875",
              "name": "错误色的文本悬浮态"
            },
            {
              "key": "--mb-color-error-text",
              "value": "#ff4d4f",
              "name": "错误色的文本默认态"
            },
            {
              "key": "--mb-color-error-text-active",
              "value": "#d9363e",
              "name": "错误色的文本激活态"
            },
            {
              "key": "--mb-color-warning",
              "value": "#faad14",
              "name": "警戒色"
            },
            {
              "key": "--mb-color-warning-bg",
              "value": "#fffbe6",
              "name": "警戒色的浅色背景颜色"
            },
            {
              "key": "--mb-color-warning-bg-hover",
              "value": "#fff1b8",
              "name": "警戒色的浅色背景色悬浮态"
            },
            {
              "key": "--mb-color-warning-border",
              "value": "#ffe58f",
              "name": "警戒色的描边色"
            },
            {
              "key": "--mb-color-warning-border-hover",
              "value": "#ffd666",
              "name": "警戒色的描边色悬浮态"
            },
            {
              "key": "--mb-color-warning-hover",
              "value": "#ffd666",
              "name": "警戒色的深色悬浮态"
            },
            {
              "key": "--mb-color-warning-active",
              "value": "#d48806",
              "name": "警戒色的深色激活态"
            },
            {
              "key": "--mb-color-warning-text-hover",
              "value": "#ffc53d",
              "name": "警戒色的文本悬浮态"
            },
            {
              "key": "--mb-color-warning-text",
              "value": "#faad14",
              "name": "警戒色的文本默认态"
            },
            {
              "key": "--mb-color-warning-text-active",
              "value": "#d48806",
              "name": "警戒色的文本激活态"
            },
            {
              "key": "--mb-color-success",
              "value": "#52c41a",
              "name": "成功色"
            },
            {
              "key": "--mb-color-success-bg",
              "value": "#f6ffed",
              "name": "成功色的浅色背景颜色"
            },
            {
              "key": "--mb-color-success-bg-hover",
              "value": "#d9f7be",
              "name": "成功色的浅色背景色悬浮态"
            },
            {
              "key": "--mb-color-success-border",
              "value": "#b7eb8f",
              "name": "成功色的描边色"
            },
            {
              "key": "--mb-color-success-border-hover",
              "value": "#95de64",
              "name": "成功色的描边色悬浮态"
            },
            {
              "key": "--mb-color-success-hover",
              "value": "#95de64",
              "name": "成功色的深色悬浮态"
            },
            {
              "key": "--mb-color-success-active",
              "value": "#389e0d",
              "name": "成功色的深色激活态"
            },
            {
              "key": "--mb-color-success-text-hover",
              "value": "#73d13d",
              "name": "成功色的文本悬浮态"
            },
            {
              "key": "--mb-color-success-text",
              "value": "#52c41a",
              "name": "成功色的文本默认态"
            },
            {
              "key": "--mb-color-success-text-active",
              "value": "#389e0d",
              "name": "成功色的文本激活态"
            },
            {
              "key": "--mb-color-info",
              "value": "#1890ff",
              "name": "信息色"
            },
            {
              "key": "--mb-color-info-bg",
              "value": "#e6f7ff",
              "name": "信息色的浅色背景颜色"
            },
            {
              "key": "--mb-color-info-bg-hover",
              "value": "#bae7ff",
              "name": "信息色的浅色背景色悬浮态"
            },
            {
              "key": "--mb-color-info-border",
              "value": "#91d5ff",
              "name": "信息色的描边色"
            },
            {
              "key": "--mb-color-info-border-hover",
              "value": "#69c0ff",
              "name": "信息色的描边色悬浮态"
            },
            {
              "key": "--mb-color-info-hover",
              "value": "#69c0ff",
              "name": "信息色的深色悬浮态"
            },
            {
              "key": "--mb-color-info-active",
              "value": "#096dd9",
              "name": "信息色的深色激活态"
            },
            {
              "key": "--mb-color-info-text-hover",
              "value": "#40a9ff",
              "name": "信息色的文本悬浮态"
            },
            {
              "key": "--mb-color-info-text",
              "value": "#1890ff",
              "name": "信息色的文本默认态"
            },
            {
              "key": "--mb-color-info-text-active",
              "value": "#096dd9",
              "name": "信息色的文本激活态"
            },
            {
              "key": "--mb-color-link",
              "value": "#1890ff",
              "name": "链接色"
            },
            {
              "key": "--mb-color-link-hover",
              "value": "#69c0ff",
              "name": "超链接悬浮颜色"
            },
            {
              "key": "--mb-color-link-active",
              "value": "#096dd9",
              "name": "超链接激活颜色"
            },
            {
              "key": "--mb-color-text-base",
              "value": "#000",
              "name": "基础文本色"
            },
            {
              "key": "--mb-color-text",
              "value": "rgba(0, 0, 0, 0.88)",
              "name": "一级文本色"
            },
            {
              "key": "--mb-color-text-secondary",
              "value": "rgba(0, 0, 0, 0.65)",
              "name": "二级文本色"
            },
            {
              "key": "--mb-color-text-tertiary",
              "value": "rgba(0, 0, 0, 0.45)",
              "name": "三级文本色"
            },
            {
              "key": "--mb-color-text-quaternary",
              "value": "rgba(0, 0, 0, 0.25)",
              "name": "四级文本色"
            },
            {
              "key": "--mb-color-bg-base",
              "value": "#fff",
              "name": "基础背景色"
            },
            {
              "key": "--mb-color-bg-container",
              "value": "#ffffff",
              "name": "组件容器背景色"
            },
            {
              "key": "--mb-color-bg-elevated",
              "value": "#ffffff",
              "name": "浮层容器背景色"
            },
            {
              "key": "--mb-color-bg-layout",
              "value": "#f5f5f5",
              "name": "布局背景色"
            },
            {
              "key": "--mb-color-bg-spotlight",
              "value": "rgba(0, 0, 0, 0.85)",
              "name": "引起注意的背景色"
            },
            {
              "key": "--mb-color-bg-mask",
              "value": "rgba(0, 0, 0, 0.45)",
              "name": "浮层的背景蒙层颜色"
            },
            {
              "key": "--mb-color-border",
              "value": "#d9d9d9",
              "name": "一级边框色"
            },
            {
              "key": "--mb-color-border-secondary",
              "value": "#f0f0f0",
              "name": "二级边框色"
            },
            {
              "key": "--mb-color-fill",
              "value": "rgba(0, 0, 0, 0.15)",
              "name": "一级填充色"
            },
            {
              "key": "--mb-color-fill-secondary",
              "value": "rgba(0, 0, 0, 0.06)",
              "name": "二级填充色"
            },
            {
              "key": "--mb-color-fill-tertiary",
              "value": "rgba(0, 0, 0, 0.04)",
              "name": "三级填充色"
            },
            {
              "key": "--mb-color-fill-quaternary",
              "value": "rgba(0, 0, 0, 0.02)",
              "name": "四级填充色"
            }
          ]
        },
        {
          "id": DEFAULT_CUSTOM_ID,
          "title": DEFAULT_VARIABLES_TITLE[DEFAULT_CUSTOM_ID],
          "configs": []
        }
      ]
    }
  ],
  "templates": []
}

export const SYSTEM_VARIABLE_NAME_MAP = {
  [`--${MYBRICKS_PREFIXCLS}-color-primary`]: "品牌色",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-bg`]: "主色浅色背景色",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-bg-hover`]: "主色浅色背景悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-border`]: "主色描边色",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-border-hover`]: "主色描边色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-hover`]: "主色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-active`]: "主色激活态",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-text-hover`]: "主色文本悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-text`]: "主色文本",
  [`--${MYBRICKS_PREFIXCLS}-color-primary-text-active`]: "主色文本激活态",

  [`--${MYBRICKS_PREFIXCLS}-color-error`]: "错误色",
  [`--${MYBRICKS_PREFIXCLS}-color-error-bg`]: "错误色的浅色背景颜色",
  [`--${MYBRICKS_PREFIXCLS}-color-error-bg-hover`]: "错误色的浅色背景色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-error-border`]: "错误色的描边色",
  [`--${MYBRICKS_PREFIXCLS}-color-error-border-hover`]: "错误色的描边色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-error-hover`]: "错误色的深色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-error-active`]: "错误色的深色激活态",
  [`--${MYBRICKS_PREFIXCLS}-color-error-text-hover`]: "错误色的文本悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-error-text`]: "错误色的文本默认态",
  [`--${MYBRICKS_PREFIXCLS}-color-error-text-active`]: "错误色的文本激活态",

  [`--${MYBRICKS_PREFIXCLS}-color-warning`]: "警戒色",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-bg`]: "警戒色的浅色背景颜色",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-bg-hover`]: "警戒色的浅色背景色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-border`]: "警戒色的描边色",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-border-hover`]: "警戒色的描边色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-hover`]: "警戒色的深色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-active`]: "警戒色的深色激活态",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-text-hover`]: "警戒色的文本悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-text`]: "警戒色的文本默认态",
  [`--${MYBRICKS_PREFIXCLS}-color-warning-text-active`]: "警戒色的文本激活态",

  [`--${MYBRICKS_PREFIXCLS}-color-success`]: "成功色",
  [`--${MYBRICKS_PREFIXCLS}-color-success-bg`]: "成功色的浅色背景颜色",
  [`--${MYBRICKS_PREFIXCLS}-color-success-bg-hover`]: "成功色的浅色背景色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-success-border`]: "成功色的描边色",
  [`--${MYBRICKS_PREFIXCLS}-color-success-border-hover`]: "成功色的描边色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-success-hover`]: "成功色的深色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-success-active`]: "成功色的深色激活态",
  [`--${MYBRICKS_PREFIXCLS}-color-success-text-hover`]: "成功色的文本悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-success-text`]: "成功色的文本默认态",
  [`--${MYBRICKS_PREFIXCLS}-color-success-text-active`]: "成功色的文本激活态",

  [`--${MYBRICKS_PREFIXCLS}-color-info`]: "信息色",
  [`--${MYBRICKS_PREFIXCLS}-color-info-bg`]: "信息色的浅色背景颜色",
  [`--${MYBRICKS_PREFIXCLS}-color-info-bg-hover`]: "信息色的浅色背景色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-info-border`]: "信息色的描边色",
  [`--${MYBRICKS_PREFIXCLS}-color-info-border-hover`]: "信息色的描边色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-info-hover`]: "信息色的深色悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-info-active`]: "信息色的深色激活态",
  [`--${MYBRICKS_PREFIXCLS}-color-info-text-hover`]: "信息色的文本悬浮态",
  [`--${MYBRICKS_PREFIXCLS}-color-info-text`]: "信息色的文本默认态",
  [`--${MYBRICKS_PREFIXCLS}-color-info-text-active`]: "信息色的文本激活态",

  [`--${MYBRICKS_PREFIXCLS}-color-link`]: "链接色",
  [`--${MYBRICKS_PREFIXCLS}-color-link-hover`]: "超链接悬浮颜色",
  [`--${MYBRICKS_PREFIXCLS}-color-link-active`]: "超链接激活颜色",

  [`--${MYBRICKS_PREFIXCLS}-color-text-base`]: "基础文本色",
  [`--${MYBRICKS_PREFIXCLS}-color-text`]: "一级文本色",
  [`--${MYBRICKS_PREFIXCLS}-color-text-secondary`]: "二级文本色",
  [`--${MYBRICKS_PREFIXCLS}-color-text-tertiary`]: "三级文本色",
  [`--${MYBRICKS_PREFIXCLS}-color-text-quaternary`]: "四级文本色",

  [`--${MYBRICKS_PREFIXCLS}-color-bg-base`]: "基础背景色",
  [`--${MYBRICKS_PREFIXCLS}-color-bg-container`]: "组件容器背景色",
  [`--${MYBRICKS_PREFIXCLS}-color-bg-elevated`]: "浮层容器背景色",
  [`--${MYBRICKS_PREFIXCLS}-color-bg-layout`]: "布局背景色",
  [`--${MYBRICKS_PREFIXCLS}-color-bg-spotlight`]: "引起注意的背景色",
  [`--${MYBRICKS_PREFIXCLS}-color-bg-mask`]: "浮层的背景蒙层颜色",

  [`--${MYBRICKS_PREFIXCLS}-color-border`]: "一级边框色",
  [`--${MYBRICKS_PREFIXCLS}-color-border-secondary`]: "二级边框色",

  [`--${MYBRICKS_PREFIXCLS}-color-fill`]: "一级填充色",
  [`--${MYBRICKS_PREFIXCLS}-color-fill-secondary`]: "二级填充色",
  [`--${MYBRICKS_PREFIXCLS}-color-fill-tertiary`]: "三级填充色",
  [`--${MYBRICKS_PREFIXCLS}-color-fill-quaternary`]: "四级填充色",
}
