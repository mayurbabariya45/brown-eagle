import { connect } from "react-redux";
import * as a from "../../actions/Auth/Auth_actions";
import Register from "../../views/Auth/Register";

const mapDispatchToProps = dispatch => ({
  checkUsername: (username, locale) =>
    dispatch(a.checkUsername(username, locale)),
  registerUser: (value, locale) => dispatch(a.register(value, locale)),
  verifyEmail: token => dispatch(a.verifyEmail(token))
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
  Register
);
