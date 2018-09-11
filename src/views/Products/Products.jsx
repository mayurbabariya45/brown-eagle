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
      currentPage: 1,
      categoryFilter: [],
      subCategoryFilter: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePriceFilter = this.handlePriceFilter.bind(this);
    this.handleRatingFilter = this.handleRatingFilter.bind(this);
    this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
    this.handleSubCategoryFilter = this.handleSubCategoryFilter.bind(this);
    this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
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
          category: {
            category: response.categoryId,
            subCategory: response.subCategoryId ? response.subCategoryId : ""
          }
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
    searchProducts(
      {
        ...this.props.filter,
        sort: {
          ...type
        }
      },
      1
    );
  }
  handlePriceFilter(value) {
    const { handlePriceFilter, searchProducts } = this.props;
    handlePriceFilter({
      minPrice: value[0],
      maxPrice: value[1]
    });
    searchProducts(
      {
        ...this.props.filter,
        price: {
          minPrice: value[0],
          maxPrice: value[1]
        }
      },
      1
    );
  }
  handleCategoryFilter(isChecked, value) {
    const { categoryFilter } = this.state;
    const { handleCategoryFilter, searchProducts } = this.props;
    if (!isChecked) {
      categoryFilter.push(value);
    } else if (categoryFilter.includes(value)) {
      categoryFilter.splice(categoryFilter.indexOf(value), 1);
    }
    handleCategoryFilter({
      category: categoryFilter.join(","),
      subCategory: this.state.subCategoryFilter.join(",")
    });
    searchProducts(
      {
        ...this.props.filter,
        category: {
          category: categoryFilter.join(","),
          subCategory: this.state.subCategoryFilter.join(",")
        }
      },
      1
    );
  }
  handleSubCategoryFilter(isChecked, value) {
    const { subCategoryFilter } = this.state;
    const { handleCategoryFilter, searchProducts } = this.props;
    if (!isChecked) {
      subCategoryFilter.push(value);
    } else if (subCategoryFilter.includes(value)) {
      subCategoryFilter.splice(subCategoryFilter.indexOf(value), 1);
    }
    handleCategoryFilter({
      category: this.state.categoryFilter.join(","),
      subCategory: subCategoryFilter.join(",")
    });
    searchProducts(
      {
        ...this.props.filter,
        category: {
          category: this.state.categoryFilter.join(","),
          subCategory: subCategoryFilter.join(",")
        }
      },
      1
    );
  }
  handleRatingFilter(value) {
    const { handleRatingFilter, searchProducts } = this.props;
    handleRatingFilter({
      minRating: value[0],
      maxRating: value[1]
    });
    searchProducts(
      {
        ...this.props.filter,
        rating: {
          minRating: value[0],
          maxRating: value[1]
        }
      },
      1
    );
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
    if (_.isEmpty(buyer)) {
      showNotification(
        <span data-notify="icon" className="pe-7s-shield" />,
        <div>Please Login to buyer account</div>,
        true
      );
      return false;
    }
    if (authRole !== "buyer") {
      showNotification(
        <span data-notify="icon" className="pe-7s-shield" />,
        <div>Seller not avible to add to favourite</div>,
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
            {response.payload.message || "Product has been added favourite"}
          </div>,
          false
        );
      }
    });
    return false;
  }
  addToCart(item) {
    const { addToCart, showNotification, auth, history } = this.props;
    const objectProduct = Object.assign({}, item, {
      quantity: item.minQuantity
    });
    const buyer = auth.user.id;
    const authRole = auth.user.role;
    if (authRole !== "buyer") return false;
    addToCart(objectProduct, buyer).then(response => {
      if (response.type === "ADD_TO_CART_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${item.name} has been added successfully in cart.`}</div>,
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
    const { removeCartItem, showNotification, auth } = this.props;
    const buyer = auth.user.id;
    removeCartItem(buyer).then(response => {
      if (response.type === "REMOVE_CART_PRODUCT_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Product has been deleted successfully.</div>,
          false
        );
        this.addToCart(item);
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>Product not deleted. Please try again later.</div>,
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
      match,
      categories,
      locale
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
                  categories={categories}
                  locale={locale}
                  loadProduct={loadProduct}
                  handlePriceFilter={this.handlePriceFilter}
                  handleRatingFilter={this.handleRatingFilter}
                  handleCategoryFilter={this.handleCategoryFilter}
                  handleSubCategoryFilter={this.handleSubCategoryFilter}
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
