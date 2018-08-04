import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import className from "classnames";
import PropTypes from "prop-types";
import ImageLoader from "../ImageLoader/ImageLoader";
import ContentLoader from "../Loader/Loader";
import Button from "../../elements/CustomButton/CustomButton";
import { Confirm } from "../../components/Confirm/Confirm";
import noProduct from "../../assets/img/no-product.png";

const preloader = () => <ContentLoader height={300} inFight />;

const Products = props => {
  const {
    locale,
    src,
    bAction,
    buttons,
    translate,
    lists,
    product,
    deleteProduct,
    editProduct,
    showReviews,
    addToCart,
    classNames
  } = props;
  let productImages;
  let productUrl = "/products";
  if (!_.isEmpty(product)) {
    if (!_.isEmpty(product.productPictures)) {
      const { productPictures } = product;
      productImages = productPictures[0].url;
    } else {
      productImages = noProduct;
    }
    productUrl = `/product/${_.kebabCase(product.name)}/${product.id}`;
  }
  return (
    <div className="product-item-info per-product">
      <div className="images-container">
        <div
          className={className("product-hover", {
            noBorder: !_.isEmpty(product) ? product.isLoading : false
          })}
        >
          <Link to={productUrl} className="product photo product-item-photo">
            <span className="product-image-container">
              <span className="product-image-wrapper">
                <ImageLoader
                  preloader={preloader}
                  src={productImages || src}
                  className={className("img-responsive", classNames)}
                />
              </span>
            </span>
          </Link>
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
        {lists && (
          <div className="products-textlink clearfix">
            <div className="left-product-text">
              <h2 className="product name product-item-name product-name">
                <Link to={productUrl} className="product-item-link">
                  {product.nameTranslations[locale]}
                  <span className="label label-success">{product.status}</span>
                </Link>
              </h2>
              <div className="price-box price-final_price">
                <span className="price">
                  ${!_.isEmpty(product) && _.has(product, "productPrice")
                    ? product.productPrice.toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="product-reviews-summary short">
                <div className="rating-summary">
                  <div
                    className="rating-result"
                    title={`${product.rating / 5 * 100}%`}
                  >
                    <span
                      style={{
                        width: `${product.rating / 5 * 100}%`
                      }}
                    >
                      <span>{product.rating / 5 * 100}</span>
                    </span>
                  </div>
                </div>
                <div className="reviews-actions">
                  <a href="#products" className="action view">
                    {product.totalRatingsCount}&nbsp;<span>
                      {translate("review")}
                    </span>
                  </a>
                </div>
              </div>
              <div className="stock available">
                <label htmlFor="stock">{translate("availability")}</label>
                <span>
                  {product.productAvailability
                    ? translate("in_stock")
                    : translate("out_of_stock")}
                </span>
              </div>
            </div>
            <div className="product-item-inner">
              <div className="action action-comments" onClick={showReviews}>
                <i className="fa fa-comments" />
              </div>
              <div className="action action-edit" onClick={editProduct}>
                <i className="fa fa-pencil-square-o" />
              </div>
              <Confirm
                onConfirm={deleteProduct}
                title={translate("confirm_delete_product_title")}
                body={translate("confirm_delete_product")}
                confirmBSStyle="danger"
                confirmText={translate("confirm_button_yes")}
                cancelText={translate("confirm_cancelText")}
              >
                <div className="action action-delete">
                  <i className="pe-7s-trash" />
                </div>
              </Confirm>
            </div>
          </div>
        )}
        {lists && (
          <div className="product description product-item-description">
            <p>{product.descriptionTranslations[locale].substr(0, 200)}</p>
          </div>
        )}
        {!lists && (
          <div>
            <h2 className="product name product-item-name product-name">
              <Link to={`/${productUrl}`} className="product-item-link">
                {!_.isEmpty(product)
                  ? product.name
                  : "Safescan 2210 Banknote Counter"}
              </Link>
            </h2>
            <div className="product-desc">
              <p>
                {!_.isEmpty(product)
                  ? product.description
                  : "Midnight Black Dual Rear Camera"}
              </p>
            </div>
            <div className="product-reviews-summary short">
              <div className="rating-summary">
                <div
                  className="rating-result"
                  title={`${product.rating / 5 * 100}%`}
                >
                  <span
                    style={{
                      width: `${product.rating / 5 * 100}%`
                    }}
                  >
                    <span>{product.rating / 5 * 100}%</span>
                  </span>
                </div>
              </div>
              <div className="reviews-actions">
                <a href="#products" className="action view">
                  {!_.isEmpty(product) ? product.totalRatingsCount : 1}&nbsp;<span >
                    {translate("review")}
                                                                             </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      {!lists && (
        <div className="price-box price-final_price">
          <span className="price">
            ${!_.isEmpty(product)
              ? product.productPrice.toFixed(2)
              : "2,506.00"}
          </span>
        </div>
      )}
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
            <Button
              fill
              bsStyle="warning"
              className="action tocart"
              onClick={addToCart}
            >
              <span>{translate("add_to_cart")}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Products.propTypes = {
  translate: PropTypes.func.isRequired,
  addToCart: PropTypes.func,
  deleteProduct: PropTypes.func,
  editProduct: PropTypes.func,
  bAction: PropTypes.bool,
  buttons: PropTypes.bool,
  lists: PropTypes.bool,
  src: PropTypes.string,
  product: PropTypes.objectOf(PropTypes.any)
};
Products.defaultProps = {
  bAction: false,
  buttons: false,
  lists: false,
  product: {},
  editProduct: () => {},
  deleteProduct: () => {},
  addToCart: () => {}
};
export default Products;
