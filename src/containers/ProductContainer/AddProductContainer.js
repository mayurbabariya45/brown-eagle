import { connect } from "react-redux";
import AddProduct from "../../views/Product/AddProduct";
import * as a from "../../actions/Product/Product_actions";

const mapDispatchToProps = dispatch => ({
  addCategory: () => dispatch(a.AddCategory())
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
