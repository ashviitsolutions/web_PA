import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import DocumentFileInput from "./DocumentFileInput";
import { IP } from "../../../Constant";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

const ThirdForm = (props) => {
  const nav = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [thanks, setThanks] = useState(false)
  let saveAndContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  let previousStep = (e) => {
    e.preventDefault();
    props.previousStep();
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

  const handleApi = async () => {
    props.nextStep();
    try {
      const response = await fetch(`${IP}/provider/screening`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        // nav("/providers")
        setToggle(false)
        setThanks(true)
      }
    } catch (error) {

    }
  }




  return (
    <div>
      <Form className="col-md-8 mx-auto" style={{}} onSubmit={handleFormSubmit}>

        {upload ? <Row id="upload" style={{ minHeight: "70vh", alignContent: "center" }}>

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
          height: "70vh", display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h2 className="text-center">Form Submitted Successfully</h2>
        </div>}

        {
          toggle ? (
            <div className="schudulecard" >
              <div className="callstatus" style={{ marginTop: "7rem" }}>
                <CancelIcon style={{ float: "right" }} onClick={() => setToggle(false)} />
                <p style={{ paddingTop: "7rem" }}>
                  We would like to let you know that before proceeding further,
                  we require our clients to agree with our background screening
                  process which is conducted by third-party.
                  If you would like us to proceed ahead with your
                  application please acknowledge and click on "Agree" button below.
                </p>
                <div className="text-center"><Button type="submit" onClick={handleApi}>aggree</Button></div>
              </div>
            </div>

          ) : null
        }



        {
          thanks ? (
            <div className="schudulecard" >
              <div className="callstatus" style={{ marginTop: "7rem" }}>
                <CancelIcon style={{ float: "right" }} onClick={() => setThanks(false)} />
                <h3 style={{ paddingTop: "7rem" }}>
                  Thanks You for showing intrest , please check your email
                </h3>
              </div>
            </div>

          ) : null
        }









        <div className="text-center"><Button type="submit">Upload</Button></div>
        <Row style={{ justifyContent: "space-between", padding: '10px' }}>
          {/* <Button
            style={{ width: "auto" }}
            variant="primary"
            onClick={previousStep}
            type="submit"
          >
            Previous
  </Button>*/}
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




















