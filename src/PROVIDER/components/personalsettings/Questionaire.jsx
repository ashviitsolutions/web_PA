import React from "react";
import { Button } from "react-bootstrap";

const Questionaire = () => {
  return (
    <>
      <div className="box shadow-sm">
        <div className="question-heading mb-2 text-bold ">Questionare</div>
        <span className="question">Ideal # for apts per day?</span>
        <input type="text" className="form-control mb-2" />
        <span className="question">
          What are your earning goals with Productive Alliance?
        </span>
        <input type="text" className="form-control mb-2" />
        <span className="question">
          Do you prefer couple , single or Either?
        </span>
        <input type="text" className="form-control mb-2" />
        <span className="question">
          Availability to take appointments after 8pm?
        </span>
        <input type="text" className="form-control mb-2" />
        <Button className="mb-2 mx-auto" style={{ display: "block" }}>
          Save
        </Button>
      </div>
    </>
  );
};

export default Questionaire;
