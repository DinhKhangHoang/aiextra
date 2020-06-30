import React from "react";
import { location } from "../Key/Location";
import { adjacent2List } from "./supportFunc";
import { Marker, Polyline } from "google-maps-react";

export const displayMarker = (onClick, colorStep, google) => {
  if (colorStep === null)
    return Object.keys(location.points).map((key, index) => {
      return (
        <Marker
          key={key}
          id={key}
          position={{
            lat: location.points[key][0],
            lng: location.points[key][1],
          }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/yellow.png",
            scaledSize: new google.maps.Size(50, 50),
          }}
          label={key.toString()}
          onClick={() => onClick(key)}
        />
      );
    });
  return Object.keys(location.points).map((key, index) => {
    if (colorStep[key] === "white") {
      return (
        <Marker
          key={key}
          id={key}
          position={{
            lat: location.points[key][0],
            lng: location.points[key][1],
          }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/yellow.png",
            scaledSize: new google.maps.Size(50, 50),
          }}
          label={key.toString()}
          onClick={() => onClick(key)}
        />
      );
    } else if (colorStep[key] === "gray") {
      return (
        <Marker
          key={key}
          id={key}
          position={{
            lat: location.points[key][0],
            lng: location.points[key][1],
          }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/purple.png",
            scaledSize: new google.maps.Size(50, 50),
          }}
          label={key.toString()}
          onClick={() => onClick(key)}
        />
      );
    } else {
      return (
        <Marker
          key={key}
          id={key}
          position={{
            lat: location.points[key][0],
            lng: location.points[key][1],
          }}
          icon={{
            url: `http://maps.google.com/mapfiles/ms/icons/${colorStep[key]}.png`,
            scaledSize: new google.maps.Size(50, 50),
          }}
          label={key.toString()}
          onClick={() => onClick(key)}
        />
      );
    }
  });
};
// export const DisplayMarker = (props) => {
//   if (props.colorStep === null)
//     return (
//       <React.Fragment>
//         {Object.keys(location.points).map((key, index) => {
//           return (
//             <Marker
//               key={key}
//               id={key}
//               position={{
//                 lat: location.points[key][0],
//                 lng: location.points[key][1],
//               }}
//               icon={{
//                 url: "http://maps.google.com/mapfiles/ms/icons/yellow.png",
//                 scaledSize: new props.google.maps.Size(50, 50),
//               }}
//               label={key.toString()}
//               onClick={() => props.onClick(key)}
//             />
//           );
//         })}
//       </React.Fragment>
//     );
//   return (
//     <React.Fragment>
//       {Object.keys(location.points).map((key, index) => {
//         if (props.colorStep[key] === "white") {
//           return (
//             <Marker
//               key={key}
//               id={key}
//               position={{
//                 lat: location.points[key][0],
//                 lng: location.points[key][1],
//               }}
//               icon={{
//                 url: "http://maps.google.com/mapfiles/ms/icons/yellow.png",
//                 scaledSize: new props.google.maps.Size(50, 50),
//               }}
//               label={key.toString()}
//               onClick={() => props.onClick(key)}
//             />
//           );
//         } else if (props.colorStep[key] === "gray") {
//           return (
//             <Marker
//               key={key}
//               id={key}
//               position={{
//                 lat: location.points[key][0],
//                 lng: location.points[key][1],
//               }}
//               icon={{
//                 url: "http://maps.google.com/mapfiles/ms/icons/purple.png",
//                 scaledSize: new props.google.maps.Size(50, 50),
//               }}
//               label={key.toString()}
//               onClick={() => props.onClick(key)}
//             />
//           );
//         } else {
//           return (
//             <Marker
//               key={key}
//               id={key}
//               position={{
//                 lat: location.points[key][0],
//                 lng: location.points[key][1],
//               }}
//               icon={{
//                 url: `http://maps.google.com/mapfiles/ms/icons/${props.colorStep[key]}.png`,
//                 scaledSize: new props.google.maps.Size(50, 50),
//               }}
//               label={key.toString()}
//               onClick={() => props.onClick(key)}
//             />
//           );
//         }
//       })}
//     </React.Fragment>
//   );
// };

export const displayPolyline = () => {
  var edges = adjacent2List(location.adjacent);
  return edges.map((edge, index) => {
    let line = [
      {
        lat: location.points[edge.idxStart][0],
        lng: location.points[edge.idxStart][1],
      },
      {
        lat: location.points[edge.idxEnd][0],
        lng: location.points[edge.idxEnd][1],
      },
    ];
    return (
      <Polyline
        path={line}
        strokeColor="white"
        strokeOpacity={0.8}
        strokeWeight={2}
        key={edge.idxStart.toString() + "-" + edge.idxEnd.toString()}
      />
    );
  });
};
