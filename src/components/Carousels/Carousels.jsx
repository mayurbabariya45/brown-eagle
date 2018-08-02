import _ from "lodash";
import React from "react";
import { Carousel, Grid, Row, Image } from "react-bootstrap";
import ContentLoader from "../Loader/Loader";

function ValidURL(link) {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(link)) {
    return `http://${link}`;
  }
  return link;
}

const Carousels = props => {
  const { isBannersLoading, banners } = props;
  if (!isBannersLoading && _.isEmpty(banners)) return null;
  return (
    <Grid fluid>
      <Row>
        <Carousel controls={false}>
          {isBannersLoading && (
            <Carousel.Item>
              <ContentLoader height={300} inFight />
            </Carousel.Item>
          )}
          {!isBannersLoading &&
            _.map(props.banners, banner => {
              const bannerLink = ValidURL(banner.redirectUrl);
              return (
                <Carousel.Item key={banner.id}>
                  <a href={`${bannerLink}`}>
                    <Image src={banner.url} />
                  </a>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </Row>
    </Grid>
  );
};
export default Carousels;
