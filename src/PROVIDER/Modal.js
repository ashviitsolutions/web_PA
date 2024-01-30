import {
  faClock,
  faLocationDot,
  faCalendar,
  faEnvelope,
  faInfoCircle,
}
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapModal from "react-bootstrap/Modal";

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
        <p className="title">{title} (90min) - Couple</p>
        <div className="col-md-12 detailsTable">
          {/* booking details */}
          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Booking Info
          </div>
          <div className="container row detailInfo">
            <div div className="col-md-6 title">
              Booking Type
            </div>
            <div div className="col-md-6">
              Couple
            </div>
            <div className="col-md-6 title">Duration and Earning</div>
            <div className="col-md-3">90Min</div>
            <div className="col-md-3 title">135$</div>
            <div div className="col-md-6 title">
              Location:
            </div>
            <div className="col-md-6">{location}</div>
            <div className="col-md-6 title">Direction</div>
            <div className="col-md-6">
        <a href="#" className="btn btn-sm btn-link"><FontAwesomeIcon icon={faLocationDot} /> Get Direction</a></div>
            <div div className="col-md-6 title">
              Date/Time:
            </div>
            <div className="col-md-6">30-01-2024/{time}</div>
          </div>

           {/* Customer details */}
           <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Customer Info
          </div>
          <div className="container row detailInfo">
            <div div className="col-md-6 title">
              Gender:
            </div>
            <div className="col-md-6">Male, Female</div>
          </div>

          {/* Health Datails details */}
          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Health/Massage Info
          </div>
          <div className="container row detailInfo">
          <div div className="col-md-6 title">
              Area of Concern:
            </div>
            <div className="col-md-6">Pain, Stress, Anxiety</div>
            <div div className="col-md-6 title">
              Health Issues:
            </div>
            <div className="col-md-6">Arthritis, Digestive Disorder</div>
            <div div className="col-md-6 title">
              Special Concideration:
            </div>
            <div className="col-md-6">I prefer Geriatric Massage</div>
            <div div className="col-md-6 title">
              Massage Body Part:
            </div>
            <div className="col-md-6">Neck</div>
            <div div className="col-md-6 title">
              Massage Pressure:
            </div>
            <div className="col-md-6">Light</div>
            <div div className="col-md-6 title">
              Any Other Remark:
            </div>
            <div className="col-md-6">No Remark</div>
          </div>

          {/* Health Datails details */}
          {/* <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Health/Massage Info (Female)
          </div>
          <div className="container row detailInfo">
          <div div className="col-md-6 title">
              Area of Concern:
            </div>
            <div className="col-md-6">Pain, Stress, Anxiety</div>
            <div div className="col-md-6 title">
              Health Issues:
            </div>
            <div className="col-md-6">Arthritis, Pregnancy</div>
            <div div className="col-md-6 title">
              Special Concideration:
            </div>
            <div className="col-md-6">I prefer Geriatric Massage</div>
            <div div className="col-md-6 title">
              Massage Body Part:
            </div>
            <div className="col-md-6">Neck</div>
            <div div className="col-md-6 title">
              Massage Pressure:
            </div>
            <div className="col-md-6">Light</div>
            <div div className="col-md-6 title">
              Any Other Remark:
            </div>
            <div className="col-md-6">No Remark</div>
          </div> */}

          <div class="alert alert-warning" role="alert">
            <p className="title">Accept before anyone else does!</p>
            <p>This service request might have sent to multiple providers near to client location, accept the service before anyone else does!</p>
          </div>
          {/* <div class="alert alert-dark" role="alert">
            <p className="title">Wait for schedule date to check in!</p>
            <p>You will be able to check in for this service request once your calender and clock reaches the right date and time!</p>
          </div> */}
          
          {/* <div class="alert alert-success" role="alert">
            <p className="title">Check-In to Start!</p>
            <p>Be on time to start your service, click on <b>check in!</b></p>
          </div> */}

        </div>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Accept
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

export default CustomModal;
