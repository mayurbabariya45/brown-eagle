import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Col, Row } from "react-bootstrap";
import Card from "../../components/Card/Card";
import FormInputs from "../../components/FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";
import { required } from "../../formValidationRules/FormValidationRules";

class OtpMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="form otp-form">
        <Card
          radius
          content={
            <form>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    label:
                      "Enter 6-Digits OTP which we sent to your Email and Mobile",
                    bsClass: "form-control form-control-simple",
                    placeholder: "Enter OTP",
                    name: "otp",
                    validate: [required]
                  }
                ]}
              />
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Button block radius fill bsStyle="warning">
                    Verify
                  </Button>
                </Col>
              </Row>
            </form>
          }
        />
        <div className="resend-links">
          <a href="#resend">Resend Verification OTP</a>
        </div>
      </div>
    );
  }
}
export default reduxForm({ form: "otpForm" })(OtpMessage);
