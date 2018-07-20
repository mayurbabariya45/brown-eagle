import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Carousels from "../../components/Carousels/Carousels";
import StatsCard from "../../components/StatsCard/StatsCard";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import product1 from "../../assets/img/products/product1.png";

const staticProducts = [
  {
    id: "1",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "2",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "3",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "4",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "5",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "6",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1],
    productPrice: 10,
    totalRatingsCount: 1
  },
  {
    id: "7",
    name: "Safescan 2210 Banknote Counter",
    productPictures: [product1],
    productPrice: 10,
    totalRatingsCount: 1
  }
];

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
            <Col sm={12}>
              <CategorySlider
                translate={translate}
                title={translate("top_trending_products")}
                products={staticProducts}
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
                title={"FOOD & RETAIL PRODUCTS"}
                products={staticProducts}
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
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
