import React, { Component } from "react";
import { Carousel, Grid, Row } from "react-bootstrap";
// import Img1 from "../../assets/img/carousel/anniversary_banner_d.jpg";
import Banner1 from "../../assets/img/carousel/banner1.jpg";
import Banner2 from "../../assets/img/carousel/banner2.jpg";
import Banner3 from "../../assets/img/carousel/banner3.jpg";
import Banner4 from "../../assets/img/carousel/banner4.jpg";

class Carousels extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: 0,
      direction: null
    };
  }
  handleSelect(selectedIndex, e) {
    this.setState({ index: selectedIndex, direction: e.direction });
  }
  render() {
    const { index, direction } = this.state;
    return (
      <Grid fluid>
        <Row>
          <Carousel
            interval={2000}
            indicators
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
            controls={false}
          >
            <Carousel.Item>
              <img alt="900x500" src={Banner1} />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="900x500" src={Banner2} />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="900x500" src={Banner3} />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="900x500" src={Banner4} />
            </Carousel.Item>
          </Carousel>
        </Row>
      </Grid>
    );
  }
}
export default Carousels;
