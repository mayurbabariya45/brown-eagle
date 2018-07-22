import React from "react";
import classNames from "classnames";

const Button = props => (
  <button
    ref={this.props.buttonRef}
    className={classNames("rce-button", props.type, props.className)}
    style={{
      backgroundColor: props.backgroundColor,
      color: props.color,
      borderColor: props.backgroundColor
    }}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {this.props.icon ? (
      <span className="rce-button-icon--container">
        {(props.icon.float === "right" || !props.icon.float) && (
          <span>{props.text}</span>
        )}

        <span
          style={{
            float: props.icon.float,
            fontSize: props.icon.size || 12
          }}
          className="rce-button-icon"
        >
          {props.icon.component}
        </span>
        {props.icon.float === "left" && <span>{props.text}</span>}
      </span>
    ) : (
      <span>{props.text}</span>
    )}
  </button>
);
Button.defaultProps = {
  text: "",
  disabled: false,
  type: null,
  icon: null,
  backgroundColor: "#3979aa",
  color: "white",
  className: null,
  buttonRef: null
};
export default Button;
