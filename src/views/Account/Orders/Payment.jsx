import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
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
import Modal from "../../../components/Modal/Modal";

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
          const { token } = payload;
          this.props.payment(this.props.orderId, token.id).then(payload => {
            if (payload.type === "ADD_PAYMENT_FAILURE") {
              this.props.showNotification(
                <span data-notify="icon" className="pe-7s-check" />,
                <div>{payload.payload.response.message}</div>,
                true
              );
            } else {
              this.props.showNotification(
                <span data-notify="icon" className="pe-7s-check" />,
                <div>Payment has been done successfully</div>,
                false
              );
              this.props.showPaymentModal();
            }
            this.setState({
              loading: false
            });
          });
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <BlockUi blocking={this.state.loading}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Card number
              <CardNumberElement {...createOptions(this.props.fontSize)} />
            </label>
            <label>
              Expiration date
              <CardExpiryElement {...createOptions(this.props.fontSize)} />
            </label>
            <label>
              CVC
              <CardCVCElement {...createOptions(this.props.fontSize)} />
            </label>
            <label>
              Postal code
              <PostalCodeElement {...createOptions(this.props.fontSize)} />
            </label>
            <button>Pay</button>
          </form>
        </div>
      </BlockUi>
    );
  }
}
const SplitForm = injectStripe(_SplitForm);

const Payment = props => (
  <Modal
    show={props.show}
    onHide={props.showPaymentModal}
    bHeader="Payment Method"
    className="payment-method"
    bContent={
      <div className="checkout-method">
        <StripeProvider apiKey="pk_test_I8uSJFLfrxhukhP4knlIzLuj">
          <Elements>
            <SplitForm
              fontSize="18px"
              payment={props.payment}
              orderId={props.orderId}
              showNotification={props.showNotification}
              showPaymentModal={props.showPaymentModal}
            />
          </Elements>
        </StripeProvider>
      </div>
    }
  />
);

Payment.propTypes = {
  payment: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  showPaymentModal: PropTypes.func.isRequired
};

export default Payment;
