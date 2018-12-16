import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const Conditions = () => {
    return (
        <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>PRIVACY NOTICE</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
                <p>
                    Brown Eagle BV. (“us”, “we”, or “our”) operates the www.brown-eagle.com website and the
                    Brown-Eagle mobile application (the “Service”).
                </p>
                <p>
                    This page informs you of our policies regarding the collection, use and disclosure of
                    Personal Information when you use our Service.
                </p>
                <p>
                    We will not use or share your information with anyone except as described in this Privacy
                    Policy.
                </p>
                <p>
                    We use your Personal Information for providing and improving the Service. By using the
                    Service, you agree to the collection and use of information in accordance with this policy.
                    Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the
                    same meanings as in our Terms and Conditions.
                </p>
                <h3 className="text-uppercase text-warning">INFORMATION COLLECTION AND USE</h3>
                <p>
                    While using our Service, we may ask you to provide us with certain personally identifiable
                    information that can be used to contact or identify you. Personally identifiable information
                    may include, but is not limited to, your email address, name, phone number, postal address,
                    other information (“Personal Information”).
                </p>
                <p>
                    We collect this information for the purpose of providing the Service, identifying and
                    communicating with you, responding to your requests/inquiries, servicing your purchase
                    orders, and improving our services.
                </p>
                <h3 className="text-uppercase text-warning">LOG DATA</h3>
                <p>
                    We may also collect information that your browser sends whenever you visit our Service or
                    when you access the Service by or through a mobile device (“Log Data”).
                </p>
                <p>
                    This Log Data may include information such as your computer’s Internet Protocol (“IP”)
                    address, browser type, browser version, the pages of our Service that you visit, the time and
                    date of your visit, the time spent on those pages and other statistics.
                </p>
                <p>When you access the Service by or through a mobile device, this Log Data may include
                information such as the type of mobile device you use, your mobile device unique ID, the IP
                address of your mobile device, your mobile operating system, the type of mobile Internet
                browser you use and other statistics.</p>
                <p>In addition, we may use third party services such as Google Analytics that collect, monitor
                and analyze this type of information in order to increase our Service’s functionality. These
                third party service providers have their own privacy policies addressing how they use such
                information.</p>
                <p>Please see the section regarding Location Information below regarding the use of your
                location information and your options.</p>
                <h3 className="text-uppercase text-warning">LOCATION INFORMATION</h3>
                <p>
                    We may use and store information about your location depending on the permissions you
                    have set on your device. We use this information to provide features of our Service, to
                    improve and customize our Service. You can enable or disable location services when you
                    use our Service at anytime, through your mobile device settings.
                </p>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
    );
};

Conditions.propTypes = {};

export default Conditions;
