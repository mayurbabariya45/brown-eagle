import _ from "lodash";
import className from "classnames";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageLoader from "../ImageLoader/ImageLoader";
import ContentLoader from "../Loader/Loader";

const Loader = () => <ContentLoader height={300} inFight />;

class SuppliersSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      translate,
      suppliers,
      classNames,
      title,
      SliderSettings,
      loading
    } = this.props;
    const sliderSettings = {
      ...SliderSettings
    };
    const showEmpty = !loading && suppliers.length < 1;
    const renderLoader = [];
    if (loading) {
      for (let i = 1; i <= 4; i++) {
        const contentLoader = (
          <div key={i} className="item product product-item product-item-loading">
            <div className="product-item-info">
              <Loader />
            </div>
          </div>
        );
        renderLoader.push(contentLoader);
      }
    }
    const renderSuppliers = _.map(suppliers, value => (
      <div key={value.id} className="item product product-item">
        <div className="product-item-info">
          <div className="product-header">
            <span className="yrs">
              <i className="icon-static icon-yrs" />6 Yrs
            </span>
            <h3>DTS UK Machine Tools</h3>
            <div className="product-row">
              <div className="product-rating">
                <div className="rating-result" title="80%">
                  <span
                    style={{
                      width: "62%"
                    }}
                  >
                    <span>80%</span>
                  </span>
                </div>
              </div>
              <div className="product-transaction">
                <p>
                  {translate("product_transaction_level")}{" "}
                  <i className="icon-static icon-diamond" />
                  <i className="icon-static icon-diamond" />
                  <i className="icon-static icon-diamond" />
                </p>
              </div>
            </div>
          </div>
          <div className="product-footer">
            <div className="product-row">
              {_.map(value.productPictures, (product, index) => (
                <Link to="/" className="product-link" key={index}>
                  <div className="image-container">
                    <ImageLoader
                      preloader={Loader}
                      src={product}
                      className={className("img-responsive", classNames)}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
            {!showEmpty && (
              <Slider
                ref={slider => {
                  this.slider = slider;
                }}
                {...sliderSettings}
              >
                {!loading && renderSuppliers}
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

export default SuppliersSlider;