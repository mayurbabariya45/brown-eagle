import React from "react";
import classNames from "classnames";

export const Navbar = props => (
  <div className={classNames("rce-navbar", props.type, props.className)}>
    <div className="rce-navbar-item rce-navbar-item__left">{props.left}</div>
    <div className="rce-navbar-item rce-navbar-item__center">
      {props.center}
    </div>
    <div className="rce-navbar-item rce-navbar-item__right">{props.right}</div>
  </div>
);

Navbar.defaultProps = {
  left: null,
  center: null,
  right: null,
  type: "light"
};

export default Navbar;
