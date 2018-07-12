import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import SubmitQuote from "../../views/Dashboard/SubmitQuote";
import * as a from "../../actions/Quotation/Quotation_actions";

const mapDispatchToProps = dispatch => ({
  submitQuote: (values, locale) => dispatch(a.submitQuote(values, locale))
});
const mapStateToProps = state => ({
  ...state.quotation
});
const afterSubmit = (result, dispatch) => dispatch(reset("submitQuoteForm"));
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "submitQuoteForm",
    enableReinitialize: true,
    destroyOnUnmount: true,
    onSubmitSuccess: afterSubmit
  })(SubmitQuote)
);
