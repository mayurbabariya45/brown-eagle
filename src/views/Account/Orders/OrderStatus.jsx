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
  handleDropdown(values) {
    const { selectFilters, getOrders, buyer } = this.props;
    selectFilters(values);
    getOrders(buyer, 1, values.status);
    return false;
  }
  render() {
    const { selectedFilter } = this.props;
    const selectedStatus = <span>{selectedFilter.name}</span>;
    const renderStatus = status.map((data, index) => (
      <MenuItem key={index} eventKey={data}>
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
  buyer: PropTypes.string
};
OrderStatus.defaultProps = {
  buyer: ""
};
export default OrderStatus;
