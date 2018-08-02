import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const Advantage = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Advantage</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

Advantage.propTypes = {};

export default Advantage;
