import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Col, Row } from "react-bootstrap";
import Tabs from "./Tabs";

const roles = ["seller", "buyer"];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
  }
  componentDidUpdate() {
    const { history, registerSuccess, user } = this.props;
    if (registerSuccess) {
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
    const { checkUsername, registerUser, formData, activeTabs } = this.props;
    if (activeTabs === 1) {
      checkUsername(value.email);
    } else if (activeTabs === 2) {
      registerUser({ ...value, ...formData });
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
  registerSuccess: PropTypes.func.isRequired,
  activeTabs: PropTypes.number.isRequired,
  registerUser: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired
};
export default Register;
