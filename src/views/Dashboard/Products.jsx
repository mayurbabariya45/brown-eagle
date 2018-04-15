import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/ProductSlider/Products";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";

const products = [product1, product2, product3, product1, product2, product3];
class Products extends Component {
  state = {};
  render() {
    const { translate } = this.props;
    return (
      <div className="dashboard-products">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>{translate("d_products")}</h5>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="products list items product-items product-lists">
              <Row>
                {products.map((src, index) => (
                  <Col sm={12} key={index + 1}>
                    <div key={index + 1} className="item product product-item">
                      <Product src={src} translate={translate} lists />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Products;
