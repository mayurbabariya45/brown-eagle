import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Dashboard from "../../views/Dashboard/Dashboard";
import * as a from "../../actions/Dashboard/Dashboard_actions";
import * as c from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => ({
  ...state.dashboard,
  initialValues: {
    id: state.auth.user.id,
    email: state.auth.user.email,
    fax: state.auth.user.fax,
    telephone: state.auth.user.telephone,
    phone: state.auth.user.phone,
    companyName: state.auth.user.companyName,
    alternateEmail: state.auth.user.alternateEmail,
    facebook: _.find(state.auth.user.socialLinks, ["platform", "facebook"])
      ? _.find(state.auth.user.socialLinks, ["platform", "facebook"]).link
      : "",
    twitter:
      _.find(state.auth.user.socialLinks, ["platform", "twitter"]) &&
      _.find(state.auth.user.socialLinks, ["platform", "twitter"]).link,
    google:
      _.find(state.auth.user.socialLinks, ["platform", "google"]) &&
      _.find(state.auth.user.socialLinks, ["platform", "google"]).link,
    established: state.auth.user.profile && state.auth.user.profile.established,
    website: state.auth.user.profile && state.auth.user.profile.website,
    businessType:
      state.auth.user.profile && state.auth.user.profile.businessType,
    employeeCount:
      state.auth.user.profile && state.auth.user.profile.employeeCount,
    registeredAddress:
      state.auth.user.profile && state.auth.user.profile.registeredAddress,
    operationalAddress:
      state.auth.user.profile && state.auth.user.profile.operationalAddress,
    aboutUs: state.auth.user.profile && state.auth.user.profile.aboutUs
  }
});
const mapDispatchToProps = dispatch => ({
  changePassword: value => dispatch(a.changePassword(value)),
  updateProfile: value => dispatch(c.updateProfile(value)),
  updateAvatar: (value, token) => dispatch(a.userAvatar(value, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "profileInformationForm"
  })(Dashboard)
);
