import React from "react";
import { displayPolyline, displayMarker, displaySolution } from "./Display";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const MyMap = (props) => {
  let polylines = displayPolyline(props.path, props.onClickPolyline);
  let solution = displaySolution(props.path, props.onClickPolyline);
  let markers = displayMarker(
    props.onClickMarker,
    props.colorStep,
    props.google
  );
  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: 10.7730737,
        lng: 106.6713485,
      }}
    >
      {markers}
      {polylines}
      {solution}
    </Map>
  );
};
function areEqual(prevProps, nextProps) {
  return (
    prevProps.path === nextProps.path &&
    prevProps.colorStep === nextProps.colorStep
  );
}

const MyComponent = React.memo(MyMap, areEqual);
export default GoogleApiWrapper((props) => ({
  apiKey: props.apiKey,
}))(MyComponent);
