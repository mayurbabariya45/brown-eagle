import React from "react";

const SellerVideo = ({ url }) => {
  if (url) {
    return (
      <div className="seller-video-container">
        <div className="video-container">
          <video controls>
            <source src={url} />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    );
  }
  return null;
};

export default SellerVideo;
