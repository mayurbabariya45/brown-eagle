import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const VerifiedBuyers = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Verified Buyers</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

VerifiedBuyers.propTypes = {};

export default VerifiedBuyers;
