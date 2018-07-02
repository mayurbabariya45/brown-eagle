import { connect } from "react-redux";
import SearchCategories from "../../components/SearchCategories/SearchCategories";
import * as a from "../../actions/SearchCategories/SearchCategories";

const mapStateToProps = state => ({
  ...state.searchCategories,
  categories: state.categories.categories
});
const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(a.onChange(value)),
  onClear: () => dispatch(a.onClear()),
  onSelection: () => console.log("called"),
  onSelectCategory: value => dispatch(a.onSelectCategory(value)),
  onSearch: value => console.log(value, "enter")
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchCategories);
