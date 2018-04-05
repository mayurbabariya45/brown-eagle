import React, { Component } from "react";
import ProductImages from "./ProductImages";
import ProductImageThumbs from "./ProductImagesThumb";

class ProductImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="products-image-wrapper">
        <div className="products-slider-image products__wrap--slide">
          <ProductImages />
          <ProductImageThumbs />
        </div>
      </div>
    );
  }
}
export default ProductImageSlider;
