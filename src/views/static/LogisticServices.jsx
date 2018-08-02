import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const LogisticServices = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>LogisticServices</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

LogisticServices.propTypes = {};

export default LogisticServices;
