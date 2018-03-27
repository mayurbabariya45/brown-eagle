import React from "react";
import PropTypes from "prop-types";
import Button from "../../elements/CustomButton/CustomButton";

const Products = props => {
  const { src, bAction, buttons, translate } = props;
  return (
    <div className="product-item-info per-product">
      <div className="images-container">
        <div className="product-hover">
          <a href="#products" className="product photo product-item-photo">
            <span className="product-image-container">
              <span className="product-image-wrapper">
                <img
                  className="product-image-photo"
                  src={src}
                  alt="Lens Zeiss Otus 28mm"
                />
              </span>
            </span>
          </a>
          {!bAction &&
            buttons && (
              <div className="actions-secondary add-to-links">
                <ul className="add-to-links">
                  <li>
                    <a>
                      <i className="fa fa-heart-o" />
                    </a>
                  </li>
                  <li>
                    <a>
                      <i className="pe-7s-note2" />
                    </a>
                  </li>
                  <li>
                    <a>
                      <i className="pe-7s-expand1" />
                    </a>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </div>
      <div className="product details product-item-details products-textlink">
        <h2 className="product name product-item-name product-name">
          <a href="#products" className="product-item-link">
            Safescan 2210 Banknote Counter
          </a>
        </h2>
        <div className="product-desc">
          <p>Midnight Black Dual Rear Camera</p>
        </div>
        <div className="product-reviews-summary short">
          <div className="rating-summary">
            <div className="rating-result" title="80%">
              <span
                style={{
                  width: "92%"
                }}
              >
                <span>80%</span>
              </span>
            </div>
          </div>
          <div className="reviews-actions">
            <a href="#products" className="action view">
              1&nbsp;<span>{translate("review")}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="price-box price-final_price">
        <span className="price">$2,506.00</span>
      </div>
      {bAction &&
        buttons && (
          <div className="actions-secondary add-to-links">
            <ul className="add-to-links">
              <li>
                <a href="#products">
                  <i className="fa fa-heart-o" />
                </a>
              </li>
              <li>
                <a href="#products">
                  <i className="pe-7s-note2" />
                </a>
              </li>
              <li>
                <a href="#products">
                  <i className="pe-7s-expand1" />
                </a>
              </li>
            </ul>
          </div>
        )}
      {buttons && (
        <div className="action-showcart">
          <div className="actions-primary">
            <Button fill bsStyle="warning" className="action tocart">
              <span>{translate("add_to_cart")}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Products.propTypes = {
  bAction: PropTypes.bool,
  buttons: PropTypes.bool,
  src: PropTypes.string
};

export default Products;
