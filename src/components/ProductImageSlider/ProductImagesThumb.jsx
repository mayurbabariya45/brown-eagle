import _ from "lodash";
import React, { Component } from "react";

class ProductImageThumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { thumbs } = this.props;
    const thumbImages = _.map(thumbs, thumb => (
      <div className="products__nav__frame products__nav__frame--thumb products__active">
        <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
          <img src={thumb.url} className="products__img" alt="" />
        </div>
      </div>
    ));
    return (
      <div className="products__nav-wrap products__nav-wrap--horizontal">
        <div className="products__nav products__nav--thumbs products__shadows--right">
          <div className="products__thumb__arr products__thumb__arr--left products__arr--disabled">
            <span className="products__thumb--icon fa fa-angle-left" />
          </div>
          <div className="products__nav__shaft products__grab">
            {thumbImages}
          </div>
          <div className="products__thumb__arr products__thumb__arr--right">
            <span className="products__thumb--icon fa fa-angle-right" />
          </div>
        </div>
      </div>
    );
  }
}

ProductImageThumbs.propTypes = {};
export default ProductImageThumbs;
