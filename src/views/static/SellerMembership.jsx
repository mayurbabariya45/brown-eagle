import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import BannerImage from "../../assets/img/banners/banner-help.jpg";

const SellerMembership = () => (
  <div>
    <Banner image={BannerImage} />
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>MEMBERSHIP</PageHeader>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="content-container">
            <div className="content">
              <p>1. For Buyers &amp; Sellers</p>
              <h4 className="text-uppercase text-warning">Buyer</h4>
              <p>
                No costs but 2 optional Services at a cost: Streaming Media: USD
                4/month or USD 25/year and for Brown Eagle AI Services: USD
                4/month or USD 25/year
              </p>
              <h4 className="text-uppercase text-warning">Seller</h4>
              <p>
                12.5 USD/month (USD 150/year) up to 10 MB storage, includes
                receiving up to 12 RFQ/year + 2 optional Services for a cost:
                Streaming Media: USD 4/month or USD 25/year and for Brown Eagle
                AI Services: USD 4/month or USD 25/year
              </p>
              <p>2. For Business Buyers &amp; Sellers</p>
              <h4 className="text-uppercase text-warning">Business Buyer</h4>
              <p>
                No costs but 2 optional Services at a cost: Streaming Media: USD
                4/month or USD 25/year and for Brown Eagle AI Services: USD
                4/month or USD 25/year
              </p>
              <h4 className="text-uppercase text-warning">Business Seller</h4>
              <p>
                <strong>Basic</strong>: 14 USD/month up to 30 MB Storage &amp;
                100 product postings (USD168/year), includes receiving up to 12
                RFQ per year + 2 optional Services for a cost: Streaming Media:
                USD 8/month or USD 25/year and for Brown Eagle AI Services: USD
                4/month or USD 25/year<br />
                <strong>Premium</strong>: USD 850/YEAR, includes receiving up to
                36 RFQ/year, Priority Ranking, Unlimited Product postings &amp;
                5GB Data bank, customized websites &amp; Verified Seller Status.
                Free (Streaming Media &amp; Brown Eagle AI Services) among other
                services
              </p>
              <p>
                <strong>Platinum</strong>: USD 2,750/YEAR, includes receiving
                unlimited RFQ’s + all what is offered in Premium up to 10GB
                storage + will receive for free the (Streaming Media &amp; Brown
                Eagle AI Services) and additional trading support services and
                special campaigns.
              </p>
              <p>
                Advertising on website for free for Premium &amp; Platinum
                members as per the limits offered in their package<br />
                Advertising for basic Membership sellers at $4.8 to $5.5 CPM<br />
                Charges for receiving RFQ for Basic Members over and above the
                limits in their package
              </p>
              <h4 className="text-uppercase text-warning">
                Fulfillment Services
              </h4>
              <p>&nbsp;</p>
              <h4 className="text-uppercase text-warning">
                Partners with us/work with us/affiliate
              </h4>
              <p>&nbsp;</p>
              <h4 className="text-uppercase text-warning">Logistic services</h4>
              <p>&nbsp;</p>
              <h4 className="text-uppercase text-warning">
                Third party services
              </h4>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

SellerMembership.propTypes = {};

export default SellerMembership;
