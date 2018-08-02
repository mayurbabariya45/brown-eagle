import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const Wholesale = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>WholeSale Business</PageHeader>
        </div>
      </Col>
    </Row>
  </Grid>
);

Wholesale.propTypes = {};

export default Wholesale;
