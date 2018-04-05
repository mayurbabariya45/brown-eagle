import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Quotation from "../../components/Quotation/Quotation";

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({
  quotation: state.quotation
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "quotationForm"
  })(Quotation)
);
