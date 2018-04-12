import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Form } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";

const ContactInformationForm = props => {
  const { translate, handleSubmit, handleSubmitForm, loading } = props;
  return (
    <div className="contact-information">
      <BlockUi tag="div" blocking={loading}>
        <Col sm={12}>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              proprieties={[
                {
                  label: translate("email"),
                  type: "email",
                  bsClass: "form-control form-control-simple",
                  name: "email"
                },
                {
                  label: translate("fax"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "fax"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              proprieties={[
                {
                  label: translate("a_email"),
                  type: "email",
                  bsClass: "form-control form-control-simple",
                  name: "alternateEmail"
                },
                {
                  label: translate("telephone"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "telephone"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: translate("s_links"),
                  type: "text",
                  placeholder: "Facebook",
                  bsClass: "form-control form-control-simple",
                  name: "facebook"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  type: "text",
                  placeholder: "Twitter",
                  bsClass: "form-control form-control-simple",
                  name: "twitter"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  type: "text",
                  placeholder: "Google",
                  bsClass: "form-control form-control-simple",
                  name: "google"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: translate("mobile"),
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "phone"
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
                  {translate("d_submit")}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </BlockUi>
    </div>
  );
};

ContactInformationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ContactInformationForm;
