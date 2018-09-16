import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, Col, Row } from "react-bootstrap";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";
import BlockUi from "react-block-ui";
import Button from "../../elements/CustomButton/CustomButton";

const createOptions = (fontSize, padding) => ({
  style: {
    base: {
      fontSize,
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4"
      },
      padding
    },
    invalid: {
      color: "#9e2146"
    }
  }
});

const PaymentForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Row>
      <Col md={6}>
        <FormGroup>
          <div>
            <ControlLabel>{props.translate("payment_card_label")}</ControlLabel>
            <CardNumberElement {...createOptions(props.fontSize)} />
          </div>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <div>
            <ControlLabel>{props.translate("payment_date_label")}</ControlLabel>
            <CardExpiryElement {...createOptions(props.fontSize)} />
          </div>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <FormGroup>
          <div>
            <ControlLabel>{props.translate("payment_cvc_label")}</ControlLabel>
            <CardCVCElement {...createOptions(props.fontSize)} />
          </div>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <div>
            <ControlLabel>{props.translate("payment_code_label")}</ControlLabel>
            <PostalCodeElement {...createOptions(props.fontSize)} />
          </div>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <Button fill bsStyle="warning" type="submit">
          Pay
        </Button>
      </Col>
    </Row>
  </form>
);

class _SplitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({
      loading: true
    });
    if (this.props.stripe) {
      this.props.stripe.createToken().then(payload => {
        if (!_.isEmpty(payload)) {
          const { token, error } = payload;
          if (token) {
            const values = {
              plan: this.props.plan,
              token: token.id
            };
            if (_.isEmpty(this.props.seller)) {
              this.props.showNotification(
                <span data-notify="icon" className="pe-7s-check" />,
                <div>{this.props.translate("notification_try_again")}</div>,
                true
              );
              return false;
            }
            this.props.payment(this.props.seller, values).then(payload => {
              if (payload.type === "ADD_PAYMENT_FAILURE") {
                this.props.showNotification(
                  <span data-notify="icon" className="pe-7s-check" />,
                  <div>{payload.payload.response.message}</div>,
                  true
                );
              } else {
                this.props.showNotification(
                  <span data-notify="icon" className="pe-7s-check" />,
                  <div>{this.props.translate("notification_actived_plan")}</div>,
                  false
                );
                window.scrollTo(0, 0);
              }
              this.setState({
                loading: false
              });
            });
          } else if (error) {
            const { code, message } = error;
            if (code) {
              this.props.showNotification(
                <span data-notify="icon" className="pe-7s-check" />,
                <div>{message}</div>,
                true
              );
              this.setState({
                loading: false
              });
            }
          }
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <BlockUi blocking={this.state.loading}>
        <div className="payment-method">
          <PaymentForm
            fontSize={this.props.fontSize}
            handleSubmit={this.handleSubmit}
            translate={this.props.translate}
          />
        </div>
      </BlockUi>
    );
  }
}
const SplitForm = injectStripe(_SplitForm);

const Payment = props => (
  <div className="checkout-method">
    <StripeProvider apiKey="pk_test_I8uSJFLfrxhukhP4knlIzLuj">
      <Elements>
        <SplitForm
          fontSize="18px"
          payment={props.payment}
          plan={props.plan}
          showNotification={props.showNotification}
          translate={props.translate}
          seller={props.seller}
        />
      </Elements>
    </StripeProvider>
  </div>
);

Payment.propTypes = {
  payment: PropTypes.func.isRequired
};

export default Payment;
