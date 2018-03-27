import React, { Component } from "react";
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
  normalizePhone
} from "../../../formValidationRules/FormValidationRules";
import Error from "../../../components/ErrorMessages/ErrorMessages";

class InformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderField = this.renderField.bind(this);
  }
  renderField({
    input,
    label,
    labels,
    checked,
    values,
    type,
    inline,
    meta: { touched, error, warning, active },
    ...props
  }) {
    // let validationState;
    // if (touched && error) {
    //     validationState = "error";
    // }
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
  }

  render() {
    const {
      submitting,
      pristine,
      handleSubmit,
      hanldeSubmitForm,
      formData,
      errors,
      message,
      loading,
      translate
    } = this.props;
    const phoneNumber = value =>
      value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? translate("phone_number_validation")
        : undefined;

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
                    validate: [required]
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
                    validate: [required]
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
                      <Select searchable={false} />
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
                        component={this.renderField}
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
                        component={this.renderField}
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
                    disabled={pristine || submitting}
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

export default reduxForm({ form: "informationForm" })(InformationForm);
