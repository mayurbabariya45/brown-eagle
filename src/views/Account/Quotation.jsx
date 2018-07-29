import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import QuotationItems from "./QuotationItems";
import ViewQuotation from "./ViewQuotation";

class Quotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      quotation: {},
      viewQuotation: false
    };
    this.handleViewQuotation = this.handleViewQuotation.bind(this);
    this.clearViewQuotationState = this.clearViewQuotationState.bind(this);
  }
  componentWillMount() {
    const { getBuyerQuotations, buyerId } = this.props;
    if (buyerId) {
      getBuyerQuotations(buyerId, this.state.currentPage);
    }
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { getBuyerQuotations, buyerId } = this.props;
    this.setState({ currentPage });
    getBuyerQuotations(buyerId, currentPage);
    return false;
  };
  handleViewQuotation(quotation) {
    this.setState({ quotation, viewQuotation: true });
  }
  clearViewQuotationState() {
    this.setState({ quotation: {}, viewQuotation: false });
  }
  render() {
    const { translate, quotation, locale } = this.props;
    const { currentPage } = this.state;
    const { count, rfqs } = quotation.buyerQuotation;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <div className="account-quotation">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>{translate("my_quotations")}</h5>
              </div>
              <div className="request_quotation_button">
                <Link
                  to="/buyer/request_quotation"
                  className="btn btn-fill btn-border btn-warning"
                >
                  {translate("q_request_quotation")}
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="result-showing">
              <p>
                Showing {start} – {end} Quotation of {count} Quotations
              </p>
            </div>
          </Col>
        </Row>
        {this.state.viewQuotation && (
          <Col md={12} sm={12} xs={12}>
            <div className="quotations">
              <ViewQuotation
                translate={translate}
                quotation={this.state.quotation}
                locale={locale}
                handleBackButton={this.clearViewQuotationState}
                opneSubmitQuoteModal={() =>
                  this.handleSubmitQuoteModal(this.state.quotation.id)
                }
              />
            </div>
          </Col>
        )}
        {!this.state.viewQuotation && (
          <QuotationItems
            translate={translate}
            quotations={rfqs}
            loading={quotation.loading}
            locale={locale}
            totalItems={count}
            handleViewQuotation={this.handleViewQuotation}
            onPageChanged={this.onPageChanged}
          />
        )}
      </div>
    );
  }
}

Quotation.propTypes = {
  translate: PropTypes.func.isRequired,
  buyerId: PropTypes.string.isRequired,
  quotation: PropTypes.arrayOf(PropTypes.any),
  getBuyerQuotations: PropTypes.func.isRequired
};

Quotation.defaultProps = {
  quotation: []
};
export default Quotation;
