import React from "react";
import { Row, Col } from "react-bootstrap";

export const Error = props => {
  if (props.error) {
    return (
      <Row>
        <Col sm={12}>
          <div className="error-message">
            <p>{props.message}</p>
          </div>
        </Col>
      </Row>
    );
  }
  return <div />;
};

export const Success = props => {
  if (props.success) {
    return (
      <Row>
        <Col sm={12}>
          <div className="text-success">
            <p>{props.message}</p>
          </div>
        </Col>
      </Row>
    );
  }
  return <div />;
};
