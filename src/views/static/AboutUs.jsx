import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import BannerImage from "../../assets/img/banners/banner-about-us.jpg";

const AboutUs = () => (
  <div>
    <Banner image={BannerImage} />
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>About</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
              <p>
                Language &amp; Culture is increasingly key for merchants &amp;
                consumers, who value social responsibility and political
                standards over prices and value for money.
              </p>
              <p>
                Imagine the oldest and still growing industry, Commerce, meeting
                AI-powered based on neuro-linguistic programming that is fed by
                new knowledge driven machine learning technology focused on
                serving diverse social, geographic e-commerce customers needs
                both domestically &amp; cross-border.
              </p>
              <p>
                Brown Eagle Inc., a US C-Corp of Delaware, with operating
                subsidiaries in Netherlands &amp; Colorado is the next
                generation e-commerce platform, based on adaptive technology
                with advance personalized communications and recommendations.
              </p>
              <p>
                Brown Eagle is not new to business: it’s the online spin-off of
                Brown Eagle [BE] Ltd{" "}
                <a href="http://www.browneaglebe.com">www.browneaglebe.com</a>,
                an international Dubai based trading company, a brand associated
                with quality and performance, that has profitably operated for
                +10 years empowering major European and American manufacturers
                conducting cross-border commerce with the Middle East (GCC
                Countries).
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

AboutUs.propTypes = {};

export default AboutUs;
