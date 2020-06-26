import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import Aus from "./hoc/Aus";
import { location } from "./Key/Location";
import Controller from "./components/Controller";
import axios from "axios";

function adjacent2Matrix(adjacent) {
  return Object.keys(adjacent)
    .map((vertex, index) => {
      return Object.keys(adjacent[vertex]).map((adjvertex, index) => {
        return { idxStart: vertex, idxEnd: adjvertex };
      });
    })
    .flat();
}

const edges = adjacent2Matrix(location.adjacent);

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class App extends Component {
  state = {
    start: -1,
    end: -1,
  };

  displayMarker = () => {
    return Object.keys(location.points).map((key, index) => {
      return (
        <Marker
          key={key}
          id={key}
          position={{
            lat: location.points[key].lat,
            lng: location.points[key].lng,
          }}
          label={key.toString()}
          onClick={() => this.onClickMarker(key)}
        />
      );
    });
  };

  displayPolyline = () => {
    return edges.map((edge, index) => {
      let line = [
        {
          lat: location.points[edge.idxStart].lat,
          lng: location.points[edge.idxStart].lng,
        },
        {
          lat: location.points[edge.idxEnd].lat,
          lng: location.points[edge.idxEnd].lng,
        },
      ];
      return (
        <Polyline
          path={line}
          strokeColor="red"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      );
    });
  };

  onClickMarker = (index) => {
    console.log(index);
    if (this.state.start < 0) this.setState({ start: index });
    else if (this.state.end < 0) this.setState({ end: index });
    else this.setState({ start: index, end: -1 });
  };

  fetchPlace = (mapProps, map) => {};

  handleCalculate = (method = "a-star") => {
    axios
      .post("http://localhost:5000/" + method, {
        location: location,
        start: this.state.start,
        end: this.state.end,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Aus>
        <Map
          google={this.props.google}
          onReady={this.fetchPlace}
          zoom={14}
          style={mapStyles}
          onClick={this.mapClicked}
          initialCenter={{
            lat: 10.7730737,
            lng: 106.6713485,
          }}
        >
          {this.displayMarker()}
          {this.displayPolyline()}
        </Map>
        <Controller
          path={{ start: this.state.start, end: this.state.end }}
          calculate={this.handleCalculate}
        />
      </Aus>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: props.apiKey,
}))(App);
