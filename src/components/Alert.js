import React from "react";
import { Alert } from "reactstrap";

const AlertExample = (props) => {
  // const [visible, setVisible] = useState(true);

  const onDismiss = () => props.setDismiss();

  return (
    <Alert
      color="info"
      isOpen={props.visible}
      toggle={onDismiss}
      style={{ position: "fixed", top: "5%", right: "30%" }}
    >
      {props.text}
    </Alert>
  );
};

export default AlertExample;
