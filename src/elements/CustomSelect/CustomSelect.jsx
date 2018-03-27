import React, { Component } from "react";
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
    const { searchable, productGroup } = this.props;
    return (
      <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        searchable={searchable}
        options={productGroup ? productsGroup : locations}
      />
    );
  }
}

export default CustomSelect;
