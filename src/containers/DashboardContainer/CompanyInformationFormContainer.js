import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, change, formValueSelector } from "redux-form";
import formValidationScroller from "../../variables/FormValidationScroller";
import CompanyInformationForm from "../../views/Dashboard/form/CompanyInformationForm";
import * as c from "../../actions/Auth/Auth_actions";
import * as d from "../../actions/Dashboard/Dashboard_actions";

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
    businessType: state.auth.user.businessType,
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
    products: state.dashboard.products.products,
    companyInformationForm,
    initialValues
  };
};
const mapDispatchToProps = dispatch => ({
  changeFieldValue: (field, value) =>
    dispatch(change("companyInformationForm", field, value)),
  showNotification: (title, message, fail) =>
    dispatch(c.showNotification(title, message, fail)),
  getLocation: (lat, lng) => dispatch(d.getLocation(lat, lng)),
  handleInputMap: type => dispatch(d.handleInputMap(type)),
  location: location => dispatch(d.location(location))
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  getLocation: (lats, lngs, type) => {
    actions.getLocation(lats, lngs).then(response => {
      if (response.type === "GET_LOCATION_SUCCESS") {
        if (_.isEmpty(response.payload.results)) {
          ownProps.showNotification(response.payload.error_message);
          return false;
        }
        const location = response.payload.results[0].formatted_address.split(
          ","
        );
        const country = location.pop();
        const zipcode = location.pop();
        const city = location.pop();
        const { lat, lng } = response.payload.results[0].geometry.location;
        if (type === "registeredAddress") {
          actions.changeFieldValue("r_city", city);
          actions.changeFieldValue("registeredAddress", location.join(","));
          actions.changeFieldValue("r_area_code", zipcode.split(" ").pop());
          actions.changeFieldValue("r_country", country);
          actions.location([lat, lng]);
        } else {
          actions.changeFieldValue("o_city", city);
          actions.changeFieldValue("operationalAddress", location.join(","));
          actions.changeFieldValue("o_area_code", zipcode.split(" ").pop());
          actions.changeFieldValue("o_country", country);
        }
      }
      return false;
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "companyInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: true,
    onSubmitFail: errors => formValidationScroller(errors)
  })(CompanyInformationForm)
);
