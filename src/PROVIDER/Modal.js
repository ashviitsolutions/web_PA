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
  { title, serviceTime, massage_for, gender, areasOfConcern, specialConsiderations, massageBodyPart, healthConditions, locationType,
    location,
    time,
    user_id,
    onClose,
    date,
    show,
    onHide,
    _id,
    newclient,
    sheduleEvent
  }
) {







  const token = localStorage.getItem("providertoken");
  const [checkInShow, setCheckInShow] = useState(false);
  const [checkOutShow, setCheckOutShow] = useState(false);
  const [mainCardShow, setMainCardShow] = useState(true);

  const nav = useNavigate()

  const handleClose = () => {
    onHide();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
        onHide();
        // nav("/providers")
      }
    } catch (error) {
      console.error(error);
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
              {locationType}
            </div>
            <div className="col-md-6 title">Duration and Earning</div>
            <div className="col-md-3">{serviceTime}</div>
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
            <div className="col-md-6">{formattedScheduledDate}/{time}</div>
          </div>

          {/* Customer details */}
          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Customer Info
          </div>
          <div className="container row detailInfo">
            <div div className="col-md-6 title">
              Gender:
            </div>
            <div className="col-md-6">{gender}</div>
          </div>

          {/* Health Datails details */}
          <div className="title detailTitle">
            <FontAwesomeIcon icon={faInfoCircle} /> Health/Massage Info
          </div>
          <div className="container row detailInfo">
            <div div className="col-md-6 title">
              Area of Concern:
            </div>
            <div className="col-md-6">{areasOfConcern}</div>
            <div div className="col-md-6 title">
              Health Issues:
            </div>
            <div className="col-md-6">{healthConditions}</div>
            <div div className="col-md-6 title">
              Special Concideration:
            </div>
            <div className="col-md-6">{specialConsiderations}</div>
            <div div className="col-md-6 title">
              Massage Body Part:
            </div>
            <div className="col-md-6">{massageBodyPart}</div>

            {/* <div className="col-md-6">{massageBodyPart}</div>
            <div div className="col-md-6 title">
              Massage Pressure:
            </div>
            <div className="col-md-6">Light</div>
            <div div className="col-md-6 title">
              Any Other Remark:
            </div>
  <div className="col-md-6">No Remark</div> */}
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
            <Button variant="primary" onClick={onSubmit}>
              Accept
            </Button>
            <Button className="nofillbtn btn-sm" onClick={removeItem}>
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
          user_id={user_id}
          date={date}
          _id={_id}
        />
      )}

      {checkOutShow && (
        <Checkouts
          show={checkOutShow}
          onHide={handleCheckOutModalClose}
          user_id={user_id}
          date={date}
          _id={_id}
        />
      )}








    </BootstrapModal>
  );
}

export default CustomModal;
