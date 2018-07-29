import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class BuyerSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { SliderSettings, buyers, buyerChunk } = this.props;
    const sliderSettings = {
      ...SliderSettings
    };
    const renderBuyer = _.map(
      _.chunk(buyers, buyerChunk || 3),
      (buyerValue, index) => (
        <div key={index} className="buyer-item-list">
          {_.map(buyerValue, value => (
            <div className="items" key={value.id}>
              <div className="item">
                <div className="image-container">
                  <img src={value.profile} alt="" />
                </div>
                <div className="user-info">
                  <h2>{value.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    );
    return (
      <div className="buyers-slider">
        <Col xs={12}>
          <Row>
            <Slider {...sliderSettings}>{renderBuyer}</Slider>
          </Row>
        </Col>
      </div>
    );
  }
}

BuyerSlider.propTypes = {
  SliderSettings: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuyerSlider;
