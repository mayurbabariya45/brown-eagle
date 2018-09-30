import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const ContactUs = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>ContactUs</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

ContactUs.propTypes = {};

export default ContactUs;
