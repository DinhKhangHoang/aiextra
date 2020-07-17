import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Collapse,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";
import HeuristicTable from "./HeuristicTable";
import styles from "./Controller.module.css";

class Controller extends Component {
  state = {
    isShowAnswer: false,
    isCalculate: false,
    isRunning: false,
    isEditing: false,
  };

  closeCalculate = () => {
    if (this.state.isRunning) {
      this.stopRunInterval(true);
    }
    this.props.setColor(null, false);
    this.setState({
      isCalculate: false,
      isRunning: false,
    });
  };

  toggle = () => {
    let isShowAnswer = this.state.isShowAnswer;
    this.setState({ isShowAnswer: !isShowAnswer });
  };

  getCalculate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.calculate(data.get("alg"));
    if (this.props.path.start > -1 && this.props.path.end > -1) {
      this.setState({ isCalculate: true });
    }
  };

  runDemo = (event) => {
    event.preventDefault();
    if (this.state.isRunning) {
      this.stopRunInterval(false);
      this.setState({ isRunning: false });
    } else {
      const data = new FormData(event.target);
      this.currentStep = 0;
      this.intervalID = setInterval(this.changeStep, data.get("speed") * 1000);
      this.timeoutID = setTimeout(() => {
        this.stopRunInterval(false);
      }, (this.props.solution.all_nodes_color.length + 1) * data.get("speed") * 1000);
      this.setState({ isRunning: true });
    }
  };

  changeStep = () => {
    if (this.currentStep < this.props.solution.all_nodes_color.length) {
      this.currentStep = this.currentStep + 1;
      let colorStep = this.props.solution.all_nodes_color[this.currentStep - 1];
      if (this.props.solution.all_node_f) {
        let processing_node = -1;
        for (let i in colorStep) {
          if (colorStep[i] === "red") {
            processing_node = i;
          }
        }
        if (processing_node > -1) {
          this.props.setAlert({
            show: true,
            text: `Node ${processing_node} is processing with f=${
              this.props.solution.all_node_f[this.currentStep - 1][
                processing_node
              ]
            }`,
          });
        }
      }
      this.props.setColor(colorStep);
    }
  };

  stopRunInterval = (isCloseCalculate) => {
    clearInterval(this.intervalID);
    clearTimeout(this.timeoutID);
    this.setState({ isRunning: false });
    if (isCloseCalculate) this.props.setColor(null);
  };

  editHeuristicHandler = () => {
    if (this.props.path.start > -1 && this.props.path.end > -1) {
      this.setState({ isEditing: true });
    } else {
      this.props.setAlert({
        show: true,
        text: "Please choose start node and end node!",
      });
    }
  };

  render() {
    if (this.state.isCalculate) {
      this.props.setClickMarkerAvailable(false);
      return (
        <div className={styles.Card}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle className="h3 font-weight-bold">
                    Solution
                  </CardTitle>
                </Col>
                <Col>
                  <Button
                    close
                    color="danger"
                    outline
                    onClick={this.closeCalculate}
                  />
                </Col>
              </Row>

              <CardSubtitle className="text-secondary">
                Card subtitle
              </CardSubtitle>
              <CardText>
                Solution: from {this.props.path.start} to {this.props.path.end}
              </CardText>
              <CardText>
                cost: {Math.round(this.props.solution.cost * 100) / 100} meter
              </CardText>

              <Button onClick={this.toggle} color="success" outline>
                {this.state.isShowAnswer ? "Hide" : "Show"} solution
              </Button>
              <Collapse isOpen={this.state.isShowAnswer}>
                <ListGroup
                  className="overflow-scroll"
                  style={{
                    maxHeight: "250px",
                    marginBottom: "10px",
                    overflow: "scroll",
                  }}
                >
                  {this.props.solution.path == null
                    ? null
                    : this.props.solution.path.map((value, index) => {
                        return (
                          <ListGroupItem tag="button" action key={index}>
                            Step {index + 1}: {value}
                          </ListGroupItem>
                        );
                      })}
                </ListGroup>
              </Collapse>
              <CardSubtitle
                className="text-primary"
                style={{ paddingTop: "10px" }}
              >
                Choose speed to run search by step.
              </CardSubtitle>
              <Form onSubmit={this.runDemo}>
                <Input type="select" name="speed">
                  <option value={1}>Normal</option>
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </Input>
                <Button
                  type="submit"
                  style={{ paddingTop: "10px" }}
                  color="danger"
                  outline
                >
                  {this.state.isRunning ? "Stop" : "Run"}
                </Button>
              </Form>
              {!this.state.isRunning ? null : (
                <div>
                  <CardText>
                    <img
                      src="http://maps.google.com/mapfiles/ms/icons/purple.png"
                      alt="Node was processed"
                    />
                    Node was processed
                  </CardText>
                  <CardText>
                    <img
                      src="http://maps.google.com/mapfiles/ms/icons/red.png"
                      alt="Node is processing"
                    />
                    Node is processing
                  </CardText>
                  <CardText>
                    <img
                      src="http://maps.google.com/mapfiles/ms/icons/orange.png"
                      alt="Node is in frontier"
                    />
                    Node is in frontier
                  </CardText>
                  <CardText>
                    <img
                      src="http://maps.google.com/mapfiles/ms/icons/green.png"
                      alt="Node is goal"
                    />
                    Node is goal
                  </CardText>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      );
    } else if (!this.state.isEditing) {
      this.props.setClickMarkerAvailable(true);
      return (
        <div className={styles.Card}>
          <Card>
            <CardBody>
              <CardTitle className="h3 font-weight-bold">
                Find the shortest path
              </CardTitle>
              <CardSubtitle className="text-primary">
                Choose start node and end node. (click on marker)
              </CardSubtitle>
              <CardText>
                Start node:{" "}
                {this.props.path.start < 0
                  ? ""
                  : this.props.path.start.toString()}
              </CardText>
              <CardText>
                End node:{" "}
                {this.props.path.end < 0 ? "" : this.props.path.end.toString()}
              </CardText>
            </CardBody>
            <Form onSubmit={this.getCalculate}>
              <Input type="select" name="alg">
                <option value="astar">A star</option>
                <option value="ucs">Uniform cost search</option>
                <option value="greedy">Greedy best first search</option>
                <option value="bfs">Breath first search</option>
                <option value="dfs">Depth first search</option>
              </Input>
              <Button
                outline
                block
                color="success"
                type="submit"
                style={{ paddingTop: "10px" }}
              >
                Calculate the path
              </Button>
            </Form>
            <Button outline color="primary" onClick={this.editHeuristicHandler}>
              Edit the heuristic values
            </Button>
          </Card>
        </div>
      );
    } else {
      this.props.setClickMarkerAvailable(false);
      return (
        <HeuristicTable
          closeEdit={() => this.setState({ isEditing: false })}
          goal={this.props.path.end}
          setHeuristicValues={this.props.setHeuristicValues}
          heuristics={this.props.heuristics}
        />
      );
    }
  }
}

export default Controller;
