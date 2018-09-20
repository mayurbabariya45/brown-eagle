import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import formValidationScroller from "../../variables/FormValidationScroller";
import ContactInformationForm from "../../views/Dashboard/form/ContactInformationForm";

const mapStateToProps = state => {
  const initialValues = {
    email: state.auth.user.email,
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName,
    username: state.auth.user.username,
    fax: state.auth.user.fax,
    id: state.auth.user.id,
    phone: state.auth.user.phone,
    telephone: state.auth.user.telephone,
    alternateEmail: state.auth.user.alternateEmail,
    facebook: _.find(state.auth.user.socialLinks, ["platform", "facebook"])
      ? _.find(state.auth.user.socialLinks, ["platform", "facebook"]).link
      : "http://www.facebook.com/",
    twitter: _.find(state.auth.user.socialLinks, ["platform", "twitter"])
      ? _.find(state.auth.user.socialLinks, ["platform", "twitter"]).link
      : "https://twitter.com/",
    google: _.find(state.auth.user.socialLinks, ["platform", "google"])
      ? _.find(state.auth.user.socialLinks, ["platform", "google"]).link
      : "https://plus.google.com/"
  };
  return {
    initialValues
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "contactInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmitFail: errors => formValidationScroller(errors)
  })(ContactInformationForm)
);
