import React from "react";
import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";

const Loader = props => {
  const { inFight, children, height } = props;
  if (inFight) {
    return (
      <ContentLoader
        height={height}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      />
    );
  }
  return children;
};

Loader.propTypes = {};

export default Loader;
