import React from "react";
import mapboxgl from "mapbox-gl";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PlaceMarker from "./Marker";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibmljb2xhcy1haW9saSIsImEiOiJjbGJ4cHNvZmoxY3ZxM3Z0MHFudHFub29nIn0.78TlSfiHCd9KxMECYt4a0w";

const PlaceMap = ({ markers }) => {
  return (
    <Map
      initialViewState={{
        longitude: -1.423,
        latitude: 46.67,
        zoom: 14,
        minZoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {markers && markers.map((marker, index) => (
        <PlaceMarker key={index} longitude={marker.longitude} latitude={marker.latitude} />
      ))}
    </Map>
  );
};

export default PlaceMap;
