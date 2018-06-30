import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import RequestQuotationForm from "./Form/RequestQuotationForm";

class RequestQuotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {},
      selectedSubCategory: {}
    };
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
    this.handleSelectCategoryValue = this.handleSelectCategoryValue.bind(this);
    this.handleSelectSubCategoryValue = this.handleSelectSubCategoryValue.bind(
      this
    );
  }
  componentWillMount() {
    const { getCategories } = this.props;
    getCategories();
  }
  handleSelectCategoryValue(values) {
    this.setState({
      selectedCategory: values
    });
  }
  handleSelectSubCategoryValue(values) {
    this.setState({
      selectedSubCategory: values
    });
  }
  hanldeSubmitForm(values) {
    const { createQuotation, locale, auth } = this.props;
    const { user } = auth;
    if (_.isEmpty(user)) return false;
    const buyer = user.id;
    const category = this.state.selectedCategory.value;
    const subCategory = this.state.selectedSubCategory.value;
    const objectValues = Object.assign(
      {},
      { ...values, buyer, category, subCategory }
    );
    createQuotation(objectValues, locale);
    return true;
  }
  render() {
    const {
      translate,
      handleSubmit,
      showNotification,
      dropQuotationImages,
      removeQuotationImages,
      categories,
      loading
    } = this.props;
    const categoriesOptions = _.map(categories, category => ({
      label: category.name,
      value: category.id
    }));
    let subCategoriesOption = [];
    if (!_.isEmpty(this.state.selectedCategory)) {
      const findCategory = _.find(categories, [
        "id",
        this.state.selectedCategory.value
      ]);
      if (!_.isEmpty(findCategory)) {
        if (_.has(findCategory, "subCategoryList")) {
          subCategoriesOption = _.map(
            findCategory.subCategoryList,
            subCategory => ({
              label: subCategory.name,
              value: subCategory._id
            })
          );
        }
      }
    }

    return (
      <section className="request_quotation">
        <Grid>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="section-header">
                <div className="title">
                  <h5>{translate("request_quotation_title")}</h5>
                </div>
              </div>
            </Col>
          </Row>
          <div className="request_quotation_form">
            <BlockUi tag="div" blocking={loading}>
              <Row>
                <Col md={12} sm={12} xs={12}>
                  <div className="form-header">
                    <div className="title">
                      <h4>{translate("request_quotation_form_title")}</h4>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={12} xs={12}>
                  <RequestQuotationForm
                    translate={translate}
                    handleSubmit={handleSubmit}
                    hanldeSubmitForm={this.hanldeSubmitForm}
                    showNotification={showNotification}
                    dropQuotationImages={dropQuotationImages}
                    removeQuotationImages={removeQuotationImages}
                    handleSelectCategoryValue={this.handleSelectCategoryValue}
                    handleSelectSubCategoryValue={
                      this.handleSelectSubCategoryValue
                    }
                    selectCategoriesOptions={categoriesOptions}
                    selectSubCategoriesOptions={subCategoriesOption}
                  />
                </Col>
              </Row>
            </BlockUi>
          </div>
        </Grid>
      </section>
    );
  }
}

RequestQuotation.propTypes = {
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  dropQuotationImages: PropTypes.func.isRequired,
  removeQuotationImages: PropTypes.func.isRequired,
  createQuotation: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  auth: PropTypes.objectOf(PropTypes.any),
  locale: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.any)
};

RequestQuotation.defaultProps = {
  auth: {},
  locale: "",
  loading: false,
  categories: []
};

export default RequestQuotation;
