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
import {
  calculateHeuristic,
  latLngToMeter,
  dict2ListHeuristic,
  list2DictHeuristic,
} from "./components/supportFunc";

const mapStyles = {
  width: "100%",
  height: "100%",
};
const locationByMeter = latLngToMeter(location.points);

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
      heuristics: [],
    };
    this.canClickMarker = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.end > -1 && this.state.end !== prevState.end) {
      this.setState({
        heuristics: dict2ListHeuristic(
          calculateHeuristic(this.state.end, location.points)
        ),
      });
    }
  }

  handleCalculate = (method = "astar") => {
    if (this.state.start > -1 && this.state.end > -1)
      axios
        .post("http://localhost:5000/search/" + method, {
          graphs: location.adjacent,
          locations: locationByMeter,
          start: this.state.start,
          end: this.state.end,
          heuristics: list2DictHeuristic(this.state.heuristics),
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
      this.setAlert({
        show: true,
        text: "Please choose start node and end node.",
      });
    }
  };

  setAlert = (alertInfo = { show: false, text: "" }) => {
    this.setState({ alert: alertInfo });
  };

  setColor = (color, solution = true) => {
    if (solution) {
      this.setState({ colorStep: color });
    } else {
      this.setState({ colorStep: color, path: null });
    }
  };

  setClickMarkerAvailable = (val) => {
    this.canClickMarker = val;
  };

  setHeuristicValues = (listData) => {
    this.setState({ heuristics: listData });
    console.log(this.state.heuristics);
  };

  onClickPolyline = (props, line, e) => {
    this.setAlert({
      show: true,
      text: location.adjacent[props.start][props.end].toString() + " meter",
    });
  };

  onClickMarker = (index) => {
    if (this.canClickMarker) {
      if (this.state.start < 0) this.setState({ start: index });
      else if (this.state.end < 0) this.setState({ end: index });
      else this.setState({ start: index, end: -1 });
    }
  };

  render() {
    let polylines = displayPolyline(this.state.path, this.onClickPolyline);
    let solution = displaySolution(this.state.path, this.onClickPolyline);
    let markers = displayMarker(
      this.onClickMarker,
      this.state.colorStep,
      this.props.google
    );

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
          {markers}
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
          setHeuristicValues={this.setHeuristicValues}
          heuristics={this.state.heuristics}
          setClickMarkerAvailable={this.setClickMarkerAvailable}
          setAlert={this.setAlert}
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
