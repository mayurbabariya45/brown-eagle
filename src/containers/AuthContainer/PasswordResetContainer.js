import { connect } from "react-redux";
import { reduxForm } from "redux-form";
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "PasswordResetForm"
  })(PasswordReset)
);
