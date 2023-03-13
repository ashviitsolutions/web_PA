import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditAvaliabilityModal = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Availability
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
         <div className="text-bold">Monday</div>
          <Row>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
          </Row>
         <div className="text-bold">Tuesday</div>
          <Row>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
          </Row>
         <div className="text-bold">Wednesday</div>
          <Row>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
          </Row>
         <div className="text-bold">Thursday</div>
          <Row>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
          </Row>
         <div className="text-bold">Friday</div>
          <Row>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
          </Row>
         <div className="text-bold">Saturday</div>
          <Row>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
          </Row>
         <div className="text-bold">Sunday</div>
          <Row>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
             <Form.Group className="col-6 mb-3 mt-2">
               <Form.Control type="time" placeholder="Name" />
             </Form.Group>
          </Row>
          
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAvaliabilityModal;
