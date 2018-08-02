import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const ServicesMembership = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Services & Membership</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

ServicesMembership.propTypes = {};

export default ServicesMembership;
