import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from "../BannerSlider/BannerSlider";
import Products from "./Products";

const NextButton = props => <button {...props}>Next</button>;
const PrevButton = props => <button {...props}>Prev</button>;
class ProductSlider extends Component {
  constructor(props) {
    super(props);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePrevButton = this.handlePrevButton.bind(this);
  }
  handleNextButton() {
    const { banner } = this.props;
    this.slider.slickNext();
    banner && this.BannerSlider.handleNextButton();
  }
  handlePrevButton() {
    const { banner } = this.props;
    this.slider.slickPrev();
    banner && this.BannerSlider.handlePrevButton();
  }
  render() {
    const {
      title,
      SliderSettings,
      products,
      bAction,
      banner,
      multiple,
      productChunk,
      buttons,
      arrows,
      translate,
      classNames,
      addToCart
    } = this.props;
    const product =
      !multiple &&
      products.map(value => (
        <div key={value.id} className="item product product-item">
          <Products
            product={value}
            translate={translate}
            bAction={bAction}
            buttons={buttons}
            classNames={classNames}
            addToCart={() => addToCart(value)}
          />
        </div>
      ));
    const mutipleProducts =
      multiple &&
      _.map(_.chunk(products, productChunk || 3), (productValue, index) => (
        <div key={index} className="product-item-list">
          {_.map(productValue, (value, key) => (
            <div key={key} className="item product product-item">
              <Products
                key={key}
                product={value}
                bAction={bAction}
                buttons={buttons}
                translate={translate}
                classNames={classNames}
                addToCart={() => addToCart(value)}
              />
            </div>
          ))}
        </div>
      ));
    const sliderSettings = {
      ...SliderSettings
    };
    return (
      <div className="products-slider">
        <Col xs={12}>
          <Row>
            {title && (
              <div className="section-header">
                <h5>{title}</h5>
                {arrows && (
                  <div className="slider-buttons">
                    <NextButton
                      className="product-arrow product-prev"
                      type="button"
                      onClick={this.handlePrevButton}
                    />
                    <PrevButton
                      className="product-arrow product-next"
                      type="button"
                      onClick={this.handleNextButton}
                    />
                  </div>
                )}
              </div>
            )}
          </Row>
        </Col>
        <Col xs={12}>
          <Row>
            <Slider ref={slider => (this.slider = slider)} {...sliderSettings}>
              {!multiple && product}
              {multiple && mutipleProducts}
            </Slider>
            {banner && (
              <BannerSlider
                ref={bannerSlider => (this.BannerSlider = bannerSlider)}
                SliderSettings={{
                  className: "products-banner banners",
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1
                }}
              />
            )}
          </Row>
        </Col>
      </div>
    );
  }
}
ProductSlider.propTypes = {
  translate: PropTypes.func.isRequired,
  SliderSettings: PropTypes.objectOf(PropTypes.any).isRequired,
  arrows: PropTypes.bool.isRequired,
  banner: PropTypes.bool.isRequired,
  multiple: PropTypes.bool.isRequired,
  productChunk: PropTypes.number.isRequired,
  buttons: PropTypes.bool.isRequired,
  addToCart: PropTypes.func
};
ProductSlider.defaultProps = {
  arrows: true,
  banner: false,
  multiple: false,
  productChunk: 3,
  buttons: true,
  SliderSettings: {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "products items list product-items"
  },
  addToCart: () => {}
};
export default ProductSlider;
