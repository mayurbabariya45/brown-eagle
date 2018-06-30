import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "react-select/dist/react-select.css";

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {}
    };
  }
  handleChange = selectedOption => {
    const { handleCountry, handleSelectValue } = this.props;
    this.setState({ selectedOption });
    handleCountry && handleCountry(selectedOption);
    handleSelectValue && handleSelectValue(selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
    const {
      searchable,
      options,
      multi,
      selectedValue,
      placeholder
    } = this.props;
    const value = selectedValue
      ? selectedValue && selectedValue.value
      : selectedOption && selectedOption.value;

    return (
      <Select
        name="form-field-name"
        value={value}
        multi={multi}
        placeholder={placeholder || "Select..."}
        onChange={this.handleChange}
        searchable={searchable}
        options={options}
      />
    );
  }
}
CustomSelect.propTypes = {
  searchable: PropTypes.bool,
  handleSelectValue: PropTypes.func,
  handleCountry: PropTypes.func,
  multi: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any),
  placeholder: PropTypes.string
};
CustomSelect.defaultProps = {
  searchable: false,
  handleSelectValue: () => {},
  handleCountry: () => {},
  multi: false,
  options: [],
  placeholder: "Select..."
};
export default CustomSelect;
