import React, { useMemo } from 'react'

import { UseView, ConfigView } from './view'

const icon = <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5287' width='20' height='20'><path d='M512 51.2a460.8 460.8 0 0 0 0 921.6c78.5408 0 133.12-40.0384 139.264-102.4 2.3552-23.6544-6.5536-44.9536-15.1552-65.6384-14.336-34.5088-24.6784-59.4944 9.216-93.2864s73.5232-27.4432 119.7056-20.48c29.7984 4.5056 60.416 9.0112 89.1904 1.2288C929.5872 672.0512 972.8 606.208 972.8 512A461.312 461.312 0 0 0 512 51.2z m331.3664 601.9072c-20.48 5.5296-45.568 1.8432-71.68-2.2528-47.4112-7.0656-106.496-15.9744-154.7264 31.9488-53.4528 53.248-33.0752 102.4-18.1248 138.1376a105.2672 105.2672 0 0 1 12.1856 45.8752C604.672 927.1296 533.6064 931.84 512 931.84a419.84 419.84 0 1 1 419.84-419.84c0 43.6224-11.4688 120.1152-88.4736 141.1072z' p-id='5288' fill='#95999e'></path><path d='M235.52 512m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5289' fill='#95999e'></path><path d='M307.2 337.92m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5290' fill='#95999e'></path><path d='M471.04 245.76m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5291' fill='#95999e'></path><path d='M655.36 276.48m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5292' fill='#95999e'></path><path d='M778.24 419.84m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5293' fill='#95999e'></path></svg>

import type { ComTheme, RenderProps, Data } from './view/type'

export const use = ({sdk}) => {
  return {
    name: '@mybricks/plugins/theme/use',
    namespace: '@mybricks/plugins/theme/use',
    title: '主题包',
    author: 'LiangLihao',
    ['author.zh']: '梁李昊',
    version: '1.0.0',
    description: '主题包',
    data: {
      themes: []
    },
    contributes: {
      sliderView: {
        tab: {
          title: '主题包',
          icon,
          apiSet: ['component', 'themes', 'theme'],
          render: (args) => {
            return <UseView {...args} sdk={sdk}/>
          }
        },
      }
    },
    activate(props) {
      const { data, theme: themeAPI, themes: themesAPI } = props
      /**
       * TODO
       * 1. 目前默认支持antd样式，后续直接手动配置JSON？
       * 2. variables 给个默认值（不配置死）
       * 3. 后续全局配置分 系统自带、组件库配置，当前仅配置系统自带
       */
      if (!data.themes.length) {
        const variables = GET_DEFAULT_VARIABLES({ theme: themeAPI})

        SET_MYBRICKS_CSS_VARIABLE_LIST({ data: { variables, themes: [] }, theme: themeAPI})
      } else {

        const comThemes: Array<ComTheme> = []

        data.themes.forEach(({content}) => {
          const { themes } = content

          themes.forEach(({ components }) => {
            comThemes.push(...components)
          })

          SET_MYBRICKS_CSS_VARIABLE_LIST({ data: content, theme: themeAPI })
        })

        themesAPI.setComThemes(comThemes)
      }
    },
    toJSON: ({data}) => {
      // 没数据没关系，应用本来就配置了默认样式，直接返回即可
      return JSON.parse(JSON.stringify(data))
    },
  }
}

interface ConfigViewProps extends RenderProps {
  data: Data
}

export const config = {
  name: '@mybricks/plugins/theme/config',
  namespace: '@mybricks/plugins/theme/config',
  title: '主题包配置',
  author: 'LiangLihao',
  ['author.zh']: '梁李昊',
  version: '1.0.0',
  description: '主题包配置',
  data: {
    themes: [],
    variables: []
  },
  contributes: {
    sliderView: {
      tab: {
        title: '主题包配置',
        icon,
        apiSet: ['component', 'themes', 'theme'],
        render: (args) => {
          return <ConfigView {...args}/>
        }
      },
    }
  },
  toJSON: ({data}) => {
    return JSON.parse(JSON.stringify(data))
  },
  activate(props: ConfigViewProps) {
    const { data, theme: themeAPI } = props
    const { variables } = data
    /**
     * TODO
     * 1. 目前默认支持antd样式，后续直接手动配置JSON？
     * 2. variables 给个默认值（不配置死）
     * 3. 后续全局配置分 系统自带、组件库配置，当前仅配置系统自带
     */
    if (!variables.length) {
      const variables = GET_DEFAULT_VARIABLES({ theme: themeAPI})
      data.variables = variables
    }

    SET_MYBRICKS_CSS_VARIABLE_LIST(props)
  }
}

function GET_DEFAULT_VARIABLES ({ theme: themeAPI }) {
  const variables = []
  const mybricksConfigs: Data['variables'][0]['configs'] = []

  MYBRICKS_VARIABLE_CSS_CONFIG.forEach(({ id, title, items }) => {
    mybricksConfigs.push({
      // id,
      // name: `${title}-默认`,
      key: id,
      value: MYBRICKS_VARIABLE_CSS[id]
    })

    if (Array.isArray(items)) {
      items.forEach(({ id, title: childTitle }) => {
        mybricksConfigs.push({
          // id,
          // name: `${title}-${childTitle}`,
          key: id,
          value: MYBRICKS_VARIABLE_CSS[id]
        })
      })
    }
  })

  variables.push({
    id: 'mybricks@theme',
    configs: mybricksConfigs
  })

  const antdConfigs: Data['variables'][0]['configs'] = []

  Object.entries(ANTD_VARIABLE_CSS).forEach(([ key, value ]) => {
    antdConfigs.push({
      // id: key,
      // name: key,
      key,
      value
    })
  })

  variables.push({
    id: 'antd@4.x',
    configs: antdConfigs
  })
  
  Object.entries(ANTD_VARIABLE_CSS).forEach(([ key, value ]) => {
    themeAPI.set(key, value)
  })

  // TODO
  variables.push({
    id: 'custom@theme',
    configs: []
  })

  return variables
}

export function SET_MYBRICKS_CSS_VARIABLE_LIST ({ data, theme: themeAPI }: { data: Data, theme: RenderProps['theme']}) {
  const { variables } = data
  
  const MYBRICKS_CSS_VARIABLE_LIST = []

  const mybricksConfig = variables.find(({ id }) => id === 'mybricks@theme').configs.reduce(( obj, item ) => {
    obj[item.key] = item.value
    return obj
  }, {})

  MYBRICKS_VARIABLE_CSS_CONFIG.forEach(({ id, title, items }, index) => {
    const resetValue = mybricksConfig[id]
    const options = [{
      label: `${title}-默认`,
      value: `var(${id})`,
      resetValue
    }]

    MYBRICKS_CSS_VARIABLE_LIST[index] = {
      title,
      options
    }

    themeAPI.set(id, resetValue)

    if (Array.isArray(items)) {
      items.forEach(({ id, title: childTitle }) => {
        const resetValue = mybricksConfig[id]
        options.push({
          label: `${title}-${childTitle}`,
          value: `var(${id})`,
          resetValue
        })

        themeAPI.set(id, resetValue)
      })
    }
  })

  const customConfigs = variables.find(({ id }) => id === 'custom@theme').configs
  const options = []
  MYBRICKS_CSS_VARIABLE_LIST.push({
    title: '自定义',
    options
  })
  customConfigs.forEach(({ name, key, value }) => {
    options.push({
      label: name,
      value: `var(${key})`,
      resetValue: value
    })
    themeAPI.set(key, value)
  })

  window.MYBRICKS_CSS_VARIABLE_LIST = MYBRICKS_CSS_VARIABLE_LIST
}

const MYBRICKS_VARIABLE_PREFIX = 'mybricks'
const MYBRICKS_VAR_PREFIX = `--${MYBRICKS_VARIABLE_PREFIX}-`

export const MYBRICKS_VARIABLE_CSS = {
  // 主色
  [`${MYBRICKS_VAR_PREFIX}primary-color`]: '#1890ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-hover`]: '#40a9ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active`]: '#096dd9',
  [`${MYBRICKS_VAR_PREFIX}primary-color-outline`]: 'rgba(24,144,255,0.2)',
  [`${MYBRICKS_VAR_PREFIX}primary-1`]: '#e6f7ff',
  [`${MYBRICKS_VAR_PREFIX}primary-2`]: '#bae7ff',
  [`${MYBRICKS_VAR_PREFIX}primary-3`]: '#91d5ff',
  [`${MYBRICKS_VAR_PREFIX}primary-4`]: '#69c0ff',
  [`${MYBRICKS_VAR_PREFIX}primary-5`]: '#40a9ff',
  [`${MYBRICKS_VAR_PREFIX}primary-6`]: '#1890ff',
  [`${MYBRICKS_VAR_PREFIX}primary-7`]: '#096dd9',
  // 主色废弃
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-35`]: '#cbe6ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-20`]: '#7ec1ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-20`]: '#46a6ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-50`]: '#8cc8ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-f-12`]: 'rgba(24,144,255,0.12)',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-f-30`]: 'rgba(230,247,255,0.3)',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-d-02`]: '#dcf4ff',
  // 成功
  [`${MYBRICKS_VAR_PREFIX}success-color`]: '#52c41a',
  [`${MYBRICKS_VAR_PREFIX}success-color-hover`]: '#73d13d',
  [`${MYBRICKS_VAR_PREFIX}success-color-active`]: '#389e0d',
  [`${MYBRICKS_VAR_PREFIX}success-color-outline`]: 'rgba(82,196,26,0.2)',
  // 成功废弃
  [`${MYBRICKS_VAR_PREFIX}success-color-deprecated-bg`]: '#f6ffed',
  [`${MYBRICKS_VAR_PREFIX}success-color-deprecated-border`]: '#b7eb8f',
  // 错误
  [`${MYBRICKS_VAR_PREFIX}error-color`]: '#ff4d4f',
  [`${MYBRICKS_VAR_PREFIX}error-color-hover`]: '#ff7875',
  [`${MYBRICKS_VAR_PREFIX}error-color-active`]: '#d9363e',
  [`${MYBRICKS_VAR_PREFIX}error-color-outline`]: 'rgba(255,77,79,0.2)',
  // 错误废弃
  [`${MYBRICKS_VAR_PREFIX}error-color-deprecated-bg`]: '#fff2f0',
  [`${MYBRICKS_VAR_PREFIX}error-color-deprecated-border`]: '#ffccc7',
  // 警告
  [`${MYBRICKS_VAR_PREFIX}warning-color`]: '#faad14',
  [`${MYBRICKS_VAR_PREFIX}warning-color-hover`]: '#ffc53d',
  [`${MYBRICKS_VAR_PREFIX}warning-color-active`]: '#d48806',
  [`${MYBRICKS_VAR_PREFIX}warning-color-outline`]: 'rgba(250,173,20,0.2)',
  // 警告废弃
  [`${MYBRICKS_VAR_PREFIX}warning-color-deprecated-bg`]: '#fffbe6',
  [`${MYBRICKS_VAR_PREFIX}warning-color-deprecated-border`]: '#ffe58f',
  // 信息
  [`${MYBRICKS_VAR_PREFIX}info-color`]: '#1890ff',
  // 信息废弃
  [`${MYBRICKS_VAR_PREFIX}info-color-deprecated-bg`]: '#e6f7ff',
  [`${MYBRICKS_VAR_PREFIX}info-color-deprecated-border`]: '#91d5ff',
}

export const MYBRICKS_VARIABLE_CSS_CONFIG = [
  {
    id: `${MYBRICKS_VAR_PREFIX}primary-color`,
    title: '主色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-color-hover`,
        title: '悬停',
        colorListIndex: 4
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-color-active`,
        title: '激活',
        colorListIndex: 6
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-color-outline`,
        title: '轮廓线',
        colorListIndex: 2
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-1`,
        title: '主色-1',
        colorListIndex: 0
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-2`,
        title: '主色-2',
        colorListIndex: 1
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-3`,
        title: '主色-3',
        colorListIndex: 2
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-4`,
        title: '主色-4',
        colorListIndex: 3
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-5`,
        title: '主色-5',
        colorListIndex: 4
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-6`,
        title: '主色-6',
        colorListIndex: 5
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-7`,
        title: '主色-7',
        colorListIndex: 6
      },
      // 废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-35`,
      //   title: 'l-35'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-20`,
      //   title: 'l-20'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-20`,
      //   title: 't-20'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-50`,
      //   title: 't-50'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-f-12`,
      //   title: 'f-12'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-f-30`,
      //   title: 'f-30'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-d-02`,
      //   title: 'd-02'
      // }
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}success-color`,
    title: '成功色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}success-color-hover`,
        title: '悬停',
        colorListIndex: 4,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}success-color-active`,
        title: '激活',
        colorListIndex: 6,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}success-color-outline`,
        title: '轮廓线',
        colorListIndex: 2,
      },
      // 废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}success-color-deprecated-bg`,
      //   title: '背景'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}success-color-deprecated-border`,
      //   title: '边框',
      // }
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}error-color`,
    title: '错误色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}error-color-hover`,
        title: '悬停',
        colorListIndex: 4,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}error-color-active`,
        title: '激活',
        colorListIndex: 6,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}error-color-outline`,
        title: '轮廓线',
        colorListIndex: 2,
      },
      // 错误废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}error-color-deprecated-bg`,
      //   title: '背景',
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}error-color-deprecated-border`,
      //   title: '边框',
      // },
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}warning-color`,
    title: '警告色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}warning-color-hover`,
        title: '悬停',
        colorListIndex: 4,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}warning-color-active`,
        title: '激活',
        colorListIndex: 6,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}warning-color-outline`,
        title: '轮廓线',
        colorListIndex: 2,
      },
      // 警告废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}warning-color-deprecated-bg`,
      //   title: '背景',
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}warning-color-deprecated-border`,
      //   title: '边框',
      // },
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}info-color`,
    title: '信息色',
    // items: [
    //   // 信息废弃
    //   {
    //     id: `${MYBRICKS_VAR_PREFIX}info-color-deprecated-bg`,
    //     title: '背景'
    //   },
    //   {
    //     id: `${MYBRICKS_VAR_PREFIX}info-color-deprecated-border`,
    //     title: '边框',
    //   }
    // ]
  }
]

const ANTD_VARIABLE_CSS = {
  '--ant-primary-color': `var(${MYBRICKS_VAR_PREFIX}primary-color)`,
  '--ant-primary-color-hover': `var(${MYBRICKS_VAR_PREFIX}primary-color-hover)`,
  '--ant-primary-color-active': `var(${MYBRICKS_VAR_PREFIX}primary-color-active)`,
  '--ant-primary-color-outline': `var(${MYBRICKS_VAR_PREFIX}primary-color-outline)`,
  '--ant-primary-1': `var(${MYBRICKS_VAR_PREFIX}primary-1)`,
  '--ant-primary-2': `var(${MYBRICKS_VAR_PREFIX}primary-2)`,
  '--ant-primary-3': `var(${MYBRICKS_VAR_PREFIX}primary-3)`,
  '--ant-primary-4': `var(${MYBRICKS_VAR_PREFIX}primary-4)`,
  '--ant-primary-5': `var(${MYBRICKS_VAR_PREFIX}primary-5)`,
  '--ant-primary-6': `var(${MYBRICKS_VAR_PREFIX}primary-6)`,
  '--ant-primary-7': `var(${MYBRICKS_VAR_PREFIX}primary-7)`,
  // 废弃
  '--ant-primary-color-deprecated-l-35': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-35)`,
  '--ant-primary-color-deprecated-l-20': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-20)`,
  '--ant-primary-color-deprecated-t-20': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-20)`,
  '--ant-primary-color-deprecated-t-50': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-50)`,
  '--ant-primary-color-deprecated-f-12': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-f-12)`,
  '--ant-primary-color-active-deprecated-f-30': `var(${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-f-30)`,
  '--ant-primary-color-active-deprecated-d-02': `var(${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-d-02)`,
  // '--ant-primary-color-deprecated-l-35': '#cbe6ff',
  // '--ant-primary-color-deprecated-l-20': '#7ec1ff',
  // '--ant-primary-color-deprecated-t-20': '#46a6ff',
  // '--ant-primary-color-deprecated-t-50': '#8cc8ff',
  // '--ant-primary-color-deprecated-f-12': 'rgba(24,144,255,0.12)',
  // '--ant-primary-color-active-deprecated-f-30': 'rgba(230,247,255,0.3)',
  // '--ant-primary-color-active-deprecated-d-02': '#dcf4ff',
  '--ant-success-color': `var(${MYBRICKS_VAR_PREFIX}success-color)`,
  '--ant-success-color-hover': `var(${MYBRICKS_VAR_PREFIX}success-color-hover)`,
  '--ant-success-color-active': `var(${MYBRICKS_VAR_PREFIX}success-color-active)`,
  '--ant-success-color-outline': `var(${MYBRICKS_VAR_PREFIX}success-color-outline)`,
  // 废弃
  '--ant-success-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}success-color-deprecated-bg)`,
  '--ant-success-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}success-color-deprecated-border)`,
  // '--ant-success-color-deprecated-bg': '#f6ffed',
  // '--ant-success-color-deprecated-border': '#b7eb8f',
  '--ant-error-color': `var(${MYBRICKS_VAR_PREFIX}error-color)`,
  '--ant-error-color-hover': `var(${MYBRICKS_VAR_PREFIX}error-color-hover)`,
  '--ant-error-color-active': `var(${MYBRICKS_VAR_PREFIX}error-color-active)`,
  '--ant-error-color-outline': `var(${MYBRICKS_VAR_PREFIX}error-color-outline)`,
  // 废弃
  '--ant-error-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}error-color-deprecated-bg)`,
  '--ant-error-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}error-color-deprecated-border)`,
  // '--ant-error-color-deprecated-bg': '#fff2f0',
  // '--ant-error-color-deprecated-border': '#ffccc7',
  '--ant-warning-color': `var(${MYBRICKS_VAR_PREFIX}warning-color)`,
  '--ant-warning-color-hover': `var(${MYBRICKS_VAR_PREFIX}warning-color-hover)`,
  '--ant-warning-color-active': `var(${MYBRICKS_VAR_PREFIX}warning-color-active)`,
  '--ant-warning-color-outline': `var(${MYBRICKS_VAR_PREFIX}warning-color-outline)`,
  // 废弃
  '--ant-warning-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}warning-color-deprecated-bg)`,
  '--ant-warning-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}warning-color-deprecated-border)`,
  // '--ant-warning-color-deprecated-bg': '#fffbe6',
  // '--ant-warning-color-deprecated-border': '#ffe58f',
  '--ant-info-color': `var(${MYBRICKS_VAR_PREFIX}info-color)`,
  // 废弃
  '--ant-info-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}info-color-deprecated-bg)`,
  '--ant-info-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}info-color-deprecated-border)`,
  // '--ant-info-color-deprecated-bg': '#e6f7ff',
  // '--ant-info-color-deprecated-border': '#91d5ff',

  '--antd-wave-shadow-color': 'var(--ant-primary-color)'
}

export default function ThemeEditor ({ editConfig, designer, context }) {

  const themeContext = useMemo(() => {
    const { themes, components } = designer
    const { popView } = editConfig

    return {
      get data() {
        return context.theme
      },
      theme: {
        get: themes.getCSSVar,
        set: themes.setCSSVar
      },
      themes: {
        setComThemes: themes.setComThemes
      },
      component: {
        getAll: components.getAll
      },
      popView
    }
  }, [])

  useMemo(() => {
    const data = themeContext.data
    const { variables } = data

    /**
     * TODO
     * 1. 目前默认支持antd样式，后续直接手动配置JSON？
     * 2. variables 给个默认值（不配置死）
     * 3. 后续全局配置分 系统自带、组件库配置，当前仅配置系统自带
     */
    if (!variables.length) {
      const variables = GET_DEFAULT_VARIABLES({ theme: themeContext.theme})
      data.variables = variables
    }

    SET_MYBRICKS_CSS_VARIABLE_LIST(themeContext)
  }, [])


  return (
    <ConfigView {...themeContext}/>
  )
}
