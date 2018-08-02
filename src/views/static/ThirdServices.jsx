import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const ThirdServices = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>ThirdServices</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

ThirdServices.propTypes = {};

export default ThirdServices;
