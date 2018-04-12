import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Form, FormGroup, ControlLabel } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import Select from "react-select";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import { required } from "../../../formValidationRules/FormValidationRules";

export const products = [
  { value: "test1", label: "Test 1" },
  { value: "test2", label: "Test 2" },
  { value: "test3", label: "Test 3" },
  { value: "test4", label: "Test 4" }
];
const CompanyInformationForm = props => {
  const {
    translate,
    loading,
    handleSubmit,
    handleSubmitForm,
    handleSelectChange,
    value
  } = props;

  return (
    <div className="company-information">
      <BlockUi tag="div" blocking={loading}>
        <Col sm={12}>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
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
                  validate: [required]
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
                    value={value}
                    placeholder="Select your main products"
                    options={products}
                    onChange={handleSelectChange}
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
                  validate: [required]
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
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: translate("o_address"),
                  type: "text",
                  componentClass: "textarea",
                  bsClass: "form-control form-control-simple",
                  name: "operationalAddress",
                  validate: [required]
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
                  validate: [required]
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
};

CompanyInformationForm.propTypes = {
  translate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired
};

export default CompanyInformationForm;
