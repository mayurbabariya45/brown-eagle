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
import { Error } from "../../components/ErrorMessages/ErrorMessages";
import Background from "../../static/media/full-screen-image.jpg";
import Logo from "../../assets/img/logo.png";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
  }
  componentWillUpdate(nextProps) {
    const { history, success } = nextProps;
    if (success) {
      history.push("/login");
    }
  }
  hanldeSubmitForm(value) {
    const { resetPassword } = this.props;
    resetPassword(value);
  }
  render() {
    const { translate, handleSubmit, loading, errors, message } = this.props;
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
                                  bsIcon: "glyphicon glyphicon-envelope",
                                  label: translate("f_email_address"),
                                  type: "email",
                                  bsClass: "form-control form-control-simple",
                                  placeholder: translate("r_email_placeholder"),
                                  name: "email",
                                  validate: [required, email]
                                }
                              ]}
                            />
                            <Error error={errors} message={message} />
                            <Row>
                              <Col lg={12} md={12} sm={12} xs={12}>
                                <Button
                                  block
                                  radius
                                  fill
                                  bsStyle="warning"
                                  className="text-capitalize"
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
  resetPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.bool.isRequired,
  message: PropTypes.string
};
ForgotPassword.defaultProps = {
  message: ""
};
export default ForgotPassword;
