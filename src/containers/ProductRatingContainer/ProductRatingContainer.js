import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import ProductRating from "../../components/ProductRating/ProductRating";

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "ProductRatingForm"
  })(ProductRating)
);
