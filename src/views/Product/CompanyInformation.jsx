import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup
} from "react-bootstrap";

const CompanyInfromation = props => (
  <div>
    <Row>
      <Col md={6} xs={12}>
        <FormGroup>
          <ControlLabel>{props.translate("basic_bussiness_type")}</ControlLabel>
          <FormControl.Static>Manufacturer</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{props.translate("basic_main_product")}</ControlLabel>
          <FormControl.Static>
            CANDY MACHINE,CANDY PACKING MACHINE,CHOCOLATE PACKING
            MACHINE,FONDANT MACHINE,LOLLIPOP MACHINE
          </FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{props.translate("basic_revenue")}</ControlLabel>
          <FormControl.Static>US$10 Million - US$50 Million</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{props.translate("basic_market")}</ControlLabel>
          <FormControl.Static>Europe 30.00% </FormControl.Static>
        </FormGroup>
      </Col>
      <Col md={6} xs={12}>
        <FormGroup>
          <ControlLabel>{props.translate("basic_location")}</ControlLabel>
          <FormControl.Static>France</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{props.translate("basic_employees")}</ControlLabel>
          <FormControl.Static>Fewer than 5 People</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{props.translate("basic_established")}</ControlLabel>
          <FormControl.Static>2007</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{props.translate("basic_certification")}</ControlLabel>
          <FormControl.Static>CE,CE</FormControl.Static>
        </FormGroup>
      </Col>
    </Row>
  </div>
);

CompanyInfromation.propTypes = {
  translate: PropTypes.func.isRequired
};

export default CompanyInfromation;
