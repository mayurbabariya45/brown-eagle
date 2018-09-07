import _ from "lodash";
import React, { Component } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactSlick from "react-slick";

class ProductImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps) {
    if (!_.isEmpty(nextProps.images)) {
      return true;
    }
    return false;
  }
  render() {
    const { images } = this.props;
    const sliderImages = _.map(images, image => ({
      srcSet: [
        { src: image.url, setting: "500w" },
        { src: image.url, setting: "779w" },
        { src: image.url, setting: "1020w" },
        { src: image.url, setting: "1200w" },
        { src: image.url, setting: "1426w" }
      ]
        .map(item => `${item.src} ${item.setting}`)
        .join(", "),
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
            {sliderImages.map((src, index) => {
              const fileExtension = !src.small.match(/.(jpg|jpeg|png|gif)$/i);
              if (fileExtension) {
                return (
                  <div key={index}>
                    <video width="320" height="240" controls>
                      <source src={src.small} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              }
              return (
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
              );
            })}
          </ReactSlick>
        </div>
      </div>
    );
  }
}
export default ProductImageSlider;
