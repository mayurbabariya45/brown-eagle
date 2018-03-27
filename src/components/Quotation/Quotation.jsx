import React, { Component } from "react";
import { FormGroup } from "react-bootstrap";
import { FormInputs } from "../FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";
import { required, email } from "../../formValidationRules/FormValidationRules";

class Quotation extends Component {
  render() {
    const { translate, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormInputs
          ncols={["col-md-12"]}
          proprieties={[
            {
              type: "text",
              bsClass: "form-control form-control-fill",
              placeholder: "Firstname",
              name: "firstname",
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
              placeholder: "Lastname",
              name: "lastname",
              validate: [required]
            }
          ]}
        />
        <FormInputs
          ncols={["col-md-12"]}
          proprieties={[
            {
              type: "email",
              bsClass: "form-control form-control-fill",
              placeholder: "Email",
              name: "email",
              validate: [required, email]
            }
          ]}
        />
        <FormInputs
          ncols={["col-md-12"]}
          proprieties={[
            {
              type: "text",
              bsClass: "form-control form-control-fill",
              placeholder: "Phone",
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
              placeholder: "Product name",
              name: "product_name",
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
              placeholder: "Quanlity",
              name: "quanlity",
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
              placeholder: "Price",
              name: "price",
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
              componentClass: "textarea",
              placeholder: "Description",
              name: "description",
              validate: [required]
            }
          ]}
        />
        <FormGroup>
          <Button fill block radius bsStyle="warning" disabled={submitting}>
            {translate("request_quote")}
          </Button>
        </FormGroup>
      </form>
    );
  }
}
export default Quotation;
