import React from 'react'

import { UseView, ConfigView } from './view'

const icon = <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5287' width='200' height='200'><path d='M512 51.2a460.8 460.8 0 0 0 0 921.6c78.5408 0 133.12-40.0384 139.264-102.4 2.3552-23.6544-6.5536-44.9536-15.1552-65.6384-14.336-34.5088-24.6784-59.4944 9.216-93.2864s73.5232-27.4432 119.7056-20.48c29.7984 4.5056 60.416 9.0112 89.1904 1.2288C929.5872 672.0512 972.8 606.208 972.8 512A461.312 461.312 0 0 0 512 51.2z m331.3664 601.9072c-20.48 5.5296-45.568 1.8432-71.68-2.2528-47.4112-7.0656-106.496-15.9744-154.7264 31.9488-53.4528 53.248-33.0752 102.4-18.1248 138.1376a105.2672 105.2672 0 0 1 12.1856 45.8752C604.672 927.1296 533.6064 931.84 512 931.84a419.84 419.84 0 1 1 419.84-419.84c0 43.6224-11.4688 120.1152-88.4736 141.1072z' p-id='5288' fill='#95999e'></path><path d='M235.52 512m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5289' fill='#95999e'></path><path d='M307.2 337.92m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5290' fill='#95999e'></path><path d='M471.04 245.76m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5291' fill='#95999e'></path><path d='M655.36 276.48m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5292' fill='#95999e'></path><path d='M778.24 419.84m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z' p-id='5293' fill='#95999e'></path></svg>

export const use = {
  name: '@mybricks/plugins/theme/use',
  namespace: '@mybricks/plugins/theme/use',
  title: '主题包',
  author: 'LiangLihao',
  ['author.zh']: '梁李昊',
  version: '1.0.0',
  description: '主题包',
  data: {}, // TODO
  contributes: {
    sliderView: {
      tab: {
        title: '主题包',
        icon,
        apiSet: ['component', 'themes'],
        render: (args) => {
          return <UseView {...args}/>
        }
      },
    }
  }
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
    themes: []
  },
  contributes: {
    sliderView: {
      tab: {
        title: '主题包配置',
        icon,
        apiSet: ['component', 'themes'],
        render: (args) => {
          return <ConfigView {...args}/>
        }
      },
    }
  },
  toJSON: ({data}) => {
    return {
      themes: JSON.parse(JSON.stringify(data.themes))
    }
  }
}
