import { connect } from "react-redux";
import Orders from "../../views/Dashboard/Orders";
import * as a from "../../actions/Dashboard/Orders_actions";

const mapStateToProps = state => ({
  ...state.sellerOrders
});

const mapDispatchToProps = dispatch => ({
  getOrders: (authId, status, page) =>
    dispatch(a.getOrders(authId, status, page)),
  changeOrderStatus: (orderId, status) =>
    dispatch(a.changeOrderStatus(orderId, status)),
  updateOrder: values => dispatch(a.updateOrder(values)),
  getOrderTransactions: (orderId, seller) =>
    dispatch(a.getOrderTransactions(orderId, seller)),
  selectFilters: value => dispatch(a.selectFilters(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
