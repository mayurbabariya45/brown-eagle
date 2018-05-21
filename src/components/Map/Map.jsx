import _ from "lodash";
import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

const { google } = window;
const GoogleMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: (
      <div className="location-tracker" style={{ height: "250px" }} />
    ),
    mapElement: <div style={{ height: "100%" }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        bounds: null,
        center: this.props.center,
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onMarkerMounted: ref => {
          refs.marker = ref;
        },
        onDragEnd: () => {
          const lat = refs.marker.getPosition().lat();
          const lng = refs.marker.getPosition().lng();
          this.props.onDrag(lat, lng);
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },

        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            "0.position",
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          // refs.map.fitBounds(bounds);
          const lat = refs.map.getCenter().lat();
          const lng = refs.map.getCenter().lng();
          this.props.onDrag(lat, lng);
        }
      });
    }
  }),
  withGoogleMap
  // withHandlers(props => {
  //   const refs = {
  //     marker: undefined
  //   };
  //   return {
  //     onMarkerMounted: () => ref => {
  //       refs.marker = ref;
  //     },
  //     onDragEnd: () => () => {
  //       const lat = refs.marker.getPosition().lat();
  //       const lng = refs.marker.getPosition().lng();
  //       props.onDrag(lat, lng);
  //     }
  //   };
  // })
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onCenterChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={2}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search your address"
        style={{
          boxSizing: "border-box",
          border: "1px solid transparent",
          width: "240px",
          height: "32px",
          marginTop: "27px",
          padding: "0 12px",
          borderRadius: "3px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
          fontSize: "14px",
          outline: "none",
          textOverflow: "ellipses"
        }}
      />
    </SearchBox>
    {props.markers.length > 0 ? (
      props.markers.map((marker, index) => (
        <Marker
          ref={props.onMarkerMounted}
          draggable
          key={index}
          onDragEnd={props.onDragEnd}
          position={marker.position}
        />
      ))
    ) : (
      <Marker
        ref={props.onMarkerMounted}
        draggable
        onDragEnd={props.onDragEnd}
        position={props.center}
      />
    )}
  </GoogleMap>
));

export default GoogleMapComponent;
