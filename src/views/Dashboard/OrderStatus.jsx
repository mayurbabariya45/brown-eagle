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

const status = [
  "All",
  "Waiting for order confirmation",
  "Waiting for payment",
  "Confirmed orders",
  "Shipped orders",
  "Delivered orders",
  "Rejected orders",
  "Cancelled orders"
];

class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDropdown = this.handleDropdown.bind(this);
  }
  handleDropdown(evt) {
    const { selectFilters, getOrders, seller } = this.props;
    selectFilters(evt);
    getOrders(seller, _.lowerCase(evt), 1);
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
      <div className="orders-status">
        <Row>
          <Col md={6}>
            <FormGroup>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="orders-status"
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

OrderStatus.propTypes = {
  selectFilters: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  seller: PropTypes.string,
  selectedFilter: PropTypes.string.isRequired
};
OrderStatus.defaultProps = {
  seller: ""
};
export default OrderStatus;
