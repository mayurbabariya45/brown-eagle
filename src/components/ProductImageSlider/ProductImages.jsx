import React, { Component } from "react";
import PropTypes from "prop-types";

class ProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="products__stage">
        <div className="products__stage__shaft products__grab">
          <div className="products__stage__frame products__loaded">
            <img
              className="product__img"
              src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/23fd2677e5d54a2903c0fd1cbeb4dd81/1/1/11_1.jpg"
              alt="sadsd"
            />
          </div>
        </div>
      </div>
    );
  }
}

ProductImages.propTypes = {};

export default ProductImages;
