import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Form, FormGroup, ControlLabel } from "react-bootstrap";
import { url, date, numericality, length } from "redux-form-validators";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import Select from "react-select";
import SelectBox from "../../../elements/CustomSelect/CustomSelect";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import { countries, style } from "../../../variables/Variables";
import { required } from "../../../formValidationRules/FormValidationRules";

export const products = [
  { value: "test1", label: "Test 1" },
  { value: "test2", label: "Test 2" },
  { value: "test3", label: "Test 3" },
  { value: "test4", label: "Test 4" }
];

class CompanyInformationForm extends Component {
  constructor(props) {
    super(props);
    const data = props.auth.user;
    const mainProduct = data.profile;
    const rCountry = !_.isEmpty(data)
      ? _.find(countries, ["label", data.profile.registeredAddress.country])
      : {};
    const oCountry = !_.isEmpty(data)
      ? _.find(countries, ["label", data.profile.operationalAddress.country])
      : {};
    this.state = {
      value: mainProduct
        ? _.map(mainProduct.mainProducts, product => ({
            value: product,
            label: product
          }))
        : [],
      rCountry: {
        ...rCountry
      },
      oCountry: {
        ...oCountry
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleRCountry = this.handleRCountry.bind(this);
    this.handleOCountry = this.handleOCountry.bind(this);
  }
  handleSelectChange(value) {
    this.setState({ value });
  }
  handleRCountry(value) {
    const { changeFieldValue } = this.props;
    changeFieldValue("r_country", value.label);
    this.setState({ rCountry: value });
  }
  handleOCountry(value) {
    const { changeFieldValue } = this.props;
    changeFieldValue("o_country", value.label);
    this.setState({ oCountry: value });
  }
  handleChecked(e, value) {
    const { changeFieldValue, companyInformationForm } = this.props;
    let {
      r_city,
      registeredAddress,
      r_area_code,
      r_country
    } = companyInformationForm;
    let country = this.state.rCountry;
    if (value) {
      r_city = "";
      registeredAddress = "";
      r_area_code = "";
      r_country = "";
      country = {};
    }
    changeFieldValue("o_city", r_city);
    changeFieldValue("operationalAddress", registeredAddress);
    changeFieldValue("o_area_code", r_area_code);
    changeFieldValue("o_country", r_country);
    this.setState({ oCountry: country });
  }
  handleSubmit(values) {
    const { handleSubmitForm } = this.props;

    const data = {
      id: values.id,
      profile: {
        mainProducts: _.map(this.state.value, "value"),
        ...values,
        registeredAddress: {
          address: values.registeredAddress,
          city: values.r_city,
          country: values.r_country,
          areaCode: values.r_area_code
        },
        operationalAddress: {
          address: values.operationalAddress,
          city: values.o_city,
          country: values.o_country,
          areaCode: values.o_area_code
        }
      }
    };
    delete data.o_area_code;
    delete data.o_city;
    delete data.o_country;
    delete data.r_area_code;
    delete data.r_city;
    delete data.r_country;
    handleSubmitForm(data);
  }
  render() {
    const { translate, loading, handleSubmit } = this.props;
    return (
      <div className="company-information">
        <BlockUi tag="div" blocking={loading}>
          <Col sm={12}>
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("c_name"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "companyName",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("y_established"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "established",
                    validate: [
                      required,
                      date({
                        format: "yyyy",
                        message: translate("year_validation")
                      })
                    ]
                  }
                ]}
              />
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <ControlLabel> {translate("m_products")}</ControlLabel>
                    <Select
                      multi
                      joinValues
                      value={this.state.value}
                      placeholder="Select your main products"
                      options={products}
                      onChange={this.handleSelectChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("o_website"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "website",
                    validate: url({
                      message: translate("url_validation"),
                      allowBlank: true
                    })
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("b_type"),
                    type: "select",
                    bsClass: "form-control form-control-simple",
                    name: "businessType",
                    validate: [required]
                  }
                ]}
              >
                <option>Select Bussiness Type</option>
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Type 3</option>
              </FormInputs>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("r_address"),
                    type: "text",
                    componentClass: "textarea",
                    bsClass: "form-control form-control-simple",
                    name: "registeredAddress",
                    validate: [required]
                  }
                ]}
              />
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <SelectBox
                      searchable
                      options={countries}
                      selectedValue={this.state.rCountry}
                      handleCountry={this.handleRCountry}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("city"),
                    name: "r_city",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("zip_code"),
                    name: "r_area_code",
                    validate: [
                      required,
                      numericality({ int: true }),
                      length({ min: 6, allowBlank: true })
                    ]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "label_with_checkbox",
                    label: translate("o_address"),
                    type: "text",
                    componentClass: "textarea",
                    bsClass: "form-control form-control-simple",
                    name: "operationalAddress",
                    handleChecked: this.handleChecked,
                    validate: [required]
                  }
                ]}
              >
                {translate("label_address")}
              </FormInputs>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <SelectBox
                      searchable
                      options={countries}
                      selectedValue={this.state.oCountry}
                      handleCountry={this.handleOCountry}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("city"),
                    name: "o_city",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("zip_code"),
                    name: "o_area_code",
                    validate: [
                      required,
                      numericality({ int: true }),
                      length({ min: 6, allowBlank: true })
                    ]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("t_employees"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "employeeCount",
                    validate: [required, numericality({ int: true })]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    label: translate("about_us"),
                    componentClass: "textarea",
                    bsClass: "form-control form-control-simple",
                    name: "aboutUs",
                    style: { height: 100 },
                    validate: [required]
                  }
                ]}
              />
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Button
                    radius
                    fill
                    bsStyle="warning"
                    className="text-capitalize"
                    type="submit"
                  >
                    {translate("d_submit")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </BlockUi>
      </div>
    );
  }
}

CompanyInformationForm.propTypes = {
  translate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  changeFieldValue: PropTypes.func.isRequired
};

export default CompanyInformationForm;
