import { connect } from "react-redux";
import Quotations from "../../views/Dashboard/Quotations";
import * as c from "../../actions/Categories/Categories_actions";
import * as a from "../../actions/Quotation/Quotation_actions";

const mapDispatchToProps = dispatch => ({
  getSellerQuotations: (sellerId, page) =>
    dispatch(a.getSellerQuotations(sellerId, page)),
  onSelectCategory: value => dispatch(c.onSelectCategory(value)),
  selectFilters: value => dispatch(a.selectFilters(value)),
  searchQuotation: values => dispatch(a.searchQuotation(values)),
  flushSearchQuery: () => dispatch(a.flushSearchQuery())
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
  Quotations
);
