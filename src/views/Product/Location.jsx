import _ from "lodash";
import React from "react";
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
      lat: location && parseFloat(location.lat),
      lng: location && parseFloat(location.lng)
    }
  );
  if (_.isEmpty(location)) {
    return null;
  }
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

MapMarker.propTypes = {};

export default MapMarker;
