import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Card } from "../../components/Card/Card";
import ContentLoader from "../../components/Loader/Loader";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";
import avatar from "../../assets/img/avatar.png";

const Home = props => {
  const { translate } = props;
  const { user, loader } = props.auth;
  return (
    <div className="dashboard">
      <ContentLoader height={100} inFight={loader}>
        <Row>
          <Col md={12}>
            <Row>
              <Card
                className="card-text card-tasks"
                header={
                  <div className="header card-header-nav">
                    <div className="user-avatar">
                      <div className="avatar">
                        <img src={avatar} alt="avatar" />
                      </div>
                      <div className="username">
                        {user && `${user.firstName}`}
                      </div>
                    </div>
                    <div className="profile-links">
                      <ul>
                        <li>
                          {user.isProfileVerified
                            ? translate("d_approved")
                            : translate("d_verify")}
                        </li>
                        <li>
                          {translate("d_first_year")}
                          <span>
                            <a href="#profile">{translate("d_upgrade")}</a>
                          </span>
                        </li>
                      </ul>
                      <ul>
                        {/* <li>
                        <a href="#profile">{translate("d_minisite")}</a>
                      </li> */}
                        <li>
                          <a href="#profile">{translate("d_favorites")}</a>
                        </li>
                        <li>
                          <a href="#profile">{translate("d_business_card")}</a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a href="#profile">
                            {translate("d_received", { number: 0 })} |{" "}
                            {translate("d_sent", { number: 0 })}
                          </a>
                        </li>
                        <li>
                          <a href="#profile">{translate("d_accumulated")}</a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a href="#profile">
                            {translate("d_points", { number: "0" })} |{" "}
                            {translate("d_time", { number: "0" })}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
                plain
                content={
                  <div>
                    <div className="list-header">
                      <h5>{translate("d_do_list")}</h5>
                    </div>
                    <div className="task-lists">
                      <div className="task-list">
                        <div className="card-stats card-numbers">
                          <div className="icon-text">
                            <div className="numbers">0</div>
                            <div className="icon-big text-right icon-warning">
                              <i className="pe-7s-note2" />
                            </div>
                          </div>
                          <div className="small-content">
                            {translate("d_pending_orders")}
                          </div>
                        </div>
                      </div>
                      <div className="task-list">
                        <div className="card-stats card-numbers">
                          <div className="icon-text">
                            <div className="numbers">0</div>
                            <div className="icon-big text-right icon-warning">
                              <i className="pe-7s-news-paper" />
                            </div>
                          </div>
                          <div className="small-content">
                            {translate("d_unread_messages")}
                          </div>
                        </div>
                      </div>
                      <div className="task-list">
                        <div className="card-stats card-numbers">
                          <div className="icon-text">
                            <div className="numbers">0</div>
                            <div className="icon-big text-right icon-warning">
                              <i className="pe-7s-comment" />
                            </div>
                          </div>
                          <div className="small-content">
                            {translate("d_request_connection")}
                          </div>
                        </div>
                      </div>
                      <div className="task-list">
                        <div className="card-stats card-numbers">
                          <div className="icon-text">
                            <div className="numbers">0</div>
                            <div className="icon-big text-right icon-warning">
                              <i className="pe-7s-note2" />
                            </div>
                          </div>
                          <div className="small-content">
                            {translate("d_rejected_requests")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </Row>
          </Col>
        </Row>
      </ContentLoader>
      <ContentLoader height={100} inFight={loader}>
        <Row>
          <Col md={12}>
            <Row>
              <Card
                className="card-text"
                header={
                  <div className="header card-header-text">
                    <h4 className="title">{translate("trade_assurance")}</h4>
                    <span className="label label-warning">
                      {translate("d_free")}
                    </span>
                    <p>{translate("d_protected")}</p>
                  </div>
                }
                plain
                content={
                  <ul className="safe-options">
                    <li>
                      <span>
                        <i className="icon-static icon-payment" />
                        {translate("d_payment_options")}
                      </span>
                    </li>
                    <li>
                      <i className="icon-static icon-checked" />
                      <span>{translate("d_shipping_quality")}</span>
                    </li>
                    <li>
                      <i className="icon-static icon-diamond" />
                      <span>{translate("d_credibility")}</span>
                    </li>
                  </ul>
                }
                footer
                legend={
                  <div className="legend">
                    <ul className="safe-legend">
                      <li>
                        <Link to="#">{translate("d_supplier")}</Link>
                      </li>
                      <li>
                        <Link to="#" className="btn">
                          {translate("d_order_assurance")}
                        </Link>
                      </li>
                      <li>
                        <Link to="#">{translate("d_more")}</Link>
                      </li>
                    </ul>
                  </div>
                }
              />
            </Row>
          </Col>
        </Row>
      </ContentLoader>
      <ContentLoader height={100} inFight={loader}>
        <Row>
          <Col md={12}>
            <Row>
              <div className="section-header section-tabs">
                <h5>{translate("recommended_products")}</h5>
              </div>
              <ProductSlider
                products={[
                  product1,
                  product2,
                  product3,
                  product1,
                  product2,
                  product3
                ]}
                buttons={false}
                arrows={false}
                multiple
                productChunk={3}
                banner={false}
                translate={translate}
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className:
                    "products items produsts-list-vertical products-list-box product-items"
                }}
              />
            </Row>
          </Col>
        </Row>
      </ContentLoader>
    </div>
  );
};
Home.propTypes = {
  translate: PropTypes.func.isRequired
};
export default Home;
