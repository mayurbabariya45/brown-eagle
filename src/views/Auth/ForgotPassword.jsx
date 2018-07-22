import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Grid, Form } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";
import { required, email } from "../../formValidationRules/FormValidationRules";

import Background from "../../static/media/full-screen-image.jpg";
import Logo from "../../assets/img/logo.png";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }
  componentWillMount() {
    const { flushState, removeAll } = this.props;
    flushState();
    removeAll();
  }
  handleBackButton() {
    const { history } = this.props;
    history.goBack();
  }
  hanldeSubmitForm(value) {
    const { resetPasswordEmail, showNotification } = this.props;
    resetPasswordEmail(value).then(response => {
      if (response.type === "PASSWORD_RESET_EMAIL_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "PASSWORD_RESET_EMAIL_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{response.payload.message}</div>,
          false
        );
      }
    });
  }
  render() {
    const { translate, handleSubmit, loading, success } = this.props;
    return (
      <div className="wrapper wrapper-full-page">
        <div className="full-page login-page has-image">
          <div className="content">
            <Grid>
              <Row>
                <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                  <div className="login-logo">
                    <Link to="#">
                      <img src={Logo} alt="brown-eagle" />
                    </Link>
                  </div>
                  <div className="form login-form">
                    <BlockUi tag="div" blocking={loading}>
                      <Card
                        className="card-login"
                        content={
                          <Form onSubmit={handleSubmit(this.hanldeSubmitForm)}>
                            <FormInputs
                              proprieties={[
                                {
                                  inputGroup: "icon",
                                  bsIcon: "glyphicon glyphicon-envelope",
                                  label: translate("f_email_address"),
                                  type: "email",
                                  bsClass: "form-control form-control-simple",
                                  placeholder: translate("r_email_placeholder"),
                                  name: "email",
                                  disabled: success,
                                  validate: [required, email]
                                }
                              ]}
                            />
                            <Row>
                              <Col
                                lg={6}
                                md={6}
                                sm={6}
                                xs={6}
                                className="text-left"
                              >
                                <Button
                                  className="text-capitalize"
                                  disabled={success}
                                  onClick={this.handleBackButton}
                                >
                                  {translate("back_text")}
                                </Button>
                              </Col>
                              <Col
                                lg={6}
                                md={6}
                                sm={6}
                                xs={6}
                                className="text-right"
                              >
                                <Button
                                  className="text-capitalize btn-border-yellow"
                                  disabled={success}
                                  type="submit"
                                >
                                  {translate("forgot_password")}
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        }
                      />
                    </BlockUi>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div
            className="full-page-background"
            style={{
              backgroundImage: `url(${Background})`
            }}
          />
        </div>
      </div>
    );
  }
}
ForgotPassword.propTypes = {
  translate: PropTypes.func.isRequired,
  resetPasswordEmail: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  flushState: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired
};

export default ForgotPassword;
