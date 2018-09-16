import _ from "lodash";
import React from "react";
import Button from "../../elements/CustomButton/CustomButton";

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
                `${review.buyer.firstName} ${review.buyer.lastName}`
              )}
            </span>
          </p>
        </div>
      ))}
    </div>
    {props.count !== _.size(props.productReview) && (
      <div className="review-load-more">
        <Button
          bsStyle="warning"
          fill
          onClick={props.handleLoadMore}
          disabled={props.isLoading}
        >
          {props.isLoading ? "loading...." : props.translate("load_more")}
        </Button>
      </div>
    )}
  </div>
);

ProductReviews.propTypes = {};

export default ProductReviews;
