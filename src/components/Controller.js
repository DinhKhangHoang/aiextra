import React, { useState } from "react";
import {
  Card,
  CardImg,
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

const Controller = (props) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isCalculate, setIsCalculate] = useState(false);

  function toggle() {
    setIsShowAnswer(!isShowAnswer);
  }

  function getCalculate() {
    setIsCalculate(true);
  }

  function closeCalculate() {
    setIsCalculate(false);
  }

  if (isCalculate)
    return (
      <div className={styles.Card}>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <CardTitle className="h3 font-weight-bold">Solution</CardTitle>
              </Col>
              <Col>
                <Button close color="danger" outline onClick={closeCalculate} />
              </Col>
            </Row>

            <CardSubtitle className="text-secondary">
              Card subtitle
            </CardSubtitle>
            <CardText>Solution: </CardText>

            <Button onClick={toggle}>
              {isShowAnswer ? "Hide" : "Show"} all steps
            </Button>
          </CardBody>
        </Card>
        <Collapse isOpen={isShowAnswer}>
          <ListGroup
            className="overflow-scroll"
            style={{
              maxHeight: "400px",
              marginBottom: "10px",
              overflow: "scroll",
            }}
          >
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
            <ListGroupItem tag="button" action>
              Step 1:
            </ListGroupItem>
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
              {props.path.start < 0 ? "" : props.path.start.toString()}
            </CardText>
            <CardText>
              End node: {props.path.end < 0 ? "" : props.path.end.toString()}
            </CardText>
          </CardBody>
          <Button className="btn btn-primary" onClick={getCalculate}>
            Calculate the path
          </Button>
        </Card>
      </div>
    );
  }
};

export default Controller;
