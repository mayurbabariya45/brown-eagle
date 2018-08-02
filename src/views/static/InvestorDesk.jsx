import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const InvestorDesk = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>InvestorDesk</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

InvestorDesk.propTypes = {};

export default InvestorDesk;
