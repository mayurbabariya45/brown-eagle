import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, FieldArray } from "redux-form";
import {
  Form,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { numericality } from "redux-form-validators";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import ProductImageForm from "./ProductImageForm";
import { required } from "../../../formValidationRules/FormValidationRules";
import Button from "../../../elements/CustomButton/CustomButton";
import formValidationScroller from "../../../variables/FormValidationScroller";

const renderField = ({ input, size }) => (
  <Col sm={size || 2}>
    <FormControl {...input} bsClass="form-control form-control-simple" />
  </Col>
);
const renderMutipleField = ({ input, size }) => (
  <Col sm={size || 2}>
    <FormControl {...input} bsClass="form-control form-control-simple" />
  </Col>
);
const renderInputs = ({ fields, meta: { error } }) => (
  <Row>
    <Col md={12}>
      <div className="mutiple-form-group">
        <FormGroup className="custom-form-group ">
          <Col componentClass={ControlLabel} sm={2}>
            Product Details
          </Col>
          <Field name="label" type="text" component={renderField} />
          <Field name="value" size={3} type="text" component={renderField} />
        </FormGroup>
        <span>
          <Button fill onClick={() => fields.push()}>
            Add More
          </Button>
        </span>
        {fields.map((name, index) => (
          <FormGroup className="custom-form-group" key={index}>
            <Col componentClass={ControlLabel} sm={2} />
            <Field name={name} type="text" component={renderMutipleField} />
            <Field
              name={`value_${name}`}
              size={3}
              type="text"
              component={renderMutipleField}
            />
            <Col sm={2}>
              <Button
                bsStyle="danger"
                fill
                simple
                onClick={() => fields.remove(index)}
              >
                <i className="pe-7s-trash" />
              </Button>
            </Col>
          </FormGroup>
        ))}
      </div>
    </Col>
  </Row>
);

class ProductInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                <FieldArray name="product_label" component={renderInputs} />
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

export default reduxForm({
  form: "ProductInformationForm",
  onSubmitFail: errors => formValidationScroller(errors)
})(ProductInformationForm);
