import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import { Card } from "../../components/Card/Card";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import Button from "../../elements/CustomButton/CustomButton";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";
import adsBanner from "../../assets/img/ads/banner.jpg";
import ProductItems from "./ProductItem";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.removeCartItem = this.removeCartItem.bind(this);
    this.addToWhishlist = this.addToWhishlist.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.handleContinueButton = this.handleContinueButton.bind(this);
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
  removeCartItem(item) {
    const { removeCartItem, showNotification } = this.props;
    removeCartItem(item).then(response => {
      if (response.type === "REMOVE_CART_PRODUCT_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${item.name} has been deleted successfully.`}</div>,
          false
        );
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{`${item.name} not deleted. Please try again later.`}</div>,
          true
        );
      }
    });
  }
  addToWhishlist(item) {
    const { addToWhishlist, showNotification } = this.props;
    addToWhishlist(item).then(response => {
      if (response.type === "ADD_TO_WISHLIST_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${item.name} has been added successfully.`}</div>,
          false
        );
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{`${item.name} not deleted. Please try again later.`}</div>,
          true
        );
      }
    });
  }
  handleContinueButton() {
    const { history } = this.props;
    history.push("/products");
  }
  render() {
    const { translate, products, loading, cartProductTotal } = this.props;
    let cartTotalPrice = 0;
    const cartItems = _.map(products, (product, index) => {
      cartTotalPrice += product.productPrice * product.quantity;
      return (
        <ProductItems
          key={product.id}
          translate={translate}
          buttons={products.length - 1 === index}
          product={product}
          onIncrement={() => this.onIncrement(product)}
          onDecrement={() => this.onDecrement(product)}
          removeCartItem={() => this.removeCartItem(product)}
          addToWhishlist={() => this.addToWhishlist(product)}
          handleContinueButton={this.handleContinueButton}
        />
      );
    });
    return (
      <section className="cart-section">
        <Grid>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="page-header">
                <div className="title">
                  <ul>
                    <li>{translate("cart_title")}</li>
                    <li className="right">{cartProductTotal}</li>
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
                          <div className="cart-items">
                            {cartItems}
                            {cartProductTotal < 1 && (
                              <div className="cart-item-empty">
                                <div className="cart-content">
                                  <p>Your card is empty.</p>
                                </div>
                                <div className="cart-actions">
                                  <Button
                                    fill
                                    radius
                                    bsStyle="warning"
                                    onClick={this.handleContinueButton}
                                  >
                                    <span>{translate("cart_continue")}</span>
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
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
                                <p>{translate("cart_total_label")}</p>
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
          <Row>
            <Col md={9}>
              <Row>
                <Col md={12}>
                  <div className="section-header section-tabs-bg">
                    <h5>{translate("cart_trading")}</h5>
                  </div>
                  <ProductSlider
                    products={[
                      product1,
                      product2,
                      product3,
                      product1,
                      product2,
                      product3
                    ]}
                    buttons={false}
                    arrows={false}
                    multiple
                    productChunk={3}
                    banner={false}
                    translate={translate}
                    SliderSettings={{
                      dots: false,
                      infinite: false,
                      arrows: true,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      className:
                        "products items produsts-list-vertical products-list-box product-items"
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="section-header section-tabs-bg">
                    <h5>{translate("cart_premium")}</h5>
                  </div>
                  <ProductSlider
                    products={[
                      product1,
                      product2,
                      product3,
                      product1,
                      product2,
                      product3
                    ]}
                    buttons={false}
                    arrows={false}
                    multiple
                    productChunk={3}
                    banner={false}
                    translate={translate}
                    SliderSettings={{
                      dots: false,
                      infinite: false,
                      arrows: true,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      className:
                        "products items produsts-list-vertical products-list-box product-items"
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <div className="ads-banners">
                <div className="ads">
                  <img src={adsBanner} className="img-responsive" alt="" />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}
Cart.propTypes = {
  translate: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  cartProductTotal: PropTypes.number.isRequired,
  removeCartItem: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  addToWhishlist: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
Cart.defaultProps = {};
export default Cart;
