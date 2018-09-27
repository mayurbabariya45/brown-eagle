import React from "react";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";

class CustomReduxSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    if (this.props.input.onChange && event != null) {
      this.props.input.onChange(event.value);
    } else {
      this.props.input.onChange(null);
    }
  }

  render() {
    const {
      input,
      label,
      options,
      name,
      id,
      meta: { touched, error },
      ...custom
    } = this.props;
    let validationState;
    let errors;
    if (touched && error) {
      validationState = "error";
      errors = error;
    }
    return (
      <Row>
        <Col md={12}>
          <FormGroup validationState={validationState}>
            <ControlLabel>{label}</ControlLabel>
            <Select
              {...input}
              {...custom}
              id={id}
              name={name}
              options={options}
              value={this.props.input.value || ""}
              onBlur={() => this.props.input.onBlur(this.props.input.value)}
              onChange={this.onChange}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

CustomReduxSelect.propTypes = {};

export default CustomReduxSelect;
