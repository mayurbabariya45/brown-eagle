// import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, change, formValueSelector } from "redux-form";
import { scroller } from "react-scroll";
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
  showNotification: (title, message, fail) =>
    dispatch(c.showNotification(title, message, fail)),
  getLocation: (lat, lng) => dispatch(d.getLocation(lat, lng)),
  handleInputMap: type => dispatch(d.handleInputMap(type))
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  getLocation: (lat, lng, type) => {
    actions.getLocation(lat, lng).then(response => {
      if (response.type === "GET_LOCATION_SUCCESS") {
        const location = response.payload.results[0].formatted_address.split(
          ","
        );
        const country = location.pop();
        const zipcode = location.pop();
        const city = location.pop();
        if (type === "registeredAddress") {
          actions.changeFieldValue("r_city", city);
          actions.changeFieldValue("registeredAddress", location.join(","));
          actions.changeFieldValue("r_area_code", zipcode.split(" ").pop());
          actions.changeFieldValue("r_country", country);
        } else {
          actions.changeFieldValue("o_city", city);
          actions.changeFieldValue("operationalAddress", location.join(","));
          actions.changeFieldValue("o_area_code", zipcode.split(" ").pop());
          actions.changeFieldValue("o_country", country);
        }
      }
    });
  }
});
function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );
}
function getErrorFieldNames(obj, name = "") {
  const errorArr = [];
  errorArr.push(
    Object.keys(obj)
      .map(key => {
        const next = obj[key];
        if (next) {
          if (typeof next === "string") {
            return name + key;
          }
          // Keep looking
          if (next.map) {
            errorArr.push(
              next
                .map((item, index) =>
                  getErrorFieldNames(item, `${name}${key}[${index}].`)
                )
                .filter(o => o)
            );
          }
        }
        return null;
      })
      .filter(o => o)
  );
  return flatten(errorArr);
}

function scrollToFirstError(errors) {
  const errorFields = getErrorFieldNames(errors);
  // Using breakable for loop
  for (let i = 0; i < errorFields.length; i++) {
    const fieldName = errorFields[i];
    // Checking if the marker exists in DOM
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { offset: -200, smooth: true });
      break;
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "companyInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: true,
    onSubmitFail: errors => scrollToFirstError(errors)
  })(CompanyInformationForm)
);
