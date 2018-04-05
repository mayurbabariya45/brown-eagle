import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Login from "../../views/Auth/Login";
import * as a from "../../actions/Auth/Auth_actions";

const mapDispatchToProps = dispatch => ({
  toggleLoginForm: () => dispatch(a.toggleLoginForm()),
  flushState: () => dispatch(a.flushState()),
  login: value => dispatch(a.login(value)),
  socialLogin: provider => dispatch(a.socialLogin(provider)),
  socialLoginAccessToken: (token, provider) =>
    dispatch(a.socialAccessToken(token, provider))
});
const mapStateToProps = state => ({
  ...state.auth
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  socialLogin: provider => {
    actions.socialLogin(provider).then(user => {
      const { accessToken } = user.credential;
      actions.socialLoginAccessToken({ access_token: accessToken }, provider);
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "loginForm"
  })(Login)
);
