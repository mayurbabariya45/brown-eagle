import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Tabs, Tab } from "react-bootstrap";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import Button from "../../elements/CustomButton/CustomButton";
import Quantity from "../../components/Quantity/Quantity";
import ShareButtons from "../../components/SocialButtons/SocialButtons";
import ProductImageSlider from "../../components/ProductImageSlider/ProductImageSlider";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addToCart = this.addToCart.bind(this);
  }
  componentWillMount() {
    const { getProduct, match, history, locale } = this.props;
    const { productName, productId } = match.params;
    if (!_.isEmpty(productName) && !_.isEmpty(productId)) {
      getProduct(productId, locale);
    } else {
      history.goBack();
    }
  }
  componentWillUnmount() {
    const { flushProduct } = this.props;
    flushProduct();
  }
  addToCart() {
    const { product, addToCart,addToCartUnsafe, showNotification, quantity } = this.props;
    const objectProduct = Object.assign({}, product, { quantity });
    console.log(product);
    addToCartUnsafe(objectProduct);
    addToCart(objectProduct).then(response => {
      if (response.type === "ADD_TO_CART_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${product.name} has been added successfully in cart.`}</div>,
          false
        );
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>Profile has been changed successfully.</div>,
          true
        );
      }
    });
  }
  render() {
    const {
      translate,
      onIncrement,
      onDecrement,
      quantity,
      product
    } = this.props;
    const { name, description, productPrice, productPictures } = product;
    return (
      <section className="product-view">
        <Grid>
          <Row>
            <Col sm={12}>
              <Breadcrumbs />
            </Col>
            <Col sm={12}>
              <Row>
                <Col sm={6}>
                  <ProductImageSlider images={productPictures} />
                </Col>
                <Col className="product-info-main product-shop" sm={6}>
                  <div className="product-shop-content">
                    <div className="product-info-title">
                      <div className="page-title-wrapper">
                        <h1 className="page-title">
                          <span>{name}</span>
                        </h1>
                      </div>
                    </div>
                    <div className="product-reviews-summary short">
                      <div className="rating-summary">
                        <div className="rating-result" title="80%">
                          <span
                            style={{
                              width: "92%"
                            }}
                          >
                            <span>80%</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="product-info-price">
                      <div className="price-box price-final_price">
                        <span className="price">
                          ${productPrice ? productPrice.toFixed(2) : "0.00"}
                        </span>
                      </div>
                    </div>
                    <div className="product attribute overview">
                      <p>{description}</p>
                    </div>
                    <div className="product-add-cart">
                      <div className="box-tocart">
                        <div className="actions add-to-cart">
                          <Quantity
                            quantity={quantity}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                          />
                          <Button
                            fill
                            radius
                            bsStyle="warning"
                            className="action tocart"
                            onClick={() => this.addToCart()}
                          >
                            <span>Add to cart</span>
                          </Button>
                          <div className="product-social-links">
                            <div className="product-addto-links add-to-links">
                              <a className="action">
                                <i className="fa fa-heart-o" />
                              </a>
                              <a className="action">
                                <i className="pe-7s-note2" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-share">
                      <ShareButtons />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <div className="product info detailed">
              <Col sm={8}>
                <Tabs
                  defaultActiveKey={1}
                  className="items-tabs"
                  id="products-info"
                >
                  <Tab
                    eventKey={1}
                    title="Description"
                    className="product attribute description"
                  >
                    <p>{description}</p>
                  </Tab>
                  <Tab eventKey={2} title="Reviews">
                    Tab 2 content
                  </Tab>
                  <Tab eventKey={3} title="Seller Guarantees">
                    Tab 3 content
                  </Tab>
                </Tabs>
              </Col>
              <Col sm={4}>
                <ProductSlider
                  title={translate("latest_products")}
                  translate={translate}
                  products={[
                    product1,
                    product2,
                    product3,
                    product1,
                    product2,
                    product3
                  ]}
                  buttons={false}
                  multiple
                  productChunk={3}
                  banner={false}
                  SliderSettings={{
                    dots: false,
                    infinite: false,
                    arrows: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    className:
                      "products items produsts-list-vertical product-items"
                  }}
                />
              </Col>
            </div>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col sm={12}>
              <ProductSlider
                title={translate("food_retail_products")}
                translate={translate}
                products={[
                  product1,
                  product2,
                  product3,
                  product1,
                  product2,
                  product3
                ]}
                banner={false}
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  className: "products list items product-items"
                }}
              />
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}
Product.propTypes = {
  translate: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  flushProduct: PropTypes.func.isRequired,
  locale: PropTypes.string
};

Product.defaultProps = {
  locale: ""
};
export default Product;
