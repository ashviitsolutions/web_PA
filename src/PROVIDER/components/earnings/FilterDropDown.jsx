import React from "react";
import { Form } from "react-bootstrap";

const FilterDropDown = (props) => {
  let arr = props.data;
  return (
    <Form.Select aria-label="Default select example">
      <option>Select {props.type}</option>
      {arr.data.map((item) => (
        <option value="1">{item}</option>
      ))}
    </Form.Select>
  );
};

export default FilterDropDown;
