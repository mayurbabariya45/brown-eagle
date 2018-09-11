import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import OrderItems from "./OrderItems";
import ViewOrder from "./ViewOrder";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      viewOrder: false,
      order: {}
    };
    this.handleViewOrder = this.handleViewOrder.bind(this);
    this.clearViewOrderState = this.clearViewOrderState.bind(this);
    this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
  }
  componentWillMount() {
    const { getOrders, buyerId } = this.props;
    getOrders(buyerId, this.state.currentPage);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { getOrders, buyerId } = this.props;
    this.setState({ currentPage });
    getOrders(buyerId, currentPage);
    return false;
  };
  handleViewOrder(order) {
    this.setState({ order, viewOrder: true });
  }
  clearViewOrderState() {
    this.setState({ order: {}, viewOrder: false });
  }
  handlePaymentMethod(){
    const { getOrders, buyerId } = this.props;
    getOrders(buyerId, this.state.currentPage);
    this.setState({ order: {}, viewOrder: false });
  }
  render() {
    const {
      translate,
      orders,
      loading,
      locale,
      payment,
      showNotification,
      getOrderTransactions,
      transactions,
      buyerId,
      isLoading
    } = this.props;
    const { count, order } = orders;
    const { currentPage } = this.state;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <div className="account-orders">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>My Orders</h5>
              </div>
            </div>
          </Col>
        </Row>
        {!this.state.viewOrder && (
          <Row>
            <Col md={12}>
              <div className="result-showing">
                <p>
                  Showing {start} – {end} Order of {count} Orders
                </p>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          {!this.state.viewOrder && (
            <Col md={12}>
              <div className="orders-lists box-listings">
                <OrderItems
                  onPageChanged={this.onPageChanged}
                  count={count}
                  orders={order}
                  loading={loading}
                  locale={locale}
                  handleViewOrder={this.handleViewOrder}
                />
              </div>
            </Col>
          )}
          {this.state.viewOrder && (
            <Col md={12} sm={12} xs={12}>
              <div className="view-order">
                <ViewOrder
                  buyerId={buyerId}
                  payment={payment}
                  translate={translate}
                  handleBackButton={this.clearViewOrderState}
                  showNotification={showNotification}
                  getOrderTransactions={getOrderTransactions}
                  order={this.state.order}
                  transactions={transactions}
                  isLoading={isLoading}
                  handlePaymentMethod={this.handlePaymentMethod}
                />
              </div>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

Orders.propTypes = {
  translate: PropTypes.func.isRequired,
  getOrderTransactions: PropTypes.func.isRequired
};

export default Orders;
