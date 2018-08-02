import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const ReportAbuse = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>ReportAbuse</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

ReportAbuse.propTypes = {};

export default ReportAbuse;
