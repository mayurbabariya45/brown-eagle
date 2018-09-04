import React from "react";
import PropTypes from "prop-types";
import { Row, Col, FormControl } from "react-bootstrap";
import { Card } from "../../components/Card/Card";

const OrderRemark = props => (
  <div className="order-remarks">
    <Row>
      <Col md={12}>
        <Card
          className="card-profile"
          plain
          footer
          header={
            <div className="header card-header-action">
              <h4 className="title">Order Remark</h4>
            </div>
          }
          content={
            <div>
              <FormControl
                onChange={props.handleOrderRemark}
                value={props.value}
                type="text"
                placeholder="Please add additional detailed product information to make it easier for the supplier to understand your exact requirements…"
              />
            </div>
          }
        />
      </Col>
    </Row>
  </div>
);

OrderRemark.propTypes = {
  handleOrderRemark: PropTypes.func.isRequired,
  value: PropTypes.string
};

OrderRemark.defaultProps = {
  value: ""
};

export default OrderRemark;
