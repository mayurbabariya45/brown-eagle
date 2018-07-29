import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  DropdownButton,
  MenuItem,
  FormGroup,
  InputGroup,
  Col,
  Row
} from "react-bootstrap";

const status = ["All", "Open", "Closed", "Rejected"];

class QuotationStatusFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDropdown = this.handleDropdown.bind(this);
  }
  handleDropdown(evt) {
    const {
      selectFilters,
      searchQuotation,
      getSellerQuotations,
      seller,
      searchQuery,
      selectedCategory
    } = this.props;
    selectFilters(evt);
    if (!_.isEmpty(searchQuery)) {
      searchQuotation({
        category: selectedCategory.id,
        search: searchQuery,
        status: _.lowerCase(evt),
        page: 1
      });
      return false;
    }
    getSellerQuotations(seller, _.lowerCase(evt), 1);
    return false;
  }
  render() {
    const { selectedFilter } = this.props;
    const selectedStatus = <span>{selectedFilter}</span>;
    const renderStatus = status.map(data => (
      <MenuItem key={data} eventKey={data}>
        {data}
      </MenuItem>
    ));
    return (
      <div className="quotation-status">
        <Row>
          <Col md={6}>
            <FormGroup>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="quotation-status"
                onSelect={this.handleDropdown}
                title={selectedStatus}
              >
                {renderStatus}
              </DropdownButton>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

QuotationStatusFilter.propTypes = {
  selectFilters: PropTypes.func.isRequired,
  getSellerQuotations: PropTypes.func.isRequired,
  searchQuotation: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  seller: PropTypes.string,
  selectedFilter: PropTypes.string.isRequired,
  selectedCategory: PropTypes.objectOf(PropTypes.any)
};
QuotationStatusFilter.defaultProps = {
  searchQuery: "",
  seller: "",
  selectedCategory: {}
};
export default QuotationStatusFilter;
