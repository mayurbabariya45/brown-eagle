import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Card } from "../../components/Card/Card";
import {
  required,
  match,
  passwordLength
} from "../../formValidationRules/FormValidationRules";
import Notification from "../../components/Notification/Notification";
import Button from "../../elements/CustomButton/CustomButton";
import { FormInputs } from "../../components/FormInputs/FormInputs";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { flushState } = this.props;
    flushState();
  }

  handleSubmit(value) {
    const { changePassword, password, history } = this.props;
    const obj = Object.assign(
      {},
      {
        id: password.user.id,
        password: value.password
      }
    );
    changePassword(obj);
    history.push("/login");
  }
  render() {
    const { translate, handleSubmit, invalid } = this.props;
    const { success, message, loading } = this.props.password;
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
                      <h4 className="title">
                        {translate("d_change_password")}
                      </h4>
                    </div>
                  }
                  content={
                    <Row>
                      <Col md={12}>
                        <Notification success={success} message={message} />
                        <Form onSubmit={handleSubmit(this.handleSubmit)}>
                          <FormInputs
                            proprieties={[
                              {
                                inputGroup: "feedback",
                                bsIcon: "glyphicon glyphicon-lock",
                                label: translate("n_password"),
                                type: "password",
                                bsClass: "form-control form-control-simple",
                                placeholder: translate(
                                  "r_password_placeholder"
                                ),
                                name: "password",
                                validate: [required, passwordLength]
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
  }
}

ChangePassword.propTypes = {
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  flushState: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired
};
export default ChangePassword;
