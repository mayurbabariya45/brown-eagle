import React from "react";
import {
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup
} from "react-bootstrap";

const Transactions = props => (
  <div>
    <Row>
      <Col md={6} xs={12}>
        <FormGroup>
          <ControlLabel>Orders:</ControlLabel>
          <FormControl.Static>{props.transactions.orders}</FormControl.Static>
        </FormGroup>
      </Col>
      <Col md={6} xs={12}>
        <FormGroup>
          <ControlLabel>Total Sales:</ControlLabel>
          <FormControl.Static>
            {props.transactions.totalSales}
          </FormControl.Static>
        </FormGroup>
      </Col>
      <Col md={6} xs={12}>
        <FormGroup>
          <ControlLabel>Units Sold:</ControlLabel>
          <FormControl.Static>
            {props.transactions.unitsSold}
          </FormControl.Static>
        </FormGroup>
      </Col>
    </Row>
  </div>
);

export default Transactions;
