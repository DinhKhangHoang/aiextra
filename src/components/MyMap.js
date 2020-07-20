import React, { useState } from "react";
import { displayPolyline, displayMarker, displaySolution } from "./Display";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Button } from "reactstrap";

const invisible = [
  {
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const visible = [
  {
    stylers: [
      {
        weight: 1.5,
      },
    ],
  },
];

const MyMap = (props) => {
  const [visibility, setVisibility] = useState(true);
  let polylines = displayPolyline(props.path, props.onClickPolyline);
  let solution = displaySolution(props.path, props.onClickPolyline);
  let markers = displayMarker(
    props.onClickMarker,
    props.colorStep,
    props.google
  );
  function changeTheme() {
    setVisibility((val) => !val);
  }
  return (
    <>
      <Map
        google={props.google}
        zoom={14}
        styles={visibility ? visible : invisible}
        initialCenter={{
          lat: 10.7730737,
          lng: 106.6713485,
        }}
      >
        {markers}
        {polylines}
        {solution}
      </Map>
      <Button
        color="danger"
        onClick={changeTheme}
        style={{ position: "absolute", top: "2%", right: "1%" }}
      >
        Toggle
      </Button>
    </>
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
