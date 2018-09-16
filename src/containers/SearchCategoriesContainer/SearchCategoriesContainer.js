import _ from "lodash";
import { connect } from "react-redux";
import SearchCategories from "../../components/SearchCategories/SearchCategories";
import * as a from "../../actions/SearchCategories/SearchCategories";

const mapStateToProps = state => ({
  ...state.searchCategories,
  categories: state.categories.categories
});
const mapDispatchToProps = dispatch => ({
  onChange: (value, category) => dispatch(a.onChange(value, category)),
  onClear: () => dispatch(a.onClear()),
  onSelectCategory: value => dispatch(a.onSelectCategory(value)),
  onSearch: (value, category) => dispatch(a.onChange(value, category))
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  onSelection: suggestion => {
    const { id, name } = suggestion;
    ownProps.history.push(`/product/${_.kebabCase(name)}/${id}`);
    return true;
  }
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  SearchCategories
);
