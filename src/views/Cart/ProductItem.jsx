import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import Quantity from "../../components/Quantity/Quantity";
import Button from "../../elements/CustomButton/CustomButton";
import noProduct from "../../assets/img/no-product.png";
import { getCurrency } from "../../variables/Variables";

const preloader = () => <ContentLoader height={300} inFight />;

const ProductItem = props => {
  const {
    translate,
    product,
    onIncrement,
    onDecrement,
    removeCartItem,
    addToWhishlist,
    handleContinueButton,
    handleCheckoutButton,
    buttons
  } = props;
  let productImages;
  let productUrl;
  if (!_.isEmpty(product)) {
    if (!_.isEmpty(product.productPictures)) {
      const { productPictures } = product;
      productImages = productPictures[0].url;
    } else {
      productImages = noProduct;
    }
    productUrl = `/product/${_.kebabCase(product.name)}/${product.id || product._id}`;
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
          <Quantity
            label
            min={product.minQuantity}
            quantity={product.quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </div>
      </div>
      <div className="cart-item-details">
        <div className="product-title">
          <p>{product.name}</p>
        </div>
        <div className="product-discount">
          <p>FOB Reference Price: Get Latest Price</p>
        </div>
        <div className="product-price">
          <p>
            <span className="text-warning">Price -</span>
            <span>
              {getCurrency(product.currency)}
              {_.has(product, "productPrice")
                ? product.productPrice.toFixed(2)
                : "0.00"}/-
            </span>
            {/* <span>₹2,997 40% Off 1 Offer Available</span> */}
          </p>
          <div className="actions product-action">
            <Button className="btn-radius btn-fill" onClick={addToWhishlist}>
              {translate("cart_wishlist")}
            </Button>
            <Button className="btn-radius btn-fill" onClick={removeCartItem}>
              {translate("cart_remove")}
            </Button>
          </div>
        </div>
        {buttons ? (
          <div className="cart-actions">
            <Button
              fill
              radius
              bsStyle="warning"
              onClick={handleContinueButton}
            >
              <span>{translate("cart_continue")}</span>
            </Button>
            <Button
              fill
              radius
              bsStyle="warning"
              onClick={handleCheckoutButton}
            >
              <span>{translate("cart_order")}</span>
            </Button>
          </div>
        ) : (
          <div className="cart-actions" />
        )}
      </div>
    </div>
  );
};
ProductItem.propTypes = {
  translate: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
  addToWhishlist: PropTypes.func.isRequired,
  buttons: PropTypes.bool.isRequired
};
export default ProductItem;
