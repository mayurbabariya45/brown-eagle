import { connect } from "react-redux";
import Plans from "../../views/Plans/Plans";
import * as a from "../../actions/Plans/Plans_actions";

const mapStateToProps = state => ({
  ...state.plans
});

const mapDispatchToProps = dispatch => ({
  getPlans: () => dispatch(a.getPlans()),
  getServices: () => dispatch(a.getServices())
});

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
