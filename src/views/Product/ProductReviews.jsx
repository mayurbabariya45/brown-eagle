import _ from "lodash";
import React from "react";

const ProductReviews = props => (
  <div className="review-lists">
    <div className="review-title">
      <h4>{props.translate("product_reviews_title")}</h4>
    </div>
    <div className="reviews">
      {_.map(props.productReview, review => (
        <div className="review-item" key={review.id}>
          <h5>{review.titleTranslations[props.locale]}</h5>
          <div className="rating-result" title={`${review.rating / 5 * 100}%`}>
            <span
              style={{
                width: `${review.rating / 5 * 100}%`
              }}
            >
              <span>{review.rating / 5 * 100}%</span>
            </span>
          </div>
          <p>{review.commentTranslations[props.locale]}</p>
          <p className="review-post">
            By{" "}
            <span>
              {_.upperCase(
                review.buyer.firstName + " " + review.buyer.lastName
              )}
            </span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

ProductReviews.propTypes = {};

export default ProductReviews;
