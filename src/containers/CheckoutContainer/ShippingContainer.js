import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import formValidationScroller from "../../variables/FormValidationScroller";
import ShippingAddress from "../../views/Checkout/ShippingAddress";

const mapStateToProps = state => ({
  ...state.checkout,
  initialValues: {
    ...state.address,
    f_name: (state.auth && state.auth.user.firstName) || "",
    l_name: (state.auth && state.auth.user.lastName) || "",
    street:
      (!_.isEmpty(state.auth.user) &&
        state.auth.user.operationalAddress.address) ||
      "",
    zipCode:
      (!_.isEmpty(state.auth.user) &&
        state.auth.user.operationalAddress.areaCode) ||
      "",
    country:
      (!_.isEmpty(state.auth.user) &&
        state.auth.user.operationalAddress.country) ||
      "",
    city:
      (!_.isEmpty(state.auth.user) &&
        state.auth.user.operationalAddress.city) ||
      "",
    phone: (!_.isEmpty(state.auth.user) && state.auth.user.phone) || ""
  }
});

export default connect(mapStateToProps, null)(
  reduxForm({
    form: "shippingAddressForm",
    enableReinitialize: true,
    destroyOnUnmount: true,
    onSubmitFail: errors => formValidationScroller(errors)
  })(ShippingAddress)
);
