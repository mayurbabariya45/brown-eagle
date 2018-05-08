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
import { Card } from "../../components/Card/Card";
import CompanyInformationFormContainer from "../../containers/DashboardContainer/CompanyInformationFormContainer";
import ContactInformationFormContainer from "../../containers/DashboardContainer/ContactInformationFormContainer";

const Profile = props => {
  const {
    translate,
    handleEditForm,
    contactForm,
    companyForm,
    handleSubmitForm
  } = props;
  const { user, loading } = props.auth;
  const facebook = _.find(user.socialLinks, ["platform", "facebook"]);
  const twitter = _.find(user.socialLinks, ["platform", "twitter"]);
  const google = _.find(user.socialLinks, ["platform", "google"]);
  const registeredAddress =
    user.profile && !_.isEmpty(user.profile.registeredAddress)
      ? `${user.profile.registeredAddress.address} ${
          user.profile.registeredAddress.areaCode
        } ${user.profile.registeredAddress.city} ${
          user.profile.registeredAddress.country
        }`
      : "none";
  const operationalAddress =
    user.profile && !_.isEmpty(user.profile.operationalAddress)
      ? `${user.profile.operationalAddress.address}
         ${user.profile.operationalAddress.areaCode}
         ${user.profile.operationalAddress.city}
         ${user.profile.operationalAddress.country}
        `
      : "none";
  return (
    <div className="profile">
      <Row>
        <Col md={12}>
          <Row>
            <Card
              className="card-profile"
              plain
              footer
              header={
                <div className="header card-header-action">
                  <h4 className="title">
                    {user && `${user.firstName} ${user.lastName}`}
                  </h4>
                  {/* <div className="actions-label">
                    <div className="action">IN</div>
                  </div> */}
                </div>
              }
              content={
                <Row>
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <ControlLabel>at</ControlLabel>
                      <FormControl.Static>
                        {user && `${user.firstName} ${user.lastName}`}
                      </FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Email</ControlLabel>
                      <FormControl.Static>
                        {user && user.email}{" "}
                        {user.isEmailVerified && (
                          <span className="label label-info">verified</span>
                        )}
                        {!user.isEmailVerified && (
                          <span className="label label-warning">pending</span>
                        )}
                      </FormControl.Static>
                    </FormGroup>
                  </Col>
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <ControlLabel>Joined BrownEgle.com in</ControlLabel>
                      <FormControl.Static>2018</FormControl.Static>
                    </FormGroup>
                  </Col>
                </Row>
              }
            />
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            <Card
              className="card-profile"
              plain
              header={
                <div className="header card-header-action">
                  <h4 className="title">
                    {translate("p_contact_information")}
                  </h4>
                  <div className="actions-label">
                    <div
                      className="action action-link"
                      onClick={() => handleEditForm(0)}
                    >
                      {contactForm ? translate("close") : translate("edit")}
                    </div>
                  </div>
                </div>
              }
              content={
                contactForm ? (
                  <Row>
                    <ContactInformationFormContainer
                      translate={translate}
                      loading={loading}
                      data={user}
                      handleSubmitForm={handleSubmitForm}
                    />
                  </Row>
                ) : (
                  <Row>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <ControlLabel>{translate("email")}</ControlLabel>
                        <FormControl.Static>
                          {user.email && user.email}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("a_email")}</ControlLabel>
                        <FormControl.Static>
                          {user.alternateEmail ? user.alternateEmail : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("s_links")}</ControlLabel>
                        <FormControl.Static>
                          {facebook && (
                            <a
                              href={facebook.link}
                              className="btn-facebook btn-round btn-social btn btn-default"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          )}
                          {twitter && (
                            <a
                              href={twitter.link}
                              className="btn-twitter btn-round btn-social btn btn-default"
                            >
                              <i className="fa fa-twitter" />
                            </a>
                          )}
                          {google && (
                            <a
                              href={google.link}
                              className="btn-google btn-round btn-social btn btn-default"
                            >
                              <i className="fa fa-google" />
                            </a>
                          )}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <ControlLabel>{translate("fax")}</ControlLabel>
                        <FormControl.Static>
                          {user.fax ? user.fax : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("telephone")}</ControlLabel>
                        <FormControl.Static>
                          {user.telephone ? user.telephone : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("mobile")}</ControlLabel>
                        <FormControl.Static>
                          {user.phone ? user.phone : "none"}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                  </Row>
                )
              }
            />
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            <Card
              className="card-profile"
              plain
              footer
              header={
                <div className="header card-header-action">
                  <h4 className="title">
                    {translate("p_company_information")}
                  </h4>
                  <div className="actions-label">
                    <div
                      className="action action-link"
                      onClick={() => handleEditForm(1)}
                    >
                      {companyForm ? translate("close") : translate("edit")}
                    </div>
                  </div>
                </div>
              }
              content={
                companyForm ? (
                  <Row>
                    <CompanyInformationFormContainer
                      translate={translate}
                      loading={loading}
                      handleSubmitForm={handleSubmitForm}
                    />
                  </Row>
                ) : (
                  <Row>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <ControlLabel>{translate("c_name")}</ControlLabel>
                        <FormControl.Static>
                          {user.companyName ? user.companyName : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>
                          {translate("y_established")}
                        </ControlLabel>
                        <FormControl.Static>
                          {user.profile ? user.profile.established : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("o_website")}</ControlLabel>
                        <FormControl.Static>
                          {user.profile ? user.profile.website : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("b_type")}</ControlLabel>
                        <FormControl.Static>
                          {user.profile ? user.profile.businessType : "none"}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>{translate("m_products")}</ControlLabel>
                        <FormControl.Static>
                          {user.profile
                            ? _.map(user.profile.mainProducts, product => (
                              <span
                                  key={product}
                                  className="label label-warning"
                                >
                                  {product}
                                </span>
                              ))
                            : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("r_address")}</ControlLabel>
                        <FormControl.Static>
                          {registeredAddress}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("o_address")}</ControlLabel>
                        <FormControl.Static>
                          {operationalAddress}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("t_employees")}</ControlLabel>
                        <FormControl.Static>
                          {user.profile ? user.profile.employeeCount : "none"}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                    <Col sm={12}>
                      <FormGroup>
                        <ControlLabel>{translate("about_us")}</ControlLabel>
                        <FormControl.Static>
                          {user.profile ? user.profile.aboutUs : "none"}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                  </Row>
                )
              }
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};
Profile.propTypes = {
  translate: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  contactForm: PropTypes.bool.isRequired,
  companyForm: PropTypes.bool.isRequired,
  handleEditForm: PropTypes.func.isRequired
};
export default Profile;
