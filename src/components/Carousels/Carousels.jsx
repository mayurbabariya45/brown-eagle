import _ from "lodash";
import React from "react";
import { Carousel, Grid, Row, Image } from "react-bootstrap";
import ContentLoader from "../Loader/Loader";

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
            _.map(props.banners, banner => (
              <Carousel.Item key={banner.id}>
                <a href={banner.redirectUrl}>
                  <Image src={banner.url} />
                </a>
              </Carousel.Item>
            ))}
        </Carousel>
      </Row>
    </Grid>
  );
};
export default Carousels;
