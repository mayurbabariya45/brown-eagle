import _ from "lodash";
import className from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader/ImageLoader";
import ContentLoader from "../Loader/Loader";
import noProduct from "../../assets/img/no-product.png";
import { getCurrency } from "../../variables/Variables";

const Loader = () => <ContentLoader height={300} inFight />;

const ProductItem = props => {
  const { product } = props;
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
    <div className="product-item-info">
      <Link to={productUrl} className="product-link">
        <div className="images-container">
          <ImageLoader
            preloader={Loader}
            src={productImages}
            className={className("img-responsive")}
          />
        </div>
        <div className="product-title">
          <h4>{product.name}</h4>
        </div>
        <div className="product-price">
          <h5>
            {getCurrency(product.currency)}
            {product.productPrice.toFixed(2)}
          </h5>
        </div>
        <div className="product-conatiner">2 pieces</div>
      </Link>
    </div>
  );
};

ProductItem.propTypes = {};

export default ProductItem;
