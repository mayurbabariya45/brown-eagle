import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const AdvertiseWithUs = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>AdvertiseWithUs</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

AdvertiseWithUs.propTypes = {};

export default AdvertiseWithUs;
