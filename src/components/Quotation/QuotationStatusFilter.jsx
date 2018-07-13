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
    const { selectFilters } = this.props;
    selectFilters(evt);
  }
  render() {
    const { selectedFilter } = this.props;
    const selectedStatus = (
      <span>{!_.isEmpty(selectedFilter) ? selectedFilter.filter : "All"}</span>
    );
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
  selectedFilter: PropTypes.objectOf(PropTypes.any).isRequired
};

export default QuotationStatusFilter;
