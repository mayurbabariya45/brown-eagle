import React from "react";
import PropTypes from "prop-types";
import { Row, Grid, Col } from "react-bootstrap";
import Button from "../../elements/CustomButton/CustomButton";
import { AlertSuccess } from "../../components/ErrorMessages/ErrorMessages";

const VerificationEmail = props => {
  const { translate } = props;
  return (
    <section className="verification">
      <Grid>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <Col md={6} mdOffset={3}>
              <Row>
                <Col md={12} sm={12} xs={12}>
                  <AlertSuccess
                    success
                    message="Your Email Verification has been successfully."
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={12} xs={12} className="text-center">
                  <Button fill radius bsStyle="warning">
                    {translate("go_to_sign_in")}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </Grid>
    </section>
  );
};

VerificationEmail.propTypes = {
  translate: PropTypes.func.isRequired
};

export default VerificationEmail;
