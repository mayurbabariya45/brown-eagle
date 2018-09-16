import { connect } from "react-redux";
import Quotations from "../../views/Dashboard/Quotations";
import * as a from "../../actions/Quotation/Quotation_actions";

const mapDispatchToProps = dispatch => ({
  getSellerQuotations: (sellerId, status, page) =>
    dispatch(a.getSellerQuotations(sellerId, status, page)),
  getCategories: () => dispatch(a.getCategories()),
  onSelectCategory: value => dispatch(a.onSelectCategory(value)),
  selectFilters: value => dispatch(a.selectFilters(value)),
  searchQuotation: values => dispatch(a.searchQuotation(values)),
  flushSearchQuery: () => dispatch(a.flushSearchQuery()),
  getSellerActivePlans: seller => dispatch(a.getSellerActivePlans(seller))
});
const mapStateToProps = state => ({
  quotation: state.quotation,
  categories: state.quotation.categories,
  selectedCategory: state.quotation.selectedCategory
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Quotations
);
