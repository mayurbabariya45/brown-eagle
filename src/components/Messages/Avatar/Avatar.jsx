import React from "react";
import classNames from "classnames";

const Avatar = props => (
  <div
    className={classNames(
      "rce-avatar-container",
      props.type,
      props.size,
      props.className
    )}
  >
    <img alt={props.alt} src={props.src} className="rce-avatar" />
    {this.props.sideElement}
  </div>
);

Avatar.defaultProps = {
  type: "default",
  size: "default",
  src: "",
  alt: "",
  sideElement: null
};

export default Avatar;
