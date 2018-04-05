import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Col, Row, Form, FormGroup } from "react-bootstrap";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import {
  required,
  email
} from "../../../formValidationRules/FormValidationRules";
import { Error } from "../../../components/ErrorMessages/ErrorMessages";

class VerificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      submitting,
      pristine,
      handleSubmit,
      hanldeSubmitForm,
      loading,
      message,
      errors,
      translate
    } = this.props;
    return (
      <Row>
        <Col sm={6} smOffset={3}>
          <Form horizontal onSubmit={handleSubmit(hanldeSubmitForm)}>
            <BlockUi tag="div" blocking={loading}>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    label: translate("r_email"),
                    type: "email",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("r_email_placeholder"),
                    name: "email",
                    validate: [required, email]
                  }
                ]}
              />
              <FormGroup>
                <Col smOffset={3} sm={9}>
                  <FormInputs
                    proprieties={[
                      {
                        type: "checkbox",
                        name: "rember",
                        number: "rember",
                        validate: [required]
                      }
                    ]}
                  >
                    <div className="agreement-content">
                      <p>{translate("r_static_p")}</p>
                      <p>
                        -{" "}
                        <a
                          href="http://brown-eagle.com/privacy-notice"
                          className="text-warning"
                          target="blank"
                        >
                          www.brown-eagle.com
                        </a>{" "}
                        {translate("r_user_a")}
                      </p>
                      <p>- {translate("r_static_text")}</p>
                    </div>
                  </FormInputs>
                </Col>
              </FormGroup>
              <Error error={errors} message={message} />
              <FormGroup>
                <Col smOffset={3} sm={9}>
                  <Button
                    type="submit"
                    radius
                    fill
                    bsStyle="warning"
                    disabled={pristine || submitting}
                  >
                    {translate("r_next")}
                  </Button>
                </Col>
              </FormGroup>
            </BlockUi>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default reduxForm({ form: "verificationForm" })(VerificationForm);
