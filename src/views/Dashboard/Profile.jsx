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
import BlockUi from "react-block-ui";
import { Card } from "../../components/Card/Card";
import CompanyInformationFormContainer from "../../containers/DashboardContainer/CompanyInformationFormContainer";
import ContactInformationFormContainer from "../../containers/DashboardContainer/ContactInformationFormContainer";
import SellerCertificateFormContainer from "../../containers/DashboardContainer/SellerCertificateFormContainer";
import SellerVideoForm from "./form/SellerVideoForm";

const Profile = props => {
  const {
    translate,
    handleEditForm,
    contactForm,
    companyForm,
    certificateForm,
    handleSubmitForm,
    showNotification,
    handleEditCertificateForm,
    handleUploadCertificateForm,
    handleRemoveCertificate,
    handleUploadVideo,
    handleEmailConfirmation,
    isLoading,
    locale,
    isResendEmail
  } = props;
  const { user, loading } = props.auth;
  const activePlan = (!_.isEmpty(user.activePlan) && user.activePlan) || {};
  const facebook = _.find(user.socialLinks, ["platform", "facebook"]);
  const twitter = _.find(user.socialLinks, ["platform", "twitter"]);
  const google = _.find(user.socialLinks, ["platform", "google"]);
  const registeredAddress = !_.isEmpty(user.registeredAddress)
    ? `${user.registeredAddress.address} ${user.registeredAddress.areaCode} ${
        user.registeredAddress.city
      } ${user.registeredAddress.country}`
    : "none";
  const operationalAddress = !_.isEmpty(user.operationalAddress)
    ? `${user.operationalAddress.address}
         ${user.operationalAddress.areaCode}
         ${user.operationalAddress.city}
         ${user.operationalAddress.country}
        `
    : "none";
  const activedPlanName = activePlan.plan;
  const activePlanProducts = activePlan.product;
  const activePlanRfq = activePlan.rfq;
  const activePlanStorage = activePlan.storage;
  const certificates = !_.isEmpty(user) ? user.certificates : [];

  return (
    <div className="profile">
      <Row>
        <Col md={12}>
          <BlockUi blocking={isLoading}>
            <Row>
              <Card
                className="card-profile"
                plain
                footer
                header={
                  <div className="header card-header-action">
                    <h4 className="title">
                      {user && `${user.firstName} ${user.lastName}`}{" "}
                      {user.isProfileVerified === "pending" ? (
                        <span className="label label-warning">
                          {translate("status_pending")}
                        </span>
                      ) : (
                        <span className="label label-info">
                          {user.isProfileVerified}
                        </span>
                      )}
                    </h4>
                    {/* <div className="actions-label">
                   
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
                            <span className="label label-info">
                              {translate("status_verified")}
                            </span>
                          )}
                          {!user.isEmailVerified && (
                            <div className="email-status">
                              <span className="label label-warning">
                                {translate("status_pending")}
                              </span>{" "}
                              {!isResendEmail && (
                                <span
                                  className="label label-success"
                                  onClick={handleEmailConfirmation}
                                >
                                  {translate("resend_button")}
                                </span>
                              )}
                            </div>
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
          </BlockUi>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            <Card
              className="card-profile-task"
              plain
              footer
              header={
                <div className="header card-header-action">
                  <h4 className="title">
                    My Plan{" "}
                    <small>
                      {!_.isEmpty(activedPlanName) && activedPlanName.name}
                    </small>
                  </h4>
                  <div className="actions-label">
                    <div className="action text-bold">
                      {_.upperFirst(activePlan.status) || ""}
                    </div>
                  </div>
                </div>
              }
              content={
                <Row>
                  <div className="task-lists">
                    <div className="task-list">
                      <div className="card-stats card-numbers">
                        <div className="icon-text">
                          <div className="numbers">
                            {(activePlanProducts && activePlanProducts.total) ||
                              0}
                          </div>
                          <div className="icon-big text-right icon-warning">
                            <i className="pe-7s-note2" />
                          </div>
                        </div>
                        <div className="small-content">
                          <p>Products</p>
                          <div>
                            <span>
                              Remaining{" "}
                              {(activePlanProducts &&
                                activePlanProducts.remaining) ||
                                0}
                            </span>{" "}
                            <span>
                              Used{" "}
                              {(activePlanProducts &&
                                activePlanProducts.used) ||
                                0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="task-list">
                      <div className="card-stats card-numbers">
                        <div className="icon-text">
                          <div className="numbers">
                            {(activePlanRfq && activePlanRfq.total) || 0}
                          </div>
                          <div className="icon-big text-right icon-warning">
                            <i className="pe-7s-news-paper" />
                          </div>
                        </div>
                        <div className="small-content">
                          <p>Request For Quotation</p>
                          <div>
                            <span>
                              Remaining{" "}
                              {(activePlanRfq && activePlanRfq.remaining) || 0}
                            </span>{" "}
                            <span>
                              Used {(activePlanRfq && activePlanRfq.used) || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="task-list">
                      <div className="card-stats card-numbers">
                        <div className="icon-text">
                          <div className="numbers">
                            {(activePlanStorage && activePlanStorage.total) ||
                              0} MB
                          </div>
                          <div className="icon-big text-right icon-warning">
                            <i className="pe-7s-refresh-cloud" />
                          </div>
                        </div>
                        <div className="small-content">
                          <p>Storage</p>
                          <div>
                            <span>
                              Remaining{" "}
                              {(activePlanStorage &&
                                activePlanStorage.remaining) ||
                                0} MB
                            </span>{" "}
                            <span>
                              Used{" "}
                              {(activePlanStorage && activePlanStorage.used) ||
                                0} MB
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      showNotification={showNotification}
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
                          {user ? user.established : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("o_website")}</ControlLabel>
                        <FormControl.Static>
                          {user ? user.website : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("b_type")}</ControlLabel>
                        <FormControl.Static>
                          {user ? user.businessType : "none"}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>{translate("m_products")}</ControlLabel>
                        <FormControl.Static className="form-control-static-flex">
                          {user
                            ? _.map(user.mainProducts, (product, index) => (
                                <span
                                  key={index}
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
                          {user ? user.employeeCount : "none"}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                    <Col sm={12}>
                      <FormGroup>
                        <ControlLabel>{translate("about_us")}</ControlLabel>
                        <FormControl.Static>
                          {user ? user.aboutUs : "none"}
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
                  <h4 className="title">{translate("p_seller_certificate")}</h4>
                  <div className="actions-label">
                    <div
                      className="action action-link"
                      onClick={handleEditCertificateForm}
                    >
                      {certificateForm ? translate("close") : translate("edit")}
                    </div>
                  </div>
                </div>
              }
              content={
                certificateForm ? (
                  <SellerCertificateFormContainer
                    translate={translate}
                    loading={loading}
                    handleUploadCertificateForm={handleUploadCertificateForm}
                    showNotification={showNotification}
                  />
                ) : (
                  <BlockUi tag="div" blocking={loading}>
                    <Row>
                      <div className="seller-certificate-show">
                        <div className="images-preview">
                          <div className="preview">
                            {_.map(certificates, (file, i) => (
                              <div key={i} className="preview-box">
                                <a href={file.url} target="blank">
                                  <i className="fa fa-file-pdf-o" />
                                </a>
                                <span
                                  className="remove-image"
                                  role="presentation"
                                  onClick={() => {
                                    handleRemoveCertificate(file._id);
                                  }}
                                >
                                  <i className="pe-7s-trash" />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Row>
                  </BlockUi>
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
                  <h4 className="title">My Video</h4>
                </div>
              }
              content={
                <SellerVideoForm
                  handleUploadVideo={handleUploadVideo}
                  user={!_.isEmpty(user) ? user : []}
                  loading={loading}
                />
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
