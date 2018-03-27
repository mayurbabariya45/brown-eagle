import { connect } from "react-redux";
import Product from "../../views/Product/Product";
import * as a from "../../actions/Product/Product_actions";

const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(a.onIncrement()),
  onDecrement: () => dispatch(a.onDecrement())
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
  Product
);
