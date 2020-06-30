import React, { useState } from "react";
import { Alert } from "reactstrap";

const AlertExample = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      {props.text}
    </Alert>
  );
};

export default AlertExample;
