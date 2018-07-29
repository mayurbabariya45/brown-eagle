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
    const { selectFilters, getQuotations, buyer } = this.props;
    selectFilters(evt);
    getQuotations(buyer, _.lowerCase(evt), 1);
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
      </div>
    );
  }
}

QuotationStatusFilter.propTypes = {
  selectFilters: PropTypes.func.isRequired,
  getQuotations: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired
};

export default QuotationStatusFilter;
