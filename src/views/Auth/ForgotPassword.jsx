import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Grid } from "react-bootstrap";
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
  }
  render() {
    const { translate } = this.props;
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
                    <Card
                      className="card-login"
                      content={
                        <form>
                          <FormInputs
                            proprieties={[
                              {
                                inputGroup: "feedback",
                                bsIcon: "glyphicon glyphicon-envelope",
                                label: translate("f_email_address"),
                                type: "email",
                                bsClass: "form-control form-control-simple",
                                placeholder: translate("l_email_placeholder"),
                                name: "email",
                                validate: [required, email]
                              }
                            ]}
                          />
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <Button
                                block
                                radius
                                fill
                                bsStyle="warning"
                                className="text-capitalize"
                              >
                                {translate("forgot_password")}
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      }
                    />
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
export default ForgotPassword;
