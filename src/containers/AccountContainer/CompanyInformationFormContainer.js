// import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, change, formValueSelector } from "redux-form";
import formValidationScroller from "../../variables/FormValidationScroller";
import CompanyInformationForm from "../../views/Account/form/CompanyInformationForm";
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
    established: state.auth.user.established,
    website: state.auth.user.website,
    employeeCount: state.auth.user.employeeCount,
    registeredAddress: state.auth.user.registeredAddress.address,
    r_city: state.auth.user.registeredAddress.city,
    r_area_code: state.auth.user.registeredAddress.areaCode,
    r_country: state.auth.user.registeredAddress.country,
    operationalAddress: state.auth.user.operationalAddress.address,
    o_country: state.auth.user.operationalAddress.country,
    o_city: state.auth.user.operationalAddress.city,
    o_area_code: state.auth.user.operationalAddress.areaCode,
    aboutUs: state.auth.user.aboutUs,
    name: state.auth.user.contactPerson.name,
    phone: state.auth.user.contactPerson.phone,
    email: state.auth.user.contactPerson.email
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
  showNotification: (title, message, fail) =>
    dispatch(c.showNotification(title, message, fail))
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "companyInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: true,
    onSubmitFail: errors => formValidationScroller(errors)
  })(CompanyInformationForm)
);
