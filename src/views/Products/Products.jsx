import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Grid, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import Product from "../../components/ProductSlider/Products";
import Filters from "./Filters";
import Pagination from "../../components/Pagination/Pagination";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: null,
      subCategoryId: null,
      currentPage: 1
    };
  }
  componentWillMount() {
    const { getCategories } = this.props;
    getCategories().then(response => {
      this.setState({ ...response });
    });
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { categoryId, subCategoryId } = this.state;
    const { getProducts } = this.props;
    this.setState({ currentPage });
    getProducts(categoryId, subCategoryId, currentPage);
  };
  render() {
    const {
      translate,
      products,
      selectedProductCategory,
      loadProduct,
      match
    } = this.props;
    const { currentPage } = this.state;
    const { count } = products;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    let selectedCategoryName;
    const breadcrumb = [];
    if (!_.isEmpty(selectedProductCategory)) {
      const { category, subCategory } = match.params;
      if (!_.isEmpty(category)) {
        selectedCategoryName = selectedProductCategory.name;
        breadcrumb.push({
          pathname: `/#/products/${category}`,
          name: selectedCategoryName
        });
        if (!_.isEmpty(subCategory)) {
          const selectedSubCategory = _.find(
            selectedProductCategory.subCategoryList,
            subCat => _.kebabCase(subCat.name) === subCategory
          );
          if (!_.isEmpty(selectedSubCategory)) {
            selectedCategoryName = selectedSubCategory.name;
            breadcrumb.push({
              pathname: `/#/products/${category}/${subCategory}`,
              name: selectedCategoryName
            });
          }
        }
      }
    }
    return (
      <section className="wrap-products">
        <Grid>
          <Row>
            <Col sm={12}>
              <Breadcrumbs breadcrumb={breadcrumb} />
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
                  <BlockUi tag="div" blocking={loadProduct}>
                    <div className="section-header categories-title">
                      <div className="title">
                        <h5>{selectedCategoryName}</h5>
                        <small>
                          (Showing {start} – {end} products of {count || 0} products)
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
                  </BlockUi>
                </Row>
              </Col>
              <div className="products list items product-items">
                <Row>
                  {_.map(products.products, product => (
                    <Col sm={4} key={product.id}>
                      <div
                        key={product.id}
                        className="item product product-item"
                      >
                        <Product
                          product={product}
                          translate={translate}
                          bAction={false}
                          buttons
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <Pagination
                totalRecords={count || 0}
                pageLimit={20}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}
Products.propTypes = {
  translate: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.any),
  selectedProductCategory: PropTypes.objectOf(PropTypes.any),
  loadProduct: PropTypes.bool
};

Products.defaultProps = {
  products: [],
  selectedProductCategory: {},
  loadProduct: false
};

export default Products;
