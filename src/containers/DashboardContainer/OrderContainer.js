import { connect } from "react-redux";
import Orders from "../../views/Dashboard/Orders";
import * as a from "../../actions/Dashboard/Orders_actions";

const mapStateToProps = state => ({
  ...state.sellerOrders
});

const mapDispatchToProps = dispatch => ({
  getOrders: (authId, page) => dispatch(a.getOrders(authId, page)),
  changeOrderStatus: (orderId, status) =>
    dispatch(a.changeOrderStatus(orderId, status)),
  updateOrder: values => dispatch(a.updateOrder(values)),
  getOrderTransactions: (orderId, seller) =>
    dispatch(a.getOrderTransactions(orderId, seller))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
