import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "../../components/Card/Card";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import Quantity from "../../components/Quantity/Quantity";
import Button from "../../elements/CustomButton/CustomButton";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";
import product5 from "../../assets/img/products/product5.jpg";
import adsBanner from "../../assets/img/ads/banner.jpg";

const preloader = () => <ContentLoader height={300} inFight />;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { translate, quantity, onIncrement, onDecrement } = this.props;
    return (
      <section className="cart-section">
        <Grid>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="page-header">
                <div className="title">
                  <ul>
                    <li>{translate("cart_title")}</li>
                    <li className="right">2</li>
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
                    <Row>
                      <Col md={9}>
                        <div className="cart-items">
                          <div className="cart-item">
                            <div className="image-container">
                              <div className="product-image-container">
                                <a
                                  href="#products"
                                  className="product photo product-item-photo"
                                >
                                  <ImageLoader
                                    preloader={preloader}
                                    src={product5}
                                  />
                                </a>
                              </div>
                              <div className="cart-quantity">
                                <Quantity
                                  label
                                  quantity={quantity}
                                  onIncrement={onIncrement}
                                  onDecrement={onDecrement}
                                />
                              </div>
                            </div>
                            <div className="cart-item-details">
                              <div className="product-title">
                                <p>
                                  High quality cheap price adult coloring books
                                </p>
                              </div>
                              <div className="product-discount">
                                <p>FOB Reference Price: Get Latest Price</p>
                              </div>
                              <div className="product-price">
                                <p>
                                  <span className="text-warning">Price -</span>
                                  <span>1797/-</span>
                                  <span>₹2,997 40% Off 1 Offer Available</span>
                                </p>
                                <div className="actions product-action">
                                  <Button
                                    className="btn-radius btn-fill"
                                    onClick={onIncrement}
                                  >
                                    {translate("cart_wishlist")}
                                  </Button>
                                  <Button
                                    className="btn-radius btn-fill"
                                    onClick={onIncrement}
                                  >
                                    {translate("cart_remove")}
                                  </Button>
                                </div>
                              </div>
                              <div className="cart-actions" />
                            </div>
                          </div>
                          <div className="cart-item">
                            <div className="image-container">
                              <div className="product-image-container">
                                <a
                                  href="#products"
                                  className="product photo product-item-photo"
                                >
                                  <ImageLoader
                                    preloader={preloader}
                                    src={product5}
                                  />
                                </a>
                              </div>
                              <div className="cart-quantity">
                                <Quantity
                                  label
                                  quantity={quantity}
                                  onIncrement={onIncrement}
                                  onDecrement={onDecrement}
                                />
                              </div>
                            </div>
                            <div className="cart-item-details">
                              <div className="product-title">
                                <p>
                                  High quality cheap price adult coloring books
                                </p>
                              </div>
                              <div className="product-discount">
                                <p>FOB Reference Price: Get Latest Price</p>
                              </div>
                              <div className="product-price">
                                <p>
                                  <span className="text-warning">Price -</span>
                                  <span>1797/-</span>
                                  <span>₹2,997 40% Off 1 Offer Available</span>
                                </p>
                                <div className="actions product-action">
                                  <Button fill radius onClick={onIncrement}>
                                    {translate("cart_wishlist")}
                                  </Button>
                                  <Button fill radius onClick={onIncrement}>
                                    {translate("cart_remove")}
                                  </Button>
                                </div>
                              </div>
                              <div className="cart-actions">
                                <Button fill radius bsStyle="warning">
                                  <span>{translate("cart_continue")}</span>
                                </Button>
                                <Button fill radius bsStyle="warning">
                                  <span>{translate("cart_order")}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="cart-details">
                          <div className="cart-details-header">
                            <h4>{translate("cart_details")}</h4>
                          </div>
                          <div className="cart-detail">
                            <ul>
                              <li>
                                <span>Price (2 item)</span>
                                <span>₹ 1,198</span>
                              </li>
                              <li>
                                <span>Delivery Charges</span>
                                <span className="text-warning">FREE</span>
                              </li>
                              <li>
                                <span>Amount Payable</span>
                                <span>₹ 1,198</span>
                              </li>
                            </ul>
                          </div>
                          <div className="cart-details-footer">
                            <p>{translate("cart_total_label")}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
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
  translate: PropTypes.func.isRequired
};
Cart.defaultProps = {};
export default Cart;
