import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import StatusFilter from "../../components/Quotation/QuotationStatusFilter";
import ViewQuotation from "./ViewQuotation";
import SearchQuotation from "../../components/Quotation/SearchQuotation";
import QuotationItems from "./QuotationItems";
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
  componentWillMount() {
    const {
      getSellerQuotations,
      getCategories,
      getSellerActivePlans,
      seller
    } = this.props;
    if (!_.isEmpty(seller)) {
      getSellerQuotations(seller);
      getCategories();
      getSellerActivePlans(seller);
    }
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const {
      searchQuotation,
      quotation,
      getSellerQuotations,
      seller,
      selectedCategory
    } = this.props;
    this.setState({ currentPage });
    if (!_.isEmpty(quotation.searchQuery)) {
      searchQuotation({
        category: selectedCategory.id,
        search: quotation.searchQuery,
        page: currentPage
      });
      return false;
    }
    getSellerQuotations(seller, currentPage);
    return false;
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
      activePlan,
      sellerProducts,
      onSelectCategory,
      searchQuotation,
      quotation,
      categories,
      selectedCategory,
      seller,
      showNotification,
      getSellerQuotations,
      flushSearchQuery,
      getSellerActivePlans,
      selectFilters
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
              selectedFilter={quotation.selectedFilter}
              searchQuotation={searchQuotation}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              flushSearchQuery={flushSearchQuery}
              getSellerQuotations={getSellerQuotations}
              seller={seller}
            />
          </Col>
        </Row>
        {!this.state.viewQuotation && (
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="quotations-filter">
                <StatusFilter
                  seller={seller}
                  selectedCategory={selectedCategory}
                  searchQuotation={searchQuotation}
                  searchQuery={quotation.searchQuery}
                  getSellerQuotations={getSellerQuotations}
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
                  translate={translate}
                  quotation={this.state.quotation}
                  locale={locale}
                  handleBackButton={this.clearViewQuotationState}
                  quoteRemianing={
                    !_.isEmpty(activePlan) ? activePlan.rfq.remaining : 0
                  }
                  opneSubmitQuoteModal={() =>
                    this.handleSubmitQuoteModal(this.state.quotation.id)
                  }
                />
              </div>
            </Col>
          </Row>
        )}
        {!this.state.viewQuotation && (
          <QuotationItems
            translate={translate}
            quotations={rfqs}
            loading={quotation.loading}
            locale={locale}
            totalItems={count}
            handleViewQuotation={this.handleViewQuotation}
            handleSubmitQuoteModal={this.handleSubmitQuoteModal}
            onPageChanged={this.onPageChanged}
            quoteRemianing={
              !_.isEmpty(activePlan) ? activePlan.rfq.remaining : 0
            }
          />
        )}
        <SubmitQuoteContainer
          translate={translate}
          locale={locale}
          seller={seller}
          sellerProducts={sellerProducts}
          quotationId={this.state.quotationId}
          showNotification={showNotification}
          showModal={this.state.showModal}
          getSellerActivePlans={getSellerActivePlans}
          getSellerQuotations={getSellerQuotations}
          currentPage={this.state.currentPage}
          onHide={this.hideSubmitQuoteModal}
          quoteRemianing={!_.isEmpty(activePlan) ? activePlan.rfq.remaining : 0}
        />
      </div>
    );
  }
}

Quotations.propTypes = {
  translate: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  selectFilters: PropTypes.func.isRequired,
  searchQuotation: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  getSellerQuotations: PropTypes.func.isRequired,
  flushSearchQuery: PropTypes.func.isRequired,
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
