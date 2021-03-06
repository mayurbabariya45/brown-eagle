import { connect } from "react-redux";
import Quotation from "../../views/Quotation/Quotation";

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
  Quotation
);
