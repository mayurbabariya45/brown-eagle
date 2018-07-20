import _ from "lodash";
import className from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageLoader from "../ImageLoader/ImageLoader";
import ContentLoader from "../Loader/Loader";
import noProduct from "../../assets/img/no-product.png";

const preloader = () => <ContentLoader height={300} inFight />;

class CategorySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      translate,
      products,
      classNames,
      title,
      SliderSettings
    } = this.props;
    const sliderSettings = {
      ...SliderSettings
    };
    const renderProduct = products.map(value => (
      <div key={value.id} className="item product product-item">
        <div className="product-item-info">
          <Link to="/" className="product-link">
            <div className="images-container">
              <ImageLoader
                preloader={preloader}
                src={value.productPictures[0]}
                className={className("img-responsive", classNames)}
              />
            </div>
            <div className="product-title">
              <h4>{value.name}</h4>
            </div>
            <div className="product-price">
              <h5>
                <i className="fa fa-euro" />
                {value.productPrice}
              </h5>
            </div>
            <div className="product-conatiner">2 pieces</div>
          </Link>
        </div>
      </div>
    ));
    return (
      <div className="products-slider">
        <Col xs={12}>
          <Row>
            <div className="section-header">
              <h5>{title}</h5>
            </div>
          </Row>
        </Col>
        <Col xs={12}>
          <Row>
            <Slider
              ref={slider => {
                this.slider = slider;
              }}
              {...sliderSettings}
            >
              {renderProduct}
            </Slider>
          </Row>
        </Col>
      </div>
    );
  }
}

export default CategorySlider;
