import { connect } from "react-redux";
import Cart from "../../views/Cart/Cart";

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({
  ...state.product
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Cart);
