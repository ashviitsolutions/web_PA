import React from "react";
import { Button, Form, Row } from "react-bootstrap";

const SecondForm = (props) => {
  let saveAndContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  let previousStep = (e) => {
    e.preventDefault();
    props.previousStep();
  };
  return (
    <div>
      <Form className="col-md-8 mx-auto" >
        <div className="content" style={{height: "70vh", display: 'flex',flexDirection: 'column',
    justifyContent: 'center',}}>
          <h2 className="text-center">Get Ready for Call Interview</h2>
        </div>

        <Row style={{ justifyContent: "space-between" ,padding:'10px' }}>
          <Button
            style={{ width: "auto" }}
            variant="primary"
            onClick={previousStep}
            type="submit"
          >
            Previous
          </Button>
          <Button
            style={{ width: "auto" }}
            className="col-md-2"
            variant="primary"
            onClick={saveAndContinue}
            type="submit"
          >
            Next
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default SecondForm;
