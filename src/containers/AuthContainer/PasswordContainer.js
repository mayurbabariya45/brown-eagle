import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import Password from "../../views/Auth/ChangePassword";
import * as a from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => ({
  password: state.auth
});

const mapDispatchToProps = dispatch => ({
  changePassword: (value, locale) => dispatch(a.changePassword(value, locale)),
  flushState: () => dispatch(a.flushState())
});
const afterSubmit = (result, dispatch) => dispatch(reset("changePasswordForm"));
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "changePasswordForm",
    onSubmitSuccess: afterSubmit
  })(Password)
);
