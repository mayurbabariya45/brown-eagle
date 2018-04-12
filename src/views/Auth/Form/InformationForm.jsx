import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import {
  Col,
  Row,
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import Radio from "../../../elements/CustomRadio/CustomRadio";
import Select from "../../../elements/CustomSelect/CustomSelect";
import {
  required,
  normalizePhone,
  phoneNumber,
  minLength,
  match
} from "../../../formValidationRules/FormValidationRules";
import { Error } from "../../../components/ErrorMessages/ErrorMessages";
import { countries } from "../../../variables/Variables";

const renderField = ({ input, labels, type, inline }) => {
  switch (type) {
    case "radio":
      return (
        <Radio
          {...input}
          type={type}
          inline={inline}
          number={input.value}
          label={labels}
        />
      );
    default:
      return <div />;
  }
};

class InformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      handleSubmit,
      hanldeSubmitForm,
      formData,
      errors,
      message,
      loading,
      translate,
      invalid
    } = this.props;

    return (
      <Row>
        <Col sm={6} smOffset={3}>
          <Form horizontal onSubmit={handleSubmit(hanldeSubmitForm)}>
            <BlockUi tag="div" blocking={loading}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>
                      {translate("r_username")}
                    </Col>
                    <Col sm={9}>
                      <FormControl.Static>
                        {formData.username}
                      </FormControl.Static>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    label: translate("password"),
                    type: "password",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("r_password_placeholder"),
                    name: "password",
                    validate: [required, minLength(6)]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    label: translate("r_c_password"),
                    type: "password",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("r_c_password_placeholder"),
                    name: "confirm_password",
                    validate: [required, match("password")]
                  }
                ]}
              />
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>
                      {translate("r_location")}
                    </Col>
                    <Col sm={9}>
                      <Select searchable options={countries} />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>
                      {translate("r_i_am")}
                    </Col>
                    <Col sm={9}>
                      <Field
                        name="businessRole"
                        type="radio"
                        component={renderField}
                        value="seller"
                        inline
                        name="role"
                        defaultChecked
                        labels={translate("r_supplier")}
                        validate={[required]}
                      />
                      <Field
                        name="businessRole"
                        type="radio"
                        component={renderField}
                        value="buyer"
                        name="role"
                        inline
                        labels={translate("r_buyer")}
                        validate={[required]}
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    label: translate("r_firstname"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "firstName",
                    placeholder: translate("r_firstname"),
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    label: translate("r_lastname"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "lastName",
                    placeholder: translate("r_lastname"),
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    label: translate("r_company"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "companyName",
                    placeholder: translate("r_c_placeholder"),
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "horizontal",
                    label: translate("r_phone"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "phone",
                    placeholder: translate("r_p_placeholder"),
                    validate: [required, phoneNumber],
                    normalize: normalizePhone
                  }
                ]}
              />
              <Error error={errors} message={message} />
              <FormGroup>
                <Col smOffset={3} sm={9}>
                  <Button
                    type="submit"
                    radius
                    fill
                    bsStyle="warning"
                    disabled={invalid}
                  >
                    {translate("r_confirm")}
                  </Button>
                </Col>
              </FormGroup>
            </BlockUi>
          </Form>
        </Col>
      </Row>
    );
  }
}
InformationForm.propTypes = {
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hanldeSubmitForm: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  errors: PropTypes.bool.isRequired
};
InformationForm.defaultProps = {
  message: ""
};
export default reduxForm({ form: "informationForm" })(InformationForm);
