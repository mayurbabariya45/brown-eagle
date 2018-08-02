import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const AboutUs = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>AboutUs</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

AboutUs.propTypes = {};

export default AboutUs;
