import React, { useRef, useEffect, useState, useMemo, useCallback, useContext, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { Table, ColorPicker, ConfigProvider, message } from "antd5";
import validateColor from "validate-color";
import tc from 'tinycolor2';
import { AddIcon, CloseIcon, PaletteIcon, EditTriggerButtonIcon } from "../../Components";
import { SYSTEM_VARIABLE_NAME_MAP, PRESET_COLORS, MYBRICKS_PREFIXCLS } from "./constants";
import { initRandomCssVariable, handleThemeChange } from "../../utils";
import css from "./Dialog.less";

/**
 * [TODO] setTimeout
 */

interface DialogProps {
  open: boolean;
  designer: {
    components: {
      // 获取页面内所有组件
      getAll: () => any[]
    }
    themes: {
      // 设置组件风格
      // setComThemes: (comThemes: Array<ComTheme>) => void

      // 设置css变量
      setCSSVar: (key: string, value: string) => void

      // 清除css变量
      removeCSSVar: (key: string) => void

      // 一次性清除所有css变量
      clearCSSVar: () => void

      // 获取css变量值
      getCSSVar: (key: string) => string
    }
  };
  context: {
    theme: {
      templates: any;
      themes: any;
      variables: Array<{
        active: boolean;
        key: string;
        title: string;
        variables: Array<{
          id: string
          configs: Array<{
            name?: string
            key: string
            value: string
          }>
        }>
      }>
    }
  };
  onClose: () => void;
}
const Dialog = (props: DialogProps) => {
  const { open } = props;
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
    }
  }, [open])

  return render && <Modal {...props} />
}

export default Dialog;

const initSwitchList = (params) => {
  const { context } = params;
  const titleMap = {
    "mybricks@theme": "系统",
    "custom@theme": "自定义"
  }

  return context.theme.variables[0].variables.map(({ id, configs }, index) => {
    const show = index ? false : true;
    return {
      title: titleMap[id],
      key: id,
      variableCount: configs.length,
      show,
      active: show,
      height: id === "mybricks@theme" ? 300 : 260
    }
  })
}

const initThemeList = (params) => {
  const { context } = params;

  return context.theme.variables.map(({ key, title }) => {
    return {
      key,
      title
    }
  })
}

const initDefaultActiveThemeKey = (params) => {
  const { context } = params;

  return context.theme.variables.find(({ active }) => {
    return active
  }).key
}

const LOCAL_DIALOG_STYLE_KEY = "MYBRICKS_LOCAL_DIALOG_STYLE_KEY";

const getLocalDialogStyle = () => {
  const style = localStorage.getItem(LOCAL_DIALOG_STYLE_KEY)
  return style ? JSON.parse(style) : null
}

const ActiveThemeKeyContext = React.createContext<any>({});

const ModalContext = React.createContext<any>({});

const useDrag = (domRef) => {
  const position = useRef({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    // rect: null
    width: 0,
    height: 0
  });

  const onMouseDown = (e: React.MouseEvent) => {
    const div = domRef.current;
    if (!div) return;
    position.current = {
      x: e.clientX,
      y: e.clientY,
      left: div.offsetLeft,
      top: div.offsetTop,
      // rect: div.getBoundingClientRect()
      width: div.offsetWidth,
      height: div.offsetHeight,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const div = domRef.current;
    if (!div) return;
    const dx = e.clientX - position.current.x;
    const dy = e.clientY - position.current.y;

    let left = position.current.left + dx;
    let top = position.current.top + dy;

    // [TODO] 碰撞检测

    if (left < 0) {
      left = 0
    }
    if (top < 0) {
      top = 0
    }

    if (left + position.current.width > window.innerWidth) {
      left = window.innerWidth - position.current.width;
    }
    if (top + position.current.height > window.innerHeight) {
      top = window.innerHeight - position.current.height;
    }

    div.style.left = left + "px";
    div.style.top = top + "px";
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return {
    onMouseDown
  }
}

const useResize = (domRef, onChange?) => {
  const start = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 });
  const directionRef = useRef("right-bottom");

  const onMouseDown = (direction: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const dom = domRef.current;
    if (!dom) return;
    directionRef.current = direction;
    start.current = {
      x: e.clientX,
      y: e.clientY,
      width: dom.offsetWidth,
      height: dom.offsetHeight,
      left: dom.offsetLeft,
      top: dom.offsetTop,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const dom = domRef.current;
    if (!dom) return;
    let dx = e.clientX - start.current.x;
    let dy = e.clientY - start.current.y;
    let { width, height, left, top } = start.current;
    let newWidth = width, newHeight = height, newLeft = left, newTop = top;

    // 右侧
    if (directionRef.current.includes("right")) {
      newWidth = Math.max(300, width + dx);
      if (newLeft + newWidth > window.innerWidth) newWidth = window.innerWidth - newLeft;
    }
    // 左侧
    if (directionRef.current.includes("left")) {
      newWidth = Math.max(300, width - dx);
      newLeft = left + dx;
      if (newLeft < 0) {
        newWidth += newLeft; // 减去超出的部分
        newLeft = 0;
      }
    }
    // 下侧
    if (directionRef.current.includes("bottom")) {
      newHeight = Math.max(200, height + dy);
      if (newTop + newHeight > window.innerHeight) newHeight = window.innerHeight - newTop;
    }
    // 上侧
    if (directionRef.current.includes("top")) {
      newHeight = Math.max(200, height - dy);
      newTop = top + dy;
      if (newTop < 0) {
        newHeight += newTop;
        newTop = 0;
      }
    }

    dom.style.width = newWidth + "px";
    dom.style.height = newHeight + "px";
    dom.style.left = newLeft + "px";
    dom.style.top = newTop + "px";

    onChange?.({
      height: newHeight
    });
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return {
    onRightResize: onMouseDown("right"),
    onLeftResize: onMouseDown("left"),
    onBottomResize: onMouseDown("bottom"),
    onTopResize: onMouseDown("top"),
    onRightBottomResize: onMouseDown("right-bottom"),
    onLeftBottomResize: onMouseDown("left-bottom"),
    onRightTopResize: onMouseDown("right-top"),
    onLeftTopResize: onMouseDown("left-top"),
  };
}

class TableBodyHeightCallBack {
  _callBack

  constructor(private _containerRef) {}

  setCallBack(callBack) {
    this._callBack = callBack
    callBack({
      height: this._containerRef.current.offsetHeight
    })
  }

  runCallBack(style) {
    this._callBack(style)
  }
}

const Modal = (props: DialogProps) => {
  const { open, context, onClose, designer, } = props;
  const [editVariableContext, setEditVariableContext] = useState(undefined);
  const [editThemeContext, setEditThemeContext] = useState(undefined);
  const [switchList, setSwitchList] = useState(() => initSwitchList({ context }));
  const [themeList, setThemeList] = useState(() => initThemeList({ context }));
  const [activeThemeKey, setActiveThemeKey] = useState(() => initDefaultActiveThemeKey({ context }));
  const columnsMap = useMemo(() => {
    return {
      variableName: {
        title: "名称",
        dataIndex: "_variableName",
        key: "_variableName",
        width: 221,
        fixed: "left",
        render: (value, record) => {
          return (
            <TableColumnName
              value={value}
              record={record}
              setEditVariableContext={setEditVariableContext}
              themeChange={themeChange}
            />
          )
        }
      },
      addTheme: {
        title: () => {
          return (
            <div className={css.tableColumnAddTheme}>
              <div className={css.operateContainer}>
                <button
                  className={css.button}
                  style={{ opacity: 1 }}
                  data-mybricks-tip={`{content:'添加主题',position:'bottom'}`}
                  onClick={(e) => {
                    const currentTarget = e.currentTarget;
                    currentTarget.setAttribute("data-active", "true");
                    const rect = currentTarget.getBoundingClientRect();
                    setEditThemeContext({
                      type: "add",
                      title: "添加主题",
                      onClose: () => {
                        currentTarget.removeAttribute("data-active");
                        setEditThemeContext(undefined);
                      },
                      onOk: (params) => {
                        context.theme.variables = context.theme.variables.concat([{
                          active: false,
                          key: params.title,
                          title: params.title,
                          variables: JSON.parse(JSON.stringify(context.theme.variables[0].variables))
                        }]);
                        currentTarget.removeAttribute("data-active");
                        setEditThemeContext(undefined);
                        setThemeList(initThemeList({ context }));
                      },
                      style: {
                        top: rect.bottom,
                        left: rect.left - 280 + rect.width
                      }
                    })
                  }}
                >
                  {AddIcon}
                </button>
                <div className={css.mask} />
              </div>
            </div>
          )
        },
        dataIndex: "_operate",
        key: "_operate",
        width: 40,
        fixed: "right",
      }
    }
  }, [])

  const themeChange = useCallback(() => {
    setTimeout(() => {
      handleThemeChange({ designer, context, mybricksPrefixCls: MYBRICKS_PREFIXCLS })
    }, 0)
  }, [])

  const tableColumns = useMemo(() => {
    const tableColumns = [];
    const lastIndex = themeList.length - 1;

    themeList.forEach(({ key, title }, index) => {
      tableColumns.push({
        title: () => {
          return (
            <TableColumnTitle
              title={title}
              themeKey={key}
              themeChange={themeChange}
              context={context}
              setEditThemeContext={setEditThemeContext}
              variable={context.theme.variables[index]}
              setThemeList={() => {
                setThemeList(initThemeList({ context }));
              }}
            />
          )
        },
        dataIndex: key,
        key,
        width: lastIndex === index ? null : 150,
        render: (value, record) => {
          return <TableColumnColor value={value} record={record} valueKey={key} themeChange={themeChange} />
        },
      })
    })

    return [columnsMap.variableName, ...tableColumns, columnsMap.addTheme];
  }, [themeList]);

  const addVariable = useCallback(() => {
    const active = switchList.find(({ active }) => active);
    context.theme.variables.forEach(({ variables }) => {
      const variable = variables.find(({ id }) => id === active.key);
      variable.configs.push(initRandomCssVariable())
    })

    setSwitchList(switchList.map((switchItem) => {
      return {
        ...switchItem,
        variableCount: switchItem.active ? switchItem.variableCount + 1 : switchItem.variableCount
      }
    }))

    themeChange()
  }, [switchList])

  const deleteVariable = useCallback((record) => {
    setEditVariableContext(undefined);

    const active = switchList.find(({ active }) => active);
    const originalObject = record._originalObject[Object.keys(record._originalObject)[0]];

    context.theme.variables.forEach(({ variables }) => {
      const variable = variables.find(({ id }) => id === active.key);
      const index = variable.configs.findIndex(({ key }) => key === originalObject.key);
      variable.configs.splice(index, 1);
    })

    setSwitchList(switchList.map((switchItem) => {
      return {
        ...switchItem,
        variableCount: switchItem.active ? switchItem.variableCount - 1 : switchItem.variableCount
      }
    }))

    themeChange()
  }, [switchList])

  const deleteTheme = useCallback((record) => {
    let deleteVariable;
    const variables = context.theme.variables.filter((variable) => {
      if (variable.key !== record.key) {
        return true;
      }
      deleteVariable = variable;
      return false;
    });

    if (deleteVariable.active) {
      variables[0].active = true;
    }

    context.theme.variables = variables;
    setEditThemeContext(undefined);
    setThemeList(initThemeList({ context }));
    themeChange();
  }, [])

  const divRef = useRef<HTMLDivElement>(null);
  const { onMouseDown } = useDrag(divRef);
  const modalContext = useRef({
    height: 300,
    tableBodyHeightCallBack: new TableBodyHeightCallBack(divRef)
  });
  const {
    onRightBottomResize,
    onRightResize,
    onBottomResize
  } = useResize(divRef, (style) => {
    modalContext.current.tableBodyHeightCallBack.runCallBack(style);
  });

  useLayoutEffect(() => {
    /**
     * [TODO]
     * 1. 根据浏览器窗口大小计算初始值宽高
     * 2. 记录宽高xy等信息
     * 3. 有记录情况下，如果宽高超出浏览器窗口，回到第一步
     */
    let style = getLocalDialogStyle()

    if (!style) {
      style = {}
      // 初始化样式
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;

      // const width = innerWidth * 0.8;
      // const height = innerHeight * 0.5

      const width = 1000;
      const height = 380;

      style.width = width;
      style.height = height;

      style.left = (innerWidth - width) / 2;
      style.top = (innerHeight - height) / 2;

    } else {

    }

    const div = divRef.current;

    Object.entries(style).forEach(([key, value]) => {
      div.style[key] = value + "px"
    })
  }, [])
  
  return createPortal((
    <ConfigProvider
      prefixCls="mb"
    >
      <div
        ref={divRef}
        className={classNames(css.dialog, {
          [css.dialogShow]: open
        })}
      >
        <div className={css.contents}>
          <div
            className={css.header}
            onMouseDown={onMouseDown}
          >
            <div className={css.sidebar}>
              变量
            </div>
            <div className={css.operate}>
              <button
                className={css.iconButton}
                onClick={onClose}
              >
                {CloseIcon}
              </button>
            </div>
          </div>
          <div className={css.body}>
            <div className={css.sidebar}>
              {switchList.map(({ title, variableCount, active, key }) => {
                return (
                  <div
                    key={key}
                    className={classNames(css.switch, {
                      [css.focus]: active
                    })}
                    onClick={() => {
                      setSwitchList((switchList) => {
                        return switchList.map((switchItem) => {
                          return {
                            ...switchItem,
                            show: switchItem.show || switchItem.key === key,
                            active: switchItem.key === key
                          }
                        })
                      })
                    }}
                  >
                    <span className={css.title}>
                      {title}
                    </span>
                    <span className={css.count}>
                      {variableCount}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className={css.content}>
              <div className={css.table}>
                <ModalContext.Provider value={modalContext}>
                  <ActiveThemeKeyContext.Provider
                    value={{
                      activeThemeKey,
                      setActiveThemeKey
                    }}
                  >
                    {switchList.map((switchItem) => {
                      if (!switchItem.show) {
                        return null
                      }

                      return (
                        <VariableTable
                          tableColumns={tableColumns}
                          switchItem={switchItem}
                          context={context}
                          addVariable={addVariable}
                        />
                      )
                    })}
                  </ActiveThemeKeyContext.Provider>
                </ModalContext.Provider>
              </div>
              {switchList[1].active && switchList[1].variableCount ? (
                <div
                  className={css.addVariable}
                  onClick={addVariable}
                >
                  {AddIcon}
                  <span>创建变量</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -6,
            width: "100%",
            height: 8,
            cursor: "ns-resize",
            zIndex: 10,
            background: "transparent",
          }}
          onMouseDown={onBottomResize}
        />
        <div
          style={{
            position: "absolute",
            right: -6,
            top: 0,
            width: 8,
            height: "100%",
            cursor: "ew-resize",
            zIndex: 10,
            background: "transparent",
          }}
          onMouseDown={onRightResize}
        />
        <div
          style={{
            position: "absolute",
            right: -6,
            bottom: -6,
            width: 16,
            height: 16,
            cursor: "nwse-resize",
            zIndex: 10,
            background: "transparent",
          }}
          onMouseDown={onRightBottomResize}
        />
      </div>
      <BasicDialog context={editVariableContext}>
        <EditVariable
          theme={context.theme}
          context={editVariableContext}
          themeChange={themeChange}
          deleteVariable={deleteVariable}
        />
      </BasicDialog>
      <BasicDialog context={editThemeContext}>
        {editThemeContext && <EditTheme
          theme={context.theme}
          context={editThemeContext}
          themeChange={themeChange}
          deleteTheme={deleteTheme}
          setActiveThemeKey={setActiveThemeKey}
        />}
      </BasicDialog>
    </ConfigProvider>
  ), document.body);
}

const TableColumnTitle = (props) => {
  const { setThemeList } = props;

  const { activeThemeKey } = useContext(ActiveThemeKeyContext);

  const [form, setForm] = useState({
    title: props.variable.title,
    _title: props.variable.title,
  })
  const [context] = useState({
    editThemeOpen: false
  })

  const [editAble, setEditAble] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);
  const clickCancel = useCallback((e) => {
    if (containerRef.current && !containerRef.current.contains(e.target) && !context.editThemeOpen) {
      setEditAble(false)
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', clickCancel, true);

    if (editAble) {
      window.addEventListener('click', clickCancel, true);
    } else {
      window.removeEventListener('click', clickCancel, true);
    }

    return () => {
      if (editAble) {
        window.removeEventListener('click', clickCancel, true);
      }
    }
  }, [editAble])

  return (
    <div
      ref={containerRef}
      className={classNames(css.tableColumnTitle, {
        [css.tableColumnTitleEditAble]: editAble,
      })}
      onClick={() => {
        if (!editAble) {
          inputRef.current.select();
          setEditAble(true);
        } else {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }}
    >
      {activeThemeKey === props.variable.title && <div className={css.active}></div>}
      <input
        ref={inputRef}
        placeholder="请输入主题名称"
        value={form.title}
        onChange={(e) => {
          const newTitle = e.target.value.trim();
          if (props.context.theme.variables.find(({ title }) => title === newTitle) && newTitle !== props.variable.title) {
            message.warning("已存在相同主题名称，请修改后重试")
          }
          setForm((form) => {
            return {
              ...form,
              title: e.target.value.trim()
            }
          })
        }}
        onBlur={() => {
          if (!form.title) {
            setForm((form) => {
              return {
                ...form,
                title: form._title
              }
            })
          } else {
            if (props.context.theme.variables.find(({ title }) => title === form.title) && form.title !== props.variable.title) {
              setForm((form) => {
                return {
                  ...form,
                  title: form._title,
                }
              })
            } else {
              props.variable.title = form.title;
              props.variable.key = form.title;
              setForm((form) => {
                return {
                  ...form,
                  _title: form.title
                }
              })
              setTimeout(() => {
                setThemeList();
              }, 0);
            }
          }
        }}
      />

      <div className={css.operate}>
        <div className={css.operateContainer}>
          <div
            className={css.button}
            data-mybricks-tip={`{content:'编辑',position:'bottom'}`}
            onClick={(e) => {
              e.stopPropagation();
              context.editThemeOpen = true;
              setEditAble(true);
              const currentTarget = e.currentTarget;
              currentTarget.setAttribute("data-active", "true");
              const rect = currentTarget.getBoundingClientRect();
              props.setEditThemeContext({
                type: "edit",
                title: "编辑主题",
                record: {
                  title: props.variable.title,
                  key: props.variable.key,
                  active: props.variable.active
                },
                setTitle: (title) => {
                  props.variable.title = title;
                  props.variable.key = title;
                  setForm({
                    title,
                    _title: title
                  })
                },
                onClose: () => {
                  context.editThemeOpen = false;
                  setEditAble(false);
                  currentTarget.removeAttribute("data-active");
                  props.setEditThemeContext(undefined);
                  setTimeout(() => {
                    setThemeList();
                  }, 0)
                },
                style: {
                  top: rect.bottom,
                  left: rect.left - 280 + rect.width
                }
              })
            }}
          >
            {EditTriggerButtonIcon}
          </div>
          <div
            className={css.mask}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      </div>
    </div>
  )
}

/** 弹窗类封装 */
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

/** 添加主题 */
const EditTheme = (props) => {
  const { context, theme, deleteTheme, setActiveThemeKey } = props;
  const [form, setForm] = useState({
    title: context.record?.title || "",
    _title: context.record?.title || "",
    active: context.record?.active || false
  })

  return (
    <>
      <div className={css.header}>
        <span>{context?.title}</span>
        <button
          className={css.iconButton}
          onClick={context?.onClose}
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
            placeholder="请输入主题名称"
            value={form.title}
            onChange={(e) => {
              const newTitle = e.target.value.trim();
              if (context.type === "add") {
                if (theme.variables.find(({ title }) => title === newTitle)) {
                  message.warning("已存在相同主题名称，请修改后重试")
                }
              } else if (context.type === "edit") {
                if (theme.variables.find(({ title }) => title === newTitle) && newTitle !== context.record.title) {
                  message.warning("已存在相同主题名称，请修改后重试")
                }
              }
              setForm((form) => {
                return {
                  ...form,
                  title: e.target.value.trim()
                }
              })
            }}
            onBlur={() => {
              if (!context) {
                return
              }
              if (!form.title) {
                setForm((form) => {
                  return {
                    ...form,
                    title: form._title
                  }
                })
              } else {
                if (context.type === "edit") {
                  if (theme.variables.find(({ title }) => title === form.title) && form.title !== context.record.title) {
                    message.warning("已存在相同主题唯一标识，请修改后重试")
                    setForm((form) => {
                      return {
                        ...form,
                        title: form._title,
                        key: form._title
                      }
                    })
                    return;
                  }
                  context.setTitle(form.title);
                }
                setForm((form) => {
                  return {
                    ...form,
                    _title: form.title
                  }
                })
              }
            }}
          />
        </div>
        {context.type === "edit" && <div className={css.edit}>
          <span>
            设为默认主题
          </span>
          <div className={css.setDefaultTheme}>
            <button
              data-active={form.active}
              onClick={() => {
                if (!form.active) {
                  setForm((form) => {
                    return {
                      ...form,
                      active: true
                    }
                  })
                  setActiveThemeKey(form.title);
                  theme.variables.forEach((variable) => {
                    variable.active = variable.key === form.title;
                  })
                  props.themeChange();
                }
              }}
            >
              {form.active ? "已设置" : "设置"}
            </button>
          </div>
        </div>}
      </div>
      {context?.type === "edit" && theme.variables.length > 1 ? <div className={css.footer}>
        <button
          className={css.deleteButton}
          onClick={() => deleteTheme(context.record)}
        >
          删除
        </button>
      </div> : null}
      {context?.type === "add" ? <div className={css.footer}>
        <button onClick={() => {
          if (!form.title) {
            message.warning("请输入主题名称")
            return
          } else if (theme.variables.find(({ title }) => title === form.title)) {
            message.warning("已存在相同主题名称，请修改后重试")
            return
          }
          context.onOk(form)
        }}>
          添加
        </button>
      </div> : null}
    </>
  )
}

/** 变量编辑 */
const EditVariable = (props) => {
  const { context, themeChange, deleteVariable } = props;
  const [form, setForm] = useState({
    variableName: "",
    cssKey: "",
    _variableName: "",
    _cssKey: "",
  })

  useEffect(() => {
    if (context) {
      const { record } = context;
      setForm({
        variableName: record._variableName,
        cssKey: record._cssKey,
        _variableName: record._variableName,
        _cssKey: record._cssKey
      })
    }
  }, [context])

  const ref = useRef();

  return (
    <>
      <div className={css.header} ref={ref}>
        <span>编辑</span>
        <button
          className={css.iconButton}
          onClick={context?.onClose}
        >
          {CloseIcon}
        </button>
      </div>
      {!context?.record._isSystem ? (
        <div className={css.content}>
          <div className={css.edit}>
            <span>
              名称
            </span>
            <input
              className={css.input}
              placeholder="请输入变量名称"
              value={form.variableName}
              onChange={(e) => {
                setForm((form) => {
                  return {
                    ...form,
                    variableName: e.target.value.trim()
                  }
                })
              }}
              onBlur={() => {
                if (!context) {
                  return
                }
                if (!form.variableName) {
                  setForm((form) => {
                    return {
                      ...form,
                      variableName: form._variableName
                    }
                  })
                } else {
                  setForm((form) => {
                    return {
                      ...form,
                      _variableName: form.variableName
                    }
                  })
                  context.record._state.setName(form.variableName);
                  Object.entries(context.record._originalObject).forEach(([, value]: any) => {
                    value.name = form.variableName;
                  })
                  themeChange()
                }
              }}
            />
          </div>
          <div className={css.edit}>
            <span>
              css变量
            </span>
            <input
              className={css.input}
              placeholder="请按css变量规范输入(例: --xxx-xx)"
              value={form.cssKey}
              onChange={(e) => {
                setForm((form) => {
                  return {
                    ...form,
                    cssKey: e.target.value.trim()
                  }
                })
              }}
              onBlur={() => {
                if (!context) {
                  return
                }
                if (!form.cssKey) {
                  setForm((form) => {
                    return {
                      ...form,
                      cssKey: form._cssKey
                    }
                  })
                } else {
                  setForm((form) => {
                    return {
                      ...form,
                      _cssKey: form.cssKey
                    }
                  })
                  Object.entries(context.record._originalObject).forEach(([, value]: any) => {
                    value.key = form.cssKey;
                  })
                  themeChange();
                }
              }}
            />
          </div>
        </div>
      ) : null}
      <div className={css.content}>
        <div className={css.editContainerTitle}>变量值</div>
        {context?.record._object.map(({ title, key }) => {
          return (
            <div className={css.edit}>
              <span>
                {title}
              </span>
              <div className={css.color}>
                <EditorColor
                  value={context?.record._originalObject[key].value}
                  record={context?.record}
                  getPopupContainer={() => ref.current}
                  valueKey={key}
                  themeChange={themeChange}
                />
              </div>
            </div>
          )
        })}
      </div>
      {!context?.record._isSystem ? <div className={css.footer}>
        <button
          className={css.deleteButton}
          onClick={() => {
            deleteVariable(context.record)
          }}
        >
          删除
        </button>
      </div> : null}
    </>
  )
}

/** 变量表格 */
const VariableTable = (props) => {
  const { switchItem, context, tableColumns, addVariable } = props;
  const { active, variableCount, key, height } = switchItem;

  const modalContext = useContext(ModalContext)

  const { tableDataSource } = useMemo(() => {
    const { variables } = context.theme
    const dataSource = [];
    const isSystem = key === "mybricks@theme";

    variables.forEach((variable) => {
      const { variables } = variable;
      variables.find((variable) => variable.id === key).configs.forEach((config, index) => {
        const { key, name, value } = config;
        if (!dataSource[index]) {
          dataSource[index] = {
            _variableName: isSystem ? SYSTEM_VARIABLE_NAME_MAP[key] : name,
            key,
            [variable.key]: value,
            _object: [{
              title: variable.title,
              key: variable.key,
              value,
            }],
            _originalObject: {
              [variable.key]: config
            },
            _state: {
              [variable.key]: {}
            },
            _cssKey: config.key,
            _isSystem: isSystem,
          }
        } else {
          dataSource[index]._object.push({
            title: variable.title,
            key: variable.key,
            value,
          })
          dataSource[index]._state[variable.key] = {};
          dataSource[index]._originalObject[variable.key] = config;
          dataSource[index][variable.key] = value;
        }
      })
    })

    return {
      tableDataSource: dataSource
    }
  }, [variableCount, tableColumns])

  const tableRef = useRef<any>();

  useEffect(() => {
    if (active && tableDataSource.length) {
      const bodyDom = tableRef.current.querySelector('.mb-table-body');
      const isSystem = key === "mybricks@theme";

      modalContext.current.tableBodyHeightCallBack.setCallBack((style) => {
        if (isSystem) {
          bodyDom.style.maxHeight = `${style.height - 80}px`;
        } else {
          bodyDom.style.maxHeight = `${style.height - 120}px`;
        }
      })
    }
  }, [active, tableDataSource.length])


  return tableDataSource.length ? (
    <div ref={tableRef}>
      <Table
        rowKey={"key"}
        dataSource={tableDataSource}
        columns={tableColumns}
        pagination={false}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: active ? 1 : 0,
          zIndex: active ? 1 : 0
        }}
        bordered
        scroll={{ x: 'max-content', y: 0 }}
      />
    </div>
  ) : (
    <div className={classNames(css.empty, {
      [css.emptyActive]: active
    })}>
      <span>当前{switchItem.title}变量为空，请创建。</span>
      <button onClick={addVariable}>
        创建变量
      </button>
    </div>
  )
}

/** 表格名称列 */
const TableColumnName = (props) => {
  const { value, record, setEditVariableContext, themeChange } = props;
  const [form, setForm] = useState({
    name: value,
    _name: value
  })
  record._state.setName = (name) => {
    setForm({
      name,
      _name: name
    });
  };

  const [editAble, setEditAble] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);
  const [context] = useState({
    editVariableOpen: false
  })
  const clickCancel = useCallback((e) => {
    if (containerRef.current && !containerRef.current.contains(e.target) && !context.editVariableOpen) {
      setEditAble(false)
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', clickCancel, true);

    if (editAble) {
      window.addEventListener('click', clickCancel, true);
    } else {
      window.removeEventListener('click', clickCancel, true);
    }

    return () => {
      if (editAble) {
        window.removeEventListener('click', clickCancel, true);
      }
    }
  }, [editAble])

  return (
    <div
      ref={containerRef}
      className={classNames(css.tableColumnVariableName, {
        [css.tableColumnVariableNameEditAble]: editAble,
      })}
      onClick={() => {
        if (!record._isSystem) {
          if (!editAble) {
            inputRef.current.select();
            setEditAble(true);
          } else {
            inputRef.current.focus();
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        }
      }}
    >
      <div className={css.title}>
        {PaletteIcon}
        {record._isSystem ? (
          <span>{form.name}</span>
        ) : (
          <input
            ref={inputRef}
            placeholder="请输入变量名称"
            value={form.name}
            onChange={(e) => {
              setForm((form) => {
                return {
                  ...form,
                  name: e.target.value.trim()
                }
              })
            }}
            onBlur={() => {
              if (!record) {
                return
              }
              if (!form.name) {
                setForm((form) => {
                  return {
                    ...form,
                    name: form._name
                  }
                })
              } else {
                setForm((form) => {
                  return {
                    ...form,
                    _name: form.name
                  }
                })

                Object.entries(record._originalObject).forEach(([, value]: any) => {
                  value.name = form.name;
                })
                themeChange()
              }
            }}
          />
        )}
      </div>

      <div className={css.operateContainer}>
        <div
          className={css.button}
          data-mybricks-tip={`{content:'编辑',position:'bottom'}`}
          onClick={(e) => {
            e.stopPropagation();
            setEditAble(true);
            context.editVariableOpen = true;
            const currentTarget = e.currentTarget;
            currentTarget.setAttribute("data-active", "true");
            const rect = currentTarget.getBoundingClientRect();
            const originalObject = record._originalObject[Object.keys(record._originalObject)[0]];
            setEditVariableContext({
              onClose: () => {
                context.editVariableOpen = false;
                setEditAble(false);
                currentTarget.removeAttribute("data-active");
                setEditVariableContext(undefined);
              },
              record: {
                ...record,
                _variableName: originalObject.name,
                _cssKey: originalObject.key,
              },
              style: {
                top: rect.bottom,
                left: rect.left - 280 + rect.width
              }
            })
          }}
        >
          {EditTriggerButtonIcon}
        </div>
        <div
          className={css.mask}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  )
}

/** 表格列颜色编辑 */
const TableColumnColor = (props) => {
  const { themeChange } = props;
  const [color, setColor] = useState(props.value);
  const [draft, setDraft] = useState(props.value);
  const [editAble, setEditAble] = useState(false);
  const [context] = useState({
    colorPickerOpen: false
  })

  if (!props.record._state[props.valueKey].setValue) {
    props.record._state[props.valueKey].setValue = (value) => {
      setColor(value);
      setDraft(value);
    };
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);
  const clickCancel = useCallback((e) => {
    if (containerRef.current && !containerRef.current.contains(e.target) && !context.colorPickerOpen) {
      setEditAble(false)
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', clickCancel, true);

    if (editAble) {
      window.addEventListener('click', clickCancel, true);
    } else {
      window.removeEventListener('click', clickCancel, true);
    }

    return () => {
      if (editAble) {
        window.removeEventListener('click', clickCancel, true);
      }
    }
  }, [editAble])

  return (
    <div
      ref={containerRef}
      className={classNames(css.tableColumnVariableValue, {
        [css.tableColumnVariableValueEditAble]: editAble
      })}
      onClick={() => {
        if (!context.colorPickerOpen) {
          if (!editAble) {
            inputRef.current.select();
            setEditAble(true);
          } else {
            inputRef.current.focus();
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        }
      }}
    >
      <ColorPicker
        rootClassName={css.colorPickerPopover}
        size={"small"}
        getPopupContainer={props.getPopupContainer}
        presets={[
          {
            label: "预设颜色",
            colors: PRESET_COLORS
          }
        ]}
        // @ts-ignore
        onClick={(e) => {
          e.stopPropagation();
          if (!editAble) {
            setEditAble(true);
          }
        }}
        onChange={(value) => {
          const hex = value.toHexString();
          setColor(hex);
          setDraft(hex);
          props.record._originalObject[props.valueKey].value = hex;
          props.record._state[props.valueKey].setValue(hex);
          themeChange();
        }}
        value={color}
        onOpenChange={(open) => {
          context.colorPickerOpen = open;
        }}
      />
      <input
        ref={inputRef}
        value={draft}
        onClick={(e) => {
          e.stopPropagation();
          if (!editAble) {
            inputRef.current.select();
            setEditAble(true);
          }
        }}
        onChange={(e) => {
          setDraft(e.target.value)
        }}
        onBlur={() => {
          if (validateColor(draft)) {
            const hex = tc(draft).toHexString();
            setColor(hex)
            setDraft(hex);
            props.record._originalObject[props.valueKey].value = hex;
            props.record._state[props.valueKey].setValue(hex);
            themeChange();
          } else {
            setDraft(color);
          }
        }}
      />
    </div>
  )
}

const EditorColor = (props) => {
  const { themeChange } = props;
  const [color, setColor] = useState(props.value);
  const [draft, setDraft] = useState(props.value);

  if (!props.record._state[props.valueKey].setValue) {
    props.record._state[props.valueKey].setValue = (value) => {
      setColor(value);
      setDraft(value);
    };
  }

  return (
    <div className={css.tableColumnVariableValue}>
      <ColorPicker
        rootClassName={css.colorPickerPopover}
        size={"small"}
        getPopupContainer={props.getPopupContainer}
        presets={[
          {
            label: "预设颜色",
            colors: PRESET_COLORS
          }
        ]}
        onChange={(value) => {
          const hex = value.toHexString();
          setColor(hex);
          setDraft(hex);
          props.record._originalObject[props.valueKey].value = hex;
          props.record._state[props.valueKey].setValue(hex);
          themeChange();
        }}
        value={color}
      />
      <input
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
        }}
        onBlur={() => {
          if (validateColor(draft)) {
            const hex = tc(draft).toHexString();
            setColor(hex)
            setDraft(hex);
            props.record._originalObject[props.valueKey].value = hex;
            props.record._state[props.valueKey].setValue(hex);
            themeChange();
          } else {
            setDraft(color);
          }
        }}
      />
    </div>
  )
}