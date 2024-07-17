import {
  faClock,
  faLocationDot,
  faCalendar,
  faEnvelope,
  faInfoCircle,
}
  from "@fortawesome/free-solid-svg-icons";
import { IP } from "../Constant";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapModal from "react-bootstrap/Modal";
import MyVerticallyCenteredModal from "./components/MyVerticallyCenteredModal";
import Checkouts from "./components/Checkout";
import { useNavigate } from "react-router-dom";

function CustomModal(
  { title, paymentIntentId, serviceTime, massage_for, gender, areasOfConcern, specialConsiderations, massageBodyPart, healthConditions, locationType,
    location,
    amount_calculation,
    time,
    user_id,
    service_id,
    onClose,
    event,
    gendercheck,
    date,
    show,
    onHide,
    _id,
    newclient,
    getdirection,
    sheduleEvent
  }
) {

  console.log("paymentIntentIdpaymentIntentIdpaymentIntentIdpaymentIntentIdpaymentIntentId", paymentIntentId)







  const token = localStorage.getItem("providertoken");
  const [checkInShow, setCheckInShow] = useState(false);
  const [checkOutShow, setCheckOutShow] = useState(false);
  const [mainCardShow, setMainCardShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()

  const handleClose = () => {
    onHide();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("_id", _id);
      bodyFormData.append("response", "accept");
      const res = await axios.put(`${IP}/provider/service_response`, bodyFormData, {
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      if (res.status === 200) {
        if (event === "event_value") {
          nav("/providers/events");
        } else {
          nav("/providers");
        }
        onHide();
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };


  const removeItem = () => {
    localStorage.setItem('removedCard', _id); // set new _id
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

  const handleCheckOutModalClose = () => {
    setCheckOutShow(false);
    setMainCardShow(true);
  };
  const handleCheckOutClick = () => {
    setCheckOutShow(true);
    // setMainCardShow(false);
  };


  const formattedDate = new Date().toLocaleDateString();
  const formattedScheduledDate = new Date(date).toLocaleDateString();
  const isDisabled = formattedDate !== formattedScheduledDate;

  const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
  const showCheckInButton = !removedChekincardArray.includes(_id);
  const [totalPrice, setTotalPrice] = useState(0);






  const lat = getdirection && getdirection.length >= 2 ? getdirection[0] : '';
  const lon = getdirection && getdirection.length >= 1 ? getdirection[1] : '';


  const zoom = 16; // 15 is ideal


  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Booking Details</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {/* Display user data in the modal */}
        <p className="title">{title} {serviceTime} - {massage_for}</p>

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
              On Demand - {locationType}
            </div>
            <div className="col-md-6 title">Duration and Earning</div>
            <div className="col-md-3">{serviceTime}</div>
            <div className="col-md-3 title">{amount_calculation?.totalAmount?.toFixed(2)}$</div>
            <div div className="col-md-6 title">
              Location:
            </div>
            <div className="col-md-6">{location}</div>
            <div className="col-md-6 title"> Direction </div>

            <div className="col-md-6">
              <a href={`https://maps.google.com/maps?q=${lat},${lon}&z=${zoom}`}
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "blue" }}
                className="btn btn-sm btn-link"><FontAwesomeIcon icon={faLocationDot} /> Get Direction</a>
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

          {/* Customer details */}
          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Customer Info
          </div>
          <div className="container row detailInfo">
            <div div className="col-md-6 title">
              Gender:
            </div>
            <div className="col-md-6">
              {gender ? (
                gender.map((g, index) => (
                  <div key={index}>{g}</div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>



          </div>

          {/* Health Datails details */}
          {/* Health Datails details */}
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




          {
            sheduleEvent && (
              <div class="alert alert-success" role="alert">
                <p className="title">Check-In to Start!</p>
                <p>Be on time to start your service, click on <b>check in!</b></p>
              </div>


            )
          }










          {
            newclient && (
              <div class="alert alert-warning" role="alert">
                <p className="title">Accept before anyone else does!</p>
                <p>This service request might have sent to multiple providers near to client location, accept the service before anyone else does!</p>
              </div>
            )
          }






        </div>
      </BootstrapModal.Body>
      {
        newclient && (
          <BootstrapModal.Footer>

            <Button variant="primary" onClick={onSubmit} disabled={loading}>
              {loading ? "Accepting..." : "Accept"}

            </Button>
            <Button className="nofillbtn btn-sm" onClick={removeItem} >
              Reject
            </Button>


          </BootstrapModal.Footer>
        )
      }























      {sheduleEvent && (
        <BootstrapModal.Footer>
          {showCheckInButton ? (
            <Button
              className="mx-2 btn-sm"

              onClick={handleCheckInClick}

            >
              Check In
            </Button>
          ) : (
            <Button className="btn-sm" onClick={handleCheckOutClick}>
              Check Out
            </Button>
          )}
        </BootstrapModal.Footer>
      )}





      {checkInShow && (
        <MyVerticallyCenteredModal
          show={checkInShow}
          onHide={handleCheckInModalClose}
          service_id={service_id}
          date={date}
          _id={_id}
        />
      )}

      {checkOutShow && (
        <Checkouts
          show={checkOutShow}
          onHide={handleCheckOutModalClose}
          paymentIntentId={paymentIntentId}
          service_id={service_id}
          date={date}
          _id={_id}
        />
      )}








    </BootstrapModal>
  );
}

export default CustomModal;
