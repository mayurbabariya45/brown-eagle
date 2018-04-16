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

  hanldeSubmitForm(value) {
    const { selectedCategory, addProduct } = this.props;
    const { user } = this.props.auth;
    if (_.isEmpty(user)) return false;
    const category = selectedCategory;
    const seller = user.id;
    const keywords = value.keywords
      ? value.keywords.concat(value.product_keywords)
      : Object.assign([], value.product_keyword);
    delete value.product_keywords;
    const object = Object.assign({}, { ...value, category, keywords, seller });
    addProduct(object);
    return true;
  }
  render() {
    const { translate } = this.props;
    console.log(this.props);
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
  getCategories: PropTypes.func.isRequired
};

export default AddProduct;
