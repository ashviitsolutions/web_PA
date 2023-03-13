import React from "react";
import { FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Enter Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <div className="col-4" style={{alignSelf:'center'}}>
            <input
              type="text"
              class="form-control"
              id="hr"
              placeholder="Hour"

            />
          </div>
          
          <div className="col-4" style={{alignSelf:'center'}}>
            <input
              type="text"
              class="form-control"
              id="min"
              placeholder="Minutes"
            />
          </div>
          <div className="col-4">
            <Button className="form-control btn-sm mb-1">A.M.</Button>
            <Button className="form-control btn-sm">P.M.</Button>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{justifyContent: 'center'}}>
        <Button onClick={props.onHide}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
