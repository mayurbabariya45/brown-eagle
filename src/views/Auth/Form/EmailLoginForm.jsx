import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Card } from "../../../components/Card/Card";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import { Error } from "../../../components/ErrorMessages/ErrorMessages";
import {
  required,
  email
} from "../../../formValidationRules/FormValidationRules";
import Languages from "../../../components/Languages/Languages";

class EmailLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLanguage = this.handleLanguage.bind(this);
  }
  handleLanguage(lang) {
    const { setLocale } = this.props;
    setLocale(lang);
  }
  render() {
    const {
      hanldeSubmitForm,
      handleSubmit,
      loading,
      errors,
      message,
      handleSocialLogin,
      translate
    } = this.props;
    return (
      <div className="form login-form">
        <BlockUi tag="div" blocking={loading}>
          <Card
            className="card-login"
            content={
              <Form onSubmit={handleSubmit(hanldeSubmitForm)}>
                <FormInputs
                  proprieties={[
                    {
                      inputGroup: "feedback",
                      bsIcon: "glyphicon glyphicon-envelope",
                      label: translate("l_account"),
                      type: "email",
                      bsClass: "form-control form-control-simple",
                      placeholder: translate("l_email_placeholder"),
                      name: "email",
                      validate: [required, email]
                    }
                  ]}
                />
                <FormInputs
                  proprieties={[
                    {
                      inputGroup: "feedback",
                      bsIcon: "fa fa-lock",
                      label: translate("password"),
                      type: "password",
                      bsClass: "form-control form-control-simple",
                      placeholder: translate("password"),
                      name: "password",
                      validate: [required]
                    }
                  ]}
                >
                  <span className="form-label-extra">
                    <Link to="/forgot-password">
                      {translate("forgot_password")}
                    </Link>
                  </span>
                </FormInputs>
                <FormInputs
                  proprieties={[
                    {
                      type: "checkbox",
                      name: "rember",
                      number: "rember"
                    }
                  ]}
                >
                  <b>{translate("l_stay")}</b>{" "}
                  <Link to="#" className="keep-login-detail">
                    {translate("l_detail")}
                  </Link>
                </FormInputs>
                {/* <Error error={errors} message={message} /> */}
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Button block radius fill bsStyle="warning" type="submit">
                      {translate("l_button")}
                    </Button>
                  </Col>
                </Row>
              </Form>
            }
            footer
            legend={
              <div className="legend">
                <Row>
                  <Col sm={6}>
                    {/* <a onClick={toggleLoginForm}>
                      {translate("l_mobile_sign")}
                    </a> */}
                  </Col>
                  <Col sm={6}>
                    <Link to="/register">{translate("l_join")}</Link>
                  </Col>
                </Row>
              </div>
            }
            stats={
              <div className="social-login-links">
                <span>{translate("l_sign_with")}</span>
                <div className="social-links">
                  <Button
                    simple
                    social
                    className="btn-facebook"
                    onClick={() => handleSocialLogin("facebook")}
                  >
                    <i className="fa fa-facebook-official" />
                  </Button>
                  <Button
                    simple
                    social
                    className="btn-google"
                    onClick={() => handleSocialLogin("google")}
                  >
                    <i className="fa fa-google" />
                  </Button>
                </div>
                <div className="languages">
                  <Languages
                    {...this.props}
                    dropdownButton
                    className="btn-border btn-simple"
                    dropup
                    handleLanguage={this.handleLanguage}
                  />
                </div>
              </div>
            }
          />
        </BlockUi>
      </div>
    );
  }
}
EmailLoginForm.propTypes = {
  toggleLoginForm: PropTypes.func.isRequired,
  handleSocialLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hanldeSubmitForm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.bool.isRequired,
  message: PropTypes.string,
  translate: PropTypes.func.isRequired
};
EmailLoginForm.defaultProps = {
  message: ""
};
export default EmailLoginForm;
