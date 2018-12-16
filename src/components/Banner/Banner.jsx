import React from "react";
import PropTypes from "prop-types";
import { Row, Grid } from "react-bootstrap";

const Banner = ({ image }) => (
  <Grid fluid>
    <Row>
      <div className="banner-container">
        <div className="banner-inner">
          <img src={image} alt="about-us" />
        </div>
      </div>
    </Row>
  </Grid>
);

Banner.propTypes = {
  image: PropTypes.string.isRequired
};

export default Banner;
