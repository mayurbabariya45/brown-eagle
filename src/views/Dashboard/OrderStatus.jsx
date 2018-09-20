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
  {
    status: "all",
    name: "All"
  },
  { status: "pending", name: "Waiting for order confirmation" },
  { status: "payment_pending", name: "Waiting for payment" },
  { status: "confirmed", name: "Confirmed orders" },
  { status: "shipping", name: "Shipping orders" },
  { status: "shipped", name: "Shipped orders" },
  { status: "delivered", name: "Delivered orders" },
  { status: "rejected", name: "Rejected orders" },
  { staus: "cancelled", name: "Cancelled orders" }
];

class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDropdown = this.handleDropdown.bind(this);
  }
  handleDropdown(value) {
    const { selectFilters, getOrders, seller } = this.props;
    selectFilters(value);
    getOrders(seller, value.status, 1);
    return false;
  }
  render() {
    const { selectedFilter } = this.props;
    const selectedStatus = <span>{selectedFilter.name}</span>;
    const renderStatus = status.map(data => (
      <MenuItem key={data.name} eventKey={data}>
        {data.name}
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
