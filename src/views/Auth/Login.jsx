import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Grid } from "react-bootstrap";
import EmailLoginForm from "./Form/EmailLoginForm";
import PhoneLoginForm from "./Form/PhoneLoginForm";
import Background from "../../static/media/full-screen-image.jpg";
import Logo from "../../assets/img/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
  }
  componentWillUpdate(nextProps) {
    const { history, success, user } = nextProps;
    if (success) {
      if (user) {
        const { role } = user;
        if (role === "seller") {
          history.push("/dashboard");
        } else {
          history.push("/");
        }
      }
    }
  }
  hanldeSubmitForm(value) {
    const { login } = this.props;
    login(value);
  }
  handleSocialLogin(provider) {
    const { socialLogin } = this.props;
    socialLogin(provider);
  }
  render() {
    const { loginForm } = this.props;
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
                  {!loginForm && (
                    <EmailLoginForm
                      {...this.props}
                      hanldeSubmitForm={this.hanldeSubmitForm}
                      handleSocialLogin={this.handleSocialLogin}
                    />
                  )}
                  {loginForm && <PhoneLoginForm {...this.props} />}
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
Login.propTypes = {
  success: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginForm: PropTypes.bool.isRequired,
  socialLogin: PropTypes.func.isRequired
};
export default Login;
