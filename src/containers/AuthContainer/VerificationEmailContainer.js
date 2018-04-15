import { connect } from "react-redux";
import VerificationEmail from "../../views/Auth/VerificationEmail";
import * as a from "../../actions/Auth/Auth_actions";

const mapDispatchToProps = dispatch => ({
  VerificationEmail: (value, locale) =>
    dispatch(a.VerificationEmail(value, locale))
});
const mapStateToProps = state => ({
  ...state.verification
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  VerificationEmail
);
