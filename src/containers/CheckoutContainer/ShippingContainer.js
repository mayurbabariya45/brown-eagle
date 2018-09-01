import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import formValidationScroller from "../../variables/FormValidationScroller";
import ShippingAddress from "../../views/Checkout/ShippingAddress";

const mapStateToProps = state => ({
  ...state.checkout,
  initialValues: state.address
});

export default connect(mapStateToProps, null)(
  reduxForm({
    form: "shippingAddressForm",
    enableReinitialize: true,
    destroyOnUnmount: true,
    onSubmitFail: errors => formValidationScroller(errors)
  })(ShippingAddress)
);
