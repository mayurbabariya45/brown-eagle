import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const SellerMembership = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>SellerMembership</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

SellerMembership.propTypes = {};

export default SellerMembership;
