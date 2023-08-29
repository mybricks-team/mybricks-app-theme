import { ThemeConfig, ThemeValue } from './types';

export const DEFAULT_COLOR_INDEX = 5;
// 颜色变量列表
export const ATND_COLOR_LIST = [
  {
    id: '--ant-primary-color',
    title: '主色'
  },
  {
    id: '--ant-primary-color-hover',
    title: '主色悬浮色',
  },
  {
    id: '--ant-primary-color-active',
    title: '主色激活态',
    colorListIndex: 6
  },
  {
    id: '--ant-primary-color-outline',
    title: '主色描边色',
    colorListIndex: 2
  },
  {
    id: '--ant-primary-1',
    title: '主色-1',
    colorListIndex: 0
  },
  {
    id: '--ant-primary-2',
    title: '主色-2',
  },
  {
    id: '--ant-primary-3',
    title: '主色-3',
  },
  {
    id: '--ant-primary-4',
    title: '主色-4',
  },
  {
    id: '--ant-primary-5',
    title: '主色-5',
  },
  {
    id: '--ant-primary-6',
    title: '主色-6',
  },
  {
    id: '--ant-primary-7',
    title: '主色-7',
  },
  {
    id: '--ant-success-color',
    title: '成功色',
  },
  {
    id: '--ant-success-color-hover',
    title: '成功色悬浮色',
  },
  {
    id: '--ant-success-color-active',
    title: '成功色激活态',
  },
  {
    id: '--ant-success-color-outline',
    title: '成功色描边色',
  },
  {
    id: '--ant-success-color-deprecated-bg',
    title: '成功色填充禁用色',
  },
  {
    id: '--ant-success-color-deprecated-border',
    title: '成功色描边禁用色',
  },
  {
    id: '--ant-warning-color',
    title: '警戒色',
  },
  {
    id: '--ant-warning-color-hover',
    title: '警戒色悬浮色',
  },
  {
    id: '--ant-warning-color-active',
    title: '警戒色激活态',
  },
  {
    id: '--ant-warning-color-outline',
    title: '警戒色描边色',
  },
  {
    id: '--ant-warning-color-deprecated-bg',
    title: '警戒色填充禁用色',
  },
  {
    id: '--ant-warning-color-deprecated-border',
    title: '警戒色描边禁用色',
  },
  {
    id: '--ant-error-color',
    title: '错误色',
  },
  {
    id: '--ant-error-color-hover',
    title: '错误色悬浮色',
  },
  {
    id: '--ant-error-color-active',
    title: '错误色激活态',
  },
  {
    id: '--ant-error-color-outline',
    title: '错误色描边色',
  },
  {
    id: '--ant-error-color-deprecated-bg',
    title: '错误色填充禁用色',
  },
  {
    id: '--ant-error-color-deprecated-border',
    title: '错误色描边禁用色',
  },
  {
    id: '--ant-info-color',
    title: '信息色',
  },
  {
    id: '--ant-info-color-deprecated-bg',
    title: '信息色填充禁用色',
  },
  {
    id: '--ant-info-color-deprecated-border',
    title: '信息色描边禁用色',
  },
];
// 尺寸变量列表
export const ATND_SIZE_LIST = [
  {
    id: '--ant-tabs-title-font-size'
  },
  {
    id: '--ant-tabs-card-tab-active-border-top'
  },
  {
    id: '--ant-menu-item-active-border-width'
  },
  {
    id: '--ant-menu-item-font-size'
  },
];
// 风格变量列表
export const ATND_STYLE_LIST = [
  {
    id: '--ant-border-radius-base',
  },
];
// 其他变量列表
export const ATND_OTHERS_LIST = [
];

const ColorCategory: ThemeConfig[] = [
  {
    id: 'Brand Color',
    title: '品牌色',
    items: [
      {
        id: '--ant-primary-color',
        title: '主色',
        isSeed: true,
        items: [
          {
            id: '--ant-primary-color-hover',
            title: '主色悬浮色',
            colorListIndex: 4,
          },
          {
            id: '--ant-primary-color-active',
            title: '主色激活态',
            colorListIndex: 6,
          },
          {
            id: '--ant-primary-color-outline',
            title: '主色描边色',
            colorListIndex: 2,
          },
          {
            id: '--ant-primary-1',
            title: '主色-1',
            colorListIndex: 0,
          },
          {
            id: '--ant-primary-2',
            title: '主色-2',
            colorListIndex: 1,
          },
          {
            id: '--ant-primary-3',
            title: '主色-3',
            colorListIndex: 2,
          },
          {
            id: '--ant-primary-4',
            title: '主色-4',
            colorListIndex: 3,
          },
          {
            id: '--ant-primary-5',
            title: '主色-5',
            colorListIndex: 4,
          },
          {
            id: '--ant-primary-6',
            title: '主色-6',
            colorListIndex: 5,
          },
          {
            id: '--ant-primary-7',
            title: '主色-7',
            colorListIndex: 6,
          },
        ]
      },
    ]
  },
  {
    id: 'Success Color',
    title: '成功色',
    items: [
      {
        id: '--ant-success-color',
        title: '成功色',
        isSeed: true,
        items: [
          {
            id: '--ant-success-color-hover',
            title: '成功色悬浮色',
            colorListIndex: 4,
          },
          {
            id: '--ant-success-color-active',
            title: '成功色激活态',
            colorListIndex: 6,
          },
          {
            id: '--ant-success-color-outline',
            title: '成功色描边色',
            colorListIndex: 2,
          },
          {
            id: '--ant-success-color-deprecated-bg',
            title: '成功色填充禁用色',
            colorListIndex: 0,
          },
          {
            id: '--ant-success-color-deprecated-border',
            title: '成功色描边禁用色',
            colorListIndex: 2,
          },
        ]
      },
    ]
  },
  {
    id: 'Warning Color',
    title: '警戒色',
    items: [
      {
        id: '--ant-warning-color',
        title: '警戒色',
        isSeed: true,
        items: [
          {
            id: '--ant-warning-color-hover',
            title: '警戒色悬浮色',
            colorListIndex: 4,
          },
          {
            id: '--ant-warning-color-active',
            title: '警戒色激活态',
            colorListIndex: 6,
          },
          {
            id: '--ant-warning-color-outline',
            title: '警戒色描边色',
            colorListIndex: 2,
          },
          {
            id: '--ant-warning-color-deprecated-bg',
            title: '警戒色填充禁用色',
            colorListIndex: 0,
          },
          {
            id: '--ant-warning-color-deprecated-border',
            title: '警戒色描边禁用色',
            colorListIndex: 2,
          },
        ]
      },
    ]
  },
  {
    id: 'Error Color',
    title: '错误色',
    items: [
      {
        id: '--ant-error-color',
        title: '错误色',
        isSeed: true,
        items: [
          {
            id: '--ant-error-color-hover',
            title: '错误色悬浮色',
            colorListIndex: 4,
          },
          {
            id: '--ant-error-color-active',
            title: '错误色激活态',
            colorListIndex: 6,
          },
          {
            id: '--ant-error-color-outline',
            title: '错误色描边色',
            colorListIndex: 2,
          },
          {
            id: '--ant-error-color-deprecated-bg',
            title: '错误色填充禁用色',
            colorListIndex: 0,
          },
          {
            id: '--ant-error-color-deprecated-border',
            title: '错误色描边禁用色',
            colorListIndex: 2,
          },
        ]
      },
    ]
  },
  {
    id: 'Info Color',
    title: '信息色',
    items: [
      {
        id: '--ant-info-color',
        title: '信息色',
        isSeed: true,
        items: [
          {
            id: '--ant-info-color-deprecated-bg',
            title: '信息色填充禁用色',
            colorListIndex: 0,
          },
          {
            id: '--ant-info-color-deprecated-border',
            title: '信息色描边禁用色',
            colorListIndex: 2,
          },
        ]
      },
    ]
  },
  {
    id: 'Neutral Color',
    title: '中性色',
    items: [
    ]
  },
];

const SizeCategory: ThemeConfig[] = [
];

const StyleCategory: ThemeConfig[] = [
  {
    id: 'Border',
    title: '边框',
    items: [
      // {
      //   id: '--ant-border-radius-base',
      //   title: '圆角',
      // },
    ]
  },
];
const OthersCategory: ThemeConfig[] = [];

export const ThemeCategory: ThemeConfig[] = [
  {
    id: 'Color',
    title: '颜色',
    items: ColorCategory
  },
  {
    id: 'Size',
    title: '尺寸',
    items: SizeCategory
  },
  {
    id: 'Style',
    title: '风格',
    items: StyleCategory
  },
  {
    id: 'Others',
    title: '其他',
    items: OthersCategory
  }
]

// 主题中默认的变量值
export const ATND_DEFAULT_THEME: ThemeValue[] = [
  {
    id: 'Color',
    title: '颜色',
    value: {
      '--ant-primary-color': '#1890ff',
      '--ant-primary-color-hover': '#40a9ff',
      '--ant-primary-color-active': '#096dd9',
      '--ant-primary-color-outline': '#91d5ff',
      '--ant-primary-1': '#e6f7ff',
      '--ant-primary-2': '#bae7ff',
      '--ant-primary-3': '#91d5ff',
      '--ant-primary-4': '#69c0ff',
      '--ant-primary-5': '#40a9ff',
      '--ant-primary-6': '#1890ff',
      '--ant-primary-7': '#096dd9',
      '--ant-primary-color-deprecated-pure': '',
      '--ant-primary-color-deprecated-l-35': '#cbe6ff',
      '--ant-primary-color-deprecated-l-20': '#7ec1ff',
      '--ant-primary-color-deprecated-t-20': '#46a6ff',
      '--ant-primary-color-deprecated-t-50': '#8cc8ff',
      '--ant-primary-color-deprecated-f-12': 'rgba(24, 144, 255, 0.12)',
      '--ant-primary-color-active-deprecated-f-30': 'rgba(230, 247, 255, 0.3)',
      '--ant-primary-color-active-deprecated-d-02': '#dcf4ff',
      '--ant-success-color': '#52c41a',
      '--ant-success-color-hover': '#73d13d',
      '--ant-success-color-active': '#389e0d',
      '--ant-success-color-outline': '"#b7eb8f"',
      '--ant-success-color-deprecated-bg': '#f6ffed',
      '--ant-success-color-deprecated-border': '#b7eb8f',
      '--ant-error-color': '#ff4d4f',
      '--ant-error-color-hover': '#ff7875',
      '--ant-error-color-active': '#d9363e',
      '--ant-error-color-outline': '#ffccc7',
      '--ant-error-color-deprecated-bg': '#fff2f0',
      '--ant-error-color-deprecated-border': '#ffccc7',
      '--ant-warning-color': '#faad14',
      '--ant-warning-color-hover': '#ffc53d',
      '--ant-warning-color-active': '#d48806',
      '--ant-warning-color-outline': '#ffe58f',
      '--ant-warning-color-deprecated-bg': '#fffbe6',
      '--ant-warning-color-deprecated-border': '#ffe58f',
      '--ant-info-color': '#1890ff',
      '--ant-info-color-deprecated-bg': '#e6f7ff',
      '--ant-info-color-deprecated-border': '#91d5ff'
    }
  },
  {
    id: 'Size',
    title: '尺寸',
    value: {
      // '--ant-tabs-title-font-size': '14px',
      // '--ant-tabs-card-tab-active-border-top': '2px solid transparent',
      // '--ant-menu-item-active-border-width': '3px'
    }
  },
  {
    id: 'Style',
    title: '风格',
    value: {
      // '--ant-border-radius-base': '2px',
    }
  },
];