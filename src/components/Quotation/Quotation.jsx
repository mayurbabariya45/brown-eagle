import React from "react";
import { FormGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Quotation = props => {
  const { translate, linkUrl } = props;
  return (
    <Row>
      <Col md={12}>
        <FormGroup>
          <Link to={linkUrl} className="btn-fill btn-block btn-radius btn btn-warning">
            {translate("request_quote")}
          </Link>
        </FormGroup>
      </Col>
    </Row>
  );
};
export default Quotation;
