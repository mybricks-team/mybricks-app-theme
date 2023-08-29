import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import { presetColors } from './preset-colors';
import { createPortal } from 'react-dom';
import css from './style.less';

export function getPosition(ele: any, relativeDom?: any) {
  if (relativeDom) {
    let currPo = ele.getBoundingClientRect();
    let targetPo = relativeDom.getBoundingClientRect();

    return {
      x: currPo.left - targetPo.left,
      y: currPo.top - targetPo.top,
      w: ele.offsetWidth,
      h: ele.offsetHeight,
    };
  } else {
    let po = ele.getBoundingClientRect();

    return { x: po.left, y: po.top, w: ele.offsetWidth, h: ele.offsetHeight };
  }
}

export default function (props: { color: string; onChange: ColorChangeHandler }) {
  const { color, onChange } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const showPicker = useCallback((e) => {
    e.stopPropagation();
    setPickerVisible(true);
  }, [setPickerVisible]);

  const hidePicker = useCallback((e) => {
    e.stopPropagation();
    setPickerVisible(false);
  }, [setPickerVisible]);

  const popup = useMemo(() => {
    if (pickerVisible) {
      const po = getPosition(ref.current);

      const body = document.body;

      const style: any = {
        top: po.y + ref.current?.offsetHeight + 2,
      };
      if (po.x + 220 > body.clientWidth) {
        style.right = 5;
      } else {
        style.left = po.x;
      }

      return createPortal(
        <div className={css.popup} onClick={hidePicker}>
          <div onClick={(e) => e.stopPropagation()} style={style}>
            <SketchPicker color={color} onChangeComplete={onChange} presetColors={presetColors} />
          </div>
        </div>,
        body
      );
    }
  }, [pickerVisible, color, onChange, hidePicker]);

  return (
    <div className={css.colorPicker} ref={ref}>
      <div className={css.now} style={{ background: color }} onClick={showPicker} />
      {popup}
    </div>
  );
}
