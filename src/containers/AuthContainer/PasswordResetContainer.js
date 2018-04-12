import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PasswordReset from "../../views/Auth/PasswordReset";
import * as a from "../../actions/Auth/Auth_actions";

const mapDispatchToProps = dispatch => ({
  resetPassword: value => dispatch(a.resetPassword(value))
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
