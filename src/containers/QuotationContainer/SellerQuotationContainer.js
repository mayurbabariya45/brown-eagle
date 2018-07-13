import { connect } from "react-redux";
import Quotation from "../../views/Dashboard/Quotations";
import * as c from "../../actions/Categories/Categories_actions";
import * as a from "../../actions/Quotation/Quotation_actions";

const mapDispatchToProps = dispatch => ({
  onSelectCategory: value => dispatch(c.onSelectCategory(value)),
  selectFilters: value => dispatch(a.selectFilters(value)),
  searchQuotation: values => dispatch(a.searchQuotation(values))
});
const mapStateToProps = state => ({
  quotation: state.quotation,
  categories: state.categories.categories,
  selectedCategory: state.categories.selectedCategory
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Quotation
);
