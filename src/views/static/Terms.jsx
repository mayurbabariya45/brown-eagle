import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const Terms = () => {
    return (
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>CONDITIONS OF USE</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
                <p>
                    Please read these Terms and Conditions (“Terms”, “Terms and Conditions”) carefully before
                    using the www.brown-eagle.comwebsite and the Brown-Eagle mobile application (together,
                    or individually, the “Service”) operated by Brown Eagle BV(“us”, “we”, or “our”).
                </p>
                <p>
                    Your access to and use of the Service is conditioned upon your acceptance of and
                    compliance with these Terms. These Terms apply to all visitors, users and others who wish
                    to access or use the Service.
                </p>
                <p>
                    By accessing or using the Service you agree to be bound by these Terms. If you disagree
                    with any part of the terms then you do not have permission to access the Service.
                </p>
                <h3 className="text-uppercase text-warning">COMMUNICATIONS</h3>
                <p>
                    By creating an Account on our service, you agree to subscribe to newsletters, marketing or
                    promotional materials and other information we may send. However, you may opt out of
                    receiving any, or all, of these communications from us by following the unsubscribe link or
                    instructions provided in any email we send.
                </p>
                <h3 className="text-uppercase text-warning">PURCHASES</h3>
                <p>
                    If you wish to purchase any product or service made available through the Service
                    (“Purchase”), you may be asked to supply certain information relevant to your Purchase
                    including, without limitation, your credit card number, the expiration date of your credit card,
                    your billing address, and your shipping information.
                </p>
                <p>
                    You represent and warrant that: (i) you have the legal right to use any credit card(s) or other
                    payment method(s) in connection with any Purchase; and that (ii) the information you supply
                    to us is true, correct and complete.
                </p>
                <p>
                    The service may employ the use of third party services for the purpose of facilitating
                    payment and the completion of Purchases. By submitting your information, you grant us the
                    right to provide the information to these third parties subject to our Privacy Policy.
                </p>
                <p>
                    We reserve the right to refuse or cancel your order at any time for reasons including but not
                    limited to: product or service availability, errors in the description or price of the product or
                    service, error in your order or other reasons.
                </p>
                <p>
                    We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal
                    transaction is suspected.
                </p>
                <h3 className="text-uppercase text-warning">AVAILABILITY, ERRORS AND INACCURACIES</h3>
                <p>
                    We are constantly updating product and service offerings on the Service. We may
                    experience delays in updating information on the Service and in our advertising on other web
                    sites. The information found on the Service may contain errors or inaccuracies and may not
                    be complete or current. Products or services may be mispriced, described inaccurately, or
                    unavailable on the Service and we cannot guarantee the accuracy or completeness of any
                    information found on the Service.
                </p>
                <p>
                    We therefore reserve the right to change or update information and to correct errors,
                    inaccuracies, or omissions at any time without prior notice.
                </p>
                <h3 className="text-uppercase text-warning"> CONTESTS, SWEEPSTAKES AND PROMOTIONS</h3>
                <p>
                    Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available
                    through the Service may be governed by rules that are separate from these Terms
                    Conditions. If you participate in any Promotions, please review the applicable rules as well
                    as our Privacy Policy. If the rules for a Promotion conflict with these Terms and Conditions,
                    the Promotion rules will apply.
                </p> 
                <h3 className="text-uppercase text-warning">SUBSCRIPTIONS</h3>
                <p>
                    Some parts of the Service are billed on a subscription basis (“Subscription(s)”). You will be
                    billed in advance on a recurring and periodic basis (“Billing Cycle”). Billing cycles are set
                    either on a monthly or annual basis, depending on the type of subscription plan you select
                    when purchasing a Subscription.
                </p>
                <p>
                    At the end of each Billing Cycle, your Subscription will automatically renew under the exact
                    same conditions unless you cancel it or Brown Eagle BV cancels it. You may cancel your
                    Subscription renewal either through your online account management page or by contacting
                    Brown Eagle BV customer support team.
                </p>
                <p>
                    A valid payment method, including credit card or PayPal, is required to process the payment
                    for your Subscription. You shall provide Brown Eagle BV with accurate and complete billing
                    information including full name, address, state, zip code, telephone number, and a valid
                    payment method information. By submitting such payment information, you automatically
                    authorize Brown Eagle BV to charge all Subscription fees incurred through your account to
                    any such payment instruments.
                </p>
                <p>
                    Should automatic billing fail to occur for any reason, Brown Eagle BV will issue an electronic
                    invoice indicating that you must proceed manually, within a certain deadline date, with the
                    full payment corresponding to the billing period as indicated on the invoice.
                </p>
                <h3 className="text-uppercase text-warning">FREE TRIAL</h3>
                <p>
                    Brown Eagle BV may, at its sole discretion, offer a Subscription with a free trial for a limited
                    period of time (“Free Trial”).
                </p>
                <p>
                    You may be required to enter your billing information in order to sign up for the Free Trial.
                </p>
                <p>
                    If you do enter your billing information when signing up for the Free Trial, you will not be
                    charged by Brown Eagle BV until the Free Trial has expired. On the last day of the Free Trial
                    period, unless you cancelled your Subscription, you will be automatically charged the
                    applicable Subscription fees for the type of Subscription you have selected.
                </p>
                <h3 className="text-uppercase text-warning">FEE CHANGES</h3>
                <p>Brown Eagle Inc., in its sole discretion and at any time, may modify the Subscription fees for
                the Subscriptions. Any Subscription fee change will become effective at the end of the then-
                current Billing Cycle.</p>
                <p>Brown Eagle BV will provide you with a reasonable prior notice of any change in
                Subscription fees to give you an opportunity to terminate your Subscription before such
                change becomes effective.</p>
                <p>Your continued use of the Service after the Subscription fee change comes into effect
                constitutes your agreement to pay the modified Subscription fee amount.</p>
                <h3 className="text-uppercase text-warning">REFUNDS</h3>
                <p>Certain refund requests for Subscriptions may be considered by Brown Eagle BV on a case-
                by-case basis and granted in sole discretion of Brown Eagle Inc..</p>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
    );
};

Terms.propTypes = {};

export default Terms;
