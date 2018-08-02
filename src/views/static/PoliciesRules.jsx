import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const PoliciesRules = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>PoliciesRules</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

PoliciesRules.propTypes = {};

export default PoliciesRules;
