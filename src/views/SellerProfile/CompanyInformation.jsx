import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup
} from "react-bootstrap";

const CompanyInfromation = props => {
  const { translate, information } = props;
  return (
    <div>
      <Row>
        <Col md={6} xs={12}>
          <FormGroup>
            <ControlLabel>{props.translate("contact_person")}</ControlLabel>
            <FormControl.Static>
              {information && information.name}
            </FormControl.Static>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

CompanyInfromation.propTypes = {
  translate: PropTypes.func.isRequired
};

export default CompanyInfromation;
