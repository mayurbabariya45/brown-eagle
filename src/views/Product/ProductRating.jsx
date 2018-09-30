import _ from "lodash";
import React from "react";
import className from "classnames";
import PropTypes from "prop-types";
import Button from "../../elements/CustomButton/CustomButton";

const ProductRating = props => (
  <div className="product-ratings">
    <div className="rating-title">
      <h5>{props.translate("product_rating")}</h5>
    </div>

    <div className="rating-button">
      {props.showButton && (
        <Button fill radius onClick={props.showRating}>
          <span>{props.translate("product_add_rating")}</span>
        </Button>
      )}
    </div>

    <div className="product-rating">
      <div className="count-rating">
        <div className="rating-number">
          <h1>{props.rating && props.rating.toFixed(1) || 0}</h1>
        </div>
        <div className="product-rating-stars">
          <div className="rating-result" title={`${props.rating / 5 * 100}%`}>
            <span
              style={{
                width: `${props.rating / 5 * 100}%`
              }}
            >
              <span>{`${props.rating / 5 * 100}%`}</span>
            </span>
          </div>
          <div className="review-count">
            {props.totalRatingsCount} {props.translate("p_product_rating")}
          </div>
        </div>
      </div>
      <div className="rating-show">
        <ul>
          {_.map(props.ratingAggregate, value => {
            const { rating, count } = value;
            return (
              <li key={rating}>
                <div className="rate-list rate-count">
                  <span className="number">{rating}</span>
                  <span className="star">★</span>
                </div>
                <div className="rate-list rating-progress">
                  <div className="rate-progress">
                    <span
                      style={{
                        width: `${count / props.totalRatingsCount * 100}%`
                      }}
                      className={className("rate-progress-bar", {
                        "progress-success":
                          rating === 5 || rating === 4 || rating === 3,
                        "progress-warning": rating === 2,
                        "progress-danger": rating === 1
                      })}
                    />
                  </div>
                </div>
                <div className="rate-list rating-counts">
                  <div className="numbers"> {count}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);

ProductRating.propTypes = {
  showRating: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  showButton: PropTypes.bool.isRequired
};

export default ProductRating;
