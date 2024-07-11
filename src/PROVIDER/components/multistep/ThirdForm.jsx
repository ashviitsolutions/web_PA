import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import DocumentFileInput from "./DocumentFileInput";
import { IP } from "../../../Constant";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThirdForm = (props) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(true);
  const [license, setLicense] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const token = localStorage.getItem("providertoken");

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
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

      if (response.status === 200) {
        setLoading(false);
        localStorage.setItem("document_uploaded", "true");
        toast.success("Your documents have been submitted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        props.nextStep(); // Move to the next step
      } else {
        setLoading(false);
        toast.error("Failed to upload documents. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message || "An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <Form className="col-md-8 mx-auto" onSubmit={handleFormSubmit}>
        <Row id="upload" style={{ alignContent: "center" }}>
          <div className="documents">
            <div className="documents-body col-sm-4">
              <div className="documents-item">
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

            <div className="documents-body col-sm-4" id="documents-body">
              <div className="documents-item">
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

            <div className="documents-body col-sm-4" id="documents-body">
              <div className="documents-item">
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
        </Row>

        <div className="text-center">
          <Button type="submit">{loading ? "Loading..." : "Upload"}</Button>
        </div>
        <Row style={{ justifyContent: "space-between", padding: '10px' }}>
          <Button
            className="button small"
            variant="primary"
            onClick={props.nextStep}
          >
            Next
          </Button>
        </Row>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ThirdForm;
