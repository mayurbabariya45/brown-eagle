import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Col, Row } from "react-bootstrap";
import Tabs from "./Tabs";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }
  handleLocation(values) {
    this.setState({ location: values.value });
  }
  hanldeSubmitForm(value) {
    const {
      checkUsername,
      registerUser,
      verifyEmail,
      formData,
      activeTabs,
      locale,
      showNotification
    } = this.props;
    if (activeTabs === 1) {
      checkUsername(value.email, locale).then(response => {
        if (response.type === "USERNAME_FAILURE") {
          showNotification(
            <span data-notify="icon" className="pe-7s-shield" />,
            <div>{response.payload.response.message}</div>,
            true
          );
        } else if (response.type === "USERNAME_SUCCESS") {
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>available username.</div>,
            false
          );
        }
      });
    } else if (activeTabs === 2) {
      registerUser(
        { ...value, ...formData, location: this.state.location },
        locale
      ).then(response => {
        const token = response.payload.id;
        if (response.type === "REGISTER_FAILURE") {
          showNotification(
            <span data-notify="icon" className="pe-7s-shield" />,
            <div>{response.payload.response.message}</div>,
            true
          );
        } else if (response.type === "REGISTER_SUCCESS") {
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>{response.payload.message}</div>,
            false
          );
          this.setState({ location: "" });
          verifyEmail({ id: token }, locale).then(data => {
            if (data.type === "VERIFY_EMAIL_FAILURE") {
              // showNotification(
              //   <span data-notify="icon" className="pe-7s-shield" />,
              //   <div>{data.payload.response.message}</div>,
              //   true
              // );
            } else if (response.type === "VERIFY_EMAIL_SUCCESS") {
              showNotification(
                <span data-notify="icon" className="pe-7s-check" />,
                <div>confirmation email has been sent your email address</div>,
                false
              );
            }
          });
        }
      });
    }
  }
  render() {
    return (
      <section className="wrap-register">
        <Grid>
          <Row>
            <div className="register">
              <Col sm={12}>
                <Tabs
                  {...this.props}
                  handleLocation={this.handleLocation}
                  hanldeSubmitForm={this.hanldeSubmitForm}
                />
              </Col>
            </div>
          </Row>
        </Grid>
      </section>
    );
  }
}
Register.propTypes = {
  checkUsername: PropTypes.func.isRequired,
  registerSuccess: PropTypes.bool.isRequired,
  activeTabs: PropTypes.number.isRequired,
  registerUser: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  locale: PropTypes.string
};

Register.defaultProps = {
  locale: ""
};

export default Register;
