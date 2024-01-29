import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapModal from 'react-bootstrap/Modal';

function CustomModal({ title, location, time, onClose, show, onHide }) {

  const handleClose = () => {

    onHide();
  };

  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Booking Details</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {/* Display user data in the modal */}
        <p>User Data:</p>
        <ul>
          <li>Service Name: {title}</li>
          <li>Location: {location}</li>
          <li>scheduled Timing: {time}</li>
          {/* Add more user data as needed */}
        </ul>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

export default CustomModal;
