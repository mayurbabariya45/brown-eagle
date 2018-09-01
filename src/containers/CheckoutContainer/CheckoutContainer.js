import { connect } from "react-redux";
import Checkout from "../../views/Checkout/Checkout";
import * as a from "../../actions/Checkout/Checkout_actions";

const mapStateToProps = state => ({
  ...state.cart,
  checkout: state.checkout,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  createOrder: values => dispatch(a.createOrder(values)),
  saveAddress: values => dispatch(a.saveAddress(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
