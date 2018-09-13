import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import { Card } from "../../components/Card/Card";
import Button from "../../elements/CustomButton/CustomButton";
import ProductItems from "./ProductItem";
import ShippingAddressContainer from "../../containers/CheckoutContainer/ShippingContainer";
import OrderRemarks from "./OrderRemark";
import OrderSuccess from "./OrderSuccess";
import { getCurrency } from "../../variables/Variables";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remarks: ""
    };
    this.handlePlaceOrderButton = this.handlePlaceOrderButton.bind(this);
    this.handleOrderRemark = this.handleOrderRemark.bind(this);
  }
  componentWillMount() {
    const { getCartProducts } = this.props;
    getCartProducts();
  }
  componentWillUnmount() {
    const { flushCheckout } = this.props;
    flushCheckout();
  }
  onIncrement(item) {
    const { onIncrement, showNotification } = this.props;
    onIncrement(item).then(response => {
      if (response.type === "QUANTITY_INCREMENT_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${item.name} has been changed.`}</div>,
          false
        );
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>
            {`${item.name} quantity not changed. Please try again later.`}
          </div>,
          true
        );
      }
    });
  }
  onDecrement(item) {
    const { onDecrement, showNotification } = this.props;
    onDecrement(item).then(response => {
      if (response.type === "QUANTITY_DECREMENT_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${item.name} has been changed.`}</div>,
          false
        );
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>
            {`${item.name} quantity not changed. Please try again later.`}
          </div>,
          true
        );
      }
    });
  }
  handleOrderRemark(e) {
    const value = e.target.value;
    this.setState({
      remarks: value
    });
  }
  handlePlaceOrderButton() {
    const {
      auth,
      createOrder,
      checkout,
      showNotification,
      products
    } = this.props;
    const { address } = checkout;
    const buyer = auth.user.id;
    if (_.isEmpty(products)) return false;
    if (buyer) {
      const product = products[0];
      const createObjectValues = Object.assign(
        {},
        {
          buyer,
          product: product._id,
          quantity: product.quantity,
          price: {
            currency: product.currency,
            value: product.productPrice
          },
          shippingAddress: {
            ...address,
            contactName: `${address.f_name}${address.l_name}`
          },
          remarks: this.state.remarks || "---"
        }
      );
      createOrder(createObjectValues).then(response => {
        if (response.type === "ADD_ORDER_FAILURE") {
          showNotification(
            <span data-notify="icon" className="pe-7s-shield" />,
            <div>Something went wrong.Please try again later.</div>,
            true
          );
        }
      });
    }
    return false;
  }
  render() {
    const {
      translate,
      loading,
      cartProductTotal,
      products,
      saveAddress,
      locale,
      price,
      checkout,
      auth
    } = this.props;
    const { address, orderSuccess, orderLoading } = checkout;
    const authId = auth.user.id;
    let cartTotalPrice = 0;
    const cartItems = _.map(products, product => {
      cartTotalPrice += product.productPrice * product.quantity;
      return (
        <ProductItems
          locale={locale}
          key={product.id}
          translate={translate}
          product={product}
          onIncrement={() => this.onIncrement(product)}
          onDecrement={() => this.onDecrement(product)}
        />
      );
    });
    if (orderSuccess) {
      return (
        <section className="checkout-section">
          <Grid>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <div className="page-header">
                  <div className="title">
                    <ul>
                      <li>Checkout</li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
            {orderSuccess && <OrderSuccess />}
          </Grid>
        </section>
      );
    }
    return (
      <section className="checkout-section">
        <Grid>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="page-header">
                <div className="title">
                  <ul>
                    <li>Checkout</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          <BlockUi tag="div" blocking={orderLoading}>
            <Row>
              <Col md={12}>
                <div className="cart">
                  <Card
                    className="card-text"
                    plain
                    content={
                      <BlockUi tag="div" blocking={loading}>
                        <Row>
                          <Col md={cartProductTotal > 0 ? 9 : 12}>
                            <div className="cart-items">{cartItems}</div>
                          </Col>
                          {cartProductTotal > 0 && (
                            <Col md={3}>
                              <div className="cart-details">
                                <div className="cart-details-header">
                                  <h4>{translate("cart_details")}</h4>
                                </div>
                                <div className="cart-detail">
                                  <ul>
                                    <li>
                                      <span>
                                        Price ({cartProductTotal} item)
                                      </span>
                                      <span>
                                        {getCurrency(
                                          (!_.isEmpty(price) &&
                                            price.currency) ||
                                            "EUR"
                                        )}{" "}
                                        {cartTotalPrice.toFixed(2)}
                                      </span>
                                    </li>
                                    <li>
                                      <span>Delivery Charges</span>
                                      <span className="text-warning">FREE</span>
                                    </li>
                                    <li>
                                      <span>Amount Payable</span>
                                      <span>
                                        {getCurrency(
                                          (!_.isEmpty(price) &&
                                            price.currency) ||
                                            "EUR"
                                        )}{" "}
                                        {cartTotalPrice.toFixed(2)}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="cart-details-footer">
                                  {/* <p>{translate("cart_total_label")}</p> */}
                                </div>
                              </div>
                            </Col>
                          )}
                        </Row>
                      </BlockUi>
                    }
                  />
                </div>
              </Col>
            </Row>
            <ShippingAddressContainer
              translate={translate}
              saveAddress={saveAddress}
              auth={auth}
            />
            <OrderRemarks
              handleOrderRemark={this.handleOrderRemark}
              value={this.state.remarks}
            />
            {!_.isEmpty(products) &&
              !_.isEmpty(address) &&
              authId &&
              !_.isEmpty(address) && (
                <Row>
                  <Col md={12}>
                    <div className="checkout-button">
                      <Button
                        radius
                        fill
                        pullRight
                        bsStyle="warning"
                        className="text-capitalize"
                        onClick={this.handlePlaceOrderButton}
                      >
                        Place Order
                      </Button>
                    </div>
                  </Col>
                </Row>
              )}
          </BlockUi>
        </Grid>
      </section>
    );
  }
}

Checkout.propTypes = {
  translate: PropTypes.func.isRequired
};

export default Checkout;
