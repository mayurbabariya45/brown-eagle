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
import Location from "./Location";
import SellerVideo from "./SellerVideo";

const CompanyInfromation = props => {
  const { translate, information } = props;
  return (
    <div>
      <Row>
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
            <FormControl.Static>
              {_.map(information.certificates, (certificate, index) => {
                const lastIndex = _.size(information.certificates) - 1;
                if (index === lastIndex) {
                  if (_.has(certificate, "title")) {
                    return (
                      <a href={certificate.url} target="new">
                        {certificate.titleTranslations[props.locale]}
                      </a>
                    );
                  }
                }
                if (_.has(certificate, "title")) {
                  return (
                    <a href={certificate.url} target="new">
                      {certificate.titleTranslations[props.locale]},
                    </a>
                  );
                }
              })}
            </FormControl.Static>
          </FormGroup>
          <FormGroup>
            <ControlLabel>{props.translate("contact_person")}</ControlLabel>
            <FormControl.Static>
              {information.contactPerson && information.contactPerson.name}
            </FormControl.Static>
          </FormGroup>
        </Col>
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
          {/* <FormGroup>
            <ControlLabel>{props.translate("basic_main_product")}</ControlLabel>
            <FormControl.Static>
              CANDY MACHINE,CANDY PACKING MACHINE,CHOCOLATE PACKING
              MACHINE,FONDANT MACHINE,LOLLIPOP MACHINE
            </FormControl.Static>
          </FormGroup> */}
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
      </Row>
      <Row>
        <Col md={6}>
          <Location
            location={
              !_.isEmpty(information.coordinates)
                ? {
                    lat: information.coordinates.coordinates[0],
                    lng: information.coordinates.coordinates[1]
                  }
                : {}
            }
          />
        </Col>
        <Col md={6}>
          <SellerVideo url={information.profileVideo} />
        </Col>
      </Row>
    </div>
  );
};

CompanyInfromation.propTypes = {
  translate: PropTypes.func.isRequired
};

export default CompanyInfromation;
