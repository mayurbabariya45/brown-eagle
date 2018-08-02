import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import Tabs from "./Tabs";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
  }

  componentWillMount() {
    const { getCategories } = this.props;
    getCategories();
  }
  componentWillUnmount() {
    const { flushAddProduct } = this.props;
    flushAddProduct();
  }
  hanldeSubmitForm(value) {
    const {
      selectedCategory,
      selectedSubCategory,
      addProduct,
      locale
    } = this.props;
    const { user } = this.props.auth;
    if (_.isEmpty(user)) return false;
    const category = selectedCategory.id;
    const subCategory = !_.isEmpty(selectedSubCategory)
      ? selectedSubCategory._id
      : "";
    const seller = user.id;
    const keywords = value.keywords
      ? value.keywords.concat(value.product_keywords)
      : [value.product_keywords];
    delete value.product_keywords;
    let productAvailability = false;
    if (value.productAvailability) {
      productAvailability = value.productAvailability;
    }
    let object = Object.assign(
      {},
      { ...value, category, keywords, seller, productAvailability }
    );
    if (!_.isEmpty(subCategory)) {
      object = Object.assign(
        {},
        {
          ...value,
          category,
          subCategory,
          keywords,
          seller,
          productAvailability
        }
      );
    }
    addProduct(object, locale);
    return true;
  }
  render() {
    const { translate } = this.props;
    return (
      <section className="add-product-wrapper">
        <Grid>
          <Row>
            <div className="add-product">
              <Col md={12}>
                <div className="section-header">
                  <h5>{translate("a_new_product")}</h5>
                </div>
                <Tabs
                  {...this.props}
                  hanldeSubmitForm={this.hanldeSubmitForm}
                />
              </Col>
            </div>
          </Row>
        </Grid>
      </section>
    );
  }
}

AddProduct.propTypes = {
  translate: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  flushAddProduct: PropTypes.func.isRequired
};

export default AddProduct;
