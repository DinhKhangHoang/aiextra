import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import Aux from "./hoc/Aux";
import { location } from "./Key/Location";
import Controller from "./components/Controller";
const mapStyles = {
  width: "100%",
  height: "100%",
};

export class App extends Component {
  state = {
    stores: location.points,
    edges: location.edges,
  };

  displayMarker = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.lat,
            lng: store.lng,
          }}
          label={(index + 1).toString()}
          onClick={() => this.onClickMarker(index)}
        />
      );
    });
  };

  displayPolyline = () => {
    return this.state.edges.map((edge, index) => {
      let line = [
        {
          lat: this.state.stores[edge.idxStart].lat,
          lng: this.state.stores[edge.idxStart].lng,
        },
        {
          lat: this.state.stores[edge.idxEnd].lat,
          lng: this.state.stores[edge.idxEnd].lng,
        },
      ];
      return (
        <Polyline
          path={line}
          strokeColor="red"
          strokeOpacity={0.8}
          strokeWeight={4}
        />
      );
    });
  };

  onClickMarker = (index) => {
    console.log(index);
  };

  fetchPlace = (mapProps, map) => {};

  mapClicked = (mapProps, map, clickEvent) => {
    // console.log(clickEvent);
    // const { latLng } = clickEvent;
    // const lat = latLng.lat();
    // const lng = latLng.lng();
    // this.setState((previousState) => {
    //   return {
    //     stores: [
    //       ...previousState.stores,
    //       {
    //         lat: lat,
    //         lng: lng,
    //       },
    //     ],
    //   };
    // });
  };

  render() {
    return (
      <Aux>
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
        <Controller />
      </Aux>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: props.apiKey,
}))(App);
