import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Carousels from "../../components/Carousels/Carousels";
import StatsCard from "../../components/StatsCard/StatsCard";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { Card } from "../../components/Card/Card";
import QuotationContainer from "../../containers/QuotationContainer/QuotationContainer";
import product1 from "../../assets/img/products/product1.png";
import product2 from "../../assets/img/products/product2.png";
import product3 from "../../assets/img/products/product3.png";
import product4 from "../../assets/img/products/product4.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { translate } = this.props;
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
                title={translate("light_equipment_tools")}
                products={[
                  product1,
                  product2,
                  product3,
                  product1,
                  product2,
                  product3
                ]}
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
                products={[product4, product2]}
                bAction
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
                title={translate("food_retail_products")}
                products={[
                  product1,
                  product2,
                  product3,
                  product1,
                  product2,
                  product3
                ]}
                banner={false}
                multiple
                productChunk={6}
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
                title={translate("food_retail_products")}
                products={[
                  product1,
                  product2,
                  product3,
                  product1,
                  product2,
                  product3
                ]}
                banner={false}
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
                products={[
                  product1,
                  product2,
                  product3,
                  product1,
                  product2,
                  product3
                ]}
                buttons={false}
                arrows={false}
                multiple
                productChunk={3}
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
                products={[product1, product2, product3]}
                buttons={false}
                arrows={false}
                multiple
                productChunk={3}
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
                title={translate("top_rated_products")}
                products={[product1, product2, product3]}
                buttons={false}
                arrows={false}
                multiple
                productChunk={3}
                banner={false}
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
