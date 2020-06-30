import React, { useState, Component } from "react";
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

// const Controller = (props) => {
//   const [isShowAnswer, setIsShowAnswer] = useState(false);
//   const [isCalculate, setIsCalculate] = useState(false);
//   const [isRunning, setIsRunning] = useState(false);

//   function toggle() {
//     setIsShowAnswer(!isShowAnswer);
//   }

//   function getCalculate(event) {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     props.calculate(data.get("alg"));
//     setIsCalculate(true);
//   }

//   function closeCalculate() {
//     if (isRunning) {
//       props.stopRunInterval(true);
//     }
//     setIsCalculate(false);
//     setIsRunning(false);
//   }

//   function runDemo(event) {
//     event.preventDefault();
//     if (isRunning) {
//       props.stopRunInterval(false);
//       setIsRunning(false);
//     } else {
//       const data = new FormData(event.target);
//       props.setRunInterval(data.get("speed"));
//       setIsRunning(true);
//     }
//   }

//   if (isCalculate)
//     return (
//       <div className={styles.Card}>
//         <Card>
//           <CardBody>
//             <Row>
//               <Col>
//                 <CardTitle className="h3 font-weight-bold">Solution</CardTitle>
//               </Col>
//               <Col>
//                 <Button close color="danger" outline onClick={closeCalculate} />
//               </Col>
//             </Row>

//             <CardSubtitle className="text-secondary">
//               Card subtitle
//             </CardSubtitle>
//             <CardText>Solution: </CardText>

//             <Button onClick={toggle}>
//               {isShowAnswer ? "Hide" : "Show"} all steps
//             </Button>
//             <Form onSubmit={runDemo}>
//               <Input type="select" name="speed">
//                 <option value={0.5}>0.5x</option>
//                 <option value={0.75}>0.75x</option>
//                 <option value={1}>Normal</option>
//                 <option value={1.25}>1.25x</option>
//                 <option value={1.5}>1.5x</option>
//               </Input>
//               <Button className="btn btn-primary" type="submit">
//                 {isRunning ? "Stop" : "Run"}
//               </Button>
//             </Form>
//           </CardBody>
//         </Card>

//         <Collapse isOpen={isShowAnswer}>
//           <ListGroup
//             className="overflow-scroll"
//             style={{
//               maxHeight: "400px",
//               marginBottom: "10px",
//               overflow: "scroll",
//             }}
//           >
//             {props.solution == null
//               ? null
//               : props.solution.map((value, index) => {
//                   return (
//                     <ListGroupItem tag="button" action key={index}>
//                       Step {index + 1}: {value}
//                     </ListGroupItem>
//                   );
//                 })}
//           </ListGroup>
//         </Collapse>
//       </div>
//     );
//   else {
//     return (
//       <div className={styles.Card}>
//         <Card>
//           <CardBody>
//             <CardTitle className="h3 font-weight-bold">
//               Find the shortest path
//             </CardTitle>
//             <CardSubtitle className="text-primary">
//               Choose start node and end node.
//             </CardSubtitle>
//             <CardText>
//               Start node:{" "}
//               {props.path.start < 0 ? "" : props.path.start.toString()}
//             </CardText>
//             <CardText>
//               End node: {props.path.end < 0 ? "" : props.path.end.toString()}
//             </CardText>
//           </CardBody>
//           <Form onSubmit={getCalculate}>
//             <Input type="select" name="alg">
//               <option value="astar">A star</option>
//               <option value="ucs">Uniform cost search</option>
//               <option value="greedy">Greedy best first search</option>
//               <option value="bfs">Breath first search</option>
//               <option value="dfs">Depth first search</option>
//             </Input>
//             <Button className="btn btn-primary" type="submit">
//               Calculate the path
//             </Button>
//           </Form>
//         </Card>
//       </div>
//     );
//   }
// };

class Controller extends Component {
  state = {
    isShowAnswer: false,
    isCalculate: false,
    isRunning: false,
  };

  closeCalculate = () => {
    if (this.state.isRunning) {
      this.props.stopRunInterval(true);
    }
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
      this.props.stopRunInterval(false);
      // setIsRunning(false);
      this.setState({ isRunning: false });
    } else {
      const data = new FormData(event.target);
      this.props.setRunInterval(data.get("speed"));
      // setIsRunning(true);
      this.setState({ isRunning: true });
    }
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
              <CardText>Solution: </CardText>

              <Button onClick={this.toggle}>
                {this.state.isShowAnswer ? "Hide" : "Show"} all steps
              </Button>
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

          <Collapse isOpen={this.state.isShowAnswer}>
            <ListGroup
              className="overflow-scroll"
              style={{
                maxHeight: "400px",
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
                Choose start node and end node.
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
