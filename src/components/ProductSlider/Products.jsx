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
    src,
    bAction,
    buttons,
    translate,
    lists,
    product,
    deleteProduct,
    editProduct,
    addToCart
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
                  className="img-responsive"
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
                  {product.name}
                </Link>
              </h2>
              <div className="price-box price-final_price">
                <span className="price">
                  ${product.productPrice.toFixed(2)}
                </span>
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
            <p>
              Lorem ipsum dolor sit amet, an munere tibique consequat mel,
              congue albucius no qui, at everti meliore erroribus sea. Vero
              graeco cotidieque ea duo, in eirmod insolens interpretaris nam.
              Pro at nostrud percipit definitiones, eu tale porro cum. Sea ne
              accusata voluptatibus. Ne cum falli dolor voluptua, duo ei sonet
              choro facilisis, labores officiis torquatos cum ei.
            </p>
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
  src: PropTypes.string
};
Products.defaultProps = {
  bAction: false,
  buttons: false,
  lists: false,
  editProduct: () => {},
  deleteProduct: () => {},
  addToCart: () => {}
};
export default Products;
