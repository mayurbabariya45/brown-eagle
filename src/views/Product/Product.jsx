import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import { Grid, Row, Col, Tabs, Tab } from "react-bootstrap";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../elements/CustomButton/CustomButton";
import ProductImageSlider from "../../components/ProductImageSlider/ProductImageSlider";
import SendMessageContainer from "../../containers/SendMessageContainer/SendMessageContainer";
import ProductRating from "./ProductRating";
import ProductReviews from "./ProductReviews";
import ProductOverview from "./ProductOverview";
import Companyinformation from "./CompanyInformation";
import TradeAssurance from "./TradeAssurance";
import ProductLikes from "./ProductLikes";
import ProductRatingContainer from "../../containers/ProductRatingContainer/ProductRatingContainer";
import { getCurrency } from "../../variables/Variables";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRatingModal: false,
      isFavourite: false
    };
    this.handleProdutRatingModal = this.handleProdutRatingModal.bind(this);
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
    this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
  }
  componentWillMount() {
    const {
      getProduct,
      getProductReview,
      getSimilarProduct,
      match,
      history,
      locale
    } = this.props;
    const { productName, productId } = match.params;
    window.scrollTo(0, 0);
    if (!_.isEmpty(productName) && !_.isEmpty(productId)) {
      const webAuthId = localStorage.getItem("webAuthId");
      const webAuthRole = localStorage.getItem("webAuthRole");
      const buyer = webAuthRole === "buyer" ? webAuthId : "";
      getProduct(productId, locale, buyer);
      getProductReview(productId, locale);
      getSimilarProduct(productId, locale);
    } else {
      history.goBack();
    }
  }
  componentWillUnmount() {
    const { flushProduct } = this.props;
    flushProduct();
  }
  handleProdutRatingModal() {
    this.setState({ showRatingModal: !this.state.showRatingModal });
  }
  handleAddToWishlist(event) {
    event.preventDefault();
    const {
      addToWishlistProduct,
      showNotification,
      locale,
      auth,
      match
    } = this.props;
    const { productId } = match.params;
    const buyer = auth.user.id;
    const authRole = auth.user.role;
    if (_.isEmpty(productId)) return false;
    if (authRole !== "buyer") return false;
    addToWishlistProduct(productId, buyer, locale).then(response => {
      if (response.type === "ADD_TO_WISHLIST_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "ADD_TO_WISHLIST_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>
            {response.payload.message || "Product has been added favourite"}
          </div>,
          false
        );
      }
    });
    return false;
  }
  handleRatingSubmit(values) {
    const {
      addReview,
      showNotification,
      match,
      locale,
      auth,
      getProductReview
    } = this.props;
    const { productId } = match.params;
    const buyer = auth.user.id;
    const authRole = auth.user.role;
    if (_.isEmpty(productId)) return false;
    if (authRole !== "buyer") return false;
    const mergeValues = Object.assign({}, values, {
      buyer
    });
    addReview(mergeValues, productId, locale).then(response => {
      if (response.type === "ADD_PRODUCT_REVIEW_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "ADD_PRODUCT_REVIEW_SUCCESS") {
        this.setState({ showRatingModal: false });
        getProductReview(productId, locale);
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Review has been added successfully</div>,
          false
        );
      }
    });
    return false;
  }
  addToCart(item) {
    const { addToCart, showNotification } = this.props;
    const objectProduct = Object.assign({}, item, { quantity: 1 });
    addToCart(objectProduct).then(response => {
      if (response.type === "ADD_TO_CART_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${item.name} has been added successfully in cart.`}</div>,
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
      product,
      loader,
      auth,
      reviews,
      locale,
      loading,
      similarProducts
    } = this.props;
    const objectProduct = product || {};
    const authRole = auth.user.role;
    const {
      nameTranslations,
      descriptionTranslations,
      productPrice,
      productPictures,
      totalRatingsCount,
      rating,
      seller,
      currency,
      isReviewed,
      ratingAggregate
    } = objectProduct;
    const { productReview } = reviews;
    return (
      <section className="product-view">
        <Grid>
          <Row>
            <Col sm={12}>
              <Breadcrumbs />
            </Col>
          </Row>
          <BlockUi tag="div" blocking={loading}>
            <Row>
              <Col sm={9}>
                <Row>
                  <Col sm={5}>
                    <ProductImageSlider images={productPictures} />
                  </Col>
                  <Col className="product-info-main product-shop" sm={7}>
                    <div className="product-shop-content">
                      <div className="product-info-title">
                        <div className="page-title-wrapper">
                          <h1 className="page-title">
                            {!_.isEmpty(product)
                              ? nameTranslations[locale]
                              : "Loading...."}
                          </h1>
                        </div>
                      </div>
                      <div className="product-info-price">
                        <div className="price-box price-final_price">
                          <p className="price">
                            {translate("product_price")}{" "}
                            <span>
                              {getCurrency(currency)}
                              {productPrice ? productPrice.toFixed(2) : "0.00"}
                            </span>{" "}
                            / Peice
                          </p>
                        </div>
                      </div>
                      {/* <div className="product attribute overview">
                      <p>
                        Supply Ability: 30 Set/Sets per Month <br />
                      </p>
                      <p>Port: SHANGHAI </p>
                    </div> */}
                      <div className="product-add-cart">
                        <div className="box-tocart">
                          <div className="actions add-to-cart">
                            <Button
                              fill
                              radius
                              bsStyle="warning"
                              className="action tocart"
                            >
                              <span>
                                {translate("product_contact_supplier")}
                              </span>
                            </Button>
                            <Button
                              fill
                              radius
                              bsStyle="info"
                              className="action tocart"
                              onClick={() => this.addToCart(product)}
                            >
                              <span>{translate("product_start_order")}</span>
                            </Button>
                          </div>
                        </div>
                        <div className="product-messages">
                          <a href="#" className="message-links">
                            <i className="fa fa-envelope-o" />
                            Leave Messages
                          </a>
                        </div>
                        <div className="payment-method">
                          {/* <p>
                          Payment: <img src="" alt="" />
                        </p> */}
                        </div>
                      </div>
                      <div className="product-nav">
                        <ul className="product-nav-items">
                          <li>
                            <a href="#">
                              <i
                                className="fa fa-square-o"
                                aria-hidden="true"
                              />{" "}
                              Add to Compare
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={this.handleAddToWishlist}>
                              <i className="fa fa-heart-o" aria-hidden="true" />{" "}
                              Add to Favorites
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                className="fa fa-share-square-o"
                                aria-hidden="true"
                              />{" "}
                              Share
                            </a>
                          </li>
                        </ul>
                      </div>
                      <ProductRating
                        translate={translate}
                        showRating={this.handleProdutRatingModal}
                        showButton={
                          (authRole === "buyer" && !isReviewed) || false
                        }
                        totalRatingsCount={totalRatingsCount}
                        rating={rating}
                        ratingAggregate={_.reverse(ratingAggregate)}
                      />
                    </div>
                  </Col>
                  <div className="product info detailed">
                    <Col sm={12}>
                      <Tabs
                        defaultActiveKey={1}
                        className="items-tabs"
                        id="products-info"
                      >
                        <Tab
                          eventKey={1}
                          title={translate("product_description")}
                          className="product attribute description"
                        >
                          <div className="product-overview">
                            <div className="title">
                              <h3>{translate("product_overview")}</h3>
                            </div>
                            <h5>{translate("product_quick_details")}</h5>
                            <div className="quick_overview-details">
                              <div className="overview-list">
                                <ProductOverview translate={translate} />
                              </div>
                            </div>
                          </div>
                          <div className="product-description">
                            <div className="title">
                              <h5>Product Description</h5>
                            </div>
                            <div className="description">
                              <p>
                                {!_.isEmpty(product)
                                  ? descriptionTranslations[locale]
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </Tab>
                        <Tab
                          eventKey={2}
                          title={translate("product_company_profile")}
                        >
                          <div className="company_profile">
                            <div className="title">
                              <h3>{translate("product_basic_information")}</h3>
                            </div>
                            <div className="information">
                              <Companyinformation
                                translate={translate}
                                information={seller || {}}
                              />
                            </div>
                          </div>
                        </Tab>
                        <Tab
                          eventKey={3}
                          title={translate("product_transaction_overview")}
                        >
                          <div className="transaction-overview">
                            Transactions Overview
                          </div>
                        </Tab>
                      </Tabs>
                    </Col>
                  </div>
                  <div className="send-supplier-messages">
                    <Col sm={12}>
                      <div className="title">
                        <h4>{translate("product_message_title")}</h4>
                      </div>
                      <SendMessageContainer translate={translate} />
                    </Col>
                  </div>
                  <div className="product-ratings-reviews">
                    <div className="title">
                      <h2>{translate("product_reviews")}</h2>
                    </div>
                    <ProductReviews
                      translate={translate}
                      productReview={productReview}
                      locale={locale}
                    />
                  </div>
                </Row>
              </Col>
              <Col sm={3}>
                <TradeAssurance translate={translate} seller={seller} />
                <ProductLikes
                  translate={translate}
                  products={similarProducts}
                />
              </Col>
            </Row>
          </BlockUi>
        </Grid>
        <ProductRatingContainer
          show={this.state.showRatingModal}
          onHide={this.handleProdutRatingModal}
          handleRatingSubmit={this.handleRatingSubmit}
          translate={translate}
          loader={loader}
        />
      </section>
    );
  }
}

Product.propTypes = {
  translate: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  flushProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  addToWishlistProduct: PropTypes.func.isRequired
};
export default Product;
