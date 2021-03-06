import React, { Component } from "react";

class CustomCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_checked: !!props.isChecked
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    const { onClick } = this.props;
    this.setState({ is_checked: !this.state.is_checked });
    onClick && onClick(this.state.is_checked, event.target.value);
  }
  render() {
    const { isChecked, number, label, inline, ...rest } = this.props;
    const classes =
      inline !== undefined ? "checkbox checkbox-inline" : "checkbox";
    return (
      <div className={classes}>
        <input
          id={number}
          type="checkbox"
          onChange={this.handleClick}
          checked={isChecked || this.state.is_checked}
          {...rest}
        />
        <label htmlFor={number}>{label}</label>
      </div>
    );
  }
}

export default CustomCheckbox;
