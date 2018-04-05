import React, { Component } from "react";
import PropTypes from "prop-types";

class ProductImageThumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="products__nav-wrap products__nav-wrap--horizontal">
        <div className="products__nav products__nav--thumbs products__shadows--right">
          <div className="products__thumb__arr products__thumb__arr--left products__arr--disabled">
            <span className="products__thumb--icon fa fa-angle-left" />
          </div>
          <div className="products__nav__shaft products__grab">
            <div className="products__thumb-border" />
            <div className="products__nav__frame products__nav__frame--thumb products__active">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/4/_/4_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/7/_/7_2.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/8/_/8_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/8/_/8_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/8/_/8_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/8/_/8_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/8/_/8_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/8/_/8_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
            <div className="products__nav__frame products__nav__frame--thumb">
              <div className="products__thumb products_vertical_ratio products__loaded products__loaded--img">
                <img
                  src="http://alothemes.com/demo2/bigsale/pub/media/catalog/product/cache/6c0160404eaa986bd4ee2f7006d71893/8/_/8_1.jpg"
                  className="products__img"
                  alt=""
                />
              </div>
            </div>
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
