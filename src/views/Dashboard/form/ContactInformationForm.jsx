import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Form } from "react-bootstrap";
import { format, length } from "redux-form-validators";
import BlockUi from "react-block-ui";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import {
  required,
  normalizePhone,
  phoneNumber,
  email
} from "../../../formValidationRules/FormValidationRules";

class ContactInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    const { handleSubmitForm } = this.props;
    const socialLinks = [];
    if (value.facebook) {
      socialLinks.push({
        platform: "facebook",
        link: value.facebook
      });
    }
    if (value.twitter) {
      socialLinks.push({
        platform: "twitter",
        link: value.twitter
      });
    }
    if (value.google) {
      socialLinks.push({
        platform: "google",
        link: value.google
      });
    }
    delete value.google;
    delete value.facebook;
    delete value.twitter;
    handleSubmitForm({ ...value, socialLinks });
  }
  render() {
    const { translate, handleSubmit, loading } = this.props;
    return (
      <div className="contact-information">
        <BlockUi tag="div" blocking={loading}>
          <Col sm={12}>
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                proprieties={[
                  {
                    label: translate("email"),
                    type: "email",
                    bsClass: "form-control form-control-simple",
                    name: "email",
                    readOnly: "readOnly",
                    validate: [email]
                  },
                  {
                    label: translate("r_username"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "username",
                    validate: [required]
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
                    name: "alternateEmail",
                    validate: [email]
                  },
                  {
                    label: translate("fax"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "fax",
                    validate: [length({ min: 6, allowBlank: true })]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                proprieties={[
                  {
                    label: translate("r_firstname"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "firstName",
                    validate: [required]
                  },
                  {
                    label: translate("r_lastname"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "lastName",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("telephone"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "telephone",
                    normalize: normalizePhone
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
                    name: "facebook",
                    validate: [
                      format({
                        with: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                        message: translate("url_validation"),
                        allowBlank: true
                      })
                    ]
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
                    name: "twitter",
                    validate: format({
                      with: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                      message: translate("url_validation"),
                      allowBlank: true
                    })
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
                    name: "google",
                    validate: format({
                      with: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                      message: translate("url_validation"),
                      allowBlank: true
                    })
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
                    name: "phone",
                    validate: [phoneNumber],
                    normalize: normalizePhone
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
  }
}

ContactInformationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ContactInformationForm;
