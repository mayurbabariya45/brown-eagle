import { connect } from "react-redux";
import Dashboard from "../../views/Dashboard/Dashboard";
// import * as a from "../../actions/Dashboard/Dashboard_actions";
import * as c from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => ({
  ...state.dashboard
});
const mapDispatchToProps = dispatch => ({
  updateProfile: value => dispatch(c.updateProfile(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
