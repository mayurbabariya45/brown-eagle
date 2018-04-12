import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Field, FieldArray } from "redux-form";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  HelpBlock,
  Row,
  Col
} from "react-bootstrap";
import Button from "../../elements/CustomButton/CustomButton";
import Checkbox from "../../elements/CustomCheckbox/CustomCheckbox";

const FieldGroup = ({
  label,
  inputGroup,
  validationState,
  bsText,
  bsIcon,
  bsStyle,
  children,
  xsInput,
  xsLabel,
  className,
  removeInputDelete,
  errorText,
  ...props
}) => {
  // console.log(children);
  switch (props.type) {
    case "checkbox":
      return (
        <FormGroup validationState={validationState}>
          <Checkbox {...props} label={children} />
        </FormGroup>
      );
    case "select":
      return (
        <FormGroup validationState={validationState}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl componentClass="select" {...props} placeholder="select">
            {children}
          </FormControl>
        </FormGroup>
      );
    default:
      switch (inputGroup) {
        case "button":
          return (
            <FormGroup validationState={validationState}>
              <InputGroup>
                <FormControl {...props} />
                {bsStyle &&
                  bsText && (
                    <InputGroup.Button>
                      <Button {...bsStyle}>{bsText}</Button>
                    </InputGroup.Button>
                  )}
              </InputGroup>
            </FormGroup>
          );
        case "icon":
          return (
            <FormGroup validationState={validationState}>
              <InputGroup>
                {label && <ControlLabel>{label}</ControlLabel>}
                <InputGroup.Addon>{bsIcon}</InputGroup.Addon>
                <FormControl {...props} />
              </InputGroup>
            </FormGroup>
          );
        case "horizontal":
          return (
            <FormGroup validationState={validationState} className={className}>
              <Col componentClass={ControlLabel} sm={xsLabel || 3}>
                {label}
              </Col>
              <Col sm={xsInput || 9}>
                <FormControl {...props} />
                {errorText !== "Required" &&
                  errorText && <HelpBlock>{errorText}</HelpBlock>}
              </Col>
              {removeInputDelete && (
                <Col sm={2}>
                  <Button
                    bsStyle="danger"
                    fill
                    simple
                    onClick={removeInputDelete}
                  >
                    <i className="pe-7s-trash" />
                  </Button>
                </Col>
              )}
            </FormGroup>
          );
        case "feedback":
          return (
            <FormGroup
              className="has-feedback"
              validationState={validationState}
            >
              {label && <ControlLabel>{label}</ControlLabel>}
              {children}
              <FormControl {...props} />
              <span className={classNames("form-control-feedback", bsIcon)} />
              {errorText !== "Required" && <HelpBlock>{errorText}</HelpBlock>}
            </FormGroup>
          );
        case "select-with-input":
          return (
            <FormGroup
              className="has-feedback"
              validationState={validationState}
            >
              <ControlLabel>{label}</ControlLabel>
              <FormControl
                componentClass="select"
                bsClass="form-control form-control-simple form-control-mobile"
                placeholder="select"
              >
                {children}
              </FormControl>
              <FormControl {...props} />
              <span className={classNames("form-control-feedback", bsIcon)} />
            </FormGroup>
          );
        default:
          return (
            <FormGroup validationState={validationState}>
              {label && <ControlLabel>{label}</ControlLabel>}
              <FormControl {...props} />
            </FormGroup>
          );
      }
  }
};
const renderField = ({
  input,
  label,
  type,
  removeInputDelete,
  meta: { touched, error, warning, active, submitFailed },
  ...props
}) => {
  let validationState;
  let errors;
  if (touched && error) {
    validationState = "error";
    errors = error;
  }
  return (
    <FieldGroup
      label={label}
      type={type}
      validationState={validationState}
      removeInputDelete={removeInputDelete}
      errorText={errors}
      {...input}
      {...props}
    />
  );
};
const renderExtraInput = ({ fields, meta: { error } }) => (
  <span>
    <Button fill onClick={() => fields.push()}>
      Add More
    </Button>
    {fields.map((hobby, index) => (
      <div key={index}>
        <Fields
          name={hobby}
          xsLabel={2}
          xsInput={5}
          type="text"
          inputGroup="horizontal"
          bsClass="form-control form-control-simple"
          removeInputDelete={() => fields.remove(index)}
        />
      </div>
    ))}
  </span>
);
const Fields = ({ mutipleFields, translate, ...props }) => {
  if (mutipleFields) {
    return (
      <div className="mutiple-form-group">
        <Field {...props} component={renderField} />
        <FieldArray
          name="product-keywords"
          translate={translate}
          component={renderExtraInput}
        />
      </div>
    );
  }
  return <Field {...props} component={renderField} />;
};
export class FormInputs extends Component {
  render() {
    const row = [];
    if (this.props.ncols) {
      for (let i = 0; i < this.props.ncols.length; i++) {
        row.push(
          <div key={i} className={this.props.ncols[i]}>
            <Fields
              {...this.props.proprieties[i]}
              children={this.props.children}
            />
          </div>
        );
      }
      return <Row>{row}</Row>;
    }
    for (let i = 0; i < this.props.proprieties.length; i++) {
      row.push(
        <Fields
          key={i}
          {...this.props.proprieties[i]}
          children={this.props.children}
        />
      );
    }
    return row;
  }
}

FormInputs.propTypes = {
  ncols: PropTypes.array,
  proprieties: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default FormInputs;
