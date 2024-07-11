// import React from "react";
// import { Form } from "react-bootstrap";

// const TimePicker = (props) => {
//   const handleTimeChange = (e) => {
//     const selectedTime = e.target.value;
//     props.onChange(selectedTime);
//   };

//   return (
//     <Form.Group className="mb-3 col-md-4">
//       <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
//       <input
//         className="form-control"
//         type="time"
//         id={props.id}
//         name={props.id}
//         onChange={handleTimeChange}
//       />
//     </Form.Group>
//   );
// };

// export default TimePicker;

import React from "react";
import { Form } from "react-bootstrap";

const TimePicker = (props) => {
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    props.onChange(selectedTime);
  };

  return (
    <Form.Group className="mb-3 col-md-4">
      <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
      <input
        className="form-control"
        type="time"
        id={props.id}
        name={props.id}
        value={props.value} // Set the value of the input field
        onChange={handleTimeChange}
      />
    </Form.Group>
  );
};

export default TimePicker;

