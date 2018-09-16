import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PaymentForm from "../../views/Dashboard/form/PaymentForm";
import formValidationScroller from "../../variables/FormValidationScroller";

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "paymentForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmitFail: errors => formValidationScroller(errors)
  })(PaymentForm)
);
