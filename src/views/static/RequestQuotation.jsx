import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const RequestQuotation = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Request For Quotation</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

RequestQuotation.propTypes = {};

export default RequestQuotation;
