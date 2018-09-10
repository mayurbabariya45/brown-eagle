import React from "react";
import PropTypes from "prop-types";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const MapWithMarker = withGoogleMap(props => (
  <GoogleMap defaultZoom={15} defaultCenter={props.location}>
    <Marker position={props.location} />
  </GoogleMap>
));
const MapMarker = props => {
  const { location } = props;
  const latLng = Object.assign(
    {},
    {
      lat: (location && parseFloat(location.lat)) || -34.397,
      lng: (location && parseFloat(location.lng)) || 150.644
    }
  );

  return (
    <div className="map-container">
      <MapWithMarker
        containerElement={<div style={{ height: "200px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        location={latLng}
      />
    </div>
  );
};

MapMarker.PropTypes = {
  show: PropTypes.bool.isRequired
};
export default MapMarker;
