import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Form } from "react-bootstrap";
import BlockUi from "react-block-ui";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import { required } from "../../../formValidationRules/FormValidationRules";

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { showNotification } = this.props;
    showNotification(
      <span data-notify="icon" className="pe-7s-check" />,
      <div>Kyc has been added successfully.</div>,
      false
    );
  }
  render() {
    const { handleSubmit, loading, translate } = this.props;
    return (
      <div className="payment-form">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>KYC Payment</h5>
              </div>
            </div>
          </Col>
        </Row>
        <BlockUi tag="div" blocking={loading}>
          <Row>
            <Col md={12}>
              <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  proprieties={[
                    {
                      label: "First Name",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "external_account",
                      validate: [required]
                    },
                    {
                      label: "Last Name",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "business_name",
                      validate: [required]
                    },
                    {
                      label: "Type",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "type",
                      validate: [required]
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  proprieties={[
                    {
                      label: "External Account",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "external_account",
                      validate: [required]
                    },
                    {
                      label: "Business Name",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "business_name",
                      validate: [required]
                    },
                    {
                      label: "Business Tax Id",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "business_tax_id",
                      validate: [required]
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  proprieties={[
                    {
                      label: "Address",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "line1",
                      validate: [required]
                    },
                    {
                      label: "City",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "city",
                      validate: [required]
                    },
                    {
                      label: "Postal Code",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "postal_code",
                      validate: [required]
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  proprieties={[
                    {
                      label: "State",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "state",
                      validate: [required]
                    },
                    {
                      label: "Ssn Last 4",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "ssn_last_4",
                      validate: [required]
                    },
                    {
                      label: "Date",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "postal_code",
                      placeholder: "mm/dd/yy",
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
          </Row>
        </BlockUi>
      </div>
    );
  }
}

PaymentForm.propTypes = {};

export default PaymentForm;
