import React, { Component } from "react";
import Slider from "react-slick";
import banner from "../../assets/img/products/product-banner.jpg";

class BannerSlider extends Component {
  constructor(props) {
    super(props);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePrevButton = this.handlePrevButton.bind(this);
  }
  handleNextButton() {
    this.slider.slickNext();
  }
  handlePrevButton() {
    this.slider.slickPrev();
  }
  render() {
    const { SliderSettings } = this.props;
    return (
      <Slider ref={slider => (this.slider = slider)} {...SliderSettings}>
        <div className="product-item-banner">
          <div className="product-banner">
            <img src={banner} alt="product" />
          </div>
        </div>
      </Slider>
    );
  }
}

export default BannerSlider;
