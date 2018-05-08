import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { scroller } from "react-scroll";
import { Form, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import { numericality } from "redux-form-validators";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Select from "../../../elements/CustomSelect/CustomSelect";
import ProductImageForm from "./ProductImageForm";
import { required } from "../../../formValidationRules/FormValidationRules";
import Button from "../../../elements/CustomButton/CustomButton";

class ProductInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderExtraForm = this.renderExtraForm.bind(this);
  }
  renderExtraForm({ fields, meta: { error, submitFailed } }) {
    const { translate } = this.props;
    return (
      <Row>
        {fields.map((form, index) => (
          <Col md={12} key={index}>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Col sm={8}>
                    <Button
                      bsStyle="danger"
                      fill
                      simple
                      pullRight
                      className="custom-remove-btn"
                      onClick={() => fields.remove(index)}
                    >
                      <i className="pe-7s-trash" />
                    </Button>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <div className="form-horizontal-box">
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    xsLabel: 2,
                    xsInput: 5,
                    label: translate("a_product_name"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: `${form}.product_name`,
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    xsLabel: 2,
                    xsInput: 5,
                    label: translate("a_product_keyword"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: `${form}.product_keyword`,
                    className: "custom-form-group",
                    mutipleFields: true,
                    validate: [required]
                  }
                ]}
              />
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      {translate("a_product_group")}
                    </Col>
                    <Col sm={5}>
                      <Select productGroup searchable={false} />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  inputGroup: "horizontal",
                  xsLabel: 2,
                  xsInput: 5,
                  label: translate("a_brake"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: `${form}.product_brake`,
                  validate: [required]
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  inputGroup: "horizontal",
                  xsLabel: 2,
                  xsInput: 5,
                  label: translate("a_model_number"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: `${form}.product_model_number`,
                  validate: [required]
                }
              ]}
            />
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={2}>
                    {translate("a_origin")}
                  </Col>
                  <Col sm={5}>
                    <Select productGroup searchable={false} />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  inputGroup: "horizontal",
                  xsLabel: 2,
                  xsInput: 5,
                  label: translate("a_brand_name"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: `${form}.product_brand_name`,
                  validate: [required]
                }
              ]}
            />
          </Col>
        ))}
        <Col md={10} sm={10} xs={10} mdOffset={2} smOffset={2} xsOffset={2}>
          <Button bsStyle="warning" radius fill onClick={() => fields.push({})}>
            {translate("a_add_more")}
          </Button>
          {submitFailed && error && <span>{error}</span>}
        </Col>
      </Row>
    );
  }
  render() {
    const { translate, handleSubmit, hanldeSubmitForm } = this.props;
    return (
      <div>
        <Form horizontal onSubmit={handleSubmit(hanldeSubmitForm)}>
          <div className="box">
            <div className="box-header">
              <div className="title">{translate("a_basic")}</div>
            </div>
            <div className="box-content">
              <div className="product-information-form">
                <div className="form-horizontal-box">
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        inputGroup: "horizontal",
                        xsLabel: 2,
                        xsInput: 5,
                        label: translate("a_product_name"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "name",
                        validate: [required]
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        inputGroup: "horizontal",
                        xsLabel: 2,
                        xsInput: 5,
                        label: translate("a_product_price"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "productPrice",
                        validate: [required]
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        inputGroup: "horizontal",
                        xsLabel: 2,
                        xsInput: 5,
                        label: translate("a_product_quantity"),
                        type: "number",
                        bsClass: "form-control form-control-simple",
                        name: "minQuantity",
                        validate: [required, numericality({ ">": 0 })]
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        inputGroup: "horizontal",
                        xsLabel: 2,
                        xsInput: 5,
                        label: translate("a_product_keyword"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        className: "custom-form-group",
                        name: "product_keywords",
                        mutipleFields: true,
                        translate,
                        validate: [required]
                      }
                    ]}
                  />
                  {/* <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        {translate("a_product_group")}
                      </Col>
                      <Col sm={5}>
                        <Select productGroup searchable={false} />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row> */}
                  <Row>
                    <Col sm={12}>
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            xsLabel: 2,
                            xsInput: 5,
                            inputGroup: "checkbox_horizontal",
                            type: "checkbox",
                            name: "productAvailability",
                            number: "productAvailability"
                          }
                        ]}
                      >
                        <b>Product Availability</b>
                      </FormInputs>
                    </Col>
                  </Row>
                </div>
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      inputGroup: "horizontal",
                      xsLabel: 2,
                      xsInput: 5,
                      label: translate("a_description"),
                      type: "text",
                      componentClass: "textarea",
                      style: { height: 100 },
                      bsClass: "form-control form-control-simple",
                      name: "description",
                      validate: [required]
                    }
                  ]}
                />
                {/* <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    xsLabel: 2,
                    xsInput: 5,
                    label: translate("a_brake"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "product_brake",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    xsLabel: 2,
                    xsInput: 5,
                    label: translate("a_model_number"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "product_model_number",
                    validate: [required]
                  }
                ]}
              />
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      {translate("a_origin")}
                    </Col>
                    <Col sm={5}>
                      <Select productGroup searchable={false} />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    xsLabel: 2,
                    xsInput: 5,
                    label: translate("a_brand_name"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "product_brand_name",
                    validate: [required]
                  }
                ]}
              />
              <FieldArray name="members" component={this.renderExtraForm} /> */}
              </div>
            </div>
          </div>
          <ProductImageForm {...this.props} />
        </Form>
      </div>
    );
  }
}

ProductInformationForm.propTypes = {
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hanldeSubmitForm: PropTypes.func.isRequired
};
function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );
}
function getErrorFieldNames(obj, name = "") {
  const errorArr = [];
  errorArr.push(
    Object.keys(obj)
      .map(key => {
        const next = obj[key];
        if (next) {
          if (typeof next === "string") {
            return name + key;
          }
          // Keep looking
          if (next.map) {
            errorArr.push(
              next
                .map((item, index) =>
                  getErrorFieldNames(item, `${name}${key}[${index}].`)
                )
                .filter(o => o)
            );
          }
        }
        return null;
      })
      .filter(o => o)
  );
  return flatten(errorArr);
}

function scrollToFirstError(errors) {
  const errorFields = getErrorFieldNames(errors);
  // Using breakable for loop
  for (let i = 0; i < errorFields.length; i++) {
    const fieldName = errorFields[i];
    // Checking if the marker exists in DOM
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { offset: -200, smooth: true });
      break;
    }
  }
}
export default reduxForm({
  form: "ProductInformationForm",
  onSubmitFail: errors => scrollToFirstError(errors)
})(ProductInformationForm);