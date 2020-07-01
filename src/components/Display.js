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

export const displaySolution = (path, onClick) => {
  if (!path) return;
  return path.map((vertex, index) => {
    if (index === path.length - 1) {
      return;
    }
    // console.log(path.length);
    let line = [
      {
        lat: location.points[vertex][0],
        lng: location.points[vertex][1],
      },
      {
        lat: location.points[path[index + 1]][0],
        lng: location.points[path[index + 1]][1],
      },
    ];
    return (
      <Polyline
        path={line}
        strokeColor="red"
        strokeOpacity={1}
        strokeWeight={3}
        key={index}
        onClick={onClick}
        start={vertex}
        end={path[index + 1]}
      />
    );
  });
};

export const displayPolyline = (path, onClick) => {
  var edges = adjacent2List(location.adjacent);
  var setSolution = null;
  if (path !== null)
    setSolution = new Set(
      path.map((vertex, index) => {
        if (index === path.length - 1) {
          return;
        }
        return vertex + " " + path[index + 1];
      })
    );
  else setSolution = new Set();
  return edges.map((edge, index) => {
    if (
      setSolution.has(edge.idxStart + " " + edge.idxEnd) ||
      setSolution.has(edge.idxEnd + " " + edge.idxStart)
    )
      return;
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
        strokeWeight={3}
        key={edge.idxStart.toString() + "-" + edge.idxEnd.toString()}
        onClick={onClick}
        start={edge.idxStart}
        end={edge.idxEnd}
      />
    );
  });
};
