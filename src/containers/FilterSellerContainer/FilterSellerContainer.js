import { connect } from "react-redux";
import FilterSellers from "../../views/Sellers/Sellers";
import * as a from "../../actions/FilterSellers/FilterSellers";

const mapStateToProps = state => ({
  ...state.sellers
});

const mapDispatchToProps = dispatch => ({
  getSellers: location => dispatch(a.getSellers(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSellers);
