import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import OrderItems from "./OrderItems";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      orderId: null,
      showModal: false
    };
    this.showOrderStatusModal = this.showOrderStatusModal.bind(this);
    this.handleChangeOrderStatus = this.handleChangeOrderStatus.bind(this);
  }
  componentWillMount() {
    const { getOrders, seller } = this.props;
    getOrders(seller, this.state.currentPage);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { getOrders, seller } = this.props;
    this.setState({ currentPage });
    getOrders(seller, currentPage);
    return false;
  };
  showOrderStatusModal(orderId) {
    this.setState({
      showModal: !this.state.showModal,
      orderId
    });
  }
  handleChangeOrderStatus(e) {
    const {
      changeOrderStatus,
      showNotification,
      getOrders,
      seller
    } = this.props;
    const value = e.target.value;
    changeOrderStatus(this.state.orderId, value).then(payload => {
      if (payload.type === "CHANGE_ORDERS_STATUS_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{payload.payload.response.message}</div>,
          true
        );
      } else {
        getOrders(seller, this.state.currentPage);
        this.setState({ showModal: false });
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Order Status has been changed successfully.</div>,
          false
        );
      }
    });
  }
  render() {
    const { translate, orders, loading, locale } = this.props;
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
                <h5>All Orders</h5>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="result-showing">
              <p>
                Showing {start} – {end} Order of {count} Orders
              </p>
            </div>
          </Col>
        </Row>
        <Row>
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
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Orders.propTypes = {
  translate: PropTypes.func.isRequired
};

export default Orders;
