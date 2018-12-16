import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const HelpCommunity = () => (
  <div>
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>Help Community</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
              <address>
                Brown Eagle BV, Netherlands<br />
                Fellenoord 130 <br />
                5611 ZB Eindhoven <br />
                Netherlands <br />
                Phone Number:+31 40 266 8506<br />
                Fax Number:+31 40 266 8544 <br />
                email: info@brown-eagle.com
              </address>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

HelpCommunity.propTypes = {};

export default HelpCommunity;
