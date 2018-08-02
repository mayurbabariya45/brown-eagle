import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const Verified = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Verified Sellers</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

Verified.propTypes = {};

export default Verified;
