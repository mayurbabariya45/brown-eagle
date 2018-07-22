import React from "react";
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
          <h1>{props.totalRatingsCount}</h1>
        </div>
        <div className="product-rating-stars">
          <div
            className="rating-result"
            title={`${props.totalRatingsCount / 5 * 100}%`}
          >
            <span
              style={{
                width: `${props.totalRatingsCount / 5 * 100}%`
              }}
            >
              <span>{`${props.totalRatingsCount / 5 * 100}%`}</span>
            </span>
          </div>
          <div className="review-count">
            {props.totalRatingsCount} Product Ratings
          </div>
        </div>
      </div>
      <div className="rating-show">
        <ul>
          <li>
            <div className="rate-list rate-count">
              <span className="number">5</span>
              <span className="star">★</span>
            </div>
            <div className="rate-list rating-progress">
              <div className="rate-progress">
                <span
                  style={{ width: "100%" }}
                  className="rate-progress-bar progress-success"
                />
              </div>
            </div>
            <div className="rate-list rating-counts">
              <div className="numbers"> 11,870</div>
            </div>
          </li>
          <li>
            <div className="rate-list rate-count">
              <span className="number">4</span>
              <span className="star">★</span>
            </div>
            <div className="rate-list rating-progress">
              <div className="rate-progress">
                <span
                  style={{ width: "50.9056093319045%" }}
                  className="rate-progress-bar progress-success"
                />
              </div>
            </div>
            <div className="rate-list rating-counts">
              <div className="numbers"> 11,870</div>
            </div>
          </li>
          <li>
            <div className="rate-list rate-count">
              <span className="number">3</span>
              <span className="star">★</span>
            </div>
            <div className="rate-list rating-progress">
              <div className="rate-progress">
                <span
                  style={{ width: "20.85273088206876%" }}
                  className="rate-progress-bar progress-success"
                />
              </div>
            </div>
            <div className="rate-list rating-counts">
              <div className="numbers"> 11,870</div>
            </div>
          </li>
          <li>
            <div className="rate-list rate-count">
              <span className="number">2</span>
              <span className="star">★</span>
            </div>
            <div className="rate-list rating-progress">
              <div className="rate-progress">
                <span
                  style={{ width: "7.135955589129174%" }}
                  className="rate-progress-bar progress-warning"
                />
              </div>
            </div>
            <div className="rate-list rating-counts">
              <div className="numbers"> 11,870</div>
            </div>
          </li>
          <li>
            <div className="rate-list rate-count">
              <span className="number">1</span>
              <span className="star">★</span>
            </div>
            <div className="rate-list rating-progress">
              <div className="rate-progress">
                <span
                  style={{ width: "14.082181192136748%" }}
                  className="rate-progress-bar progress-danger"
                />
              </div>
            </div>
            <div className="rate-list rating-counts">
              <div className="numbers"> 11,870</div>
            </div>
          </li>
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
