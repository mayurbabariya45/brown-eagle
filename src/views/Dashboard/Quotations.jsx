import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import { Row, Col } from "react-bootstrap";
import QuotationItems from "../../components/Quotation/QuotationItem";
import StatusFilter from "../../components/Quotation/QuotationStatusFilter";
import ViewQuotation from "./ViewQuotation";
import SearchQuotation from "../../components/Quotation/SearchQuotation";
import Pagination from "../../components/Pagination/Pagination";
import SubmitQuoteContainer from "../../containers/QuotationContainer/SubmitQuoteContainer";

class Quotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      showModal: false,
      quotationId: "",
      quotation: {},
      viewQuotation: false
    };
    this.handleSubmitQuoteModal = this.handleSubmitQuoteModal.bind(this);
    this.hideSubmitQuoteModal = this.hideSubmitQuoteModal.bind(this);
    this.handleViewQuotation = this.handleViewQuotation.bind(this);
    this.clearViewQuotationState = this.clearViewQuotationState.bind(this);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { searchQuotation, quotation } = this.props;
    this.setState({ currentPage });
    searchQuotation({ ...quotation.searchQuery, page: currentPage });
  };
  handleSubmitQuoteModal(quotationId) {
    this.setState({ showModal: true, quotationId });
  }
  hideSubmitQuoteModal() {
    this.setState({ showModal: false, quotationId: "" });
  }
  handleViewQuotation(quotation) {
    this.setState({ quotation, viewQuotation: true });
  }
  clearViewQuotationState() {
    this.setState({ quotation: {}, viewQuotation: false });
  }
  render() {
    const {
      translate,
      locale,
      onSelectCategory,
      selectFilters,
      searchQuotation,
      quotation,
      categories,
      selectedCategory,
      seller,
      showNotification
    } = this.props;
    const { currentPage } = this.state;
    const { count, rfqs } = quotation.sellerQuotation;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <div className="quotation-section">
        <Row>
          <Col md={12} sm={12} xs={12}>
            <SearchQuotation
              translate={translate}
              categories={categories}
              clearViewQuotation={this.clearViewQuotationState}
              searchQuotation={searchQuotation}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
          </Col>
        </Row>
        {!this.state.viewQuotation && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="quotations-filter">
                <StatusFilter
                  selectFilters={selectFilters}
                  selectedFilter={quotation.selectedFilter}
                />
              </div>
            </Col>
          </Row>
        )}
        {!this.state.viewQuotation && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="result-showing">
                <p>
                  Showing {start} – {end} Rfq of {count} Rfqs
                </p>
              </div>
            </Col>
          </Row>
        )}
        {this.state.viewQuotation && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="quotations">
                <ViewQuotation
                  quotation={this.state.quotation}
                  locale={locale}
                  handleBackButton={this.clearViewQuotationState}
                  opneSubmitQuoteModal={() =>
                    this.handleSubmitQuoteModal(this.state.quotation.id)
                  }
                />
              </div>
            </Col>
          </Row>
        )}
        {!this.state.viewQuotation && (
          <Row>
            <Col md={12}>
              <BlockUi tag="div" blocking={quotation.loading}>
                <div className="quotations">
                  <Row>
                    <Col md={12}>
                      {_.map(rfqs, data => (
                        <QuotationItems
                          locale={locale}
                          key={data.id}
                          quotation={data}
                          handleViewQuotation={e => {
                            e.preventDefault();
                            this.handleViewQuotation(data);
                          }}
                          opneSubmitQuoteModal={() =>
                            this.handleSubmitQuoteModal(data.id)
                          }
                        />
                      ))}
                    </Col>
                  </Row>
                  <Pagination
                    totalRecords={count || 0}
                    pageLimit={20}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                  />
                </div>
              </BlockUi>
            </Col>
          </Row>
        )}
        <SubmitQuoteContainer
          translate={translate}
          locale={locale}
          seller={seller}
          quotationId={this.state.quotationId}
          showNotification={showNotification}
          showModal={this.state.showModal}
          onHide={this.hideSubmitQuoteModal}
        />
      </div>
    );
  }
}

Quotations.propTypes = {
  translate: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  selectFilters: PropTypes.func.isRequired,
  searchQuotation: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedCategory: PropTypes.objectOf(PropTypes.any),
  quotation: PropTypes.objectOf(PropTypes.any),
  locale: PropTypes.string,
  seller: PropTypes.string
};

Quotations.defaultProps = {
  selectedCategory: {},
  quotation: [],
  locale: "en",
  seller: ""
};

export default Quotations;
