import _ from "lodash";
import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import ReactImageMagnify from "react-image-magnify";
import ReactSlick from "react-slick";

class ProductImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { images } = this.props;
    const sliderImages = _.map(images, image => ({
      srcSet: [
        `${image.url} 355w`,
        `${image.url} 481w`,
        `${image.url} 584w`,
        `${image.url} 687w`,
        `${image.url} 770w`,
        `${image.url} 861w`,
        `${image.url} 955w`,
        `${image.url} 1033w`,
        `${image.url} 1112w`,
        `${image.url} 1192w`,
        `${image.url} 1200w`
      ],
      small: image.url,
      large: image.url
    }));
    return (
      <div className="products-image-wrapper">
        <div className="products-slider-image products__wrap--slide">
          <ReactSlick
            {...{
              dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1
            }}
          >
            {sliderImages.map((src, index) => (
              <div key={index}>
                <ReactImageMagnify
                  isHintEnabled
                  shouldHideHintAfterFirstActivation={false}
                  enlargedImagePosition="over"
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Versace",
                      isFluidWidth: true,
                      src: src.small,
                      srcSet: src.srcSet,
                      sizes:
                        "(max-width: 480px) 50vw, (max-width: 1200px) 30vw, 360px"
                    },
                    largeImage: {
                      src: src.large,
                      width: 350,
                      height: 1000
                    },
                    lensStyle: { backgroundColor: "rgba(0,0,0,.6)" }
                  }}
                />
              </div>
            ))}
          </ReactSlick>
          {/* <ImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            items={sliderImages}
          /> */}
        </div>
      </div>
    );
  }
}
export default ProductImageSlider;
