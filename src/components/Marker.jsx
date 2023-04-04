import React from "react";
import { Marker } from "react-map-gl";
import PinMarker from "./PinMarker";

const PlaceMarker = ({longitude, latitude}) => {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <PinMarker />
    </Marker>
  );
};

export default PlaceMarker;
