import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import Aus from "./hoc/Aus";
import { location } from "./Key/Location";
import Controller from "./components/Controller";
import axios from "axios";
import { displayPolyline, displayMarker } from "./components/Display";

const mapStyles = {
  width: "100%",
  height: "100%",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: -1,
      end: -1,
      path: null,
      colorByStep: null,
      colorStep: null,
      cost: null,
    };
  }

  onClickMarker = (index) => {
    console.log(index);
    if (this.state.start < 0) this.setState({ start: index });
    else if (this.state.end < 0) this.setState({ end: index });
    else this.setState({ start: index, end: -1 });
  };

  handleCalculate = (method = "astar") => {
    if (this.state.start > -1 && this.state.end > -1)
      axios
        .post("http://localhost:5000/search/" + method, {
          graphs: location.adjacent,
          locations: location.points,
          start: this.state.start,
          end: this.state.end,
        })
        .then((response) => {
          console.log(response);
          this.setState({
            path: response.data.path,
            colorByStep: response.data.all_nodes_color,
            cost: response.data.cost,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };

  handleRunInterval = (speed) => {
    this.currentStep = 0;
    this.intervalID = setInterval(this.changeStep, 1000);
    this.timeoutID = setTimeout(() => {
      this.stopRunInterval(false);
    }, (this.state.colorByStep.length + 1) * 1000);
  };

  changeStep = () => {
    if (this.currentStep < this.state.colorByStep.length) {
      this.currentStep = this.currentStep + 1;
      this.setState({
        colorStep: this.state.colorByStep[this.currentStep - 1],
      });
    }
  };

  stopRunInterval = (isCloseCalculate) => {
    clearInterval(this.intervalID);
    clearTimeout(this.timeoutID);
    if (isCloseCalculate) this.setState({ colorStep: null });
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
          {displayMarker(
            this.onClickMarker,
            this.state.colorStep,
            this.props.google
          )}
          {displayPolyline()}
        </Map>
        <Controller
          path={{ start: this.state.start, end: this.state.end }}
          solution={this.state.path}
          cost={this.state.cost}
          calculate={this.handleCalculate}
          setRunInterval={this.handleRunInterval}
          stopRunInterval={this.stopRunInterval}
        />
      </Aus>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: props.apiKey,
}))(App);
