import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import Button from "../../elements/CustomButton/CustomButton";
import ProductItems from "./ProductItem";
import ShippingAddressContainer from "../../containers/CheckoutContainer/ShippingContainer";
import OrderRemarks from "./OrderRemark";
import OrderSuccess from "./OrderSuccess";
import CartTotal from "./CartTotal";
import ShippingOptions from "./ShippingOptions";

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
    const { address, selectedShipping } = checkout;
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
          shippingMethod: {
            ...selectedShipping
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
      getShippingOptions,
      showNotification,
      selectShippingOption,
      locale,
      price,
      checkout,
      auth
    } = this.props;
    const {
      address,
      orderSuccess,
      orderLoading,
      showOrder,
      shippingOptions,
      selectedShipping,
      isShippingError
    } = checkout;
    const authId = auth.user.id;
    let cartTotalPrice = 0;
    let productId = 0;
    let productUnits = 0;
    const cartItems = _.map(products, product => {
      cartTotalPrice += product.productPrice * product.quantity;
      productId = product.id || product._id;
      productUnits = product.quantity;
      return (
        <ProductItems
          key={product.id || product._id}
          locale={locale}
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
            {!showOrder && (
              <ShippingAddressContainer
                translate={translate}
                productId={productId}
                productUnits={productUnits}
                saveAddress={saveAddress}
                getShippingOptions={getShippingOptions}
                showNotification={showNotification}
                isShippingError={isShippingError}
                auth={auth}
              />
            )}
            {showOrder && (
              <div>
                <CartTotal
                  translate={translate}
                  loading={loading}
                  cartItems={cartItems}
                  cartProductTotal={cartProductTotal}
                  cartTotalPrice={cartTotalPrice}
                  selectedShipping={selectedShipping}
                  price={price}
                />
                <ShippingOptions
                  translate={translate}
                  selectShippingOption={selectShippingOption}
                  selectedShipping={selectedShipping}
                  shippingOptions={shippingOptions}
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
              </div>
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
