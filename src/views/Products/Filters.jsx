import React, { Component } from "react";
import PropTypes from "prop-types";
import Nouislider from "react-nouislider";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlePriceSlider = this.handlePriceSlider.bind(this);
    this.handleRatingSlider = this.handleRatingSlider.bind(this);
  }
  handlePriceSlider(value) {
    const { handlePriceFilter } = this.props;
    handlePriceFilter(value);
  }
  handleRatingSlider(value) {
    const { handleRatingFilter } = this.props;
    handleRatingFilter(value);
  }
  render() {
    const { price,rating } = this.props;
    return (
      <div>
        <div className="section-header filter-header">
          <div className="title">
            <h5>Filters</h5>
          </div>
          <div className="filter-clear">
            <span>Clear all</span>
          </div>
        </div>
        <div className="section-header filter-categories">
          <div className="title">
            <h6>CATEGORIES</h6>
          </div>
          <div className="filter-category">
            <div className="category" />
          </div>
        </div>
        <div className="section-header filter-products-price">
          <div className="title">
            <h6>price</h6>
          </div>
          <div className="filter-clear">
            <span>Clear</span>
          </div>
          <div className="price-filter">
            <Nouislider
              pips={{
                mode: "range",
                density: 3
              }}
              range={{ min: 100, max: 1000 }}
              start={[price.minPrice, price.maxPrice]}
              connect
              onEnd={this.handlePriceSlider}
            />
          </div>
        </div>
        <div className="section-header filter-products-rating">
          <div className="title">
            <h6>Rating</h6>
          </div>
          <div className="filter-clear">
            <span>Clear</span>
          </div>
          <div className="rating-filter">
            <Nouislider
              range={{ min: 0, max: 5 }}
              start={[rating.minRating, rating.maxRating]}
              connect
              onEnd={this.handleRatingSlider}
            />
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  handlePriceFilter: PropTypes.func.isRequired,
  handleRatingFilter: PropTypes.func.isRequired
};

export default Filters;
