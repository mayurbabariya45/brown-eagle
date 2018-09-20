import _ from "lodash";
import { Row, Col } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import Button from "../../elements/CustomButton/CustomButton";
import Pagination from "../../components/Pagination/Pagination";
import ViewQuote from "./ViewQuote";

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
    this.handleViewQuotation = this.handleViewQuotation.bind(this);
    this.clearViewQuotationState = this.clearViewQuotationState.bind(this);
  }
  componentWillMount() {
    const { getQuotationQuotes, quotationId } = this.props;
    getQuotationQuotes(quotationId, "all", 1);
    window.scrollTo(0, 0);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { getQuotationQuotes, quotationId } = this.props;
    this.setState({ currentPage });
    getQuotationQuotes(quotationId, "all", currentPage);
    return false;
  };
  handleViewQuotation(quotation) {
    this.setState({ quotation, viewQuotation: true });
  }
  clearViewQuotationState() {
    this.setState({ quotation: {}, viewQuotation: false });
  }
  render() {
    const { quotationQuotes, locale, loading, translate, handleBackButton } = this.props;
    const { quotation, count } = quotationQuotes;
    const { currentPage } = this.state;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <div className="quotations">
        {!this.state.viewQuotation && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="result-showing">
                <p>
                  Showing {start} – {end} Quotes of {count} Quotes
                </p>
              </div>
            </Col>
          </Row>
        )}
        {!this.state.viewQuotation && (
          <div className="go-back-button">
            <Button fill bsStyle="link" onClick={handleBackButton}>
              <i className="pe-7s-left-arrow" />
              {translate("q_back_button")}
            </Button>
          </div>
        )}
        {!this.state.viewQuotation && (
          <BlockUi tag="div" blocking={loading}>
            <Row>
              <Col md={12}>
                <div className="quotations quotation-quotes">
                  {_.map(quotation, value => (
                    <QuotationItems
                      {...value}
                      locale={locale}
                      translate={translate}
                      handleViewQuotation={() =>
                        this.handleViewQuotation(value)
                      }
                    />
                  ))}
                </div>
              </Col>
            </Row>
          </BlockUi>
        )}
        {!this.state.viewQuotation && (
          <Pagination
            totalRecords={count || 0}
            pageLimit={20}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          />
        )}
        {this.state.viewQuotation && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <ViewQuote
                translate={translate}
                quotation={this.state.quotation}
                locale={locale}
                handleBackButton={this.clearViewQuotationState}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

SellerQuotes.propTypes = {
  translate: PropTypes.func.isRequired,
  getQuotationQuotes: PropTypes.func.isRequired,
  handleBackButton: PropTypes.func.isRequired
};

export default SellerQuotes;
