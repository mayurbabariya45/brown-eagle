import _ from "lodash";
import className from "classnames";
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
      currentPage: 1
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePriceFilter = this.handlePriceFilter.bind(this);
    this.handleRatingFilter = this.handleRatingFilter.bind(this);
  }
  componentWillMount() {
    const {
      getCategories,
      handleCategoryFilter,
      searchProducts,
      match
    } = this.props;
    const { category } = match.params;
    if (!_.isEmpty(category)) {
      getCategories().then(response => {
        this.setState({ ...response });
        handleCategoryFilter({
          ...this.props.filter,
          category: { ...response }
        });
      });
    } else {
      searchProducts(this.props.filter, 1);
    }
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { searchProducts, filter } = this.props;
    this.setState({ currentPage });
    searchProducts(filter, currentPage);
  };
  handleSort(type) {
    const { handleSortFilter, searchProducts } = this.props;
    handleSortFilter(type);
    searchProducts({
      ...this.props.filter,
      sort: {
        ...type
      }
    });
  }
  handlePriceFilter(value) {
    const { handlePriceFilter, searchProducts } = this.props;
    handlePriceFilter({
      minPrice: value[0],
      maxPrice: value[1]
    });
    searchProducts({
      ...this.props.filter,
      price: {
        minPrice: value[0],
        maxPrice: value[1]
      }
    });
  }
  handleRatingFilter(value) {
    const { handleRatingFilter, searchProducts } = this.props;
    handleRatingFilter({
      minRating: value[0],
      maxRating: value[1]
    });
    searchProducts({
      ...this.props.filter,
      rating: {
        minRating: value[0],
        maxRating: value[1]
      }
    });
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
      products,
      filter,
      selectedProductCategory,
      loadProduct,
      match
    } = this.props;
    const { sort } = filter;
    const { currentPage } = this.state;
    const { count } = products;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    let selectedCategoryName = "Products";
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
                <Filters
                  price={filter.price}
                  rating={filter.rating}
                  handlePriceFilter={this.handlePriceFilter}
                  handleRatingFilter={this.handleRatingFilter}
                />
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
                          (Showing {start} – {end} products of {count || 0}{" "}
                          products)
                        </small>
                      </div>
                      <div className="toolbar-sorter sorter">
                        <span className="sort">
                          <span>Sort By</span>
                        </span>
                        <ul>
                          <li
                            className={className({
                              active:
                                sort.type === "popularity" && sort.order === ""
                            })}
                            onClick={() =>
                              this.handleSort({ type: "popularity", order: "" })
                            }
                          >
                            {translate("popularity")}
                          </li>
                          <li
                            className={className({
                              active:
                                sort.type === "price" && sort.order === "asc"
                            })}
                            onClick={() =>
                              this.handleSort({ type: "price", order: "asc" })
                            }
                          >
                            {translate("price_low")}
                          </li>
                          <li
                            className={className({
                              active:
                                sort.type === "price" && sort.order === "des"
                            })}
                            onClick={() =>
                              this.handleSort({ type: "price", order: "des" })
                            }
                          >
                            {translate("price_high")}
                          </li>
                          <li
                            className={className({
                              active:
                                sort.type === "rating" && sort.order === "asc"
                            })}
                            onClick={() =>
                              this.handleSort({ type: "rating", order: "asc" })
                            }
                          >
                            {translate("rating_low")}
                          </li>
                          <li
                            className={className({
                              active:
                                sort.type === "rating" && sort.order === "des"
                            })}
                            onClick={() =>
                              this.handleSort({ type: "rating", order: "des" })
                            }
                          >
                            {translate("rating_high")}
                          </li>
                          <li
                            className={className({
                              active:
                                sort.type === "newest" && sort.order === "des"
                            })}
                            onClick={() =>
                              this.handleSort({ type: "newest", order: "des" })
                            }
                          >
                            {translate("newest_first")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </BlockUi>
                </Row>
              </Col>
              <div className="products list items product-items">
                <BlockUi tag="div" blocking={loadProduct}>
                  <div>
                    {_.map(_.chunk(products.products, 3), (parent, index) => (
                      <Row key={index}>
                        {_.map(parent, product => (
                          <Col sm={4} key={product.id}>
                            <div
                              key={product.id}
                              className="item product product-item"
                            >
                              <Product
                                product={product}
                                translate={translate}
                                bAction={false}
                                addToCart={() => this.addToCart(product)}
                                buttons
                              />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    ))}
                  </div>
                </BlockUi>
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
  loadProduct: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  handleSortFilter: PropTypes.func.isRequired,
  handlePriceFilter: PropTypes.func.isRequired,
  handleRatingFilter: PropTypes.func.isRequired,
  handleCategoryFilter: PropTypes.func.isRequired,
  searchProducts: PropTypes.func.isRequired
};

Products.defaultProps = {
  products: [],
  selectedProductCategory: {},
  loadProduct: false
};

export default Products;
