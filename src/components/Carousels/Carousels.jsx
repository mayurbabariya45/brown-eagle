import React, { Component } from "react";
import { Carousel, Grid, Row } from "react-bootstrap";
// import Img1 from "../../assets/img/carousel/anniversary_banner_d.jpg";
import Banner1 from "../../assets/img/carousel/banner1.jpg";
import Banner2 from "../../assets/img/carousel/banner2.jpg";
import Banner3 from "../../assets/img/carousel/banner3.jpg";
import Banner4 from "../../assets/img/carousel/banner4.jpg";

const Carousels = () => (
  <Grid fluid>
    <Row>
      <Carousel controls={false}>
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
export default Carousels;
