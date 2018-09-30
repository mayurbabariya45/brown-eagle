import { connect } from "react-redux";
import CompareProduct from "../../views/CompareProduct/CompareProduct";
import * as a from "../../actions/Product/Compare_actions";

const mapStateToProps = state => ({
  ...state.compare
});

const mapDispatchToProps = dispatch => ({
  selectFilterProduct: item => dispatch(a.selectFilterProduct(item)),
  removeProduct: item => dispatch(a.removeProduct(item)),
  setFilterProduct: item => dispatch(a.setFilterProduct(item)),
  resetFilterProduct: item => dispatch(a.resetFilterProduct(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompareProduct);
