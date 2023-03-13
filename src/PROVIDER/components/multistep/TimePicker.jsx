import React from "react";
import { Form } from "react-bootstrap";

const TimePicker = (props) => {
  return (
    <Form.Group className="mb-3 col-md-4">
      <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
      <input
        className="form-control"
        type="time"
        id={props.id}
        name={props.id}
      ></input>
    </Form.Group>
  );
};

export default TimePicker;
