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

const status = ["All", "Rejected", "Pending", "Approved"];

class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDropdown = this.handleDropdown.bind(this);
  }
  handleDropdown(evt) {
    const { selectFilters, getProducts, seller } = this.props;
    selectFilters(evt);
    getProducts(seller, _.lowerCase(evt), 1);
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
      <div className="products-status">
        <Col md={6}>
          <FormGroup>
            <DropdownButton
              componentClass={InputGroup.Button}
              id="products-status"
              onSelect={this.handleDropdown}
              title={selectedStatus}
            >
              {renderStatus}
            </DropdownButton>
          </FormGroup>
        </Col>
      </div>
    );
  }
}

ProductFilter.propTypes = {
  selectFilters: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  seller: PropTypes.string,
  selectedFilter: PropTypes.string.isRequired
};
ProductFilter.defaultProps = {
  seller: ""
};
export default ProductFilter;
