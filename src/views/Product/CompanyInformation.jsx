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
          {information.businessType && (
            <FormGroup>
              <ControlLabel>
                {props.translate("basic_bussiness_type")}
              </ControlLabel>
              <FormControl.Static>
                {information.businessType}
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup>
            <ControlLabel>{props.translate("basic_main_product")}</ControlLabel>
            <FormControl.Static>
              CANDY MACHINE,CANDY PACKING MACHINE,CHOCOLATE PACKING
              MACHINE,FONDANT MACHINE,LOLLIPOP MACHINE
            </FormControl.Static>
          </FormGroup>
          {/* <FormGroup>
            <ControlLabel>{props.translate("basic_revenue")}</ControlLabel>
            <FormControl.Static>
              US$10 Million - US$50 Million
            </FormControl.Static>
          </FormGroup>
          <FormGroup>
            <ControlLabel>{props.translate("basic_market")}</ControlLabel>
            <FormControl.Static>Europe 30.00% </FormControl.Static>
          </FormGroup> */}
        </Col>
        <Col md={6} xs={12}>
          {information.location && (
            <FormGroup>
              <ControlLabel>{props.translate("basic_location")}</ControlLabel>
              <FormControl.Static>{information.location}</FormControl.Static>
            </FormGroup>
          )}
          {information.employeeCount && (
            <FormGroup>
              <ControlLabel>{props.translate("basic_employees")}</ControlLabel>
              <FormControl.Static>
                {information.employeeCount}
              </FormControl.Static>
            </FormGroup>
          )}
          {information.established && (
            <FormGroup>
              <ControlLabel>
                {props.translate("basic_established")}
              </ControlLabel>
              <FormControl.Static>{information.established}</FormControl.Static>
            </FormGroup>
          )}
          <FormGroup>
            <ControlLabel>
              {props.translate("basic_certification")}
            </ControlLabel>
            <FormControl.Static>CE,CE</FormControl.Static>
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