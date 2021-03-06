import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import ForgotPassword from "../../views/Auth/ForgotPassword";
import * as a from "../../actions/Auth/Auth_actions";

const mapDispatchToProps = dispatch => ({
  resetPasswordEmail: (value, locale) =>
    dispatch(a.resetPasswordEmail(value, locale)),
  flushState: () => dispatch(a.flushState())
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
    form: "forgotPasswordForm"
  })(ForgotPassword)
);
