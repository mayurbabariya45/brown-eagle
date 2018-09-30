import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const SiteMap = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>SiteMap</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

SiteMap.propTypes = {};

export default SiteMap;
