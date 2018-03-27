import { connect } from "react-redux";
import Dashboard from "../../views/Dashboard/Dashboard";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
