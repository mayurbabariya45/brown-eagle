import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";

class SellerQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.onPageChanged = this.onPageChanged.bind(this);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    this.setState({ currentPage });
  };

  render() {
    const { translate } = this.props;
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
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className="result-showing">
              <p>Showing 0 - 2 Quotes of 1 Quotes</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="quotations">
              <div className="quotation-item">
                <div className="quotation-item-details">
                  <div className="quotation-product-title">
                    <h3>Test</h3>
                  </div>
                  <div className="quotation-item-detail">
                    <div className="desc">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                    <div className="quotation-quantity">
                      <p>
                        {translate("quote_form_quote_price")} <b>200</b>
                      </p>
                      <p>
                        {translate("quote_form_quote_quantity")} <b>23</b>
                      </p>
                      <p>
                        {translate("quote_form_quote_delivery_time")} <b>23</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Pagination
          totalRecords={100}
          pageLimit={20}
          pageNeighbours={1}
          onPageChanged={this.onPageChanged}
        />
      </div>
    );
  }
}

SellerQuotes.propTypes = {
  translate: PropTypes.func.isRequired
};

export default SellerQuotes;
