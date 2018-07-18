import { connect } from "react-redux";
import Product from "../../views/Product/Product";
import * as a from "../../actions/Product/Product_actions";
import * as c from "../../actions/Cart/Cart_actions";

const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(a.onIncrement()),
  onDecrement: () => dispatch(a.onDecrement()),
  getProduct: (productId, locale) => dispatch(a.getProduct(productId, locale)),
  getSimilarProduct: (productId, locale) =>
    dispatch(a.getSimilarProduct(productId, locale)),
  flushProduct: () => dispatch(a.flushProduct()),
  addToCart: item => dispatch(c.addToCart(item)),
  addToCartUnsafe: item => dispatch(c.addToCartUnsafe(item))
});
const mapStateToProps = state => ({
  ...state.product
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Product
);
