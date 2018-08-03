import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousels from "../../components/Carousels/Carousels";
import StatsCard from "../../components/StatsCard/StatsCard";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import SuppliersSlider from "../../components/SuppliersSlider/SuppliersSlider";
import RequestForQuotation from "./RequestForQuotation";
import Banners from "./Banners";
import defaultBottomBanner from "../../assets/img/banners/suppliers_banner.png";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";
import Uk from "../../assets/img/flages/uk.png";
import France from "../../assets/img/flages/fr.png";
import Italian from "../../assets/img/flages/it.png";
import Germany from "../../assets/img/flages/de.png";
import Switzerland from "../../assets/img/flages/switzerland.jpg";
import Netherlands from "../../assets/img/flages/netherlands.jpg";
import Greece from "../../assets/img/flages/greece.jpg";

const staticSupplier = [
  {
    id: "1",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1, product2, product3],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "2",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1, product2, product3],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "3",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1, product2, product3],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "4",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1, product2, product3],
    productPrice: 10,
    totalRatingsCount: 1
  }
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const {
      getCategories,
      getTopBanners,
      getCenterBanners,
      getBottomBanners,
      getTopSuppliers
    } = this.props;
    getTopBanners();
    getCenterBanners();
    getBottomBanners();
    getCategories();
    getTopSuppliers();
  }
  render() {
    const {
      translate,
      products,
      locale,
      loadingProduct,
      topBanners,
      centerBanners,
      bottomBanners,
      isTopBannersLoading,
      isCenterBannersLoading,
      isTopSupplierLoading,
      auth,
      topSupplier
    } = this.props;
    const { user } = auth;
    const backgroundBanner = !_.isEmpty(bottomBanners)
      ? bottomBanners.url
      : defaultBottomBanner;
    const firstCategory = !_.isEmpty(products) ? products[0] : [];
    const secondCategory = !_.isEmpty(products) ? products[1] : [];
    const thirdCategory = !_.isEmpty(products) ? products[2] : [];
    const fourthCategory = !_.isEmpty(products) ? products[3] : [];
    const firstCategoryName = !_.isEmpty(firstCategory)
      ? firstCategory.nameTranslations[locale]
      : "Loading...";
    const secondCategoryName = !_.isEmpty(secondCategory)
      ? secondCategory.nameTranslations[locale]
      : "Loading...";
    const thirdCategoryName = !_.isEmpty(thirdCategory)
      ? thirdCategory.nameTranslations[locale]
      : "Loading...";
    const fourthCategoryName = !_.isEmpty(fourthCategory)
      ? fourthCategory.nameTranslations[locale]
      : "Loading...";
    const firstCategoryProducts = !_.isEmpty(firstCategory)
      ? firstCategory.products
      : [];
    const secondCategoryProducts = !_.isEmpty(secondCategory)
      ? secondCategory.products
      : [];
    const thirdCategoryProducts = !_.isEmpty(thirdCategory)
      ? thirdCategory.products
      : [];
    const fourthCategoryProducts = !_.isEmpty(fourthCategory)
      ? fourthCategory.products
      : [];
    return (
      <div className="home">
        <Carousels
          banners={topBanners}
          isBannersLoading={isTopBannersLoading}
        />
        <section className="services">
          <Grid>
            <div className="service-block">
              <Col lg={3} sm={6}>
                <StatsCard
                  fxs={3}
                  lxs={9}
                  broderLeft
                  bigIcon={<i className="pe-7s-note2" />}
                  statsText={translate("get_quotes")}
                  statsValue={translate("multiple_request")}
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  fxs={3}
                  lxs={9}
                  broderLeft
                  bigIcon={<i className="pe-7s-server" />}
                  statsText={translate("find")}
                  statsValue={translate("right_suppliers")}
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  fxs={3}
                  lxs={9}
                  broderLeft
                  bigIcon={<i className="pe-7s-refresh-3" />}
                  statsText={translate("money_guarantee")}
                  statsValue={translate("money_back")}
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  fxs={3}
                  lxs={9}
                  bigIcon={<i className="pe-7s-server" />}
                  statsText={translate("online_support")}
                  statsValue={translate("technical_support")}
                />
              </Col>
            </div>
          </Grid>
        </section>
        <Grid>
          <Row>
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title={translate("top_trending_products")}
                loading={loadingProduct}
                products={[]}
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
        <Grid>
          <Row>
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title={firstCategoryName}
                products={firstCategoryProducts}
                loading={loadingProduct}
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
        <Banners
          banners={centerBanners}
          isBannersLoading={isCenterBannersLoading}
        />
        <Grid>
          <Row>
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title={secondCategoryName}
                products={secondCategoryProducts}
                loading={loadingProduct}
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
        <Grid>
          <Row>
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title={thirdCategoryName}
                products={thirdCategoryProducts}
                loading={loadingProduct}
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
        <Grid>
          <Row>
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title={fourthCategoryName}
                products={fourthCategoryProducts}
                loading={loadingProduct}
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
        <RequestForQuotation
          translate={translate}
          isLogging={!_.isEmpty(user) || false}
        />
        <Grid>
          <Row>
            <Col sm={12}>
              <SuppliersSlider
                translate={translate}
                title={translate("top_selected_suppliers")}
                suppliers={topSupplier}
                loading={isTopSupplierLoading}
                SliderSettings={{
                  dots: false,
                  lazyLoad: true,
                  infinite: false,
                  arrows: true,
                  speed: 500,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  draggable: false,
                  focusOnSelect: false,
                  className: "supplier-products"
                }}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title={translate("my_recent_view")}
                products={[]}
                loading={loadingProduct}
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
        <Grid>
          <div className="supplier_by_regions">
            <Row>
              <Col md={12}>
                <div className="section-header">
                  <div className="title">
                    <h5 className="text-uppercase">
                      {translate("supplier_by_regions")}
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="regions">
                  <ul>
                    <li>
                      <Link to="/">
                        <img src={Germany} alt="Germany" />
                        Germany
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img src={France} alt="France" />
                        France
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img src={Italian} alt="Italian" />
                        Italian
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img src={Uk} alt="Uk" />
                        UK
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img src={Switzerland} alt="Uk" />
                        Switzerland
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img src={Netherlands} alt="Uk" />
                        Netherlands
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img src={Greece} alt="Uk" />
                        Greece
                      </Link>
                    </li>
                    <li>
                      <Link to="/">more Region</Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div
                  className="supplier_banner"
                  style={{ backgroundImage: `url(${backgroundBanner})` }}
                >
                  <div className="supplier_text">
                    <h3>{translate("are_you_supplier")}</h3>
                    <p>{translate("supplier_text")}</p>
                  </div>
                  <div className="supplier_button">
                    <Link
                      to="/login"
                      className="btn-fill btn-border btn-radius btn btn-default"
                    >
                      {translate("join_now")}
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  getTopBanners: PropTypes.func.isRequired,
  getCenterBanners: PropTypes.func.isRequired,
  getBottomBanners: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getTopSuppliers: PropTypes.func.isRequired
};

export default Home;
