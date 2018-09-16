import _ from "lodash";
import className from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BlockUi from "react-block-ui";
import { Row, Col, Grid } from "react-bootstrap";
import Filters from "./FilterSeller";
import Pagination from "../../components/Pagination/Pagination";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import noImage from "../../assets/img/no-product.png";

const Loader = () => <ContentLoader height={300} inFight />;

const SellerInfo = props => (
  <div className="item product product-item">
    <div className="product-item-info">
      <div className="product-header">
        <span className="yrs">
          <i className="icon-static icon-yrs" />0 Yrs
        </span>
        <h3>
          {props.isProfileVerified === "verified" && (
            <i className="icon-static icon-checked " />
          )}
          <Link to={`/company_profile/${props.id}`}>
            {_.upperCase(props.companyName)}
          </Link>
        </h3>
        <div className="product-row">
          <div className="product-rating">
            <div className="rating-result" title="0%">
              <span
                style={{
                  width: "0%"
                }}
              >
                <span>80%</span>
              </span>
            </div>
          </div>
          <div className="product-transaction">
            <p>
              {props.translate("product_transaction_level")}{" "}
              {/* <i className="icon-static icon-diamond" />
              <i className="icon-static icon-diamond" />
              <i className="icon-static icon-diamond" /> */}
            </p>
          </div>
        </div>
      </div>
      <div className="product-footer">
        <div className="product-row">
          <Link to={`/company_profile/${props.id}`} className="product-link">
            <div className="image-container">
              <ImageLoader
                preloader={Loader}
                src={props.picture}
                className={className("img-responsive")}
              />
            </div>
          </Link>
          {/* {_.map(props.mainProducts, (product, index) => {
            let productImages;
            let productUrl = "/products";
            if (!_.isEmpty(product)) {
              const { productPictures } = product;
              if (!_.isEmpty(productPictures)) {
                productImages = productPictures[0].url;
              } else {
                productImages = noImage;
              }
              productUrl = `/product/${_.kebabCase(product.name)}/${
                product._id
              }`;
            }
            return (
              <Link to={productUrl} className="product-link" key={index}>
                <div className="image-container">
                  <ImageLoader
                    preloader={Loader}
                    src={productImages}
                    className={className("img-responsive")}
                  />
                </div>
              </Link>
            );
          })} */}
        </div>
      </div>
    </div>
  </div>
);

class Sellers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      currentPage: 1
    };
    this.handleLocationFilter = this.handleLocationFilter.bind(this);
  }
  componentWillMount() {
    const { getSellers, match } = this.props;
    const country = match.params.country;
    if (country) {
      getSellers(country);
      this.setState({
        location: [...this.state.location, country]
      });
    }
    window.scrollTo(0, 0);
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { getSellers } = this.props;
    this.setState({ currentPage });

    getSellers(this.state.location, currentPage);
  };
  handleLocationFilter(isChecked, location) {
    const { getSellers } = this.props;
    if (!isChecked) {
      this.state.location.push(location);
    } else if (this.state.location.includes(location)) {
      this.state.location.splice(
        this.state.location.indexOf(this.state.location),
        1
      );
    }
    getSellers(this.state.location.join(","), this.state.currentPage);
  }
  render() {
    const { translate, sellers, loading, locale } = this.props;
    const { currentPage } = this.state;
    const { count } = sellers;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <section className="wrap-products">
        <Grid>
          <Row>
            <Col sm={3}>
              <div className="product-filter location-filter">
                <Filters
                  locations={[
                    {
                      id: 1,
                      name: "India"
                    },
                    {
                      id: 2,
                      name: "germany"
                    },
                    {
                      id: 3,
                      name: "france"
                    }
                  ]}
                  handleLocationFilter={this.handleLocationFilter}
                  locale={locale}
                  loading={loading}
                />
              </div>
            </Col>
            <Col sm={9}>
              <Col sm={12}>
                <Row>
                  <div className="section-header categories-title">
                    <div className="title">
                      <h5>Search Sellers</h5>
                      <small>
                        (Showing {start} – {end} Seller of {count || 0} Sellers)
                      </small>
                    </div>
                  </div>
                </Row>
              </Col>
              <Col sm={12}>
                <Row>
                  <div className="supplier-products">
                    <BlockUi tag="div" blocking={loading}>
                      <div>
                        {_.map(_.chunk(sellers.sellers, 3), (parent, index) => (
                          <Row key={index}>
                            {_.map(parent, seller => (
                              <Col sm={4} key={seller.id}>
                                <SellerInfo {...seller} translate={translate} />
                              </Col>
                            ))}
                          </Row>
                        ))}
                      </div>
                    </BlockUi>
                  </div>
                </Row>
              </Col>
              <Pagination
                totalRecords={count || 0}
                pageLimit={20}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

Sellers.propTypes = {
  translate: PropTypes.func.isRequired
};

export default Sellers;
