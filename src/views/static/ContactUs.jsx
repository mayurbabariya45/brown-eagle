import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const ContactUs = () => (
  <Grid>
    <Row>
      <Col md={12}>
        <div className="static-page">
          <PageHeader>Contact Us</PageHeader>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="static-content">
          <Col md={6}>
            <div className="flex-col-c-m">
              <div className="flex-w size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="lnr lnr-map-marker" />
                </div>
                <div className="flex-col size2">
                  <span className="txt1 p-b-20">Address</span>
                  <span className="txt2">
                    Brown Eagle BV, Netherlands Fellenoord 130 5611 ZB Eindhoven
                    Netherlands
                  </span>
                </div>
              </div>
              <div className="dis-flex size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="lnr lnr-phone-handset" />
                </div>
                <div className="flex-col size2">
                  <span className="txt1 p-b-20">Lets Talk</span>
                  <span className="txt3">+31 40 266 8506</span>
                  <span className="txt3">Fax Number: +31 40 266 8544</span>
                </div>
              </div>
              <div className="dis-flex size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="lnr lnr-envelope" />
                </div>
                <div className="flex-col size2">
                  <span className="txt1 p-b-20">General Support</span>
                  <span className="txt3">info@brown-eagle.com</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="flex-col-c-m">
              <div className="flex-w size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="lnr lnr-map-marker" />
                </div>
                <div className="flex-col size2">
                  <span className="txt1 p-b-20">Address</span>
                  <span className="txt2">
                    Brown Eagle Inc. USA 1000 N West Street, Suite 1200
                    Wilmington, Delaware, 19801, USA
                  </span>
                </div>
              </div>
              <div className="dis-flex size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="lnr lnr-phone-handset" />
                </div>
                <div className="flex-col size2">
                  <span className="txt1 p-b-20">Lets Talk</span>
                  <span className="txt3">+302-295-3816</span>
                  <span className="txt3">Fax Number: +302-295-4801</span>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Col>
    </Row>
  </Grid>
);

ContactUs.propTypes = {};

export default ContactUs;
