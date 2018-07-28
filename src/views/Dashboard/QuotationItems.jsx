import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import { Row, Col } from "react-bootstrap";
import QuotationItem from "../../components/Quotation/QuotationItem";
import Pagination from "../../components/Pagination/Pagination";

const QuotationItems = props => (
  <Row>
    <Col md={12}>
      <BlockUi tag="div" blocking={props.loading}>
        <div className="quotations">
          <Row>
            <Col md={12}>
              {_.map(props.quotations, data => (
                <QuotationItem
                  locale={props.locale}
                  key={data.id}
                  quotation={data}
                  handleViewQuotation={e => {
                    e.preventDefault();
                    props.handleViewQuotation(data);
                  }}
                  opneSubmitQuoteModal={() =>
                    props.handleSubmitQuoteModal(data.id)
                  }
                />
              ))}
            </Col>
          </Row>
          <Pagination
            totalRecords={props.totalItems || 0}
            pageLimit={20}
            pageNeighbours={1}
            onPageChanged={props.onPageChanged}
          />
        </div>
      </BlockUi>
    </Col>
  </Row>
);

QuotationItems.propTypes = {
  onPageChanged: PropTypes.func.isRequired
};

export default QuotationItems;
