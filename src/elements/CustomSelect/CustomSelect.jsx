import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "react-select/dist/react-select.css";

const locations = [
  {
    value: "afghanistan",
    label: "Afghanistan"
  },
  {
    value: "aland islands",
    label: "Aland Islands"
  },
  {
    value: "albania",
    label: "Albania"
  },
  {
    value: "alderney",
    label: "Alderney"
  },
  {
    value: "algeria",
    label: "Algeria"
  },
  {
    value: "american samoa",
    label: "American Samoa"
  },
  {
    value: "andorra",
    label: "Andorra"
  }
];
const productsGroup = [
  {
    value: "andorra",
    label: "Andorra"
  }
];
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
    const { searchable, options } = this.props;
    console.log(options);
    return (
      <Select
        name="form-field-name"
        value={value}
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
