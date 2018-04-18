// import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, change, formValueSelector } from "redux-form";
import CompanyInformationForm from "../../views/Dashboard/form/CompanyInformationForm";
import * as c from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => {
  const selector = formValueSelector("companyInformationForm");
  const companyInformationForm = {
    registeredAddress: selector(state, "registeredAddress"),
    r_city: selector(state, "r_city"),
    r_country: selector(state, "r_country"),
    r_area_code: selector(state, "r_area_code")
  };
  const initialValues = {
    id: state.auth.user.id,
    companyName: state.auth.user.companyName,
    established: state.auth.user.profile.established,
    website: state.auth.user.profile.website,
    businessType: state.auth.user.profile.businessType,
    employeeCount: state.auth.user.profile.employeeCount,
    registeredAddress: state.auth.user.profile.registeredAddress.address,
    r_city: state.auth.user.profile.registeredAddress.city,
    r_area_code: state.auth.user.profile.registeredAddress.areaCode,
    r_country: state.auth.user.profile.registeredAddress.country,
    operationalAddress: state.auth.user.profile.operationalAddress.address,
    o_country: state.auth.user.profile.operationalAddress.country,
    o_city: state.auth.user.profile.operationalAddress.city,
    o_area_code: state.auth.user.profile.operationalAddress.areaCode,
    aboutUs: state.auth.user.profile.aboutUs
  };
  return {
    auth: state.auth,
    companyInformationForm,
    initialValues
  };
};
const mapDispatchToProps = dispatch => ({
    changeFieldValue: (field, value) => 
    dispatch(change("companyInformationForm", field, value)),
    showNotification: (title, message, fail) => dispatch(c.showNotification(title, message, fail))
});
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "companyInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: true
  })(CompanyInformationForm)
);
