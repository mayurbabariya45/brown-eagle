import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import AddNewReference from "../../views/Dashboard/AddNewReference";
import * as a from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => ({
  ...state.dashboard
});

const mapDispatchToProps = dispatch => ({
  createReference: (value, profileId, locale) =>
    dispatch(a.createReference(value, profileId, locale)),
  editReference: (value, referenceId, profileId, locale) =>
    dispatch(a.editReference(value, referenceId, profileId, locale)),
  resetForm: () => dispatch(reset("addNewReferenceForm"))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "addNewReferenceForm",
    enableReinitialize: true,
    destroyOnUnmount: false
  })(AddNewReference)
);
