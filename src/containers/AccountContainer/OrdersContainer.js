import { connect } from "react-redux";
import Orders from "../../views/Account/Orders/Orders";
import * as a from "../../actions/Account/Orders_actions";

const mapStateToProps = state => ({
  ...state.buyerOrders
});

const mapDispatchToProps = dispatch => ({
  getOrders: (authId, page, status) =>
    dispatch(a.getOrders(authId, page, status)),
  payment: (orderId, token) => dispatch(a.payment(orderId, token)),
  getTermAndCondition: loc => dispatch(a.getTermAndCondition(loc)),
  cancelOrder: (orderId, status) => dispatch(a.cancelOrder(orderId, status)),
  getOrderTransactions: (buyer, status) =>
    dispatch(a.getOrderTransactions(buyer, status)),
  selectFilters: value => dispatch(a.selectFilters(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
