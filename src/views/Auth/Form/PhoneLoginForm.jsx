import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Card } from "../../../components/Card/Card";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import {
  required,
  phoneNumber,
  normalizePhone
} from "../../../formValidationRules/FormValidationRules";

class PhoneLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { toggleLoginForm, translate } = this.props;
    return (
      <div className="form login-form">
        <Card
          className="card-login"
          content={
            <form>
              <FormInputs
                proprieties={[
                  {
                    inputGroup: "select-with-input",
                    bsIcon: "fa fa-mobile",
                    label: translate("l_mobile_phone"),
                    type: "text",
                    bsClass:
                      "form-control form-control-simple form-control-mobile-text",
                    placeholder: translate("l_mobile_placeholder"),
                    name: "nationalCode",
                    validate: [required, phoneNumber],
                    normalize: normalizePhone
                  }
                ]}
              >
                <option value="1">+1 Canada</option>
                <option value="1">+1 Saint Kitts and Nevis</option>
                <option value="1">+1 Saint Lucia</option>
                <option value="1-242">+1-242 Bahamas</option>
                <option value="1-246">+1-246 Barbados</option>
                <option value="1-264">+1-264 Anguilla</option>
                <option value="1-268">+1-268 Antigua and Barbuda</option>
                <option value="1-284">
                  +1-284 British Indian Ocean Territory
                </option>
                <option value="1-345">+1-345 Cayman Islands</option>
                <option value="1-441">+1-441 Bermuda</option>
                <option value="1-473">+1-473 Grenada</option>
                <option value="1-649">+1-649 Turks and Caicos Islands</option>
                <option value="1-664">+1-664 Montserrat</option>
                <option value="1-671">+1-671 Guam</option>
                <option value="1-767">+1-767 Dominica</option>
                <option value="1-787">+1-787 Puerto Rico</option>
                <option value="1-809">+1-809 Dominican Republic</option>
                <option value="1-868">+1-868 Trinidad and Tobago</option>
                <option value="1-876">+1-876 Jamaica</option>
                <option value="1284">+1284 Virgin Islands (British)</option>
              </FormInputs>
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
                    number: "rember",
                    validate: [required]
                  }
                ]}
              >
                <b>Stay signed in.</b>{" "}
                <Link to="#" className="keep-login-detail">
                  {translate("l_button")}
                </Link>
              </FormInputs>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Button block radius fill bsStyle="warning">
                    {translate("l_button")}
                  </Button>
                </Col>
              </Row>
            </form>
          }
          footer
          legend={
            <div className="legend">
              <Row>
                <Col sm={6}>
                  <a onClick={toggleLoginForm}>{translate("l_email_sign")}</a>
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
                <Button simple social className="btn-facebook">
                  <i className="fa fa-facebook-official" />
                </Button>
                <Button simple social className="btn-google">
                  <i className="fa fa-google" />
                </Button>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
PhoneLoginForm.propTypes = {
  toggleLoginForm: PropTypes.func.isRequired
};
export default PhoneLoginForm;
