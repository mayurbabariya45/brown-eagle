import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import BannerImage from "../../assets/img/banners/banner-marketplace.jpg";

const Wholesale = () => (
  <div>
    <Banner image={BannerImage} />
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>Whole Sale Business</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
              <p>
                BE is a dynamic, cross-industry, global marketplace platform
                open to B2C, B2B, third party service providers, and third party
                e-banking services.{" "}
              </p>
              <p>
                Language &amp; Culture is increasingly key for merchants &amp;
                consumers, who value social responsibility and political
                standards over prices and value for money.
              </p>
              <p>
                Small &amp; medium local businesses worldwide are challenged by
                the digital economy &amp; need to be empowered to urgently
                integrate their business with e-commerce to survive and grow.
                Buyers are bombarded with e-commerce platforms that are not
                sensitive to their community social, cultural &amp; language
                preferences.
              </p>
              <p>
                Different industries in different geographies face different
                challenges that current online e-commerce platforms fail to
                adequately address, being built on a rigid model that serves
                customers similarly despite their language &amp; cultural
                diversity Imagine the oldest and still growing industry,
                Commerce, meeting AI-powered blockchain based on
                neuro-linguistic programming that is fed by new knowledge driven
                machine learning technology focused on serving diverse social,
                geographic e-commerce customers needs both domestically &amp;
                cross-border.
              </p>
              <p>
                Being social is one of the prominent qualities embedded in human
                nature. Humans naturally organize in decentralized networks that
                allow for customization, peer-to-peer review, evolution, and
                growth Brown Eagle is coming to the market at the point when
                technology enable for the construction of a new, adaptive
                networking trading platform that allows both for social and
                geographical, industry, and business-size continuous, bottom-up,
                decentralized customization.
              </p>
              <p>
                We Focus on Consumer Journey – Quality not Users Experience (How
                &amp; Why the visitor converted) more significant than the no.
                of visits, sessions or devices that consumer made.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

Wholesale.propTypes = {};

export default Wholesale;
