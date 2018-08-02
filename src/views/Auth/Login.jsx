import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Grid } from "react-bootstrap";
import EmailLoginForm from "./Form/EmailLoginForm";
import PhoneLoginForm from "./Form/PhoneLoginForm";
import Background from "../../assets/img/static/full-screen-image.jpg";
import Logo from "../../assets/img/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
  }
  componentWillMount() {
    const { flushState, history, user } = this.props;
    if (user) {
      const { role } = user;
      if (role === "seller") {
        history.push("/dashboard");
      } else if (role === "buyer") {
        history.push("/");
      }
    }
    flushState();
  }
  hanldeSubmitForm(value) {
    const { login, locale, showNotification, history, location } = this.props;
    login(value, locale).then(response => {
      if (response.type === "LOGIN_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "LOGIN_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Redirecting....</div>,
          false
        );
        const data = response.payload.user;
        if (data) {
          if (data.role === "seller") {
            setTimeout(() => history.push("/dashboard"), 2000);
          } else if (data.role === "buyer") {
            if (!_.isEmpty(location.search)) {
              const redirectUrl = location.search.split("?redirect-url=").pop();
              setTimeout(() => history.push(redirectUrl), 2000);
              return false;
            }
            setTimeout(() => history.push("/"), 2000);
          }
        }
      }
    });
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
  socialLogin: PropTypes.func.isRequired,
  flushState: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
};
export default Login;
