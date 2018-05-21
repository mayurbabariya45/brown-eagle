import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import { Card } from "../../components/Card/Card";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="orders">
        <Row>
          <Col md={12}>
            <Row>
              <div className="section-header">
                <div className="title">
                  <h5>All Orders</h5>
                </div>
              </div>
            </Row>
          </Col>
          <Col md={12}>
            <Row>
              <Card 
                plain 
                content={<div className="orders-header" />} />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Orders;
