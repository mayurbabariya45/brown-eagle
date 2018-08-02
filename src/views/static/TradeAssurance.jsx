import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const TradeAssurance = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>TradeAssurance</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

TradeAssurance.propTypes = {};

export default TradeAssurance;
