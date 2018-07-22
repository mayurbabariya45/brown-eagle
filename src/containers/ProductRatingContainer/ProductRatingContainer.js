import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import ProductRating from "../../components/ProductRating/ProductRating";

const selector = formValueSelector("ProductRatingForm");
const mapStateToProps = state => ({
  rating: selector(state, "rating") || 0
});

export default connect(mapStateToProps, null)(
  reduxForm({
    form: "ProductRatingForm"
  })(ProductRating)
);
