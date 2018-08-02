import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const InspectionService = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>InspectionService</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

InspectionService.propTypes = {};

export default InspectionService;
