import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import Product from "../../components/ProductSlider/Products";
import EditProductContainer from "../../containers/EditProductContainer/EditProductContainer";
import Pagination from "../../components/Pagination/Pagination";
import ProductReviews from "./ProductReviews";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currentPage: 1,
      showReviews: false,
      showProductReviewId: ""
    };
    this.editProduct = this.editProduct.bind(this);
    this.editProductModalHide = this.editProductModalHide.bind(this);
    this.handleShowProductReview = this.handleShowProductReview.bind(this);
    this.handleShowProducts = this.handleShowProducts.bind(this);
  }
  componentWillMount() {
    const { getProducts, id } = this.props;
    if (id) {
      getProducts(id);
    }
  }

  onPageChanged = data => {
    const { currentPage } = data;
    const { getProducts, id } = this.props;
    this.setState({ currentPage });
    if (id) {
      getProducts(id, currentPage);
    }
    return false;
  };
  editProduct(product) {
    const { getProduct } = this.props;
    this.setState({ showModal: true });
    getProduct(product);
  }
  editProductModalHide() {
    this.setState({ showModal: false });
  }
  handleShowProductReview(productId) {
    this.setState({ showReviews: true, showProductReviewId: productId });
  }
  handleShowProducts() {
    this.setState({ showReviews: false, showProductReviewId: "" });
  }
  render() {
    const {
      translate,
      myProducts,
      deleteProduct,
      loading,
      showNotification,
      upldateProductLoading,
      id,
      locale,
      product,
      productReviews,
      getProductReview,
      editProductReview,
      changeProductReviewStatus
    } = this.props;
    const { currentPage } = this.state;
    const { count, products } = myProducts;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <div>
        {this.state.showReviews && (
          <ProductReviews
            id={this.state.showProductReviewId}
            loading={loading}
            translate={translate}
            reviews={productReviews}
            getProductReview={getProductReview}
            handleBackButton={this.handleShowProducts}
            showNotification={showNotification}
            editProductReview={editProductReview}
            changeProductReviewStatus={changeProductReviewStatus}
            locale={locale}
          />
        )}
        {!this.state.showReviews && (
          <div className="dashboard-products">
            <BlockUi tag="div" blocking={loading}>
              <Row>
                <Col md={12}>
                  <div className="section-header">
                    <div className="title">
                      <h5>{translate("d_products")}</h5>
                    </div>
                    <div className="product-add-button">
                      <Link
                        to="/seller/product/new"
                        className="btn btn-fill btn-border btn-warning"
                      >
                        {translate("add_product_label")}
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={12} sm={12} xs={12}>
                  <div className="result-showing">
                    <p>
                      Showing {start} – {end} product of {count} products
                    </p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="products list items product-items product-lists">
                    <Row>
                      {products.map(product => (
                        <Col sm={12} key={product.id}>
                          <div className="item product product-item">
                            <Product
                              locale={locale}
                              product={product}
                              deleteProduct={() => deleteProduct(product.id)}
                              editProduct={() => this.editProduct(product)}
                              showReviews={() =>
                                this.handleShowProductReview(product.id)
                              }
                              translate={translate}
                              lists
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>
              <Pagination
                totalRecords={count || 0}
                pageLimit={20}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </BlockUi>
            {!_.isEmpty(product) && (
              <EditProductContainer
                id={id}
                translate={translate}
                loading={upldateProductLoading}
                showNotification={showNotification}
                showModal={this.state.showModal}
                locale={locale}
                onHide={this.editProductModalHide}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  upldateProductLoading: PropTypes.bool.isRequired,
  id: PropTypes.string
};

Products.defaultProps = {
  id: ""
};
export default Products;
