import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Grid, Col } from "react-bootstrap";
import {
  AlertSuccess,
  AlertError
} from "../../components/ErrorMessages/ErrorMessages";

class VerificationEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { location, history, verificationEmail, locale } = this.props;
    const token = location.search.split("?key=").pop();
    if (!location.search) {
      history.push("/login");
    }
    verificationEmail({ id: token }, locale);
  }
  render() {
    const { translate, success, error, message } = this.props;
    return (
      <section className="verification">
        <Grid>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <Col md={6} mdOffset={3}>
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    {success && (
                      <AlertSuccess
                        success
                        message="Your Email Verification has been successfully."
                      />
                    )}
                    {error && <AlertError error={error} message={message} />}
                  </Col>
                </Row>
                <Row>
                  <Col md={12} sm={12} xs={12} className="text-center">
                    <a
                      href="/#/login"
                      className="btn-fill btn-radius btn btn-warning"
                    >
                      {translate("go_to_sign_in")}
                    </a>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

VerificationEmail.propTypes = {
  translate: PropTypes.func.isRequired,
  verificationEmail: PropTypes.func.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  locale: PropTypes.string
};

VerificationEmail.defaultProps = {
  success: false,
  error: false,
  message: "",
  locale: ""
};

export default VerificationEmail;
