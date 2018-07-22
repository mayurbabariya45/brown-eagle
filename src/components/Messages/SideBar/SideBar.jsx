import React from "react";
import classNames from "classnames";

export const SideBar = props => (
  <div className={classNames("rce-sbar", props.type, props.className)}>
    <div className="rce-sbar-item">{props.top}</div>
    <div className="rce-sbar-item rce-sbar-item__center">{props.center}</div>
    <div className="rce-sbar-item">{props.bottom}</div>
  </div>
);

SideBar.defaultProps = {
  top: null,
  center: null,
  bottom: null,
  type: "dark"
};

export default SideBar;
