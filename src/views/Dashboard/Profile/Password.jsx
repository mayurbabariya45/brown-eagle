import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import { reduxForm } from "redux-form";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Card } from "../../../components/Card/Card";
import {
  required,
  match,
  minLength
} from "../../../formValidationRules/FormValidationRules";
import { AlertSuccess } from "../../../components/ErrorMessages/ErrorMessages";
import Button from "../../../elements/CustomButton/CustomButton";
import { FormInputs } from "../../../components/FormInputs/FormInputs";

const ChangePassword = props => {
  const {
    translate,
    loading,
    handleSubmit,
    hanldePasswordForm,
    invalid
  } = props;
  return (
    <div className="password-change">
      <BlockUi tag="div" blocking={loading}>
        <Row>
          <Col md={12}>
            <Row>
              <Card
                className="card-profile"
                plain
                footer
                header={
                  <div className="header card-header-action">
                    <h4 className="title">{translate("d_change_password")}</h4>
                  </div>
                }
                content={
                  <Row>
                    <Col md={12}>
                      <AlertSuccess {...props} />
                      <Form onSubmit={handleSubmit(hanldePasswordForm)}>
                        <FormInputs
                          proprieties={[
                            {
                              inputGroup: "feedback",
                              bsIcon: "glyphicon glyphicon-lock",
                              label: translate("n_password"),
                              type: "password",
                              bsClass: "form-control form-control-simple",
                              placeholder: translate("r_password_placeholder"),
                              name: "password",
                              validate: [required, minLength(6)]
                            }
                          ]}
                        />
                        <FormInputs
                          proprieties={[
                            {
                              inputGroup: "feedback",
                              bsIcon: "glyphicon glyphicon-repeat",
                              label: translate("r_c_password"),
                              type: "password",
                              bsClass: "form-control form-control-simple",
                              placeholder: translate(
                                "r_c_password_placeholder"
                              ),
                              name: "c_password",
                              validate: [required, match("password")]
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
                              disabled={invalid}
                              type="submit"
                            >
                              {translate("d_change_password")}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                }
              />
            </Row>
          </Col>
        </Row>
      </BlockUi>
    </div>
  );
};

ChangePassword.propTypes = {
  translate: PropTypes.func.isRequired
};

export default reduxForm({ form: "changePasswordForm" })(ChangePassword);
