import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import DocumentFileInput from "./DocumentFileInput";
import { IP } from "../../../Constant";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ThirdForm = (props) => {
  const nav = useNavigate()
  const [toggle, setToggle] = useState(false)

  let saveAndContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };


  const [upload, setUpload] = useState(true);
  const [license, setLicense] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);

  const token = localStorage.getItem("providertoken")

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("license", license);
      bodyFormData.append("insurance", insurance);
      bodyFormData.append("drivinglicense", drivingLicense);
      const response = await fetch(`${IP}/provider/documents`, {
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        body: bodyFormData
      });
      setUpload(true);
      console.log("image pdf", response);
      if (response.status === 200) {
        setToggle(true)
        setUpload(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFormSubmit()
  }, [])





  return (
    <div>
      <Form className="col-md-8 mx-auto" style={{}} onSubmit={handleFormSubmit}>

        {upload ? <Row id="upload" style={{ alignContent: "center" }}>

          <div className="documents">

            <div className="documents-body  col-sm-4 ">
              <div className="documents-item ">
                <DocumentFileInput
                  title="license"
                  type="file"
                  accept=".pdf"
                  value={license}
                  onChange={(e) => setLicense(e.target.files[0])}
                />
              </div>
              <div className="text-center" id="isurancecard">
                <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
                  <Form.Control type="file" accept=".pdf" onChange={(e) => setLicense(e.target.files[0])} />
                </Form.Group>
              </div>
            </div>


            <div className="documents-body  col-sm-4" id="documents-body">
              <div className="documents-item  ">
                <DocumentFileInput
                  title="insurance Insurance"
                  type="file"
                  accept=".pdf"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.files[0])}
                />
              </div>
              <div className="text-center" id="isurancecard">
                <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
                  <Form.Control type="file" accept=".pdf" onChange={(e) => setInsurance(e.target.files[0])} />
                </Form.Group>
              </div>
            </div>

            <div className="documents-body  col-sm-4" id="documents-body">
              <div className="documents-item  ">
                <DocumentFileInput
                  title="Driving License"
                  type="file"
                  accept=".pdf"
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.files[0])}
                />


              </div>
              <div className="text-center" id="isurancecard">
                <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
                  <Form.Control type="file" accept=".pdf" onChange={(e) => setDrivingLicense(e.target.files[0])} />
                </Form.Group>
              </div>

            </div>

          </div>

        </Row> : <div className="content" style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h2 className="text-center">Form Submitted Successfully</h2>
        </div>}










        <div className="text-center"><Button type="submit">Upload</Button></div>
        <Row style={{ justifyContent: "space-between", padding: '10px' }}>

          <Button
            className="button small"
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




















