import className from "classnames";
import React from "react";

export const Card = props => (
  <div
    data-background-color={props.bgColor}
    className={className("card", props.className, {
      "card-plain": props.plain,
      "card-radius": props.radius
    })}
  >
    {props.header}
    <div
      className={`content${props.ctAllIcons ? " all-icons" : ""}${
        props.ctTableFullWidth ? " table-full-width" : ""
      }${props.ctTableResponsive ? " table-responsive" : ""}`}
    >
      {props.content}
    </div>
    {props.footer && (
      <div className="footer">
        {props.legend}
        {props.stats != null ? <hr /> : ""}
        <div className="social">{props.stats}</div>
      </div>
    )}
  </div>
);

export default Card;
