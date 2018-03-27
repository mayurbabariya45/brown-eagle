import React, { Component } from "react";
import ProductImageForm from "./ProductImageForm";
import ProductInformationForm from "./ProductInformationForm";

class ProductInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const { translate } = this.props;
    return (
      <div>
        <ProductInformationForm {...this.props} />
        <ProductImageForm {...this.props} />
      </div>
    );
  }
}

export default ProductInformation;
