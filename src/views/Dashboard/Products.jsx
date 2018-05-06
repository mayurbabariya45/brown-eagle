import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import Product from "../../components/ProductSlider/Products";
import EditProductContainer from "../../containers/EditProductContainer/EditProductContainer";
// const products = [product1, product2, product3, product1, product2, product3];
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.editProduct = this.editProduct.bind(this);
    this.editProductModalHide = this.editProductModalHide.bind(this);
  }
  componentWillMount() {
    const { getProducts, id } = this.props;
    if (id) {
      getProducts(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { getProducts, id } = nextProps;
    if (id !== this.props.id) {
      getProducts(id);
    }
  }
  editProduct(product) {
    const { getProduct } = this.props;
    this.setState({ showModal: true });
    getProduct(product);
  }
  editProductModalHide() {
    this.setState({ showModal: false });
  }
  render() {
    const {
      translate,
      products,
      deleteProduct,
      loading,
      showNotification,
      upldateProductLoading,
      id
    } = this.props;
    return (
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
                    to="/add_product"
                    className="btn btn-fill btn-border btn-warning"
                  >
                    add product
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="products list items product-items product-lists">
                <Row>
                  {products.map(product => (
                    <Col sm={12} key={product.id}>
                      <div className="item product product-item">
                        <Product
                          product={product}
                          deleteProduct={() => deleteProduct(product.id)}
                          editProduct={() => this.editProduct(product)}
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
        </BlockUi>
        <EditProductContainer
          id={id}
          translate={translate}
          loading={upldateProductLoading}
          showNotification={showNotification}
          showModal={this.state.showModal}
          onHide={this.editProductModalHide}
        />
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
  products: PropTypes.arrayOf(PropTypes.any),
  id: PropTypes.string
};

Products.defaultProps = {
  id: "",
  products: []
};
export default Products;
