import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Image } from "react-bootstrap";
import ContentLoader from "../../components/Loader/Loader";

const Banners = props => {
  const { banners, isBannersLoading } = props;
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
              _.map(props.banners, banner => (
                <Col md={6} key={banner.id}>
                  <div className="image-banner-container">
                    <a href={banner.redirectUrl}>
                      <Image src={banner.url} />
                    </a>
                  </div>
                </Col>
              ))}
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

Banners.propTypes = {};

export default Banners;
