import _ from "lodash";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContentLoader from "../Loader/Loader";
import ProductItem from "./ProductItem";

const Loader = () => <ContentLoader height={300} inFight />;

class CategorySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { translate, products, title, SliderSettings, loading } = this.props;
    const showEmpty = !loading && products.length < 1;
    const sliderSettings = {
      ...SliderSettings
    };
    const renderLoader = [];
    if (loading) {
      for (let i = 1; i <= 6; i++) {
        const contentLoader = (
          <div key={i} className="item product product-item">
            <div className="product-item-info">
              <Loader />
            </div>
          </div>
        );
        renderLoader.push(contentLoader);
      }
    }

    const renderProduct =
      !loading &&
      _.map(products, value => (
        <div key={value.id} className="item product product-item">
          <ProductItem product={value} />
        </div>
      ));
    return (
      <div className="products-slider">
        {title && (
          <Col xs={12}>
            <Row>
              <div className="section-header">
                <h5 className="text-uppercase">{title}</h5>
              </div>
            </Row>
          </Col>
        )}
        <Col xs={12}>
          <Row>
            {!showEmpty && (
              <Slider
                ref={slider => {
                  this.slider = slider;
                }}
                {...sliderSettings}
              >
                {!loading && renderProduct}
                {loading && renderLoader}
              </Slider>
            )}
            {showEmpty && (
              <div className="category-products">
                <div className="empty-products">
                  <p>{translate("empty_message")}</p>
                </div>
              </div>
            )}
          </Row>
        </Col>
      </div>
    );
  }
}

export default CategorySlider;
