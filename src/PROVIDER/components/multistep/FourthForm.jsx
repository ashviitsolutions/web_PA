import { faDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useState} from "react";
import { Button, Form, Row } from "react-bootstrap";
import { IP } from "../../../Constant";
const ThirdForm = (props) => {
  const [pdfFile, setPdfFile] = useState(null);
  const token = localStorage.getItem("providertoken")
  let saveAndContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  let previousStep = (e) => {
    e.preventDefault();
    props.previousStep();
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('contract', pdfFile);
      const response = await fetch(`${IP}/provider/upload-contract`, {
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        body: formData
      });
      console.log("imgae pdf",response);
    } catch (error) {
      console.error(error);
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
              <FontAwesomeIcon icon={faFilePdf} />{" "}
              <span>Membership Contract &nbsp;</span>{" "}
              <FontAwesomeIcon icon={faDownload} />

            </div>
            <div className="text-center">
              <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
              <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
              </Form.Group>
            </div>
          </div>
          <div className="text-center"><Button type="submit">Upload</Button></div>

        </div>

        <Row style={{ justifyContent: "space-between", padding: "10px" }}>
         {/* <Button
            style={{ width: "auto" }}
            variant="primary"
            onClick={previousStep}
            type="submit"
          >
            Previous
  </Button>  */}
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
