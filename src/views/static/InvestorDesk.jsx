import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Grid, Row, Col, PageHeader, Form } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import BannerImage from "../../assets/img/banners/banner-inv.jpg";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";

const InvestorDesk = ({ handleSubmit }) => (
  <div>
    <Banner image={BannerImage} />
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>INVESTORS</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
              <h3 className="text-uppercase text-warning">Interested to invest?</h3>
              <p>
                We appreciate your interest to join Brown-Eagle, we request you
                to fill up the following details so we can get back to your
                shortly.
              </p>
              <Form>
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  proprieties={[
                    {
                      label: "First Name",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "companyName",
                      placeholder: "Enter first name",
                      validate: []
                    },
                    {
                      label: "Last Name",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "companyName",
                      placeholder: "Enter last name",
                      validate: []
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  proprieties={[
                    {
                      label: "Email Address",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "companyName",
                      placeholder: "Enter email address",
                      validate: []
                    },
                    {
                      label: "Phone Number",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "companyName",
                      placeholder: "Enter phone number",
                      validate: []
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Subject",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "companyName",
                      placeholder: "Enter subject",
                      validate: []
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      type: "text",
                      label: "Message",
                      componentClass: "textarea",
                      bsClass: "form-control form-control-simple",
                      name: "aboutUs",
                      style: { height: 100 },
                      placeholder: "Enter message",
                      validate: []
                    }
                  ]}
                />
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Button
                      radius
                      fill
                      bsStyle="warning"
                      className="text-capitalize"
                      type="submit"
                    >
                      SUBMIT
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

InvestorDesk.propTypes = {};

export default reduxForm({
  form: "InvestorDeskForm"
})(InvestorDesk);
