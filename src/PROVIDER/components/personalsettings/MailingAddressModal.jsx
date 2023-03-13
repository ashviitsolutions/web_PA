import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MailingAddressModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Mailing Address
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Address Line</Form.Label>
            <Form.Control type="text" placeholder="Address Line" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>APT Number</Form.Label>
            <Form.Control type="text" placeholder="APT Number" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Postal Code" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Country" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MailingAddressModal;
