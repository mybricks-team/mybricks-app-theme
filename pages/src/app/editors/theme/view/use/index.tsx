import React, {
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react'

import axios from 'axios'
import { message } from 'antd'

import { PlusOutlined } from '../compoments'

import { SET_MYBRICKS_CSS_VARIABLE_LIST } from '../../index'

import type { Data, ComTheme, RenderProps } from '../type'

import viewStyle from '../view.less'
import useStyle from './index.less'

interface UseViewProps extends RenderProps {
  data: {
    themes: Array<{
      title: string
      version: string
      namespace: string
      content: Data
    }>
  }
  sdk: {
    openUrl: any // @mybricks/sdk-for-app 提供
  }
}

// const DEFAULT_DATA = {} // 从toJSON里复制

export const UseView = ({sdk, data, themes: themesAPI, theme: themeAPI}: UseViewProps) => {
  const [themes, setThemes] = useState(data.themes)
  // const [themes, setThemes] = useState([{
  //   title: '1',
  //   version: '1.0.0',
  //   namespace: '1',
  //   content: DEFAULT_DATA
  // }])
  const [searchValue, setSearchValue] = useState('')

  useMemo(() => {
    console.log('主题插件: ', data)
  }, [])

  const onPlusClick = useCallback(() => {
    sdk.openUrl({
      url: 'MYBRICKS://mybricks-material/materialSelectorPage',
      params: {
	      title: '选择主题包',
        type: 'theme',
        // defaultSelected: data.themes
      },
      onSuccess: async ({ materials }) => {
        const res = await axios({
          url: '/api/material/theme/list',
          method: 'get',
          params: {
            themes: materials
          }
        })

        res.data.data.forEach((theme) => {
          const { title, version, namespace, content: stringContent } = theme
          const content = JSON.parse(stringContent)

          if (data.themes?.length) {
            message.success(`已添加 ${title} 主题包`)
          } else {
            message.success(`已将主题包替换为 ${title}`)
          }

          // TODO: 第一版，直接替换
          data.themes = [{
            title,
            version,
            namespace,
            content
          }]
        })

        if (!searchValue) {
          setThemes([...data.themes])
        } else {
          setThemes(() => {
            return data.themes.filter((theme) => theme.title.indexOf(searchValue) !== -1)
          })
        }
      }
    }) 
  }, [searchValue])

  const onSearchValueChange = useCallback((e) => {
    setSearchValue(e.target.value)
    const value = e.target.value.trim()
    if (!value) {
      setThemes(data.themes)
    } else {
      setThemes(() => {
        return data.themes.filter((theme) => theme.title.indexOf(value) !== -1)
      })
    }
  }, [])

  useEffect(() => {
    const comThemes: Array<ComTheme> = []

    themes.forEach(({content}) => {
      const { themes } = content

      themes.forEach(({ components }) => {
        comThemes.push(...components)
      })

      SET_MYBRICKS_CSS_VARIABLE_LIST({ data: content, theme: themeAPI })
    })

    themesAPI.setComThemes(comThemes)
  }, [themes])

  const configThemeList = useMemo(() => {
    return (
      <div className={useStyle.themeList}>
        {themes.map((theme) => {
          const { title, namespace } = theme
          return (
            <div key={namespace} className={useStyle.item}>
              <div>
                <div className={useStyle.left}>
                  <div className={useStyle.name}>
                    <span data-mybricks-tip={title}>{title}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }, [themes])

  return (
    <div className={viewStyle.view}>
      <div className={viewStyle.header}>
        主题包配置
      </div>
      <div className={useStyle.toolbar}>
        <div className={useStyle.search}>
          <input
            type={'text'}
            placeholder={'请输入名称搜索主题包'}
            onChange={onSearchValueChange}
          />
          <div className={useStyle.icon} data-mybricks-tip='添加主题包' onClick={onPlusClick}>
            {PlusOutlined}
          </div>
        </div>
      </div>
      {configThemeList}
    </div>
  )
}
