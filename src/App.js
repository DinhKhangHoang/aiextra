import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import Aus from "./hoc/Aus";
import { location } from "./Key/Location";
import Controller from "./components/Controller";
import axios from "axios";
import {
  displayPolyline,
  displayMarker,
  displaySolution,
} from "./components/Display";
import Alert from "./components/Alert";

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
      alert: {
        show: false,
        text: "",
      },
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
          locations: location.points2,
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
    else {
      this.setState({
        alert: { show: true, text: "Please choose start node and end node." },
      });
    }
  };

  setAlert = () => {
    this.setState({ alert: { show: false, text: "" } });
  };

  setColor = (color, solution = true) => {
    if (solution) {
      this.setState({ colorStep: color });
    } else {
      this.setState({ colorStep: color, path: null });
    }
  };

  onClickPolyline = (props, line, e) => {
    this.setState({
      alert: {
        show: true,
        text: location.adjacent[props.start][props.end].toString() + " meter",
      },
    });
  };

  render() {
    let polylines = displayPolyline(this.state.path, this.onClickPolyline);
    let solution = displaySolution(this.state.path, this.onClickPolyline);
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

          {polylines}
          {solution}
        </Map>
        <Controller
          path={{ start: this.state.start, end: this.state.end }}
          solution={this.state.path}
          cost={this.state.cost}
          calculate={this.handleCalculate}
          setRunInterval={this.handleRunInterval}
          stopRunInterval={this.stopRunInterval}
          setColor={this.setColor}
          colorByStep={this.state.colorByStep}
        />
        <Alert
          visible={this.state.alert.show}
          setDismiss={this.setAlert}
          text={this.state.alert.text}
        />
      </Aus>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: props.apiKey,
}))(App);
