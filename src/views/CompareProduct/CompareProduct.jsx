import _ from "lodash";
import classname from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import CompareItems from "./CompareItems";

const colums = 310;
class CompareProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: false,
      transition: false,
      filtering: false,
      width: colums * props.products.length,
      productsTopInfo: false
    };
    this.handleFilterProduct = this.handleFilterProduct.bind(this);
    this.handleResetFilter = this.handleResetFilter.bind(this);
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
    this.updateTopScrolling = this.updateTopScrolling.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }
  componentDidMount() {
    // window.addEventListener("scroll", this.updateTopScrolling, false);
  }
  componentWillUnmount() {
    // window.removeEventListener("scroll", this.updateTopScrolling, false);
  }
  updateTopScrolling() {
    if (_.isEmpty(this.props.products)) return false;
    const offsetTop = this.table.getBoundingClientRect().top;
    const tableHeight = this.table.getBoundingClientRect().height;
    const topInfoHeight = document
      .querySelector(".top-info")
      .getBoundingClientRect().height;
    const scrollTop = window.scrollY;
    if (
      offsetTop <= scrollTop &&
      offsetTop + tableHeight - topInfoHeight >= scrollTop
    ) {
      this.setState({ productsTopInfo: true });
      return false;
    }
    if (this.state.productsTopInfo) this.setState({ productsTopInfo: false });
    return false;
  }
  handleFilterProduct(e) {
    e.preventDefault();
    const { setFilterProduct, products } = this.props;
    const selectedProducts = _.filter(products, product => product.selected)
      .length;
    if (selectedProducts < 2) return false;
    setFilterProduct();
    this.setState({ filtering: true });
    setTimeout(() => {
      this.setState({ transition: true });
    }, 50);
    setTimeout(() => {
      this.setState({ filtered: true, width: 310 * selectedProducts });
      this.productsWrapper.scrollLeft = 0;
    }, 100);
    return false;
  }
  handleResetFilter(e) {
    e.preventDefault();
    const { resetFilterProduct, products } = this.props;
    this.setState({
      filtered: false,
      filtering: false,
      transition: false,
      width: colums * _.size(products)
    });
    resetFilterProduct();
  }
  handleSelectProduct(item) {
    const { selectFilterProduct } = this.props;
    if (this.state.filtered) return false;
    selectFilterProduct(item);
    return false;
  }
  handleRemoveProduct(productId){
    const { removeProduct } = this.props;
    removeProduct(productId);
  }
  render() {
    const { products, translate } = this.props;
    const selectedProducts = _.filter(products, product => product.selected);
    return (
      <section
        className={classname("cd-products-comparison-table", {
          filtering: this.state.filtering,
          "no-product-transition": this.state.transition,
          filtered: this.state.filtered
        })}
      >
        <Grid>
          <Row>
            <Col md={12}>
              <div className="compare-title">
                <h3>{translate("cm_page_title")}</h3>
                {!_.isEmpty(products) && (
                  <div className="actions">
                    <a
                      href="#0"
                      className="reset"
                      onClick={this.handleResetFilter}
                    >
                      {translate("cm_reset")}
                    </a>
                    <a
                      href="#0"
                      className={classname("filter", {
                        active: selectedProducts.length >= 2
                      })}
                      onClick={this.handleFilterProduct}
                    >
                      {translate("cm_filter")}
                    </a>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          {!_.isEmpty(products) && (
            <Row>
              <Col md={12}>
                <div
                  className={classname("cd-products-table", {
                    "top-fixed": this.state.productsTopInfo
                  })}
                  ref={ref => {
                    this.table = ref;
                  }}
                >
                  <div className="features">
                    <div className="top-info">{translate("cm_models")}</div>
                    <ul className="cd-features-list">
                      <li>{translate("cm_price")}</li>
                      <li>{translate("cm_ratings")}</li>
                      <li>{translate("cm_reviews")}</li>
                      <li>{translate("cm_keywords")}</li>
                      <li>{translate("cm_min_quanity")}</li>
                      <li>{translate("cm_available")}</li>
                    </ul>
                  </div>
                  <div
                    className="cd-products-wrapper"
                    ref={ref => {
                      this.productsWrapper = ref;
                    }}
                  >
                    <CompareItems
                      products={products}
                      handleSelectProduct={this.handleSelectProduct}
                      handleRemoveProduct={this.handleRemoveProduct}
                      width={this.state.width}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
          {_.isEmpty(products) && (
            <Row>
              <Col md={12}>
                <div className="empty-text">nothing to show in compare</div>
              </Col>
            </Row>
          )}
        </Grid>
      </section>
    );
  }
}

CompareProduct.propTypes = {
  selectFilterProduct: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  setFilterProduct: PropTypes.func.isRequired,
  resetFilterProduct: PropTypes.func.isRequired
};

export default CompareProduct;
