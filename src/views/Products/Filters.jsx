import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import Nouislider from "react-nouislider";
import CheckBox from "../../elements/CustomCheckbox/CustomCheckbox";

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
    const {
      price,
      rating,
      categories,
      locale,
      loadProduct,
      translate,
      handleCategoryFilter,
      handleSubCategoryFilter
    } = this.props;
    return (
      <div>
        <div className="section-header filter-header">
          <div className="title">
            <h5>{translate("p_filters")}</h5>
          </div>
          {/* <div className="filter-clear">
            <span>Clear all</span>
          </div> */}
        </div>
        <div className="section-header filter-categories">
          <div className="title">
            <h6>{translate("p_filter_category")}</h6>
          </div>
          <div className="filter-category">
            <BlockUi tag="div" blocking={loadProduct}>
              <div className="category">
                <ul>
                  {_.map(categories, category => (
                    <li key={category.id}>
                      <div>
                        <CheckBox
                          name={category.name}
                          number={category.id}
                          label={category.nameTranslations[locale]}
                          onClick={handleCategoryFilter}
                          value={category.id}
                        />
                        {/* {!_.isEmpty(category.subCategoryList) && (
                          <ul>
                            {_.map(category.subCategoryList, subCategory => (
                              <li key={subCategory._id}>
                                <CheckBox
                                  name={subCategory.name}
                                  number={subCategory._id}
                                  value={subCategory._id}
                                  label={subCategory.nameTranslations[locale]}
                                  onClick={handleSubCategoryFilter}
                                />
                              </li>
                            ))}
                          </ul>
                        )} */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </BlockUi>
          </div>
        </div>
        <div className="section-header filter-products-price">
          <div className="title">
            <h6>{translate("p_filter_price")}</h6>
          </div>
          {/* <div className="filter-clear">
            <span>Clear</span>
          </div> */}
          <div className="price-filter">
            <Nouislider
              pips={{
                mode: "range",
                density: 3
              }}
              range={{ min: 0, max: 1000 }}
              start={[price.minPrice, price.maxPrice]}
              connect
              onEnd={this.handlePriceSlider}
            />
          </div>
        </div>
        <div className="section-header filter-products-rating">
          <div className="title">
            <h6>{translate("p_filter_rating")}</h6>
          </div>
          {/* <div className="filter-clear">
            <span>Clear</span>
          </div> */}
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
  handleRatingFilter: PropTypes.func.isRequired,
  handleCategoryFilter: PropTypes.func.isRequired,
  handleSubCategoryFilter: PropTypes.func.isRequired
};

export default Filters;
