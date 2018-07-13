import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageLoader from "../ImageLoader/ImageLoader";
import ContentLoader from "../Loader/Loader";

const preloader = () => <ContentLoader height={300} inFight />;

class QuotationSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { productImages } = this.props;
    if (_.isEmpty(productImages)) return null;
    const sliderSetting = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      className: "quotation-images-slider"
    };
    return (
      <Slider {...sliderSetting}>
        {_.map(productImages, image => (
          <div className="item" key={image.id}>
            <div className="image-container">
              <div className="product-item-photo">
                <ImageLoader preloader={preloader} src={image.url} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  }
}

QuotationSlider.propTypes = {
  productImages: PropTypes.arrayOf(PropTypes.any)
};

QuotationSlider.defaultProps = {
  productImages: []
};
export default QuotationSlider;
