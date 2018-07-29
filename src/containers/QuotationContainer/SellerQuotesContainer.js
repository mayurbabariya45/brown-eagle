import { connect } from "react-redux";
import SellerQuotes from "../../views/Dashboard/SellerQuotes";
import * as a from "../../actions/Quotation/Quotation_actions";

const mapDispatchToProps = dispatch => ({
  getSellerQuotes: (sellerId, page) =>
    dispatch(a.getSellerQuotes(sellerId, page))
});
const mapStateToProps = state => ({
  ...state.quotation
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerQuotes);
