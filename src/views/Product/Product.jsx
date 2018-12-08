import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import {
  FacebookShareButton,
  FacebookIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";
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
import Transactions from "./Transactions";
import ProductRatingContainer from "../../containers/ProductRatingContainer/ProductRatingContainer";
import { getCurrency } from "../../variables/Variables";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRatingModal: false
    };
    this.handleProdutRatingModal = this.handleProdutRatingModal.bind(this);
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
    this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
    this.handleAddToCompare = this.handleAddToCompare.bind(this);
    this.handleLoadMoreReview = this.handleLoadMoreReview.bind(this);
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
      getProductReview(productId, locale, 1);
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
      match,
      translate
    } = this.props;
    const { productId } = match.params;
    const buyer = auth.user.id;
    const authRole = auth.user.role;
    if (_.isEmpty(productId)) return false;
    if (_.isEmpty(buyer)) {
      showNotification(
        <span data-notify="icon" className="pe-7s-shield" />,
        <div>{translate("notification_buyer_login")}</div>,
        true
      );
      return false;
    }
    if (authRole !== "buyer") {
      showNotification(
        <span data-notify="icon" className="pe-7s-shield" />,
        <div>{translate("notification_seller_fav")}</div>,
        true
      );
      return false;
    }
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
            {response.payload.message || translate("notification_fav")}
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
      getProductReview,
      resetRatingForm,
      flushReviews,
      translate
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
        flushReviews();
        getProductReview(productId, locale);
        resetRatingForm();
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{translate("notification_review_added")}</div>,
          false
        );
      }
    });
    return false;
  }
  addToCart(item) {
    const {
      addToCart,
      translate,
      showNotification,
      auth,
      history
    } = this.props;
    const objectProduct = Object.assign({}, item, {
      quantity: item.minQuantity
    });
    const buyer = auth.user.id;
    const authRole = auth.user.role;
    if (_.isEmpty(authRole)) {
      history.push({
        pathname: "/login",
        search: `?redirect-url=${this.props.location.pathname}`
      });
      return false;
    }
    if (authRole !== "buyer") {
      showNotification(
        <span data-notify="icon" className="pe-7s-shield" />,
        <div>{translate("notification_seller_cart")}</div>,
        true
      );
      return false;
    }
    addToCart(objectProduct, buyer).then(response => {
      if (response.type === "ADD_TO_CART_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>
            {translate("notification_cart_added", { name: item.name })}
          </div>,
          false
        );
        history.push("/cart");
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true,
          {
            action: {
              label: "Clear",
              callback: () => this.removeCartItem(item)
            }
          }
        );
      }
    });
    return false;
  }
  removeCartItem(item) {
    const { removeCartItem, translate, showNotification, auth } = this.props;
    const buyer = auth.user.id;
    removeCartItem(buyer).then(response => {
      if (response.type === "REMOVE_CART_PRODUCT_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{translate("notification_cart_removed")}</div>,
          false
        );
        this.addToCart(item);
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{translate("notification_cart_not_removed")}</div>,
          true
        );
      }
    });
  }
  handleAddToCompare(e) {
    e.preventDefault();
    const { addToCompare, showNotification, product, translate } = this.props;
    addToCompare(product);
    showNotification(
      <span data-notify="icon" className="pe-7s-check" />,
      <div>
        {translate("notification_compare_added", { name: product.name })}
      </div>,
      false
    );
  }
  handleLoadMoreReview() {
    const { getProductReview, reviews, match, locale } = this.props;
    const { productName, productId } = match.params;
    const { count, productReview, currentPage } = reviews;
    if (!_.isEmpty(productName) && !_.isEmpty(productId)) {
      const nextPage =
        count !== _.size(productReview) ? currentPage + 1 : currentPage;
      getProductReview(productId, locale, nextPage);
    }
  }
  render() {
    const {
      translate,
      product,
      location,
      loader,
      auth,
      reviews,
      locale,
      loading,
      similarProducts,
      isLoading
    } = this.props;
    const objectProduct = product || {};
    const authRole = auth.user.role;
    const sharingUrl = `${window.location.origin}${location.pathname}`;
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
      ratingAggregate,
      quickDetails,
      minQuantity,
      transactions
    } = objectProduct;
    const { productReview, count, pages } = reviews;
    const breadcrumb = [];
    if (!_.isEmpty(objectProduct)) {
      if (_.has(objectProduct, "category")) {
        const selectedCategoryName = objectProduct.category.name;
        breadcrumb.push({
          pathname: `/#/products/${_.kebabCase(selectedCategoryName)}`,
          name: selectedCategoryName
        });
      }
      if (_.has(objectProduct, "subCategory")) {
        const selectedCategoryName = objectProduct.subCategory.name;
        breadcrumb.push({
          pathname: `/#/products/${_.kebabCase(
            objectProduct.category.name
          )}/${_.kebabCase(selectedCategoryName)}`,
          name: selectedCategoryName
        });
      }
    }
    return (
      <section className="product-view">
        <Grid>
          <Row>
            <Col sm={12} xs={12}>
              <Breadcrumbs breadcrumb={breadcrumb} />
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
                            </span>
                          </p>
                          <p className="price">
                            {translate("p_min_order")}{" "}
                            <span>{minQuantity || "0"}</span>
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
                        {(authRole === "buyer" ||
                          typeof authRole === typeof undefined) && (
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
                        )}
                        <div className="product-messages">
                          <a href="#" className="message-links">
                            <i className="fa fa-envelope-o" />
                            {translate("p_leave_message")}
                          </a>
                        </div>
                        <div className="payment-method">
                          {/* <p>
                          Payment: <img src="" alt="" />
                        </p> */}
                        </div>
                      </div>
                      <div className="product-nav">
                        {!_.isEmpty(product) && (
                          <ul className="product-nav-items">
                            <li>
                              <a href="#" onClick={this.handleAddToCompare}>
                                <i
                                  className="fa fa-square-o"
                                  aria-hidden="true"
                                />{" "}
                                {translate("p_add_to_compare")}
                              </a>
                            </li>
                            <li>
                              <a href="#" onClick={this.handleAddToWishlist}>
                                <i
                                  className="fa fa-heart-o"
                                  aria-hidden="true"
                                />{" "}
                                {translate("p_add_to_fav")}
                              </a>
                            </li>
                            <li>
                              <OverlayTrigger
                                trigger="click"
                                placement="top"
                                overlay={
                                  <Popover
                                    id="social-icons"
                                    className="product-share-buttons"
                                  >
                                    <ul>
                                      <li>
                                        <FacebookShareButton
                                          title={
                                            !_.isEmpty(product)
                                              ? nameTranslations[locale]
                                              : ""
                                          }
                                          url={sharingUrl}
                                        >
                                          <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                      </li>
                                      <li>
                                        <GooglePlusShareButton
                                          title={
                                            !_.isEmpty(product)
                                              ? nameTranslations[locale]
                                              : ""
                                          }
                                          url={sharingUrl}
                                        >
                                          <GooglePlusIcon size={32} round />
                                        </GooglePlusShareButton>
                                      </li>
                                      <li>
                                        <TwitterShareButton
                                          title={
                                            !_.isEmpty(product)
                                              ? nameTranslations[locale]
                                              : ""
                                          }
                                          url={sharingUrl}
                                        >
                                          <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                      </li>
                                    </ul>
                                  </Popover>
                                }
                              >
                                <a href="javascript:void(0);">
                                  <i
                                    className="fa fa-share-square-o"
                                    aria-hidden="true"
                                  />{" "}
                                  {translate("p_share")}
                                </a>
                              </OverlayTrigger>
                            </li>
                          </ul>
                        )}
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
                            {/* <h5>{translate("product_quick_details")}</h5> */}
                            <div className="quick_overview-details">
                              <div className="overview-list">
                                <ProductOverview quickDetails={quickDetails} />
                              </div>
                            </div>
                          </div>
                          <div className="product-description">
                            <div className="title">
                              <h5>{translate("p_product_desc")}</h5>
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
                                locale={locale}
                              />
                            </div>
                          </div>
                        </Tab>
                        <Tab
                          eventKey={3}
                          title={translate("product_transaction_overview")}
                        >
                          <div className="transaction-overview">
                            <Transactions transactions={transactions || {}} />
                          </div>
                        </Tab>
                      </Tabs>
                    </Col>
                  </div>
                  <div className="send-supplier-messages">
                    <Col sm={12} xs={12}>
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
                      count={count || 0}
                      isLoading={isLoading}
                      pages={pages}
                      productReview={productReview}
                      locale={locale}
                      handleLoadMore={this.handleLoadMoreReview}
                    />
                  </div>
                </Row>
              </Col>
              <Col sm={3} xs={12}>
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
