import { connect } from "react-redux";
import * as a from "../../actions/Auth/Auth_actions";
import Register from "../../views/Auth/Register";

const mapDispatchToProps = dispatch => ({
  checkUsername: username => dispatch(a.checkUsername(username)),
  registerUser: value => dispatch(a.register(value)),
  verifyEmail: token => dispatch(a.verifyEmail(token))
});
const mapStateToProps = state => ({
  ...state.auth
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  registerUser: value => {
    actions.registerUser(value).then(data => {
      const token = data.payload.id;
      actions.verifyEmail(token);
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Register
);
