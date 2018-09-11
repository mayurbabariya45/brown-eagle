import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card/Card";

const OrderSuccess = () => (
  <div className="order-success">
    <Row>
      <Col md={12}>
        <Card
          className="card-profile"
          plain
          footer
          content={
            <div>
              <div className="order-success-content">
                <h1>Thank You!</h1>
                <p className="lead">
                  Your Order has been created successfully.
                </p>
                <div className="actions">
                  <div className="payment-buttons">
                    <Link to="/my_account" className="btn-fill btn btn-warning">
                      My Account
                    </Link>
                  </div>
                </div>
                <hr />
                <p>
                  Having trouble? <a href="#">Contact us</a>
                </p>
              </div>
            </div>
          }
        />
      </Col>
    </Row>
  </div>
);

OrderSuccess.propTypes = {};

export default OrderSuccess;
