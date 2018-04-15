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
    const { handleCountry } = this.props;
    this.setState({ selectedOption });
    handleCountry && handleCountry(selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
    const { searchable, options, multi, selectedValue } = this.props;
    const value = selectedValue
      ? selectedValue && selectedValue.value
      : selectedOption && selectedOption.value;

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
