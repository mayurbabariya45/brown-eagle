import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const SecurePayment = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>SecurePayment</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

SecurePayment.propTypes = {};

export default SecurePayment;
