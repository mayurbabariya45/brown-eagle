import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Form } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";

const CompanyInformationForm = props => {
  const { translate, loading, handleSubmit, handleSubmitForm } = props;
  return (
    <div className="company-information">
      <BlockUi tag="div" blocking={loading}>
        <Col sm={12}>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              proprieties={[
                {
                  label: translate("c_name"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "c_name"
                },
                {
                  label: translate("p_selling"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "p_selling"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              proprieties={[
                {
                  label: translate("y_established"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "y_established"
                },
                {
                  label: translate("m_products"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "m_products"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              proprieties={[
                {
                  label: translate("o_website"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "o_website"
                },
                {
                  label: translate("r_address"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "r_address"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              proprieties={[
                {
                  label: translate("b_type"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "b_type"
                },
                {
                  label: translate("o_address"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "o_address"
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
                  name: "t_employees"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: translate("about_us"),
                  componentClass: "textarea",
                  bsClass: "form-control form-control-simple",
                  name: "about_us"
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

CompanyInformationForm.propTypes = {};

export default CompanyInformationForm;
