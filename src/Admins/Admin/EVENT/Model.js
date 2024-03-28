import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { IP } from "../../../Constant";
import { useNavigate } from "react-router-dom";
import Provider from "./Provider";

function CustomModal({
  title,
  booking_status,
  serviceTime,
  massage_for,
  gender,
  areasOfConcern,
  specialConsiderations,
  massageBodyPart,
  healthConditions,
  locationType,
  location,
  amount_calculation,
  time,
  providerId,
  add_ons_details,
  bookingId,
  event,
  gendercheck,
  date,
  show,
  address,
  onHide,
  status,
  _id,
  newclient,
  getdirection,
  sheduleEvent,
}) {
  console.log("amount_calculation ", amount_calculation);

  const getlocation = getdirection.coordinates
  const token = localStorage.getItem("providertoken");
  const [checkInShow, setCheckInShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mainCardShow, setMainCardShow] = useState(true);

  const nav = useNavigate();

  const handleClose = () => {
    onHide();
  };


  const handleCheckInClick = () => {
    setCheckInShow(true);
    setMainCardShow(false);
  };

  const handleCheckInModalClose = () => {
    setCheckInShow(false);
    setMainCardShow(true);
  };

  const formattedScheduledDate = new Date(date).toLocaleDateString();



  const lat = getlocation && getlocation.length >= 2 ? getlocation[0] : "";
  const lon = getlocation && getlocation.length >= 1 ? getlocation[1] : "";
  const zoom = 16;

  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Booking Details</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="title">{title} {serviceTime} - {massage_for}</p>



        <div className="col-md-12 detailsTable">
          <span className="title">Payment status: {status} </span>
          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Addons Info
          </div>

          {add_ons_details ? (
            <span className="title">
              {add_ons_details.map((addon, index) => (
                <span key={index}>
                  {addon.title}
                  {index !== add_ons_details.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          ) : (
            <span className="title">No add-ons selected</span>
          )}
          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Booking Info
          </div>
          <div className="container row detailInfo">
            <div div className="col-md-6 title">
              Booking Type
            </div>
            <div div className="col-md-6">
              {locationType}
            </div>
            <div className="col-md-6 title">Duration and Earning</div>
            <div className="col-md-3">{serviceTime}</div>
            <div className="col-md-3 title">{amount_calculation?.total_amount?.toFixed(2)}$</div>
            <div div className="col-md-6 title">
              Location:
            </div>
            <div className="col-md-6">{address}</div>
            <div className="col-md-6 title"> Direction </div>
            <div className="col-md-6">
              <a
                href={`https://maps.google.com/maps?q=${lat},${lon}&z=${zoom}`}
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "blue" }}
                className="btn btn-sm btn-link"
              >
                <FontAwesomeIcon icon={faLocationDot} /> Get Direction
              </a>
            </div>
            <div div className="col-md-3 title">
              Date:
            </div>
            <div className="col-md-3">{formattedScheduledDate}</div>
            <div div className="col-md-3 title">
              Time:
            </div>
            <div className="col-md-3">{time}</div>
          </div>

          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Customer Info
          </div>
          <div className="container row detailInfo">
            <div div className="col-md-6 title">
              Gender:
            </div>
            <div className="col-md-6">{gender}</div>
          </div>

          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Health/Massage Info
          </div>
          <div className="container row detailInfo">
            <div className="col-md-6 title">
              Area of Concern:
            </div>
            <div className="col-md-6">{areasOfConcern ? areasOfConcern.join(', ') : ""}</div>
            <div className="col-md-6 title">
              Health Issues:
            </div>
            <div className="col-md-6">{healthConditions ? healthConditions.join(', ') : ""}</div>
            <div className="col-md-6 title">
              Special Consideration:
            </div>
            <div className="col-md-6">{specialConsiderations ? specialConsiderations.join(', ') : ""}</div>
            <div className="col-md-6 title">
              Massage Body Part:
            </div>
            <div className="col-md-6">{massageBodyPart ? massageBodyPart.join(', ') : ""}</div>
          </div>


        </div>
      </BootstrapModal.Body>
      {booking_status === "pending" && (
        <BootstrapModal.Footer>
          <Button
            className="mx-2 btn-sm"

            onClick={handleCheckInClick}

          >
            Assign Event
          </Button>
        </BootstrapModal.Footer>
      )}





      {checkInShow && (
        <Provider
          show={checkInShow}
          onHide={handleCheckInModalClose}
          user_id={_id}
          date={date}
          _id={_id}
        />
      )}

    </BootstrapModal>
  );
}

export default CustomModal;
