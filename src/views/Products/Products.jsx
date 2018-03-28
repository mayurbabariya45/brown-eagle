import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Grid, Col } from "react-bootstrap";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import Product from "../../components/ProductSlider/Products";
import Filters from "./Filters";
import Pagination from "../../components/Pagination/Pagination";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";

const products = [product1, product2, product3, product1, product2, product3];
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { translate } = this.props;
    return (
      <section className="wrap-products">
        <Grid>
          <Row>
            <Col sm={12}>
              <Breadcrumbs />
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <div className="product-filter">
                <Filters />
              </div>
            </Col>
            <Col sm={9}>
              <Col sm={12}>
                <Row>
                  <div className="section-header categories-title">
                    <div className="title">
                      <h5>Light Equipment Tools</h5>
                      <small>
                        (Showing 121 – 160 products of 6,146 products)
                      </small>
                    </div>
                    <div className="toolbar-sorter sorter">
                      <span className="sort">
                        <span>Sort By</span>
                      </span>
                      <ul>
                        <li className="active">Popularity</li>
                        <li>Price -- Low to High</li>
                        <li>Price -- High to Low</li>
                        <li>Newest First</li>
                      </ul>
                    </div>
                  </div>
                </Row>
              </Col>
              <div className="products list items product-items">
                <Row>
                  {products.map((src, index) => (
                    <Col sm={4} key={index + 1}>
                      <div
                        key={index + 1}
                        className="item product product-item"
                      >
                        <Product
                          src={src}
                          translate={translate}
                          bAction={false}
                          buttons
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <Pagination />
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}
Products.propTypes = {
  translate: PropTypes.func.isRequired
};
export default Products;
