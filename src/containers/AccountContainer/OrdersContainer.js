import { connect } from "react-redux";
import Orders from "../../views/Account/Orders/Orders";
import * as a from "../../actions/Account/Orders_actions";

const mapStateToProps = state => ({
  ...state.buyerOrders
});

const mapDispatchToProps = dispatch => ({
  getOrders: (authId, page) => dispatch(a.getOrders(authId, page)),
  payment: (orderId, token) => dispatch(a.payment(orderId, token)),
  cancelOrder: (orderId, status) => dispatch(a.cancelOrder(orderId, status)),
  getOrderTransactions: orderId => dispatch(a.getOrderTransactions(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
