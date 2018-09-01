import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import OrderItems from "./OrderItems";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
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
                <h5>My Orders</h5>
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