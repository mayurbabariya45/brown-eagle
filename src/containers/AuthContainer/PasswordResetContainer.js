import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import PasswordReset from "../../views/Auth/PasswordReset";
import * as a from "../../actions/Auth/Auth_actions";

const mapDispatchToProps = dispatch => ({
  resetPassword: (value, locale) => dispatch(a.resetPassword(value, locale))
});
const mapStateToProps = state => ({
  ...state.auth
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});
const validate = values => {
  const errors = {};
  if (!values.c_password) {
    errors.c_password = "Please enter confirm password";
  } else if (values.password !== values.c_password) {
    errors.password = "The password does not match the confirm password.";
  }
  return errors;
};
const afterSubmit = (result, dispatch) => dispatch(reset("PasswordResetForm"));
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "PasswordResetForm",
    validate,
    onSubmitSuccess: afterSubmit
  })(PasswordReset)
);
