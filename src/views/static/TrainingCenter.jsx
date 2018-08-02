import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const TrainingCenter = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>TrainingCenter</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

TrainingCenter.propTypes = {};

export default TrainingCenter;
