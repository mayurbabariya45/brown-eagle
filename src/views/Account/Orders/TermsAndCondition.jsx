import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form";
import Modal from "../../../components/Modal/Modal";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import { required } from "../../../formValidationRules/FormValidationRules";

class TermsAndCondition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onHide = this.onHide.bind(this);
  }
  onHide() {
    this.setState({
      isShow: !this.state.isShow
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      isShow: !this.state.isShow
    });
  }
  render() {
    const { handleSubmit, hanldeSubmitForm } = this.props;
    return (
      <div>
        <Form onSubmit={handleSubmit(hanldeSubmitForm)}>
          <FormInputs
            proprieties={[
              {
                type: "checkbox",
                name: "p_termsAndCondition",
                number: "p_termsAndCondition",
                validate: [required]
              }
            ]}
          >
            I accept Seller{" "}
            <Link to="#" onClick={this.handleClick}>
              Terms and condition
            </Link>
          </FormInputs>
          <FormInputs
            proprieties={[
              {
                type: "checkbox",
                name: "d_termsAndCondition",
                number: "d_termsAndCondition",
                validate: [required]
              }
            ]}
          >
            I accept DHL{" "}
            <Link to="http://www.dhl.co.in/en/express/shipping/shipping_advice/terms_conditions.htmlShipmentTermsAndConditions.html" >
              Terms and condition
            </Link>
          </FormInputs>
          <FormInputs
            proprieties={[
              {
                type: "checkbox",
                name: "b_termsAndCondition",
                number: "b_termsAndCondition",
                validate: [required]
              }
            ]}
          >
            I accept BE{" "}
            <Link to="#" onClick={this.handleClick}>
              Terms and condition
            </Link>
          </FormInputs>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12} className="text-right">
              <Button type="submit" bsStyle="warning" fill>
                Next
              </Button>
            </Col>
          </Row>
        </Form>
        <Modal
          show={this.state.isShow}
          onHide={this.onHide}
          bHeader="Terms And Condition"
        />
      </div>
    );
  }
}

TermsAndCondition.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  hanldeSubmitForm: PropTypes.func.isRequired
};

export default reduxForm({
  form: "termsAndConditionForm"
})(TermsAndCondition);
