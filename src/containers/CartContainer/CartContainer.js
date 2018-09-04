import { connect } from "react-redux";
import Cart from "../../views/Cart/Cart";
import * as a from "../../actions/Auth/Auth_actions";
import * as c from "../../actions/Cart/Cart_actions";

const mapDispatchToProps = dispatch => ({
  getUserProfile: (token, id, role) =>
    dispatch(a.getUserProfile(token, id, role)),
  getCartProducts: authId => dispatch(c.getCartProducts(authId)),
  getCartTotal: () => {},
  addToWhishlist: item => dispatch(c.addToWhishlist(item)),
  removeCartItem: item => dispatch(c.removeCartItem(item)),
  onIncrement: item => dispatch(c.onIncrement(item)),
  onDecrement: item => dispatch(c.onDecrement(item))
});
const mapStateToProps = state => ({
  ...state.cart,
  auth: state.auth
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  getCartProducts: () => {
    const webAuthToken = localStorage.getItem("webAuthToken");
    const webAuthId = localStorage.getItem("webAuthId");
    const webAuthRole = localStorage.getItem("webAuthRole");
    if (webAuthToken && webAuthId && webAuthRole) {
      actions
        .getUserProfile(webAuthToken, webAuthId, webAuthRole)
        .then(profile => {
          if (profile.payload.role === "buyer") {
            actions.getCartProducts(profile.payload.id);
          }
        });
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Cart);
