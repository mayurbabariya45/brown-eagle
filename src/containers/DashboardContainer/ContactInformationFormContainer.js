import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { scroller } from "react-scroll";
import ContactInformationForm from "../../views/Dashboard/form/ContactInformationForm";

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
export default connect(mapStateToProps)(
  reduxForm({
    form: "contactInformationForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmitFail: errors => scrollToFirstError(errors)
  })(ContactInformationForm)
);
