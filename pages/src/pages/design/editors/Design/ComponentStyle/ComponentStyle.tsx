import React, { useContext, useState, useMemo, useEffect, useCallback, useRef, createContext } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { message, Collapse } from "antd5";
import { RightOutlined, InfoCircleOutlined } from "@ant-design/icons"
import API from "@mybricks/sdk-for-app/api";
import { EditorContext } from "../..";
import { AddIcon, EditTriggerButtonIcon, CloseIcon } from "../Components/Icons";
import { initThemeInfo } from "../utils";
import css from "./ComponentStyle.less";
import domToImage from 'dom-to-image'

/**
 * data => context.theme
 * component => designer.components
 */

let _comlibsCount = 0;
let _componentMetaMap = {};

const getComponentMetaMap = () => {
  if (_comlibsCount !== (window as any).__comlibs_edit_.length) {
    _comlibsCount = (window as any).__comlibs_edit_.length;
    const componentMetaMap = {};

    const traverseComAry = (comAry, npm) => {
      comAry.forEach((com) => {
        if (Array.isArray(com.comAray)) {
          traverseComAry(com.comAray, npm);
        } else {
          componentMetaMap[com.namespace] = com;
        }
      });
    }

    (window as any).__comlibs_edit_.forEach(({ id, namespace, comAray }) => {
      if (id && namespace) {
        traverseComAry(comAray, id);
      }
    })

    _componentMetaMap = componentMetaMap;

    return componentMetaMap;
  }

  return _componentMetaMap;
}

const uuid = () => {
  return `u_${Math.floor(Math.random() * 10000 * Date.now()).toString(36)}`;
}

/** 兼容处理老数据 */
const initThemes = (themes, allComponents) => {
  const allComponentsMap = allComponents.reduce((pre, cur) => {
    pre[cur.id] = cur;
    return pre;
  }, {})

  const result = [];
  const componentMetaMap = getComponentMetaMap();

  themes.forEach((theme) => {
    if (!theme.title || !theme.id) {
      if (theme.components.length) {
        result.push({
          ...theme,
          components: theme.components.map((component) => {
            return {
              ...component,
              status: allComponentsMap[component.themeId] ? 1 : -1, // 代表是否已在画布中被删除
            }
          }),
          id: uuid(),
          title: componentMetaMap[theme.namespace]?.title || "未命名",
        })
      }
    } else {
      result.push({
        ...theme,
        components: theme.components.map((component) => {
          return {
            ...component,
            status: allComponentsMap[component.themeId] ? 1 : -1, // 代表是否已在画布中被删除
          }
        }),
      })
    }
  })

  return result;
}

const ComponentStyleContext = createContext<any>({});

const ComponentStyle = () => {
  const { designer, context } = useContext(EditorContext);
  const [allComponents] = useState(() => traverse(designer.components.getAll()).reduce((f, s) => [...f, ...s], []));
  const [themes, setThemes] = useState(() => initThemes(context.theme.themes, allComponents));
  const [addCategoryContext, setAddCategoryContext] = useState(undefined);

  const { componentList } = useMemo(() => {
    const componentMetaMap = getComponentMetaMap();
    const componentList = [];
    const hash = {};
    allComponents.forEach((component) => {
      const namespace = component.def.namespace;
      if (!hash[namespace]) {
        hash[namespace] = true;
        componentList.push(componentMetaMap[namespace])
      }
    })
    return {
      componentList
    }
  }, [])
  const componentStyleContextValue = useMemo(() => {
    const allComponentsMap = allComponents.reduce((pre, cur) => {
      pre[cur.id] = cur;
      return pre;
    }, {})

    return { allComponents, allComponentsMap }
  }, [])

  useEffect(() => {
    context.theme.themes = themes;
    // console.log("[themes]", themes)
  }, [themes])

  const deleteTheme = useCallback((params) => {
    const nextThemes = themes.filter((theme) => {
      return theme.id !== params.id;
    })

    setThemes(nextThemes);
  }, [themes])

  return (
    <div className={css.componentStyle}>
      <div className={css.title}>
        <span>组件风格</span>
        <div className={css.operateContainer}>
          <button
            data-mybricks-tip={`{content:'添加分类',position:'left'}`}
            className={css.button}
            onClick={(e) => {
              const currentTarget = e.currentTarget;
              const rect = currentTarget.getBoundingClientRect();
              currentTarget.setAttribute("data-active", "true");
              setAddCategoryContext({
                onClose: () => {
                  currentTarget.removeAttribute("data-active");
                  setAddCategoryContext(undefined);
                },
                onOk: (params) => {
                  const { title, namespace } = params;
                  currentTarget.removeAttribute("data-active");
                  setAddCategoryContext(undefined);
                  setThemes((themes) => {
                    return themes.concat({
                      id: uuid(),
                      title,
                      namespace,
                      components: []
                    })
                  })
                },
                style: {
                  top: rect.bottom,
                  right: window.innerWidth - rect.right,
                  width: "fit-content",
                  minWidth: 100,
                },
                categoryList: componentList
              })
            }}
          >
            {AddIcon}
          </button>
          <div className={css.mask} />
        </div>
      </div>
      <ComponentStyleContext.Provider value={componentStyleContextValue}>
        <div className={css.content}>
          {themes.map((theme) => {
            return <ThemeItem key={theme.id} theme={theme} deleteTheme={deleteTheme} />
          })}
        </div>
      </ComponentStyleContext.Provider>
      <BasicDialog context={addCategoryContext}>
        {addCategoryContext && <AddCategory context={addCategoryContext} />}
      </BasicDialog>
    </div>
  )
}

const ThemeItem = (props) => {
  const { theme, deleteTheme } = props;
  const [form, setForm] = useState({
    title: theme.title
  });
  const [editContext, setEditContext] = useState(undefined);
  const [addStyleContext, setAddStyleContext] = useState(undefined);

  const { allComponentsMap } = useContext(ComponentStyleContext);

  const [components, setComponents] = useState(theme.components);

  const componentMetaMap = getComponentMetaMap();
  const com = componentMetaMap[theme.namespace];

  const deleteComponents = useCallback((params) => {
    const nextComponents = components.filter((component) => {
      return component.id !== params.id;
    })

    setComponents(nextComponents);

    theme.components = nextComponents;
  }, [components])

  const [expand, setExpand] = useState(true);

  return (
    <div className={classNames(css.themeItemContainer, {
      [css.themeItemContainerExpand]: expand
    })}>
      <div className={classNames(css.themeName, {
        [css.themeNameFocus]: editContext || addStyleContext
      })}>
        <div
          className={css.themeTitle}
          onClick={() => {
            setExpand((expand) => {
              return !expand;
            })
          }}
        >
          {<RightOutlined />}
          <span>
            {form.title}
          </span>
        </div>
        <div className={css.operate}>
          <div className={css.operateContainer}>
            <button
              data-mybricks-tip={`{content:'编辑',position:'left'}`}
              className={css.button}
              onClick={(e) => {
                const currentTarget = e.currentTarget;
                const rect = currentTarget.getBoundingClientRect();
                const componentMetaMap = getComponentMetaMap();
                const com = componentMetaMap[theme.namespace];
                currentTarget.setAttribute("data-active", "true");

                setEditContext({
                  type: "edit",
                  title: `编辑「${com.title}」分类`,
                  record: {
                    title: form.title,
                  },
                  theme,
                  style: {
                    top: rect.bottom - rect.height,
                    right: window.innerWidth - rect.right + rect.width,
                  },
                  onClose() {
                    currentTarget.removeAttribute("data-active");
                    setEditContext(undefined);
                  },
                  onOk(title) {
                    currentTarget.removeAttribute("data-active");
                    setEditContext(undefined);
                    theme.title = title;
                    setForm({ title })
                  }
                })
              }}
            >
              {EditTriggerButtonIcon}
            </button>
            <div className={css.mask} />
          </div>
          <div className={css.operateContainer}>
            <button
              data-mybricks-tip={`{content:'添加组件风格',position:'left'}`}
              className={css.button}
              onClick={(e) => {
                const currentTarget = e.currentTarget;
                const rect = currentTarget.getBoundingClientRect();

                currentTarget.setAttribute("data-active", "true");

                setAddStyleContext({
                  type: "add",
                  title: `添加「${form.title}」组件风格`,
                  namespace: com.namespace,
                  style: {
                    top: rect.bottom - rect.height,
                    right: window.innerWidth - rect.right + rect.width,
                  },
                  onClose() {
                    currentTarget.removeAttribute("data-active");
                    setAddStyleContext(undefined);
                  },
                  onOk(params) {
                    const id = uuid();
                    const component = {
                      id,
                      title: params.title,
                      namespace: com.namespace,
                      styleAry: allComponentsMap[params.themeId].model.css || [],
                      themeId: params.themeId,
                      previewUrl: params.previewImage,
                      isDefault: false,
                      status: 1,
                    }

                    theme.components.push(component);

                    setComponents(theme.components)

                    uploadUrl(allComponentsMap[params.themeId], (url) => {
                      if (params.themeId === component.themeId) {
                        component.previewUrl = url;
                        setComponents([...theme.components])
                      }
                    })

                    currentTarget.removeAttribute("data-active");
                    setAddStyleContext(undefined);
                  }
                })
              }}
            >
              {AddIcon}
            </button>
            <div className={css.mask} />
          </div>
        </div>
      </div>
      <div className={css.styleContainer}>
        {components.map((component) => {
          return (
            <Components
              key={component.id}
              component={component}
              com={com}
              allComponentsMap={allComponentsMap}
              deleteComponents={deleteComponents}
            />
          )
        })}
      </div>
      <BasicDialog context={editContext}>
        {editContext && <EditCategory context={editContext} deleteTheme={deleteTheme} />}
      </BasicDialog>
      <BasicDialog context={addStyleContext}>
        {addStyleContext && <AddStyle context={addStyleContext} />}
      </BasicDialog>
    </div>
  )
}

const Components = (props) => {
  const { component, com, allComponentsMap, deleteComponents } = props;
  const [addStyleContext, setAddStyleContext] = useState(undefined);

  const [form, setForm] = useState({
    title: component.title,
    previewUrl: component.previewUrl
  })

  useEffect(() => {
    if (component.previewUrl !== form.previewUrl) {
      setForm((form) => {
        return {
          ...form,
          previewUrl: component.previewUrl
        }
      })
    }
  }, [component.previewUrl])

  return (
    <div key={component.id} className={classNames(css.styleItem, {
      [css.styleItemFocus]: addStyleContext
    })}>
      <div className={css.theme}>
        <div className={css.preview}>
          <img src={form.previewUrl} />
        </div>
        <div className={css.title}>
          {form.title}{component.status === 1 ? null : <span data-mybricks-tip={`{content:'当前风格已从画布中删除，无法编辑，发布后仍可生效。',position:'left'}`}>（风格已删除）</span>}
        </div>
      </div>
      <div className={css.operate}>
        {component.status === 1 && <div className={css.operateContainer}>
          <button
            data-mybricks-tip={`{content:'编辑',position:'left'}`}
            className={css.button}
            onClick={(e) => {
              const currentTarget = e.currentTarget;
              const rect = currentTarget.getBoundingClientRect();
              currentTarget.setAttribute("data-active", "true");

              setAddStyleContext({
                type: "edit",
                title: `编辑「${component.title}」组件风格`,
                namespace: com.namespace,
                style: {
                  top: rect.bottom - rect.height,
                  right: window.innerWidth - rect.right + rect.width,
                },
                component,
                record: {
                  title: component.title,
                  themeId: component.themeId,
                  themeTitle: allComponentsMap[component.themeId].title,
                  previewImage: allComponentsMap[component.themeId].previewImage
                },
                onClose() {
                  currentTarget.removeAttribute("data-active");
                  setAddStyleContext(undefined);
                },
                setTitle(title) {
                  component.title = title;
                  setForm((form) => {
                    return {
                      ...form,
                      title
                    }
                  })
                },
                setTheme(themeId) {
                  component.themeId = themeId;
                  component.styleAry = allComponentsMap[themeId].model.css || [];

                  uploadUrl(allComponentsMap[themeId], (url) => {
                    if (themeId === component.themeId) {
                      component.previewUrl = url;
                      setForm((form) => {
                        return {
                          ...form,
                          previewUrl: url
                        }
                      })
                    }
                  })
                },
                onOk(params) {
                  component.title = params.title;
                  component.themeId = params.themeId;
                  component.styleAry = allComponentsMap[params.themeId].model.css || [];

                  setForm((form) => {
                    return {
                      ...form,
                      title: params.title
                    }
                  })

                  uploadUrl(allComponentsMap[params.themeId], (url) => {
                    if (params.themeId === component.themeId) {
                      component.previewUrl = url;
                      setForm((form) => {
                        return {
                          ...form,
                          previewUrl: url
                        }
                      })
                    }
                  })

                  currentTarget.removeAttribute("data-active");
                  setAddStyleContext(undefined);
                }
              })
            }}
          >
            {EditTriggerButtonIcon}
          </button>
          <div className={css.mask} />
        </div>}
        <div className={css.operateContainer}>
          <button
            data-mybricks-tip={`{content:'删除',position:'left'}`}
            className={css.button}
            onClick={(e) => {
              deleteComponents(component)
            }}
          >
            {CloseIcon}
          </button>
          <div className={css.mask} />
        </div>

      </div>
      {/* <div className={css.operateContainer}>
        <button
          data-mybricks-tip={`{content:'${component.status === 1 ? "编辑" : "删除"}',position:'left'}`}
          className={css.button}
          onClick={(e) => {
            if (component.status !== 1) {
              deleteComponents(component)
              return;
            }
            const currentTarget = e.currentTarget;
            const rect = currentTarget.getBoundingClientRect();
            currentTarget.setAttribute("data-active", "true");

            setAddStyleContext({
              type: "edit",
              title: `编辑「${component.title}」组件风格`,
              namespace: com.namespace,
              style: {
                top: rect.bottom - rect.height,
                right: window.innerWidth - rect.right + rect.width,
              },
              component,
              record: {
                title: component.title,
                themeId: component.themeId,
                themeTitle: allComponentsMap[component.themeId].title,
                previewImage: allComponentsMap[component.themeId].previewImage
              },
              onClose() {
                currentTarget.removeAttribute("data-active");
                setAddStyleContext(undefined);
              },
              setTitle(title) {
                component.title = title;
                setForm((form) => {
                  return {
                    ...form,
                    title
                  }
                })
              },
              setTheme(themeId) {
                component.themeId = themeId;
                component.styleAry = allComponentsMap[themeId].model.css || [];

                uploadUrl(allComponentsMap[themeId], (url) => {
                  if (themeId === component.themeId) {
                    component.previewUrl = url;
                  }
                })
              },
              onOk(params) {
                component.title = params.title;
                component.themeId = params.themeId;
                component.styleAry = allComponentsMap[params.themeId].model.css || [];

                setForm((form) => {
                  return {
                    ...form,
                    title: params.title
                  }
                })

                uploadUrl(allComponentsMap[params.themeId], (url) => {
                  if (params.themeId === component.themeId) {
                    component.previewUrl = url;
                    setForm((form) => {
                      return {
                        ...form,
                        previewUrl: url
                      }
                    })
                  }
                })

                currentTarget.removeAttribute("data-active");
                setAddStyleContext(undefined);
              }
            })
          }}
        >
          {component.status === 1 ? EditTriggerButtonIcon : CloseIcon}
        </button>
        <div className={css.mask} />
      </div> */}
      <BasicDialog context={addStyleContext}>
        {addStyleContext && <AddStyle context={addStyleContext} deleteComponents={deleteComponents} />}
      </BasicDialog>
    </div>
  )
}

const initThemeOptions = (params) => {
  const { namespace, allComponents } = params;
  const options = [];

  allComponents.forEach((component) => {
    if (component.def.namespace === namespace) {
      options.push({
        title: component.title,
        themeId: component.id,
        previewImage: component.previewImage
      })
    }
  })

  return options;
}

const AddStyle = (props) => {
  const { context, deleteComponents } = props;
  const { allComponents } = useContext(ComponentStyleContext);
  const [form, setForm] = useState({
    title: context.record?.title || "",
    _title: context.record?.title || "",
    themeId: context.record?.themeId || undefined,
    themeTitle: context.record?.themeTitle || "",
    _themeTitle: context.record?.themeTitle || "",
    previewImage: context.record?.previewImage || undefined,
  })
  const themeEditContainerRef = useRef<HTMLInputElement>(null);
  const inputThemeRef = useRef<HTMLInputElement>(null);

  const [themeSelectContext, setThemeSelectContext] = useState(undefined);

  const [defaultThemeOptions] = useState(() => initThemeOptions({ namespace: context.namespace, allComponents }));

  const [themeOptions, setThemeOptions] = useState(defaultThemeOptions)

  return (
    <>
      <div className={css.header}>
        <span>{context.title}</span>
        <button
          className={css.iconButton}
          onClick={context.onClose}
        >
          {CloseIcon}
        </button>
      </div>
      <div className={css.content}>
        <div className={css.edit}>
          <span>
            名称
          </span>
          <input
            className={css.input}
            placeholder="请输入风格名称"
            defaultValue={form.title}
            autoFocus
            onChange={(e) => {
              setForm((form) => {
                return {
                  ...form,
                  title: e.target.value
                }
              })
            }}
            onBlur={() => {
              if (context && context.type === "edit") {
                const title = form.title.trim();
                if (title && title !== form._title) {
                  context.setTitle(title)
                }
              }
            }}
          />
        </div>

        <div ref={themeEditContainerRef} className={css.edit}>
          <span>
            风格
          </span>
          <input
            ref={inputThemeRef}
            className={css.input}
            placeholder="请选择组件风格"
            value={form.themeTitle}
            // onChange={(e) => {
            //   setForm((form) => {
            //     return {
            //       ...form,
            //       themeTitle: e.target.value
            //     }
            //   })
            // }}
            onClick={(e) => {
              const currentTarget = e.currentTarget;
              const rect = currentTarget.getBoundingClientRect();
              currentTarget.setAttribute("data-active", "true");

              setThemeSelectContext({
                style: {
                  width: rect.width,
                  top: rect.bottom,
                  right: window.innerWidth - rect.right
                },
                onClose() {
                  currentTarget.removeAttribute("data-active");
                  setThemeSelectContext(undefined);
                },
                onSelect(option) {
                  currentTarget.removeAttribute("data-active");
                  setThemeSelectContext(undefined);
                  setForm((form) => {
                    return {
                      ...form,
                      themeId: option.themeId,
                      themeTitle: option.title,
                      _themeTitle: option.title,
                      previewImage: option.previewImage
                    }
                  })

                  if (context && context.type === "edit") {
                    context.setTheme(option.themeId);
                  }
                }
              })
            }}
          />
        </div>
      </div>
      {context.type === "add" ? <div className={css.footer}>
        <button onClick={() => {
          const title = form.title.trim();
          if (!title) {
            message.warning("请输入风格名称")
            return;
          }
          if (!form.themeId) {
            message.warning("请选择组件风格")
            return;
          }
          context.onOk({
            ...form,
            title
          });
        }}>
          添加
        </button>
      </div> : null
      // <div className={css.footer}>
      //   <button className={css.deleteButton} onClick={() => {
      //     deleteComponents(props.context.component)
      //   }}>
      //     删除
      //   </button>
      // </div>
      }
      <BasicDialog context={themeSelectContext} container={themeEditContainerRef.current}>
        {themeSelectContext && (
          <ThemeStyleSelect
            context={themeSelectContext}
            themeOptions={themeOptions}
          />
        )}
      </BasicDialog>
    </>
  )
}

const ThemeStyleSelect = (props) => {
  const { context, themeOptions } = props;
  return (
    <div className={css.themeStyleSelectContainer}>
      {themeOptions.length ? themeOptions.map((option) => {
        return (
          <div
            className={css.themeStyleSelectItem}
            onClick={() => context.onSelect(option)}
          >
            <img src={option.previewImage} />
            <span>{option.title}</span>
          </div>
        )
      }) : (
        <div className={css.empty}>
          请先在画布中添加组件
        </div>
      )}
    </div>
  )
}

const AddCategory = (props) => {
  const { context } = props;
  const { categoryList } = context;
  const componentMetaMap = getComponentMetaMap();
  const addCategoryContainerRef = useRef<HTMLDivElement>(null);
  const [createContext, setCreateContext] = useState(undefined);

  return (
    <div ref={addCategoryContainerRef} className={css.addCategoryContainer}>
      {categoryList.length ? categoryList.map((theme) => {
        const com = componentMetaMap[theme.namespace];
        return (
          <div
            className={css.category}
            onClick={(e) => {
              const currentTarget = e.currentTarget;
              const parentRect = addCategoryContainerRef.current.getBoundingClientRect();
              currentTarget.setAttribute("data-active", "true");

              setCreateContext({
                type: "add",
                title: `添加「${com.title}」分类`,
                style: {
                  top: parentRect.bottom - parentRect.height,
                  right: window.innerWidth - parentRect.right + parentRect.width,
                },
                onClose() {
                  currentTarget.removeAttribute("data-active");
                  setCreateContext(undefined);
                },
                onOk(title) {
                  context.onOk({
                    namespace: com.namespace,
                    title
                  })
                }
              })
            }}
          >
            {com.icon ? <img className={css.icon} src={com.icon} /> : <div className={css.icon} />}
            <span>{com.title}</span>
          </div>
        )
      }) : (
        <div className={css.empty}>
          请先在画布中添加组件
        </div>
      )}
      <BasicDialog context={createContext} container={addCategoryContainerRef.current}>
        {createContext && <EditCategory context={createContext} />}
      </BasicDialog>
    </div>
  )
}

const EditCategory = (props) => {
  const { context, deleteTheme } = props;
  const [form, setForm] = useState({
    title: context.record?.title || "",
    _title: context.record?.title || "",
  })

  return (
    <>
      <div className={css.header}>
        <span>{context.title}</span>
        <button
          className={css.iconButton}
          onClick={context.onClose}
        >
          {CloseIcon}
        </button>
      </div>
      <div className={css.content}>
        <div className={css.edit}>
          <span>
            名称
          </span>
          <input
            className={css.input}
            placeholder="请输入分类名称"
            defaultValue={form.title}
            autoFocus
            onChange={(e) => {
              setForm((form) => {
                return {
                  ...form,
                  title: e.target.value
                }
              })
            }}
            onBlur={() => {
              if (context && context.type === "edit") {
                const title = form.title.trim();
                if (title && title !== form._title) {
                  context.onOk(title)
                }
              }
            }}
          />
        </div>
      </div>
      {context.type === "add" ? <div className={css.footer}>
        <button onClick={() => {
          const title = form.title.trim();
          if (!title) {
            message.warning("请输入分类名称")
            return;
          }
          context.onOk(title)
        }}>
          添加
        </button>
      </div> : <div className={css.footer}>
        <button className={css.deleteButton} onClick={() => {
          deleteTheme(props.context.theme)
        }}>
          删除
        </button>
      </div>}
    </>
  )
}

export default ComponentStyle;

function traverse(slots) {
  return slots.map(({ comAry }) => {
    if (Array.isArray(comAry)) {
      return comAry.map((com) => {
        const { slots } = com
        if (Array.isArray(slots)) {
          return [com, ...traverse(slots).reduce((f, s) => [...f, ...s], [])]
        }
        return [com]
      })
    }

    return []
  }).reduce((f, s) => [...f, ...s], [])
}

const getNamespaceToAllMap = (pageComponents) => {
  const namespaceToAllMap = {}
  const namespaceMap = {}
  const notInPageNamespaceMap = {}

  pageComponents.forEach(({
    id,
    def: {
      title: defTitle,
      namespace
    },
    model: {
      css,
    },
    title,
    dom
  }) => {

    Reflect.deleteProperty(notInPageNamespaceMap, namespace)

    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
    }

    if (!namespaceToAllMap[namespace]) {
      namespaceToAllMap[namespace] = {
        title: defTitle,
        options: []
      }
    }

    if (css) {
      namespaceToAllMap[namespace].options.push({ label: title, value: id, dom })
    }
  })

  return namespaceToAllMap;
}

const BasicDialog = (props) => {
  const { context, children } = props;
  const ref = useRef<HTMLDivElement>();
  const clickCancel = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      context.onClose();
    }
  }, [context])
  useEffect(() => {
    if (context) {
      window.addEventListener('click', clickCancel, true);
    } else {
      window.removeEventListener('click', clickCancel, true);
    }
  }, [context])

  return createPortal((
    <div
      ref={ref}
      className={classNames(css.basicDialog, {
        [css.basicDialogShow]: context
      })}
      style={context?.style}
    >
      {/* {children} */}
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          container: ref.current
        })
      )}
    </div>
  ), props.container || document.body)
}

const uploadUrl = (config, next) => {
  if (!config?.dom) {
    return;
  }
  const dom = config.dom;
  const copyDom = dom.cloneNode(true)
  copyDom.style.top = '0px'
  copyDom.style.left = '0px'
  copyDom.style.right = '0px'
  copyDom.style.bottom = '0px'
  copyDom.style.position = 'relative'
  copyDom.style.width = dom.offsetWidth
  copyDom.style.height = dom.offsetHeight
  copyDom.style.zIndex = '-1'

  const domParent = dom.parentElement
  domParent.appendChild(copyDom)

  domToImage.toSvg(copyDom, {
    filter: (dom) => {
      const className = dom.className
      if (typeof className === 'string' && className.startsWith('append-')) {
        return false
      }
      return true
    }
  })
    .then((dataUrl) => {
      // const { id, styleAry } = themeIdToThemeMap[option.value]
      const id = config.id;
      const styleAry = config.model.css;
      let innerText = '';

      // 这里需要将变量转换为具体的值设置，否则生成svg后样式丢失，变量没必要写入svg
      const cssVarToValueMap = getCssVarToValueMap()

      styleAry?.forEach(({ css, selector, global }) => {
        if (selector === ':root') {
          selector = '> *:first-child'
        }
        if (Array.isArray(selector)) {
          selector.forEach((selector) => {
            innerText = innerText + getStyleInnerText({ id, css, selector, global, cssVarToValueMap })
          })
        } else {
          innerText = innerText + getStyleInnerText({ id, css, selector, global, cssVarToValueMap })
        }
      })

      API.Upload.toOss({
        content: dataUrl.replace('data:image/svg+xml;charset=utf-8,', '').replace(`<foreignObject`, `<style>${innerText}</style><foreignObject`),
        folderPath: '/theme_pack_app',
        fileName: `${uuid()}.svg`
      }).then((value: any) => {
        // result.previewUrl = value.url
        // message.destroy(messageKey)
        // setSaveLoading(false)
        // onOk(result)
        next(value.url)
      }).catch((error) => {
        // console.error('预览图上传失败: ', error)
        // setSaveLoading(false)
        // onOk(result)
      })
    })
    .catch((error) => {

    })
    .finally(() => {
      domParent.removeChild(copyDom)
    })
}

function getCssVarToValueMap() {
  const result = {}
  window['MYBRICKS_CSS_VARIABLE_LIST'].forEach(({ options }) => {
    options.forEach(({ value, resetValue }) => {
      result[value] = resetValue
    })
  })
  return result
}

function getStyleInnerText({ id, css, selector, global, cssVarToValueMap }) {
  return `
    ${global ? '' : `.${id} `}${selector.replace(/\{id\}/g, `${id}`)} {
      ${Object.keys(css).map(key => {
    let value = css[key]
    if (typeof value === 'string' && value.startsWith('var')) {
      const varValue = cssVarToValueMap[value]
      if (varValue) {
        value = varValue
      }
    }
    return `${convertCamelToHyphen(key)}: ${value}${/!important/.test(value) ? '' : '!important'};`
  }).join('\n')}
    }
  `
}

function convertCamelToHyphen(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
