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
import styles from "./Controller.module.css";

class Controller extends Component {
  state = {
    isShowAnswer: false,
    isCalculate: false,
    isRunning: false,
  };

  closeCalculate = () => {
    if (this.state.isRunning) {
      this.stopRunInterval(true);
    }
    this.props.setColor(null);
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
    this.setState({ isCalculate: true });
  };

  runDemo = (event) => {
    event.preventDefault();
    if (this.state.isRunning) {
      this.stopRunInterval(false);
      this.setState({ isRunning: false });
    } else {
      const data = new FormData(event.target);
      this.currentStep = 0;
      this.intervalID = setInterval(this.changeStep, 1000);
      this.timeoutID = setTimeout(() => {
        this.stopRunInterval(false);
      }, (this.props.colorByStep.length + 1) * 1000);
      this.setState({ isRunning: true });
    }
  };

  changeStep = () => {
    if (this.currentStep < this.props.colorByStep.length) {
      this.currentStep = this.currentStep + 1;
      this.props.setColor(this.props.colorByStep[this.currentStep - 1]);
    }
  };

  stopRunInterval = (isCloseCalculate) => {
    clearInterval(this.intervalID);
    clearTimeout(this.timeoutID);
    this.setState({ isRunning: false });
    if (isCloseCalculate) this.props.setColor(null);
  };

  render() {
    if (this.state.isCalculate)
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
                cost: {Math.round(this.props.cost * 100) / 100} meter
              </CardText>

              <Button onClick={this.toggle}>
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
                  {this.props.solution == null
                    ? null
                    : this.props.solution.map((value, index) => {
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
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>Normal</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </Input>
                <Button className="btn btn-primary" type="submit">
                  {this.state.isRunning ? "Stop" : "Run"}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      );
    else {
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
              <Button className="btn btn-primary" type="submit">
                Calculate the path
              </Button>
            </Form>
          </Card>
        </div>
      );
    }
  }
}

export default Controller;
