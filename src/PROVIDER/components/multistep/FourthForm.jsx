import { faDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Row } from "react-bootstrap";

const ThirdForm = (props) => {
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
      <Form className="col-md-8 mx-auto">
        <div
          className="content pt-2"
          style={{ height: "70vh", display: "flex", flexDirection: "column", justifyContent: 'space-around'}}
        >
          <h2 className="text-center mt-2">Contract</h2>
          <div className="down-upload">
            <div className="text-center" style={{ fontSize: "25px" }}>
              <FontAwesomeIcon icon={faFilePdf} />{" "}
              <span>Membership Contract &nbsp;</span>{" "}
              <FontAwesomeIcon icon={faDownload} />
            
            </div>
            <div className="text-center">
            <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
              <Form.Control
                type="file"
                accept=".pdf,.docx"
              />
            </Form.Group>
            </div>
          </div>
          <div className="text-center"><Button>Upload</Button></div>
          
        </div>

        <Row style={{ justifyContent: "space-between", padding: "10px" }}>
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

export default ThirdForm;
