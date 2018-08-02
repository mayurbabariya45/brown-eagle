import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import QuotationContainer from "../../containers/QuotationContainer/FormQuotationContainer";
import customRequest from "../../assets/img/icon/custom_request.png";
import findYou from "../../assets/img/icon/find_you.png";
import onceClick from "../../assets/img/icon/once_click.png";

class RequestForQuotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleRequestForQuote() {}
  render() {
    const { translate, isLogging } = this.props;
    const linkUrl = isLogging
      ? "/buyer/request_quotation"
      : {
          pathname: "/login",
          search: "?redirect-url=/buyer/request_quotation"
        };
    return (
      <Grid>
        <div className="request_for_quotation">
          <Row>
            <Col md={12}>
              <div className="section-header">
                <div className="title">
                  <h5 className="text-uppercase">
                    {translate("request_for_quotation")}
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <Col sm={7} className="request_quotation_left">
              <div className="request_quotation_row">
                <Col md={4} sm={4} xs={12}>
                  <h2>
                    {translate("request_quotation_quotes")}
                    <span>{translate("request_quotation_custom_request")}</span>
                  </h2>
                  <div className="quote-circle">
                    <img src={customRequest} alt="request for quotation" />
                  </div>
                </Col>
                <Col md={4} sm={4} xs={12}>
                  <h2>
                    {translate("request_quotation_suppliers")}
                    <span>{translate("request_quotation_find_request")}</span>
                  </h2>
                  <div className="quote-circle">
                    <img src={findYou} alt="request for quotation" />
                  </div>
                </Col>
                <Col md={4} sm={4} xs={12}>
                  <h2>
                    {translate("request_quotation_deals")}
                    <span>{translate("request_quotation_click")}</span>
                  </h2>
                  <div className="quote-circle">
                    <img src={onceClick} alt="request for quotation" />
                  </div>
                </Col>
              </div>
              <div className="request_quotation_row_bottom">
                <h3>{translate("request_quotation_how")}</h3>
                <Col md={4} sm={4} xs={12}>
                  <div className="quote-circle-small">1</div>
                  <h4>{translate("request_quotation_submit")}</h4>
                </Col>
                <Col md={4} sm={4} xs={12}>
                  <div className="quote-circle-small">2</div>
                  <h4>{translate("request_quotation_compare")}</h4>
                </Col>
                <Col md={4} sm={4} xs={12}>
                  <div className="quote-circle-small">2</div>
                  <h4>{translate("request_quotation_contact")}</h4>
                </Col>
              </div>
            </Col>
            <Col sm={5} className="request_quotation_right">
              <h3>{translate("request_for_quotation")}</h3>
              <QuotationContainer translate={translate} linkUrl={linkUrl} />
            </Col>
          </div>
        </div>
      </Grid>
    );
  }
}

RequestForQuotation.propTypes = {};

export default RequestForQuotation;
