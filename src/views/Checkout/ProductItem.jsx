import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import Quantity from "../../components/Quantity/Quantity";
import noProduct from "../../assets/img/no-product.png";
import { getCurrency } from "../../variables/Variables";

const preloader = () => <ContentLoader height={300} inFight />;

const ProductItem = props => {
  const { product, locale } = props;
  let productImages;
  let productUrl;
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
    <div className="cart-item">
      <div className="image-container">
        <div className="product-image-container">
          <Link to={productUrl} className="product photo product-item-photo">
            <ImageLoader
              preloader={preloader}
              src={productImages}
              className="img-responsive"
            />
          </Link>
        </div>
        <div className="cart-quantity">
          <Quantity label quantity={product.quantity} />
        </div>
      </div>
      <div className="cart-item-details">
        <div className="product-title">
          <p>{product.nameTranslations[locale]}</p>
        </div>
        <div className="product-price">
          <p>
            <span className="text-warning">Price -</span>
            <span>
              {getCurrency(product.currency)}
              {product ? product.productPrice.toFixed(2) : "0.00"}/-
            </span>
          </p>
        </div>
        <div className="product-description">
          <p>{product.descriptionTranslations[locale].substring(0, 600)}</p>
        </div>
      </div>
    </div>
  );
};
ProductItem.propTypes = {
  translate: PropTypes.func.isRequired
};
export default ProductItem;
