import React, { useState, useContext, useMemo } from "react";
import classNames from "classnames";
import { EditTriggerButtonIcon } from "../Components";
import { EditorContext } from "../..";
import css from "./Variables.less";
import { useUpdateEffect } from "../../hooks";

let _setOpenDialog;

let openDesignDialogChangeCallBack = (value) => {
  _setOpenDialog(value);
}

const Variables = () => {
  const { setState } = useContext(EditorContext);
  const [openDialog, setOpenDialog] = useState(false);

  useMemo(() => {
    _setOpenDialog = setOpenDialog;
    setState.onOpenDesignDialogChange(openDesignDialogChangeCallBack);
  }, [])

  useUpdateEffect(() => {
    setState.setOpenDesignDialog(openDialog);
  }, [openDialog])

  return (
    <div className={css.variables}>
      <span className={css.title}>变量</span>
      <button
        data-mybricks-tip={`{content:'打开变量编辑面板',position:'left'}`}
        className={classNames(css.dialogTriggerButton, {
          [css.dialogTriggerButtonFocus]: openDialog
        })}
        onClick={() => setOpenDialog(!openDialog)}
      >{EditTriggerButtonIcon}</button>
    </div>
  )
}

export default Variables;
