import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import ProductRating from "../../components/ProductRating/ProductRating";

const selector = formValueSelector("ProductRatingForm");
const mapStateToProps = (state, ownProps) => ({
  rating: selector(state, "rating") || 0,
  initialValues: ownProps.initialValues || {}
});

export default connect(mapStateToProps, null)(
  reduxForm({
    form: "ProductRatingForm",
    enableReinitialize: true,
    destroyOnUnmount: true
  })(ProductRating)
);
