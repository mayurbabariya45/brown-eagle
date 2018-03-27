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
                    <a href="#about-us">{translate("about_us")}</a>
                  </li>
                  <li>
                    <a href="#contact-us">{translate("contact_us")}</a>
                  </li>
                  <li>
                    <a href="#all-collection">{translate("all_collection")}</a>
                  </li>
                  <li>
                    <a href="#privacy-policy">{translate("privacy_policy")}</a>
                  </li>
                  <li>
                    <a href="#term">{translate("terms_condition")}</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3}>
              <h3 className="title">{translate("sell_on_brown_eagle")}</h3>
              <nav>
                <ul>
                  <li>
                    <a href="#phone">{translate("phones_tablets")}</a>
                  </li>
                  <li>
                    <a href="#home">{translate("home_entertainment")}</a>
                  </li>
                  <li>
                    <a href="#video">{translate("video_games_toys")}</a>
                  </li>
                  <li>
                    <a href="#cameras">{translate("cameras_drones")}</a>
                  </li>
                  <li>
                    <a href="#homes">{translate("homes_kitchen_tools")}</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={2} md={2} sm={3} xs={3}>
              <h3 className="title"> {translate("buy_on_brown_eagle")} </h3>
              <nav>
                <ul>
                  <li>
                    <a href="#orders">{translate("my_orders")}</a>
                  </li>
                  <li>
                    <a href="#credit">{translate("credit_slips")}</a>
                  </li>
                  <li>
                    <a href="#addresses">{translate("my_addresses")}</a>
                  </li>
                  <li>
                    <a href="#personal">{translate("personal_info")}</a>
                  </li>
                  <li>
                    <a href="#vouchers">{translate("my_vouchers")}</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3}>
              <h3 className="title">{translate("customer_services")}</h3>
              <nav>
                <ul>
                  <li>
                    <a href="#about">{translate("about_us")}</a>
                  </li>
                  <li>
                    <a href="#blog">{translate("blog")}</a>
                  </li>
                  <li>
                    <a href="#company">{translate("company")}</a>
                  </li>
                  <li>
                    <a href="#investor">{translate("investor_relations")}</a>
                  </li>
                  <li>
                    <a href="#typography">{translate("typography")}</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={2} md={2} sm={3} xs={3}>
              <h3 className="title">{translate("trade_service")}</h3>
              <nav>
                <ul>
                  <li>
                    <a href="#about">{translate("about_us")}</a>
                  </li>
                  <li>
                    <a href="#blog">{translate("blog")}</a>
                  </li>
                  <li>
                    <a href="#company">{translate("company")}</a>
                  </li>
                  <li>
                    <a href="#investor">{translate("investor_relations")}</a>
                  </li>
                  <li>
                    <a href="#typography">{translate("typography")}</a>
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
                        <a href="#">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-google" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={4}>
                  <img src={footerLogo} width="180" alt="footer logo" />
                </Col>
                <Col sm={4}>
                  <div className="languages">
                    <Languages {...props} dropdownButton />
                    <a href="#" className="btn btn-default">
                      United States
                    </a>
                  </div>
                </Col>
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
                    <a href="../media-cultural.html">
                      Streaming{" "}
                      <span>
                        Stream regional <br /> songs
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="../buyer/index.html">
                      Buyer{" "}
                      <span>
                        by Original <br /> products
                      </span>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={3}>
                <ul>
                  <li>
                    <a href="../advance-ai.html">
                      Artificial Intelligence<span>
                        get advantage of <br /> future technology
                                             </span>
                    </a>
                  </li>
                  <li>
                    <a href="fulfillment.html">
                      Fulfillment Services
                      <span>
                        Facilitate <br /> buy &amp; Seller
                      </span>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={3}>
                <ul>
                  <li>
                    <a href="seller.html">
                      Business Seller
                      <span>
                        Sell Bulk <br /> Product Globally
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="e-bankers.html">
                      E-Banker
                      <span>
                        Connect Economy <br /> together
                      </span>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={3}>
                <ul>
                  <li>
                    <a href="index.html">
                      Business Buye
                      <span>
                        Buy bulk <br /> Verified Product
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="../virtual-currency.html">
                      Crypto Currency
                      <span>
                        Go virtual <br /> save more
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
