import React from "react";
import PropTypes from "prop-types";

const ProductReviews = (props) => (
  <div className="review-lists">
    <div className="review-title">
      <h4>{props.translate("product_reviews_title")}</h4>
    </div>
    <div className="reviews">
      <div className="review-item">
        <h5>Great product for the pro drywaller</h5>
        <div className="rating-result" title="80%">
          <span
            style={{
              width: "62%"
            }}
          >
            <span>80%</span>
          </span>
        </div>
        <p>
          Way, way better than pulling a cord around. Great battery life. I can
          do a standard 2 bedroom home in half the time I can pulling a corded
          drywall screw gun around. Can do standard 2 bedroom house on 1 and 1/2
          battery charges. Highly recommend this tool. Much lighter than a
          corded drywall screw gun.
        </p>
        <p className="review-post">
          By <span>WILLIAM KEY</span> on 27 May 2017
        </p>
      </div>
    </div>
  </div>
);

ProductReviews.propTypes = {};

export default ProductReviews;
