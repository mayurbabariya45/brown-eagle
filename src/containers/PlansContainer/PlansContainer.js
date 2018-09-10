import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Plans from "../../views/Plans/Plans";
import formValidationScroller from "../../variables/FormValidationScroller";
import * as a from "../../actions/Plans/Plans_actions";

const mapStateToProps = state => ({
  ...state.plans,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getPlans: () => dispatch(a.getPlans()),
  getServices: () => dispatch(a.getServices()),
  selectedPlans: selectedPlan => dispatch(a.selectedPlans(selectedPlan)),
  payment: (seller, values) => dispatch(a.payment(seller, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "plansForm",
    enableReinitialize: true,
    destroyOnUnmount: true,
    onSubmitFail: errors => formValidationScroller(errors)
  })(Plans)
);
