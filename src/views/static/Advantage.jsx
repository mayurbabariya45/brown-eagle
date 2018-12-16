import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import BannerImage from "../../assets/img/banners/banner-story.jpg";

const Advantage = () => (
  <div>
    <Banner image={BannerImage} />
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>Advantage</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
              <div id="modal-ready">
                <p>
                  As consumers, we have probably bought some products or
                  services online for more choice, convenience &amp;amp; better
                  deals instead of visiting a brick and mortar store.
                </p>
                <p>
                  As businesses, we have considered or perhaps launched on-line
                  wholesale and procurement solutions to scale-up our business,
                  improve efficiencies and increase sales.
                </p>
                <p>
                  As third party logistics, technology and e-banking service
                  providers, we continuously seek new e-channels to promote our
                  services.
                </p>
                <p>
                  Different consumers, businesses and service providers within
                  different industries and geographies, face different
                  challenges that generalist on-line e-commerce platforms fail
                  to address.
                </p>
                <p>
                  The global E-commerce market is valued at $2.5 trillion and is
                  forecasted to grow to $4.5 trillion in 2021, 30% of this is
                  estimated to be cross-border. We should all seriously consider
                  joining the globalization of this digital market so that we
                  are not left behind.
                </p>
                <p>
                  Through its adaptive next generation platform, Brown Eagle
                  understands these complexities and intelligently enables
                  consumers, business and service providers to be part of this
                  digital age and benefit.
                </p>
                <p>
                  Brown Eagle provides a platform that valorizes E-commerce
                  across value chains, human networking and borders.
                </p>
                <p>
                  It deploys artificial intelligence and new knowledge driven
                  machine learning to ensure that the right products and
                  services are available to be sold at the lowest price,
                  delivered when most convenient to consumers or business
                  buyers, whether they are domestically located or cross border,
                  across a wide range of products from health &amp;amp; beauty
                  to light equipment &amp;amp; tools.
                </p>
                <p>
                  Brown Eagle also strives to ensure that its core values of
                  social responsibility, human networking, preservation of the
                  ecosystem &amp;amp; local economy needs are respected.
                </p>
                <p>
                  Our logo, the Brown Eagle that is able to gracefully sore to
                  extreme heights yet through its superior vision is able to
                  track and catch its prey with great accuracy, symbolizes our
                  platform values &amp;amp; mission to support you in reaching
                  your targets successfully.
                </p>
                <p>
                  Join us, reach your target, and be part of this digital
                  globalization while having fun…
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

Advantage.propTypes = {};

export default Advantage;
