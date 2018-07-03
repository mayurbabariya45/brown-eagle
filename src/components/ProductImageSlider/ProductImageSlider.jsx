import _ from "lodash";
import React, { Component } from "react";
import ImageGallery from "react-image-gallery";

class ProductImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { images } = this.props;
    const sliderImages = _.map(images, image => ({
      original: image.url,
      thumbnail: image.url
    }));
    return (
      <div className="products-image-wrapper">
        <div className="products-slider-image products__wrap--slide">
          <ImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            items={sliderImages}
          />
        </div>
      </div>
    );
  }
}
export default ProductImageSlider;
