import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Grid, Form } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";
import {
  required,
  match,
  passwordLength
} from "../../formValidationRules/FormValidationRules";
import Background from "../../static/media/full-screen-image.jpg";
import Logo from "../../assets/img/logo.png";

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
  }
  componentWillMount() {
    const { location, history, removeAll } = this.props;
    if (!location.search) {
      history.push("/login");
    }
    removeAll();
  }
  hanldeSubmitForm({ password }) {
    const {
      resetPassword,
      location,
      locale,
      showNotification,
      history
    } = this.props;
    const id = location.search.split("?key=").pop();
    const object = Object.assign({}, { password, id });
    resetPassword(object, locale).then(response => {
      if (response.type === "PASSWORD_RESET_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "PASSWORD_RESET_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{response.payload.message}</div>,
          false
        );
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    });
  }
  render() {
    const {
      translate,
      handleSubmit,
      loading,
      errors,
      message,
      invalid
    } = this.props;
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
                                  validate: [required]
                                }
                              ]}
                            />

                            <Row>
                              <Col lg={12} md={12} sm={12} xs={12}>
                                {errors ? (
                                  <a
                                    href="/#/forgot-password"
                                    className="text-capitalize btn-fill btn-block btn-radius btn btn-warning"
                                  >
                                    {translate("resend_password_link")}
                                  </a>
                                ) : (
                                  <Button
                                    block
                                    radius
                                    fill
                                    bsStyle="warning"
                                    className="text-capitalize"
                                    disabled={invalid}
                                    type="submit"
                                  >
                                    {translate("password_reset")}
                                  </Button>
                                )}
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
PasswordReset.propTypes = {
  translate: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.bool.isRequired,
  message: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  showNotification: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired
};
PasswordReset.defaultProps = {
  message: ""
};
export default PasswordReset;
