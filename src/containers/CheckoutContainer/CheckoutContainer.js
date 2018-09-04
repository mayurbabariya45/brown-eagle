import { connect } from "react-redux";
import Checkout from "../../views/Checkout/Checkout";
import * as a from "../../actions/Auth/Auth_actions";
import * as c from "../../actions/Checkout/Checkout_actions";
import * as d from "../../actions/Cart/Cart_actions";

const mapStateToProps = state => ({
  ...state.cart,
  checkout: state.checkout,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: (token, id, role) =>
    dispatch(a.getUserProfile(token, id, role)),
  getCartProducts: authId => dispatch(d.getCartProducts(authId)),
  createOrder: values => dispatch(c.createOrder(values)),
  saveAddress: values => dispatch(c.saveAddress(values))
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Checkout
);
