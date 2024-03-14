import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { IP } from "../../../Constant";
import { useNavigate } from "react-router-dom";

function CustomModal({
  title,
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
  user_id,
  add_ons_details,
  onClose,
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
  console.log("massage_for", getdirection.coordinates);

  const getlocation= getdirection.coordinates
  const token = localStorage.getItem("providertoken");
  const [checkInShow, setCheckInShow] = useState(false);
  const [checkOutShow, setCheckOutShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const nav = useNavigate();

  const handleClose = () => {
    onHide();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("_id", _id);
      bodyFormData.append("response", "accept");
      const res = await axios.put(
        `${IP}/provider/service_response`,
        bodyFormData,
        {
          headers: {
            Authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        if (event === "event_value") {
          nav("/providers");
        } else {
          nav("/providers/events");
        }
        onHide(); // Call onHide to close the modal
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const removeItem = () => {
    localStorage.setItem("removedCard", _id);
    onHide(); // Call onHide to close the modal
  };

  const handleCheckInClick = () => {
    setCheckInShow(true);
  };

  const handleCheckOutClick = () => {
    setCheckOutShow(true);
  };

  const formattedScheduledDate = new Date(date).toLocaleDateString();

  useEffect(() => {
    let tax = amount_calculation?.amount_tip;
    let addonsprice = amount_calculation?.amount_addon;
    const time_status = serviceTime;
    let basePrice = 70;

    if (time_status === "90 minutes") {
      basePrice += 35;
    } else if (time_status === "120 minutes") {
      basePrice += 70;
    }

    if (gendercheck === "partner") {
      basePrice *= 2;
    }

    let totalPriceAddons = addonsprice;
    const calculateaadon = totalPriceAddons * 0.14;

    let totalPriceWithAddons = basePrice + calculateaadon;

    totalPriceWithAddons += tax;

    setTotalPrice(totalPriceWithAddons);
  }, [serviceTime, gendercheck, add_ons_details, amount_calculation?.amount_tip]);

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

        <span className="title">Addons: </span>
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

        <div className="col-md-12 detailsTable">
          <span className="title">Payment status: {status} </span>

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
            <div className="col-md-3 title">{totalPrice.toFixed(2)}$</div>
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

          {sheduleEvent && (
            <div class="alert alert-success" role="alert">
              <p className="title">Check-In to Start!</p>
              <p>Be on time to start your service, click on <b>check in!</b></p>
            </div>
          )}

          {newclient && (
            <div class="alert alert-warning" role="alert">
              <p className="title">Accept before anyone else does!</p>
              <p>This service request might have sent to multiple providers near to client location, accept the service before anyone else does!</p>
            </div>
          )}
        </div>
      </BootstrapModal.Body>
      {newclient && (
        <BootstrapModal.Footer>
          <Button variant="primary" onClick={onSubmit} disabled={loading}>
            {loading ? "Accepting..." : "Accept"}
          </Button>
          <Button className="nofillbtn btn-sm" onClick={removeItem}>
            Reject
          </Button>
        </BootstrapModal.Footer>
      )}

      {sheduleEvent && (
        <BootstrapModal.Footer>
          <Button className="mx-2 btn-sm" onClick={handleCheckInClick}>
            Check In
          </Button>
          <Button className="btn-sm" onClick={handleCheckOutClick}>
            Check Out
          </Button>
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
}

export default CustomModal;
