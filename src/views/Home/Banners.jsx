import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Image } from "react-bootstrap";
import ContentLoader from "../../components/Loader/Loader";

function ValidURL(link) {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(link)) {
    return `http://${link}`;
  }
  return link;
}
const Banners = props => {
  const { isBannersLoading } = props;
  return (
    <Grid>
      <Row>
        <Col md={12}>
          <div className="home-banners">
            {isBannersLoading && (
              <Col md={12}>
                <div className="image-banner-container">
                  <ContentLoader height={150} inFight />
                </div>
              </Col>
            )}
            {!isBannersLoading &&
              _.map(props.banners, banner => {
                const bannerLink = ValidURL(banner.redirectUrl);
                return (
                  <Col md={6} key={banner.id}>
                    <div className="image-banner-container">
                      <a href={bannerLink}>
                        <Image src={banner.url} />
                      </a>
                    </div>
                  </Col>
                );
              })}
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

Banners.propTypes = {};

export default Banners;
