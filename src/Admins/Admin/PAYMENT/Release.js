import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLocationDot } from "@fortawesome/free-solid-svg-icons";


function Release({ show, onHide }) {
    const [checkInShow, setCheckInShow] = useState(false);

    const handleClose = () => {
        onHide();
    };

    const handleCheckInClick = () => {
        setCheckInShow(true);
    };

    const handleCheckInModalClose = () => {
        setCheckInShow(false);
    };

    return (
        <BootstrapModal show={show} onHide={handleClose}>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>Booking Details</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                <p className="title">Booking Title - Service Time - Massage For</p>
                {/* Other details */}
                <div className="col-md-12 detailsTable">
                    <div className="title detailTitle">
                        <FontAwesomeIcon icon={faInfoCircle} /> Addons Info
                    </div>
                    <span className="title">Addon 1, Addon 2, Addon 3</span>
                    {/* Other details */}
                    <div className="title detailTitle">
                        <FontAwesomeIcon icon={faInfoCircle} /> Booking Info
                    </div>
                    <div className="container row detailInfo">
                        <div className="col-md-6 title">
                            Booking Type
                        </div>
                        <div className="col-md-6">Location Type</div>
                        {/* Other details */}
                    </div>
                    {/* Other details */}
                </div>
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button className="mx-2 btn-sm" onClick={handleCheckInClick}>
                    Assign Event
                </Button>
            </BootstrapModal.Footer>

        </BootstrapModal>
    );
}

export default Release;
