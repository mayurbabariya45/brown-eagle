import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "react-select/dist/react-select.css";

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ""
    };
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const { searchable, options, multi } = this.props;
    return (
      <Select
        name="form-field-name"
        value={value}
        multi={multi}
        onChange={this.handleChange}
        searchable={searchable}
        options={options}
      />
    );
  }
}
CustomSelect.propTypes = {
  searchable: PropTypes.bool
};
CustomSelect.defaultProps = {
  searchable: false
};
export default CustomSelect;
