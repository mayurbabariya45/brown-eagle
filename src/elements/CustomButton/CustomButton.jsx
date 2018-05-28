import React from "react";
import { Button } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";

const CustomButton = props => {
  const {
    fill,
    border,
    simple,
    social,
    pullRight,
    radius,
    round,
    block,
    className,
    icon,
    ...rest
  } = props;
  const btnClasses = cx(className, {
    "btn-fill": fill,
    "btn-simple": simple,
    "pull-right": pullRight,
    "btn-block": block,
    "btn-round": round,
    "btn-border": border,
    "btn-radius": radius,
    "btn-social": social,
    "btn-icon": icon
  });
  return <Button className={btnClasses} {...rest} />;
};

CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool,
  border: PropTypes.bool,
  social: PropTypes.bool,
  radius: PropTypes.bool,
  icon: PropTypes.bool,
  className: PropTypes.string
};
CustomButton.defaultProps = {
  fill: false,
  simple: false,
  pullRight: false,
  block: false,
  round: false,
  border: false,
  social: false,
  radius: false,
  icon: false,
  className: ""
};
export default CustomButton;
