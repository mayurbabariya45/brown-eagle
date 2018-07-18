import _ from "lodash";
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Carousels from "../../components/Carousels/Carousels";
import StatsCard from "../../components/StatsCard/StatsCard";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { Card } from "../../components/Card/Card";
import QuotationContainer from "../../containers/QuotationContainer/FormQuotationContainer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addToCart = this.addToCart.bind(this);
  }
  componentWillMount() {
    const { getCategories } = this.props;
    getCategories();
  }
  addToCart(item) {
    const { addToCart, showNotification } = this.props;
    const objectProduct = Object.assign({}, item, { quantity: 1 });
    addToCart(objectProduct).then(response => {
      if (response.type === "ADD_TO_CART_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`${item.name} has been added successfully in cart.`}</div>,
          false
        );
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>Somethig went wrong please try agian</div>,
          true
        );
      }
    });
  }
  render() {
    const { translate, products, locale } = this.props;
    const firstCategory = !_.isEmpty(products) ? products[0] : [];
    const secondCategory = !_.isEmpty(products) ? products[1] : [];
    const thirdCategory = !_.isEmpty(products) ? products[2] : [];
    const firstCategoryName = !_.isEmpty(firstCategory)
      ? firstCategory.nameTranslations[locale]
      : "Loading...";
    const secondCategoryName = !_.isEmpty(secondCategory)
      ? secondCategory.nameTranslations[locale]
      : "Loading...";
    const thirdCategoryName = !_.isEmpty(thirdCategory)
      ? thirdCategory.nameTranslations[locale]
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
    return (
      <div className="home">
        <Carousels />
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
            <Col sm={8}>
              <ProductSlider
                translate={translate}
                title={firstCategoryName}
                products={firstCategoryProducts}
                addToCart={this.addToCart}
                banner
                SliderSettings={{
                  dots: false,
                  lazyLoad: true,
                  infinite: true,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  className: "products list items product-items"
                }}
              />
            </Col>
            <Col sm={4}>
              <ProductSlider
                translate={translate}
                title={translate("top_trending_products")}
                products={thirdCategoryProducts}
                classNames="top-list-images"
                bAction
                addToCart={this.addToCart}
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className: "products items product-items"
                }}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col sm={8}>
              <ProductSlider
                translate={translate}
                title={thirdCategoryName}
                products={thirdCategoryProducts}
                banner={false}
                multiple
                productChunk={6}
                addToCart={this.addToCart}
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className: "products list items products-lists product-items"
                }}
              />
            </Col>
            <Col sm={4}>
              <div className="quotation-form">
                <Card
                  header={
                    <div className="header">
                      <h4 className="title">
                        {translate("request_for_quotation")}
                      </h4>
                    </div>
                  }
                  bgColor="dark-blue"
                  radius
                  content={<QuotationContainer {...this.props} />}
                />
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col sm={12}>
              <ProductSlider
                translate={translate}
                title={secondCategoryName}
                products={secondCategoryProducts}
                banner={false}
                addToCart={this.addToCart}
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  className: "products list items product-items"
                }}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col sm={4}>
              <ProductSlider
                translate={translate}
                title={translate("latest_products")}
                products={thirdCategoryProducts}
                buttons={false}
                arrows={false}
                multiple
                productChunk={3}
                classNames="list-images"
                banner={false}
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className:
                    "products items produsts-list-vertical product-items"
                }}
              />
            </Col>
            <Col sm={4}>
              <ProductSlider
                translate={translate}
                title={translate("recommended_products")}
                products={thirdCategoryProducts}
                buttons={false}
                arrows={false}
                multiple
                productChunk={3}
                banner={false}
                classNames="list-images"
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className:
                    "products items produsts-list-vertical product-items"
                }}
              />
            </Col>
            <Col sm={4}>
              <ProductSlider
                translate={translate}
                title={translate("top_rated_products")}
                products={thirdCategoryProducts}
                buttons={false}
                arrows={false}
                multiple
                productChunk={3}
                banner={false}
                classNames="list-images"
                SliderSettings={{
                  dots: false,
                  infinite: false,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className:
                    "products produsts-list-vertical items product-items"
                }}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Home;
