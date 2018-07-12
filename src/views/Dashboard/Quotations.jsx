import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import QuotationItems from "../../components/Quotation/QuotationItem";
import SearchQuotation from "../../components/Quotation/SearchQuotation";
import Pagination from "../../components/Pagination/Pagination";
import SubmitQuoteContainer from "../../containers/QuotationContainer/SubmitQuoteContainer";

class Quotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      showModal: false,
      quotationId: ""
    };
    this.handleSubmitQuoteModal = this.handleSubmitQuoteModal.bind(this);
    this.hideSubmitQuoteModal = this.hideSubmitQuoteModal.bind(this);
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
  render() {
    const {
      translate,
      locale,
      onSelectCategory,
      searchQuotation,
      quotation,
      categories,
      selectedCategory,
      seller,
      showNotification
    } = this.props;
    const { currentPage } = this.state;
    const { count, rfqs } = quotation.sellerQuotation;
    console.log(quotation.sellerQuotation);
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
              searchQuotation={searchQuotation}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="quotations">
              <Row>
                <Col md={12}>
                  {_.map(rfqs, data => (
                    <QuotationItems
                      locale={locale}
                      key={data.id}
                      quotation={data}
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
          </Col>
        </Row>
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
