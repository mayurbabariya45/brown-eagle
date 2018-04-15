import { connect } from "react-redux";
import AddProduct from "../../views/Dashboard/AddProduct";
import * as a from "../../actions/Product/Product_actions";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(a.getCategories()),
  addCategory: () => dispatch(a.AddCategory()),
  selectCategory: category => dispatch(a.selectCategory(category)),
  selectLanguage: lang => dispatch(a.selectLanguage(lang)),
  searchCategories: value => dispatch(a.searchCategories(value)),
  handleCategory: value => dispatch(a.handleCategory(value)),
  flushCategories: () => dispatch(a.flushCategories())
});
const mapStateToProps = state => ({
  ...state.product
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  AddProduct
);
