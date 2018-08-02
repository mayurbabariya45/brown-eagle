import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const HelpCenter = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>HelpCenter</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

HelpCenter.propTypes = {};

export default HelpCenter;
