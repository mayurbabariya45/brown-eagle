import React from "react";
import {
  FormGroup,
  Row,
  Col,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import { FormInputs } from "../FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";
import { required, email } from "../../formValidationRules/FormValidationRules";

const Quotation = props => {
  const { translate, handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormInputs
        ncols={["col-md-6", "col-md-6"]}
        proprieties={[
          {
            type: "text",
            bsClass: "form-control form-control-fill",
            placeholder: translate("request_for_fname_label"),
            name: "firstname",
            validate: [required]
          },
          {
            type: "text",
            bsClass: "form-control form-control-fill",
            placeholder: translate("request_for_lname_label"),
            name: "lastname",
            validate: [required]
          }
        ]}
      />
      <FormInputs
        ncols={["col-md-6", "col-md-6"]}
        proprieties={[
          {
            type: "email",
            bsClass: "form-control form-control-fill",
            placeholder: translate("request_for_email_label"),
            name: "email",
            validate: [required, email]
          },
          {
            type: "text",
            bsClass: "form-control form-control-fill",
            placeholder: translate("request_for_phone_label"),
            name: "phone",
            validate: [required]
          }
        ]}
      />
      <FormInputs
        ncols={["col-md-12"]}
        proprieties={[
          {
            type: "text",
            bsClass: "form-control form-control-fill",
            placeholder: translate("request_for_product_label"),
            name: "product_name",
            validate: [required]
          }
        ]}
      />
      <FormInputs
        ncols={["col-md-6", "col-md-6"]}
        proprieties={[
          {
            type: "text",
            bsClass: "form-control form-control-fill",
            placeholder: translate("request_for_quantity_label"),
            name: "quanlity",
            validate: [required]
          },
          {
            type: "text",
            bsClass: "form-control form-control-fill",
            placeholder: translate("request_for_price_label"),
            name: "price",
            validate: [required]
          }
        ]}
      />
      <Row>
        <Col md={12}>
          <FormGroup>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton value={1}>
                  {translate("request_for_price")}
                </ToggleButton>
                <ToggleButton value={2}>
                  {translate("request_for_sample")}
                </ToggleButton>
                <ToggleButton value={3}>
                  {translate("request_for_details")}
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Button fill block radius bsStyle="warning" disabled={submitting}>
              {translate("request_quote")}
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </form>
  );
};
export default Quotation;
