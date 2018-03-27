import React from "react";
import { Row, Col } from "react-bootstrap";

const ErrorMessage = props => {
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

export default ErrorMessage;
