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
                  translate={props.translate}
                  locale={props.locale}
                  buyer
                  key={data.id}
                  quotation={data}
                  handleViewQuotation={e => {
                    e.preventDefault();
                    props.handleViewQuotation(data);
                  }}
                  showSellerQuotes={() => props.showSellerQuotes(data.id)}
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
  onPageChanged: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
};

export default QuotationItems;
