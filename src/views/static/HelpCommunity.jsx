import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const HelpCommunity = () => (
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

HelpCommunity.propTypes = {};

export default HelpCommunity;
