import { connect } from "react-redux";
import Cart from "../../views/Cart/Cart";
import * as a from "../../actions/Cart/Cart_actions";

const mapDispatchToProps = dispatch => ({
  getCartProduct: () => {},
  getCartTotal: () => {},
  addToWhishlist: item => dispatch(a.addToWhishlist(item)),
  removeCartItem: item => dispatch(a.removeCartItem(item)),
  onIncrement: item => dispatch(a.onIncrement(item)),
  onDecrement: item => dispatch(a.onDecrement(item))
});
const mapStateToProps = state => ({
  ...state.cart
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Cart);
