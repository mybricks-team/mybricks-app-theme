import React from "react";

import useConfig from "./useConfig";
import ConfigDesigner from "./ConfigDesigner";
import ConfigServer from "./ConfigServer";
import { Collapse, Spin } from "antd";

import style from "./app.less";

export const _NAMESPACE_ = APP_NAME;

console.log(9999)

export default (props) => {
  const { options = {} } = props;
  const configContext = useConfig(_NAMESPACE_, {}, options);
  console.log("configContext => ", configContext);

  return (
    <Spin spinning={configContext.loading}>
      <Collapse
        style={{ padding: 24 }}
        className={style.wrapper}
        defaultActiveKey={[0, 1]}
      >
        <Collapse.Panel key={0} header="设计器">
          <ConfigDesigner {...configContext} />
        </Collapse.Panel>
        <Collapse.Panel key={1} header="服务扩展">
          <ConfigServer {...configContext} />
        </Collapse.Panel>
      </Collapse>
    </Spin>
  );
};
