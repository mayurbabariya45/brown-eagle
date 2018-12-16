import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, PageHeader } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import BannerImage from "../../assets/img/banners/banner-help.jpg";

const TrainingCenter = () => (
  <div>
    <Banner image={BannerImage} />
    <Grid>
      <Row>
        <Col md={12}>
          <div className="static-page">
            <PageHeader>Training Center</PageHeader>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

TrainingCenter.propTypes = {};

export default TrainingCenter;
