import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, formValueSelector, change } from "redux-form";
import Dashboard from "../../views/Dashboard/Dashboard";
// import * as a from "../../actions/Dashboard/Dashboard_actions";
import * as c from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => ({
  ...state.dashboard,

  initialValues: {
    id: state.auth.user.id,
    email: formValueSelector("profileInformationForm")(state, "email")
      ? formValueSelector("profileInformationForm")(state, "email")
      : state.auth.user.email,
    fax: formValueSelector("profileInformationForm")(state, "fax")
      ? formValueSelector("profileInformationForm")(state, "fax")
      : state.auth.user.fax,
    telephone: formValueSelector("profileInformationForm")(state, "telephone")
      ? formValueSelector("profileInformationForm")(state, "telephone")
      : state.auth.user.telephone,
    phone: formValueSelector("profileInformationForm")(state, "phone")
      ? formValueSelector("profileInformationForm")(state, "phone")
      : state.auth.user.phone,
    companyName: formValueSelector("profileInformationForm")(
      state,
      "companyName"
    )
      ? formValueSelector("profileInformationForm")(state, "companyName")
      : state.auth.user.companyName,
    alternateEmail: formValueSelector("profileInformationForm")(
      state,
      "alternateEmail"
    )
      ? formValueSelector("profileInformationForm")(state, "alternateEmail")
      : state.auth.user.alternateEmail,
    facebook: _.find(state.auth.user.socialLinks, ["platform", "facebook"])
      ? _.find(state.auth.user.socialLinks, ["platform", "facebook"]).link
      : "",
    twitter:
      _.find(state.auth.user.socialLinks, ["platform", "twitter"]) &&
      _.find(state.auth.user.socialLinks, ["platform", "twitter"]).link,
    google:
      _.find(state.auth.user.socialLinks, ["platform", "google"]) &&
      _.find(state.auth.user.socialLinks, ["platform", "google"]).link,
    established:
      formValueSelector("profileInformationForm")(state, "established") ||
      formValueSelector("profileInformationForm")(state, "established") === ""
        ? formValueSelector("profileInformationForm")(state, "established")
        : state.auth.user.profile && state.auth.user.profile.established,
    website: formValueSelector("profileInformationForm")(state, "website")
      ? formValueSelector("profileInformationForm")(state, "website")
      : state.auth.user.profile && state.auth.user.profile.website,
    businessType: formValueSelector("profileInformationForm")(
      state,
      "businessType"
    )
      ? formValueSelector("profileInformationForm")(state, "businessType")
      : state.auth.user.profile && state.auth.user.profile.businessType,
    employeeCount: formValueSelector("profileInformationForm")(
      state,
      "employeeCount"
    )
      ? formValueSelector("profileInformationForm")(state, "employeeCount")
      : state.auth.user.profile && state.auth.user.profile.employeeCount,
    registeredAddress: formValueSelector("profileInformationForm")(
      state,
      "registeredAddress"
    )
      ? formValueSelector("profileInformationForm")(state, "registeredAddress")
      : state.auth.user.profile &&
        state.auth.user.profile.registeredAddress.address,
    r_city: formValueSelector("profileInformationForm")(state, "r_city")
      ? formValueSelector("profileInformationForm")(state, "r_city")
      : state.auth.user.profile &&
        state.auth.user.profile.registeredAddress.city,
    o_city: formValueSelector("profileInformationForm")(state, "o_city")
      ? formValueSelector("profileInformationForm")(state, "o_city")
      : state.auth.user.profile &&
        state.auth.user.profile.operationalAddress.city,
    r_area_code: formValueSelector("profileInformationForm")(
      state,
      "r_area_code"
    )
      ? formValueSelector("profileInformationForm")(state, "r_area_code")
      : state.auth.user.profile &&
        state.auth.user.profile.registeredAddress.areaCode,
    o_area_code: formValueSelector("profileInformationForm")(
      state,
      "o_area_code"
    )
      ? formValueSelector("profileInformationForm")(state, "o_area_code")
      : state.auth.user.profile &&
        state.auth.user.profile.operationalAddress.areaCode,
    r_country: formValueSelector("profileInformationForm")(state, "r_country")
      ? formValueSelector("profileInformationForm")(state, "r_country")
      : state.auth.user.profile &&
        state.auth.user.profile.registeredAddress.country,
    o_country: formValueSelector("profileInformationForm")(state, "o_country")
      ? formValueSelector("profileInformationForm")(state, "o_country")
      : state.auth.user.profile &&
        state.auth.user.profile.operationalAddress.country,
    operationalAddress: formValueSelector("profileInformationForm")(
      state,
      "operationalAddress"
    )
      ? formValueSelector("profileInformationForm")(state, "operationalAddress")
      : state.auth.user.profile &&
        state.auth.user.profile.operationalAddress.address,
    aboutUs: formValueSelector("profileInformationForm")(state, "aboutUs")
      ? formValueSelector("profileInformationForm")(state, "aboutUs")
      : state.auth.user.profile && state.auth.user.profile.aboutUs
  }
});
const mapDispatchToProps = dispatch => ({
  updateProfile: value => dispatch(c.updateProfile(value)),
  changeFieldValue: (field, value) =>
    dispatch(change("profileInformationForm", field, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "profileInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: false
  })(Dashboard)
);
