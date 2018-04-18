import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import ContactInformationForm from "../../views/Dashboard/form/ContactInformationForm";
import * as c from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => {
  const initialValues = {
    email: state.auth.user.email,
    fax: state.auth.user.fax,
    id: state.auth.user.id,
    phone: state.auth.user.phone,
    telephone: state.auth.user.telephone,
    alternateEmail: state.auth.user.alternateEmail,
    facebook: _.find(state.auth.user.socialLinks, ["platform", "facebook"])
      ? _.find(state.auth.user.socialLinks, ["platform", "facebook"]).link
      : "",
    twitter:
      _.find(state.auth.user.socialLinks, ["platform", "twitter"]) &&
      _.find(state.auth.user.socialLinks, ["platform", "twitter"]).link,
    google:
      _.find(state.auth.user.socialLinks, ["platform", "google"]) &&
      _.find(state.auth.user.socialLinks, ["platform", "google"]).link
  };
  return {
    initialValues
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "contactInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: false
  })(ContactInformationForm)
);
