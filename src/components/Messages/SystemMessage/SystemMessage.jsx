import React from "react";
import classNames from "classnames";

export const SystemMessage = props => (
  <div className={classNames("rce-container-smsg", props.className)}>
    <div className="rce-smsg">
      <div className="rce-smsg-text">{props.text}</div>
    </div>
  </div>
);

export default SystemMessage;
