import React from "react";
import {
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup
} from "react-bootstrap";
import { Card } from "../../../components/Card/Card";
import CompanyInformationForm from "../form/CompanyInformationForm";
import ContactInformationForm from "../form/ContactInformationForm";

const Profile = props => {
  const {
    translate,
    handleEditForm,
    contactForm,
    companyForm,
    handleSubmitForm,
    handleSubmit
  } = props;
  const { user, loading } = props.auth;

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
                  <div className="actions-label">
                    <div className="action">IN</div>
                  </div>
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
                        <span className="label label-info">
                          {user.isEmailVerified ? "verified" : ""}
                        </span>
                      </FormControl.Static>
                    </FormGroup>
                  </Col>
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <ControlLabel>Joined BrownEgle.com in</ControlLabel>
                      <FormControl.Static>2018</FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Main Products are</ControlLabel>
                      <FormControl.Static />
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
                    <ContactInformationForm
                      translate={translate}
                      handleSubmit={handleSubmit}
                      loading={loading}
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
                          {user.social ? user.social : "none"}
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
                    <CompanyInformationForm
                      translate={translate}
                      handleSubmit={handleSubmit}
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
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("o_website")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("b_type")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("t_employees")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>{translate("p_selling")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("m_products")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("r_address")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("o_address")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
                        </FormControl.Static>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>{translate("about_us")}</ControlLabel>
                        <FormControl.Static>
                          {user.company_name ? user.company_name : "none"}
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
export default Profile;
