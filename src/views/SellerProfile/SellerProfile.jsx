import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Grid, Table } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategorySlider from "../../components/CategorySlider/CategorySlider";

const ImagesSlider = ({ video, image }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <Slider {...settings}>
        {!_.isEmpty(video) && (
          <div className="company-profile-video">
            <div className="video-container">
              <video controls>
                <source src={video} />
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        )}
        {!_.isEmpty(image) && (
          <div className="company-profile-video">
            <div className="video-container">
              <img src={image} alt="profile images" />
            </div>
          </div>
        )}
      </Slider>
    </div>
  );
};

class SellerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { getCompanyProfile, getProducts, match } = this.props;
    const profileId = match.params.id;
    if (profileId) {
      getCompanyProfile(profileId);
      getProducts(profileId);
      window.scrollTo(0, 0);
    }
  }
  render() {
    const {
      profile,
      locale,
      products,
      translate,
      isProductLoading
    } = this.props;
    const {
      profileVideo,
      picture,
      companyName,
      businessType,
      aboutUsTranslations,
      registeredAddress,
      established,
      employeeCount,
      certificates
    } = profile;

    const aboutUs = !_.isEmpty(aboutUsTranslations)
      ? aboutUsTranslations[locale]
      : "";
    return (
      <section className="company-profile">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="section-header">
                <div className="title">
                  <h5>{companyName}</h5>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className="supplier-slider">
                <ImagesSlider video={profileVideo} image={picture} />
              </div>
            </Col>
            <Col md={8}>
              <div className="information-content">
                <table className="content-table">
                  <tbody>
                    <tr>
                      <th className="col-title">Business Type:</th>
                      <td className="col-value">{businessType}</td>
                      {/* <td className="col-verify">
                        <span
                          className="company-verified-icon icon-onsite"
                          title="Indicates information has been verified onsite by a certification specialist"
                        >
                          <i className="ui2-icon ui2-icon-checkmark verified-icon" />Verified
                        </span>
                      </td> */}
                    </tr>
                    <tr>
                      <th className="col-title">Location:</th>
                      <td className="col-value">
                        {registeredAddress && registeredAddress.country}
                      </td>
                      <td className="col-verify">
                        <span
                          className="company-verified-icon icon-onsite"
                          title="Indicates information has been verified onsite by a certification specialist"
                        >
                          {/* <i className="ui2-icon ui2-icon-checkmark verified-icon" />Verified */}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="col-title">Total Employees:</th>
                      <td className="col-value">{employeeCount}</td>
                      <td className="col-verify" />
                    </tr>
                    {/* <tr>
                      <th className="col-title">Total Annual Revenue:</th>
                      <td className="col-value">
                        US$5 Million - US$10 Million
                      </td>
                      <td />
                    </tr> */}
                    <tr>
                      <th className="col-title">Year Established:</th>
                      <td className="col-value">{established}</td>
                      <td className="col-verify">
                        <span
                          className="company-verified-icon icon-onsite"
                          title="Indicates information has been verified onsite by a certification specialist"
                        >
                          {/* <i className="ui2-icon ui2-icon-checkmark verified-icon" />Verified */}
                        </span>
                      </td>
                    </tr>
                    {/* <tr>
                      <th className="col-title">Top 3 Markets:</th>
                      <td className="col-value">
                        <a
                          className="market-item"
                          href="javascript:;"
                          data-domdot="id:25855"
                          data-spm-anchor-id="a2700.icbuShop.coge4f9797.11"
                        >
                          <span className="">Domestic Market</span>
                          <span>7.69%</span>
                        </a>
                        <a
                          className="market-item"
                          href="javascript:;"
                          data-domdot="id:25855"
                          data-spm-anchor-id="a2700.icbuShop.coge4f9797.12"
                        >
                          <span className="">South Asia</span>
                          <span>7.69%</span>
                        </a>
                        <a
                          className="market-item"
                          href="javascript:;"
                          data-domdot="id:25855"
                          data-spm-anchor-id="a2700.icbuShop.coge4f9797.13"
                        >
                          <span className="">Southern Europe</span>
                          <span>7.69%</span>
                        </a>
                      </td>
                      <td className="col-verify" />
                    </tr> */}
                    {/* <tr>
                      <th className="col-title">Product Certifications:</th>
                      <td>
                        <a
                          href="https://sinotq.en.alibaba.com/company_profile/r_d_capacity.html#productioncerti"
                          target="blank"
                          data-spm-anchor-id="a2700.icbuShop.coge4f9797.14"
                        >
                          <span>CE</span>
                        </a>
                        <a
                          href="https://sinotq.en.alibaba.com/company_profile/r_d_capacity.html#productioncerti"
                          target="blank"
                          data-spm-anchor-id="a2700.icbuShop.coge4f9797.14"
                        >
                          <span>CE</span>
                        </a>
                      </td>
                    </tr> */}
                    <tr>
                      <td colSpan="2">
                        <div className="company-description company-description-full">
                          {aboutUs}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="supplier-production-certification">
                {/* <div className="production-certification-title">
                  Production Certification
                </div> */}
                {!_.isEmpty(certificates) && (
                  <div className="container-table-production-certification">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Certification Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {_.map(certificates, certificate => {
                          <tr key={certificate.id}>
                            <td>
                              <a href={certificate.url} target="blank">
                                <span>
                                  {certificate.titleTranslations[locale]}
                                </span>
                              </a>
                            </td>
                          </tr>;
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title="Seller Products"
                products={products}
                loading={isProductLoading}
                SliderSettings={{
                  dots: false,
                  lazyLoad: true,
                  infinite: false,
                  arrows: true,
                  speed: 500,
                  slidesToShow: 6,
                  slidesToScroll: 1,
                  draggable: false,
                  focusOnSelect: false,
                  className: "category-products"
                }}
              />
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

SellerProfile.propTypes = {
  getCompanyProfile: PropTypes.func.isRequired
};

export default SellerProfile;
