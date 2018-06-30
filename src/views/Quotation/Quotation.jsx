import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  DropdownButton,
  MenuItem,
  FormControl
} from "react-bootstrap";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import Button from "../../elements/CustomButton/CustomButton";
import product1 from "../../assets/img/products/product1.png";

const preloader = () => <ContentLoader height={300} inFight />;

class Quotation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { translate } = this.props;
    const categoriesTitle = (
      <div>
        <i className="fa fa-bars" />
        Categories
      </div>
    );
    return (
      <section className="quotation-section">
        <Grid>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="quotaion-search">
                <Col md={2}>
                  <DropdownButton
                    id="quotation-categories"
                    title={categoriesTitle}
                    noCaret
                  >
                    <MenuItem key="1" eventKey="categories">
                      {translate("categories")}
                    </MenuItem>
                    <MenuItem key="2" eventKey="books">
                      {translate("books")}
                    </MenuItem>
                    <MenuItem key="3" eventKey="baby">
                      {translate("baby")}
                    </MenuItem>
                    <MenuItem key="4" eventKey="software">
                      {translate("software")}
                    </MenuItem>
                    <MenuItem key="5" eventKey="sports">
                      {translate("sports")}
                    </MenuItem>
                  </DropdownButton>
                </Col>
                <Col md={8}>
                  <FormControl
                    bsClass="form-control form-control-simple"
                    placeholder="Type a keyword to search RFQs"
                  />
                </Col>
                <Col md={2}>
                  <Button fill radius bsStyle="warning">
                    <span className="pe-7s-search" /> Search
                  </Button>
                </Col>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="title">
                <p>Latest RFQs</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="quotations">
                <div className="quotation-item">
                  <div className="quotation-item-details">
                    <div className="quotation-product-title">
                      <h3>Safescan 2210 Banknote Counter</h3>
                    </div>
                    <div className="image-container">
                      <div className="product-image-container">
                        <a
                          href="#products"
                          className="product photo product-item-photo"
                        >
                          <ImageLoader preloader={preloader} src={product1} />
                        </a>
                      </div>
                    </div>
                    <div className="quotation-item-detail">
                      <div className="desc">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </p>
                      </div>
                      <div className="quotation-quantity">
                        <p>
                          Quanity Required <b>200</b> pieces
                        </p>
                        <p>Posted in maxico</p>
                      </div>
                      <div className="quotation-posted">
                        <p>Date Posted: just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="quotation-container-button">
                    <div className="quotation-button">
                      <Link
                        to="/"
                        className="btn-fill btn-radius btn btn-warning"
                      >
                        Quote Now
                      </Link>
                      <div className="quote-count">
                        <h5>Quote left 10</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="quotation-item">
                  <div className="quotation-item-details">
                    <div className="quotation-product-title">
                      <h3>Safescan 2210 Banknote Counter</h3>
                    </div>
                    <div className="image-container">
                      <div className="product-image-container">
                        <a
                          href="#products"
                          className="product photo product-item-photo"
                        >
                          <ImageLoader preloader={preloader} src={product1} />
                        </a>
                      </div>
                    </div>
                    <div className="quotation-item-detail">
                      <div className="desc">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </p>
                      </div>
                      <div className="quotation-quantity">
                        <p>
                          Quanity Required <b>200</b> pieces
                        </p>
                        <p>Posted in maxico</p>
                      </div>
                      <div className="quotation-posted">
                        <p>Date Posted: just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="quotation-container-button">
                    <div className="quotation-button">
                      <Link
                        to="/"
                        className="btn-fill btn-radius btn btn-warning"
                      >
                        Quote Now
                      </Link>
                      <div className="quote-count">
                        <h5>Quote left 10</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

Quotation.propTypes = {
  translate: PropTypes.func.isRequired
};

export default Quotation;
