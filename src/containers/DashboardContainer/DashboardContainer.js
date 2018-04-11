import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Dashboard from "../../views/Dashboard/Dashboard";
import * as a from "../../actions/Dashboard/Dashboard_actions";
import * as c from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => ({
  ...state.dashboard,
  initialValues: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  changePassword: value => dispatch(a.changePassword(value)),
  updateProfile: value => dispatch(c.updateProfile(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "profileInformationForm"
  })(Dashboard)
);
