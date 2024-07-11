import { faDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Alert } from "react-bootstrap";
import { IP } from "../../../Constant";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThirdForm = (props) => {
  const nav = useNavigate()
  const [pdfFile, setContract] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const token = localStorage.getItem("providertoken");
  const [loading, setLoading] = useState(false);

  let saveAndContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  let previousStep = (e) => {
    e.preventDefault();
    props.previousStep();
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("contract", pdfFile);
      const response = await fetch(`${IP}/provider/documents`, {
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        body: bodyFormData
      });

      console.log("image pdf", response);
      if (response.status === 200) {
        setLoading(false);
        toast.success("Your contract have been submitted successfully!", {
          position: "top-right",
          autoClose: 2000,

        });
        nav("/providers/waiting")

      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.massage, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };


  return (
    <div>
      <Form className="col-md-8 mx-auto" onSubmit={handleFormSubmit}>
        <div
          className="content pt-2"
          style={{ height: "70vh", display: "flex", flexDirection: "column", justifyContent: 'space-around' }}
        >
          <h2 className="text-center mt-2">Contract</h2>
          <div className="down-upload">
            <div className="text-center" style={{ fontSize: "25px" }}>
              <FontAwesomeIcon icon={faFilePdf} />
              <span>Membership Contract &nbsp;</span>
              <FontAwesomeIcon icon={faDownload} />
            </div>
            <div className="text-center">
              <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
                <Form.Control type="file" accept=".pdf" onChange={(e) => setContract(e.target.files[0])} />
              </Form.Group>
            </div>
          </div>

          <div className="text-center">
            <Button type="submit">{loading ? "Loading..." : "Upload"}</Button>
          </div>
          {uploadStatus && <Alert variant="info">{uploadStatus}</Alert>}
        </div>

        <Row style={{ justifyContent: "space-between", padding: "10px" }}>
          <Button
            className="button small"
            variant="primary"
            onClick={previousStep}
            type="button"
          >
            Previous
          </Button>
          <Button
            className="button small"
            variant="primary"
            onClick={saveAndContinue}
            type="button"
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
