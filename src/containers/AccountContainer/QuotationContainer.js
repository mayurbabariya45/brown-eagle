import { connect } from "react-redux";
import Account from "../../views/Account/Quotation";
import * as a from "../../actions/Quotation/Quotation_actions";

const mapStateToProps = state => ({
  quotation: state.quotation
});

const mapDispatchToProps = dispatch => ({
  getBuyerQuotations: (buyerId, page) =>
    dispatch(a.getBuyerQuotations(buyerId, page)),
    getQuotationQuotes: (quotationId, status, page) =>
    dispatch(a.getQuotationQuotes(quotationId, status, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
