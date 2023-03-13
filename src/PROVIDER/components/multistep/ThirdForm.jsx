import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import DocumentFileInput from "./DocumentFileInput";

const ThirdForm = (props) => {
  let saveAndContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  let previousStep = (e) => {
    e.preventDefault();
    props.previousStep();
  };
  //   const [urlsrc, seturlsrc] = useState('');
  const [upload, setUpload] = useState(true);
  
  function handleUpload() {
    // document.getElementById('upload')
    setUpload(false);
  }

  return (
    <div>
      <Form className="col-md-8 mx-auto" style={{}}>
        
        {upload?<Row id="upload" style={{minHeight:"70vh",alignContent:"center"}}>
          <DocumentFileInput title="License"/>
          <DocumentFileInput title="Liability Insurance"/>
          <DocumentFileInput title="Driving License"/>
        </Row>:<div className="content" style={{height: "70vh", display: 'flex',flexDirection: 'column',
    justifyContent: 'center',}}>
          <h2 className="text-center">Form Submitted Successfully</h2>
        </div>}

        
        <div className="text-center"><Button onClick={handleUpload}>Upload</Button></div>
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

export default ThirdForm;
