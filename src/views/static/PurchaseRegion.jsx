import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const PurchaseRegion = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Purchase By Region</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

PurchaseRegion.propTypes = {};

export default PurchaseRegion;
