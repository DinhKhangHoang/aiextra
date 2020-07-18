import React from "react";
import { Alert } from "reactstrap";

const AlertExample = (props) => {
  const onDismiss = () => props.setDismiss();

  return (
    <Alert
      color="danger"
      isOpen={props.visible}
      toggle={onDismiss}
      style={{ position: "fixed", top: "5%", right: "30%" }}
    >
      {props.text}
    </Alert>
  );
};

export default AlertExample;
