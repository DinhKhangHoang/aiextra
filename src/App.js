import React, { Component } from "react";
import Aus from "./hoc/Aus";
import { location } from "./Key/Location";
import Controller from "./components/Controller";
import axios from "axios";
import Alert from "./components/Alert";
import {
  calculateHeuristic,
  latLngToMeter,
  dict2ListHeuristic,
  list2DictHeuristic,
} from "./components/supportFunc";
import MyMap from "./components/MyMap";

const locationByMeter = latLngToMeter(location.points);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: -1,
      end: -1,
      colorStep: null,
      solution: {
        path: null,
        all_node_f: null,
        all_nodes_color: null,
        cost: null,
      },
      alert: {
        show: false,
        text: "",
      },
      heuristics: [],
    };
    this.canClickMarker = true;
  }

  handleCalculate = (method = "astar") => {
    if (this.state.start > -1 && this.state.end > -1)
      axios
        .post(
          "http://localhost:5000/search/" + method,
          {
            graphs: location.adjacent,
            locations: locationByMeter,
            start: this.state.start,
            end: this.state.end,
            heuristics: list2DictHeuristic(this.state.heuristics),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.setState({ solution: response.data });
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

  setColor = (color, isShowSolution = true) => {
    if (isShowSolution) {
      this.setState({ colorStep: color });
    } else {
      this.setState({
        colorStep: color,
        solution: {
          path: null,
          all_node_f: null,
          all_nodes_color: null,
          cost: null,
        },
      });
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
    console.log(line);
    this.setAlert({
      show: true,
      text: location.adjacent[props.start][props.end].toString() + " meter",
    });
  };

  onClickMarker = (index) => {
    if (this.canClickMarker) {
      if (this.state.start < 0) this.setState({ start: index });
      else if (this.state.end < 0) {
        this.setState({
          end: index,
          heuristics: dict2ListHeuristic(
            calculateHeuristic(index, location.points)
          ),
        });
      } else this.setState({ start: index, end: -1 });
    }
  };

  setInfoWindow = (info) => {
    this.setState({ infoWindow: info });
  };

  render() {
    return (
      <Aus>
        <MyMap
          apiKey={this.props.apiKey}
          path={this.state.solution === null ? null : this.state.solution.path}
          onClickMarker={this.onClickMarker}
          onClickPolyline={this.onClickPolyline}
          colorStep={this.state.colorStep}
        />
        <Controller
          path={{ start: this.state.start, end: this.state.end }}
          solution={this.state.solution}
          calculate={this.handleCalculate}
          setRunInterval={this.handleRunInterval}
          stopRunInterval={this.stopRunInterval}
          setColor={this.setColor}
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

export default App;
