import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import Languages from "../Languages/Languages";
import footerLogo from "../../assets/img/footer/logo4.png";

const Footer = props => {
  const { translate } = props;
  return (
    <footer className="footer">
      <Grid>
        <div className="footers">
          <Row>
            <Col lg={2} md={2} sm={3} xs={3}>
              <h3 className="title">{translate("about_us")}</h3>
              <nav>
                <ul>
                  <li>
                    <a href="/#/about-us">{translate("about")}</a>
                  </li>
                  <li>
                    <a href="/#/investor-desk">{translate("investor_desk")}</a>
                  </li>
                  <li>
                    <a href="/#/advantage">{translate("advantage")}</a>
                  </li>
                  <li>
                    <a href="/#/privacy-policy">{translate("contact_us")}</a>
                  </li>
                  <li>
                    <a href="/#/term">{translate("sitemap")}</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3}>
              <h3 className="title">{translate("sell_on_brown_eagle")}</h3>
              <nav>
                <ul>
                  <li>
                    <a href="/#/seller-membership">
                      {translate("seller_membership")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/training-center">
                      {translate("training_center")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/wholesale">{translate("wholesale")}</a>
                  </li>
                  <li>
                    <a href="/#/verified">{translate("verified")}</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={2} md={2} sm={3} xs={3}>
              <h3 className="title"> {translate("buy_on_brown_eagle")} </h3>
              <nav>
                <ul>
                  <li>
                    <a href="/#/request_quotation">
                      {translate("request_for_quotation")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/market_trends">{translate("market_trends")}</a>
                  </li>
                  <li>
                    <a href="/#/verified_buyers">
                      {translate("verified_buyers")}
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3}>
              <h3 className="title">{translate("customer_services")}</h3>
              <nav>
                <ul>
                  <li>
                    <a href="/#/help_center">{translate("help_center")}</a>
                  </li>
                  <li>
                    <a href="/#/report_abuse">{translate("report_abuse")}</a>
                  </li>
                  <li>
                    <a href="/#/a_dispute">{translate("a_dispute")}</a>
                  </li>
                  <li>
                    <a href="/#/policies_rules">
                      {translate("policies_rules")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/advertise_with_us">
                      {translate("advertise_with_us")}
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={2} md={2} sm={3} xs={3}>
              <h3 className="title">{translate("trade_service")}</h3>
              <nav>
                <ul>
                  <li>
                    <a href="/#/trade_assurance">
                      {translate("trade_assurance")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/business_identity">
                      {translate("business_identity")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/third_services">
                      {translate("third_services")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/logistic_services">
                      {translate("logistic_services")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/secure_payment">
                      {translate("secure_payment")}
                    </a>
                  </li>
                  <li>
                    <a href="/#/inspection_service">
                      {translate("inspection_service")}
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </div>
      </Grid>
      <Grid fluid className="footer-middle">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="footer-content">
                <Col sm={4}>
                  <div className="socials">
                    <h3>{translate("follow_us")}</h3>
                    <ul>
                      <li>
                        <a href="/#/">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="/#/">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="/#/">
                          <i className="fa fa-google" />
                        </a>
                      </li>
                      <li>
                        <a href="/#/">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="/#/">
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={4}>
                  <img src={footerLogo} width="180" alt="footer logo" />
                </Col>
                {/* <Col sm={4}>
                  <div className="languages">
                    <Languages {...props} dropdownButton />
                    <a href="/#/" className="btn btn-default">
                      United States
                    </a>
                  </div>
                </Col> */}
              </div>
            </Col>
          </Row>
        </Grid>
      </Grid>
      <Grid fluid className="footer-bottom">
        <Grid>
          <Row>
            <Col md={12}>
              <Col sm={3}>
                <ul>
                  <li>
                    <a href="/#/">
                      {translate("streaming")}{" "}
                      <span>
                        {translate("stream_regional")} <br />{" "}
                        {translate("songs")}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="../buyer/index.html">
                      {translate("buyer")}{" "}
                      <span>
                        {translate("by_original")} <br />{" "}
                        {translate("f_products")}
                      </span>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={3}>
                <ul>
                  <li>
                    <a href="../advance-ai.html">
                      {translate("artificial_intelligence")}
                      <span>
                        {translate("get_advantage_of")} <br />{" "}
                        {translate("future_technology")}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="fulfillment.html">
                      {translate("fulfillment_services")}
                      <span>
                        {translate("facilitate")} <br />{" "}
                        {translate("buy_seller")}
                      </span>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={3}>
                <ul>
                  <li>
                    <a href="/#/">
                      {translate("business_seller")}
                      <span>
                        {translate("sell_bulk")} <br />{" "}
                        {translate("product_globally")}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/#/">
                      {translate("e_banker")}
                      <span>
                        {translate("connect_economy")} <br />{" "}
                        {translate("together")}
                      </span>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={3}>
                <ul>
                  <li>
                    <a href="/#/">
                      {translate("business_buye")}
                      <span>
                        {translate("buy_bulk")} <br />
                        {translate("verified_product")}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/#/">
                      {translate("crypto_currency")}
                      <span>
                        {translate("go_virtual")} <br />{" "}
                        {translate("save_more")}
                      </span>
                    </a>
                  </li>
                </ul>
              </Col>
            </Col>
          </Row>
          <Row>
            <div className="copyright">
              <p dangerouslySetInnerHTML={{ __html: translate("copyright") }} />
            </div>
          </Row>
        </Grid>
      </Grid>
    </footer>
  );
};

Footer.propTypes = {
  translate: PropTypes.func.isRequired
};
export default Footer;
