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

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlePlaceOrderButton = this.handlePlaceOrderButton.bind(this);
  }
  componentWillMount() {
    const { cartProductTotal } = this.props;
  }
  handlePlaceOrderButton() {}
  render() {
    const {
      translate,
      loading,
      cartProductTotal,
      products,
      saveAddress
    } = this.props;
    let cartTotalPrice = 0;
    const cartItems = _.map(products, product => {
      cartTotalPrice += product.productPrice * product.quantity;
      return (
        <ProductItems
          key={product.id}
          translate={translate}
          product={product}
        />
      );
    });
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
                                    <span>Price ({cartProductTotal} item)</span>
                                    <span>₹ {cartTotalPrice.toFixed(2)}</span>
                                  </li>
                                  <li>
                                    <span>Delivery Charges</span>
                                    <span className="text-warning">FREE</span>
                                  </li>
                                  <li>
                                    <span>Amount Payable</span>
                                    <span>₹ {cartTotalPrice.toFixed(2)}</span>
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
          />
          <OrderRemarks />
          <Row>
            <Col md={12}>
              <div className="checkout-button">
                <Button
                  radius
                  fill
                  pullRight
                  bsStyle="warning"
                  className="text-capitalize"
                >
                  Place Order
                </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

Checkout.propTypes = {
  translate: PropTypes.func.isRequired
};

export default Checkout;
