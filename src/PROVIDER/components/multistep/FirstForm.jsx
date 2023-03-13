import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import ImageFileInput from "./ImageFileInput";
import TimePicker from "./TimePicker";

const FirstForm = (props) => {
  let saveAndContinue = (e) => {
    e.preventDefault();
    // console.log(formData)
    console.log(e.target);
    props.nextStep();
  };

  let areasofexpertise = {
    ondemand: [
      "Swedish Massage",
      "Therapeutic Massage",
      "Deep Tissue/Medical Massage",
      "Sports Massage",
      "Partners/Couples Massage",
      "Pre-Natal Massage",
    ],
    privatecorpevts: [
      "Chair Massage",
      "Nutritionist",
      "Reflexology",
      "Yoga",
      "Chiropractors",
      "Biometric Screening",
      "Wax on hands treatment",
    ],
  };
  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log("firstName 👉️", firstName);
    console.log("lastName 👉️", lastName);

    // 👇️ clear all input values in the form
    setFirstName("");
    setLastName("");
    props.nextStep();
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ssn, setSsn] = useState("");
  const [ref1name, setRef1name] = useState('');
  const [ref1phone, setRef1phone] = useState('');
  const [ref2name, setRef2name] = useState('');
  const [ref2phone, setRef2phone] = useState('');

  return (
    <div className="formprovider">
      <h2 className="text-center mt-2">Application Form</h2>

      <Form
        method="post"
        className="col-md-8 mx-auto mb-2"
        style={{}}
        onSubmit={handleSubmit}
      >
        <hr className="hr" />
        <h5>Personal Information</h5>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Name</Form.Label>
          <Row>
            <div className="col-md-6 mb-2">
              <Form.Control
                name="fname"
                type="text"
                placeholder="First Name"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>
            <div className="col-md-6">
              <Form.Control
                name="lname"
                type="text"
                placeholder="Last Name"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </div>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Row>
            <div className="col-md-6 mb-2">
              <Form.Label>Social Security</Form.Label>
              <Form.Control
                name="fname"
                type="text"
                placeholder="Social Security"
                onChange={(event) => setSsn(event.target.value)}
                value={ssn}
              />
            </div>
            <div className="col-md-6">
              <Form.Label htmlFor="country">Date of Birth</Form.Label>
              <input
                type="text"
                className="form-control"
                placeholder="Date of Birth"
                onChange={(e) => console.log(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" placeholder="E-Mail" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">Phone</Form.Label>
          <Form.Control type="text" placeholder="Phone" id="phone" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="currentaddress">Current Address</Form.Label>
          <Form.Control
            as="textarea"
            id="currentaddress"
            placeholder="Current Address"
            style={{ height: "100px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="zip">ZIP Code</Form.Label>
          <Form.Control type="text" placeholder="ZIP Code" id="zip" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="country">Country</Form.Label>
          <Form.Control type="text" placeholder="Country" id="country" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="country">Date of Birth</Form.Label>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Date of Birth"
              onChange={(e) => console.log(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
          {/* <Form.Control type="text" placeholder="Country" id="country" /> */}
        </Form.Group>
        <hr className="hr" />
        <h5>Areas of Expertise</h5>
        <h6>On Demand</h6>
        {areasofexpertise.ondemand.map((item, id) => (
          <Form.Check inline id={id + 1} label={item} name="group1" />
        ))}
        <h6>Private Corporate Events</h6>
        {areasofexpertise.privatecorpevts.map((item, id) => (
          <Form.Check inline id={id + 1} label={item} name="group1" />
        ))}
        <hr className="hr" />
        <h5>Working Shift</h5>
        <Form.Check
          inline
          id={"parttime"}
          label={"Part Time"}
          name="workingshift"
          type={'radio'}
        />
        <Form.Check
          inline
          id={"fulltime"}
          label={"Full Time"}
          name="workingshift"
          type={'radio'}
        />
        <hr className="hr" />
        <h5>Working Information</h5>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Start Date"
            onChange={(e) => console.log(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <p className="mt-2">Availability Hours</p>
        <Row>
          <TimePicker id="mon" label="Monday" />
          <TimePicker id="tue" label="Tuesday" />
          <TimePicker id="wed" label="Wednesday" />
          <TimePicker id="thu" label="Thursday" />
          <TimePicker id="fri" label="Friday" />
          <TimePicker id="sat" label="Saturday" />
          <TimePicker id="sun" label="Sunday" />
        </Row>
        <hr className="hr" />
        <h5>Have you ever been employed with Productive Alliance LLC</h5>
        <Form.Check
          inline
          id={"yes"}
          label={"Yes"}
          name="workwithus"
          type={'radio'}
        />
        <Form.Check
          inline
          id={"no"}
          label={"No"}
          name="workwithus"
          type={'radio'}
        />
        <hr className="hr" />
        <h5>
        Professional References
        </h5>
        <p> List two references who are willing to provide a professional reference (please do not include family members nor people who reside with you)</p>
        <Form.Group className="mb-3 mt-3">
          <Row>
            <div className="col-md-6 mb-2">
              <Form.Label>Reference 1 Name</Form.Label>
              <Form.Control
                name="ref1name"
                type="text"
                placeholder="Reference 1 Name"
                onChange={(event) => setRef1name(event.target.value)}
                value={ref1name}
              />
            </div>
            <div className="col-md-6 mb-2">
              <Form.Label>Reference 1 Phone</Form.Label>
              <Form.Control
                name="ref1phone"
                type="text"
                placeholder="Reference 1 Phone"
                onChange={(event) => setRef1phone(event.target.value)}
                value={ref1phone}
              />
            </div>
            <div className="col-md-6 mb-2">
              <Form.Label>Reference 2 Name</Form.Label>
              <Form.Control
                name="ref2name"
                type="text"
                placeholder="Reference 2 Name"
                onChange={(event) => setRef2name(event.target.value)}
                value={ref2name}
              />
            </div>
            <div className="col-md-6 mb-2">
              <Form.Label>Reference 2 Phone</Form.Label>
              <Form.Control
                name="ref2phone"
                type="text"
                placeholder="Reference 2 Phone"
                onChange={(event) => setRef2phone(event.target.value)}
                value={ref2phone}
              />
            </div>
          </Row>
        </Form.Group>
        <hr className="hr" />
        <h5>Office Images</h5>
        <p>Please upload your images of your office space and its  environment.</p>
        <ImageFileInput title="Images" />
        <hr className="hr" />
        <h5>
          Submission Date <FontAwesomeIcon icon={faCalendar} />
        </h5>
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Submission Date"
            onChange={(e) => console.log(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <hr className="hr" />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FirstForm;
