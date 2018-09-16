import { connect } from "react-redux";
import Product from "../../views/Product/Product";
import * as a from "../../actions/Product/Product_actions";
import * as c from "../../actions/Cart/Cart_actions";
import * as d from "../../actions/Product/Compare_actions";

const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(a.onIncrement()),
  onDecrement: () => dispatch(a.onDecrement()),
  getProduct: (productId, locale, authId) =>
    dispatch(a.getProduct(productId, locale, authId)),
  getProductReview: (productId, locale, page) =>
    dispatch(a.getProductReview(productId, locale, page)),
  getSimilarProduct: (productId, locale) =>
    dispatch(a.getSimilarProduct(productId, locale)),
  flushProduct: () => dispatch(a.flushProduct()),
  addToCart: (item, buyer) => dispatch(c.addToCart(item, buyer)),
  addToCartUnsafe: item => dispatch(c.addToCartUnsafe(item)),
  addToCompare: item => dispatch(d.addToCompare(item)),
  addReview: (value, id, locale) =>
    dispatch(a.addProductReview(value, id, locale)),
  addToWishlistProduct: (product, authId, locale) =>
    dispatch(a.addToWishlistProduct(product, authId, locale)),
  removeCartItem: item => dispatch(c.removeCartItem(item))
});
const mapStateToProps = state => ({
  ...state.product,
  auth: state.auth
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Product
);
