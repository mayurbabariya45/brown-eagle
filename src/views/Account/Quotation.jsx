import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlockUi from "react-block-ui";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import product1 from "../../assets/img/products/product1.png";

const preloader = () => <ContentLoader height={300} inFight />;

class Quotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getBuyerQuotations, buyerId } = this.props;
    if (buyerId) {
      getBuyerQuotations(buyerId);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { getBuyerQuotations, buyerId } = nextProps;
    if (buyerId !== this.props.buyerId) {
      getBuyerQuotations(buyerId);
    }
  }
  render() {
    const { translate, quotation } = this.props;
    const { loading, buyerQuotation } = quotation;
    return (
      <div className="account-quotation">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>{translate("my_quotation")}</h5>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <BlockUi tag="div" blocking={loading}>
              <Row>
                <Col md={12} sm={12} xs={12}>
                  <div className="quotations">
                    {_.map(buyerQuotation, data => (
                      <div key={data.id} className="quotation-item">
                        <div className="quotation-item-details">
                          <div className="quotation-product-title">
                            <h3>{data.title}</h3>
                          </div>
                          <div className="image-container">
                            <div className="product-image-container">
                              <a
                                href="#products"
                                className="product photo product-item-photo"
                              >
                                <ImageLoader
                                  preloader={preloader}
                                  src={
                                    !_.isEmpty(data.rfqPictures)
                                      ? data.rfqPictures[0].url
                                      : ""
                                  }
                                />
                              </a>
                            </div>
                          </div>
                          <div className="quotation-item-detail">
                            <div className="desc">
                              <p>{data.description}</p>
                            </div>
                            <div className="quotation-quantity">
                              <p>
                                Quanity Required <b>{data.purchaseQuantity}</b>{" "}
                                pieces
                              </p>
                              {/* <p>Posted in maxico</p> */}
                            </div>
                            {/* <div className="quotation-posted">
                              <p>Date Posted: just now</p>
                            </div> */}
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
                    ))}
                  </div>
                </Col>
              </Row>
            </BlockUi>
          </Col>
        </Row>
      </div>
    );
  }
}

Quotation.propTypes = {
  translate: PropTypes.func.isRequired,
  buyerId: PropTypes.string.isRequired,
  quotation: PropTypes.arrayOf(PropTypes.any),
  getBuyerQuotations: PropTypes.func.isRequired
};

Quotation.defaultProps = {
  quotation: []
};
export default Quotation;
