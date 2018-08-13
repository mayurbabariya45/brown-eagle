import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import formValidationScroller from "../../variables/FormValidationScroller";
import SellerCertificateForm from "../../views/Dashboard/form/SellerCertificateForm";

export default connect(null)(
  reduxForm({
    form: "sellerCertificateForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmitFail: errors => formValidationScroller(errors)
  })(SellerCertificateForm)
);
