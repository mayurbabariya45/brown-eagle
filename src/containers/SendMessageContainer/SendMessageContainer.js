import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import SendMessageForm from "../../views/Product/SendMessageForm";

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "sendMessageForm"
  })(SendMessageForm)
);
