import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import ViewQuote from "./ViewQuote";
import Button from "../../elements/CustomButton/CustomButton";

const QuotationItems = props => (
  <div className="quotation-item">
    <div className="quotation-item-details">
      <div className="quotation-product-title">
        <h3>{props.titleTranslations[props.locale]}</h3>
        <Button fill bsStyle="warning" onClick={props.handleViewQuotation}>
          View Quote
        </Button>
      </div>
      <div className="quotation-item-detail">
        <div className="desc">
          <p>{props.coverLetterTranslations[props.locale]}</p>
        </div>
        <div className="quotation-quantity">
          <p>
            {props.translate("quote_form_quote_price")}{" "}
            <b>{props.quotedPrice}</b>
          </p>
          <p>
            {props.translate("quote_form_quote_quantity")}{" "}
            <b>{props.minQuantity}</b>
          </p>
          <p>
            {props.translate("quote_form_quote_delivery_time")}{" "}
            <b>{props.estimatedDeliveryTime}</b>
          </p>
        </div>
      </div>
    </div>
  </div>
);

class SellerQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      quotation: {},
      viewQuotation: false
    };
    this.onPageChanged = this.onPageChanged.bind(this);
    this.handleViewQuotation = this.handleViewQuotation.bind(this);
    this.clearViewQuotationState = this.clearViewQuotationState.bind(this);
  }
  componentWillMount() {
    const { seller, getSellerQuotes } = this.props;
    getSellerQuotes(seller, this.state.currentPage);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    this.setState({ currentPage });
  };
  handleViewQuotation(quotation) {
    this.setState({ quotation, viewQuotation: true });
  }
  clearViewQuotationState() {
    this.setState({ quotation: {}, viewQuotation: false });
  }
  render() {
    const { translate, sellerQuotes, locale } = this.props;
    const { count, quotation } = sellerQuotes;
    const { currentPage } = this.state;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <div className="dashboard-quotes">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>{translate("d_my_quotes")}</h5>
              </div>
            </div>
          </Col>
        </Row>
        {this.state.viewQuotation && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="quotations">
                <ViewQuote
                  translate={translate}
                  quotation={this.state.quotation}
                  locale={locale}
                  handleBackButton={this.clearViewQuotationState}
                />
              </div>
            </Col>
          </Row>
        )}
        {!this.state.viewQuotation && (
          <div>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <div className="result-showing">
                  <p>
                    Showing {start} – {end} Quotes of {count} Quotes
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="quotations">
                  {_.map(quotation, value => (
                    <QuotationItems
                      {...value}
                      locale={locale}
                      translate={translate}
                      handleViewQuotation={() => this.handleViewQuotation(value)}
                    />
                  ))}
                </div>
              </Col>
            </Row>
            <Pagination
              totalRecords={count || 0}
              pageLimit={20}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          </div>
        )}
      </div>
    );
  }
}

SellerQuotes.propTypes = {
  translate: PropTypes.func.isRequired
};

export default SellerQuotes;
