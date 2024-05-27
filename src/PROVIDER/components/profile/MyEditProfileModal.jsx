import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyEditProfileModal = (props) => {
  let nameupdate = props.user.name;
  let descriptionupdate = props.user.description;
  let mobileupdate = props.user.mobile;
  let emailupdate = props.user.email;

  const [name, setName] = useState(nameupdate);
  const [description, setDescription] = useState(descriptionupdate);
  const [mobile, setMobile] = useState(mobileupdate);
  const [email, setEmail] = useState(emailupdate);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <div className="profile-image text-center">
            <img
              src="https://microbiology.ucr.edu/sites/default/files/styles/form_preview/public/blank-profile-pic.png"
              alt=""
              style={{ width: "200px" }}
            />
          </div>
          <hr className="hr" />
          <h4>Personal Information</h4>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={event => setName(event.target.value)} value={name} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              id="description"
              placeholder="Description"
              style={{ height: "100px" }}
              onChange={event => setDescription(event.target.value)} value={description}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3">
            <Row>
              <div className="col-md-6 mb-2">
                <Form.Label>Mobile No</Form.Label>

                <Form.Control
                  name="mobile"
                  type="text"
                  placeholder="Mobile No"
                  onChange={event => setMobile(event.target.value)} value={mobile}
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="E-Mail ID"
                  onChange={event => setEmail(event.target.value)} value={email}
                />
              </div>
            </Row>
          </Form.Group>
          <hr className="hr" />
          <h4>Skills</h4>
          <Form.Check inline id="1" label="Therapeutic Massage" name="group1" />
          <Form.Check inline id="2" label="Sports Massage" name="group1" />
          <Form.Check inline id="3" label="Yoga Massage" name="group1" />
          <Form.Check inline id="4" label="Swedish Massage" name="group1" />

          <hr className="hr" />
          <h4>Social</h4>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Facebook</Form.Label>
            <Form.Control type="text" placeholder="Facebook" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>WhatsApp</Form.Label>
            <Form.Control type="text" placeholder="WhatsApp" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Instagram</Form.Label>
            <Form.Control type="text" placeholder="Instagram" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Twitter</Form.Label>
            <Form.Control type="text" placeholder="Twitter" />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button onClick={() => props.handleSave({ upname: name, updescription: description, upmobile: mobile, upemail: email })}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MyEditProfileModal;
