import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const BusinessIdentity = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>BusinessIdentity</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

BusinessIdentity.propTypes = {};

export default BusinessIdentity;
