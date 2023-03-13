import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PayoutInformationModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Payout Information
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Routing Number</Form.Label>
            <Form.Control type="text" placeholder="Routing Number" />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="text" placeholder="Account Number" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PayoutInformationModal;
