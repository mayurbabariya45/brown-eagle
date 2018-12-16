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
    <Row>
      <Col md={12}>
        <div className="content-container">
          <div className="content">
            <p>
              Major cities worldwide are well served by the leading fulfillment
              providers at relatively high costs; other geography deliveries
              remain over-priced and underserved.
            </p>
            <p>
              Brown Eagle meets fulfillment challenges by partnering with local
              communities (individuals and businesses) who are interested in
              providing any part of such fulfillment services. BE platform
              matches these service providers with service requests by BE
              customers or 3rd Parties in each locality served to reduce costs,
              reach underserved territories to the benefit of local communities
              and customers.
            </p>
            <p>
              We are interested in partnering with service providers, companies
              or freelancers, in Fulfillment, ICT, AI, Marketing, Media among
              others to support us in creating something special.{" "}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  </Grid>
);

MarketTrends.propTypes = {};

export default MarketTrends;
