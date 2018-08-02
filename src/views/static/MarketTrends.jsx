import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const MarketTrends = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Market Trends</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

MarketTrends.propTypes = {};

export default MarketTrends;
