import { connect } from "react-redux";
import Categories from "../../components/Categories/Categories";
import * as a from "../../actions/Categories/Categories_actions";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(a.getCategories())
});
const mapStateToProps = state => ({
  ...state.categories
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Categories
);
