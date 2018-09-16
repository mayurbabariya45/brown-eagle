import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import OrderItems from "./OrderItems";
import ViewOrder from "./ViewOrder";
import StatusFilter from "./OrderStatus";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      viewOrder: false,
      order: {}
    };
    this.showOrderStatusModal = this.showOrderStatusModal.bind(this);
    this.handleChangeOrderStatus = this.handleChangeOrderStatus.bind(this);
    this.handleViewOrder = this.handleViewOrder.bind(this);
    this.clearViewOrderState = this.clearViewOrderState.bind(this);
  }
  componentWillMount() {
    const { getOrders, seller } = this.props;
    getOrders(seller, "all", this.state.currentPage);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { getOrders, seller, selectedFilter } = this.props;
    this.setState({ currentPage });
    getOrders(seller, _.lowerCase(selectedFilter), currentPage);
    return false;
  };
  showOrderStatusModal(orderId) {
    this.setState({
      showModal: !this.state.showModal,
      orderId
    });
  }
  handleChangeOrderStatus(status, touched, values) {
    const {
      changeOrderStatus,
      showNotification,
      selectedFilter,
      getOrders,
      seller
    } = this.props;
    if (_.isEmpty(this.state.order)) return false;
    const { id } = this.state.order;
    changeOrderStatus(id, status).then(payload => {
      if (payload.type === "CHANGE_ORDERS_STATUS_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{payload.payload.response.message}</div>,
          true
        );
      } else {
        this.setState({ order: {}, viewOrder: false, showModal: false });
        getOrders(seller, _.lowerCase(selectedFilter), this.state.currentPage);
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Order Status has been changed successfully.</div>,
          false
        );
        return false;
      }
    });
    return false;
  }
  handleViewOrder(order) {
    this.setState({ order, viewOrder: true });
  }
  clearViewOrderState() {
    this.setState({ order: {}, viewOrder: false });
  }
  render() {
    const {
      translate,
      orders,
      loading,
      locale,
      showNotification,
      getOrderTransactions,
      transactions,
      isLoading,
      selectFilters,
      selectedFilter,
      getOrders,
      seller
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
                <h5>{this.state.viewOrder ? "View Order" : "All Orders"}</h5>
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
        {!this.state.viewOrder && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="orders-filter">
                <StatusFilter
                  seller={seller}
                  getOrders={getOrders}
                  selectFilters={selectFilters}
                  selectedFilter={selectedFilter}
                />
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
                  showModal={this.state.showModal}
                  showOrderStatusModal={this.showOrderStatusModal}
                  handleChangeOrderStatus={this.handleChangeOrderStatus}
                  handleViewOrder={this.handleViewOrder}
                />
              </div>
            </Col>
          )}
          {this.state.viewOrder && (
            <Col md={12} sm={12} xs={12}>
              <div className="view-order">
                <ViewOrder
                  seller={seller}
                  loading={loading}
                  locale={locale}
                  translate={translate}
                  handleBackButton={this.clearViewOrderState}
                  showNotification={showNotification}
                  order={this.state.order}
                  handleOrderStatus={this.handleChangeOrderStatus}
                  getOrderTransactions={getOrderTransactions}
                  transactions={transactions}
                  isLoading={isLoading}
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
  translate: PropTypes.func.isRequired
};

export default Orders;
