import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import Checkouts from "./Checkout";
import { IP } from "../../Constant";
import CustomModal from "../Modal";

const ScheduledRequestCard = (props) => {
  const {
    handleClose,
    user_id,
    _id,
    amount,
    title,
    date,
    location,
    time,
    instructions = props.instructions ? props.instructions : '',
  } = props;

  const [checkInShow, setCheckInShow] = useState(false);
  const [checkOutShow, setCheckOutShow] = useState(false);
  const [mainCardShow, setMainCardShow] = useState(true);

  const [user, setUser] = useState([]);
  const [checkout, setCheckout] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("providertoken");
  const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
  const showCheckInButton = !removedChekincardArray.includes(_id);

  const formattedDate = new Date().toLocaleDateString();
  const formattedScheduledDate = new Date(date).toLocaleDateString();
  const isDisabled = formattedDate !== formattedScheduledDate;

  ;
  const handleCloseModal = () => {
    console.log("Modal closed!");
    setIsLoading(false);
    handleClose();
  };

  const handleCheckInClick = () => {
    setCheckInShow(true);
    setMainCardShow(false);
  };

  const handleCheckOutClick = () => {
    setCheckOutShow(true);
    // setMainCardShow(false);
  };

  const handleCheckInModalClose = () => {
    setCheckInShow(false);
    setMainCardShow(true);
  };

  const handleCheckOutModalClose = () => {
    setCheckOutShow(false);
    setMainCardShow(true);
  };

  return (
    <>
      {mainCardShow && (
        <div>
          <Card className="shadow-sm mb-2">
            <Card.Title className="px-3">{props.title}</Card.Title>
            <Card.Body>
              <Row>
                <div className="col-md-8" onClick={handleCheckInClick}>
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} style={{ width: 20 }} />
                    {props.location}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faClock} style={{ width: 20 }} /> {props.time}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faClock} style={{ width: 20 }} /> {props.date}
                  </div>
                  <div>
                    {instructions !== '' ? <><strong className="mt-1">Instructions : </strong> {instructions} </> : ''}
                  </div>
                </div>
                <div className="col-md-4" style={{ textAlign: "right" }}>
                  <div className="text-warning">Total = ${amount}</div>
                </div>
              </Row>
            </Card.Body>
            <Card.Footer>
              {showCheckInButton ? (
                <Button
                  className="mx-2 btn-sm"
                  disabled={isDisabled}
                  onClick={handleCheckInClick}
                  style={{ backgroundColor: isDisabled ? "dimgray" : null }}
                >
                  Check In
                </Button>
              ) : (
                <Button className="btn-sm" onClick={handleCheckOutClick}>
                  Check Out
                </Button>
              )}
            </Card.Footer>
          </Card>
        </div>
      )}

      {checkInShow && (
        <CustomModal
          show={checkInShow}
          onHide={handleCheckInModalClose}
          title={props.title}
          location={props.location}
          time={props.time}
          onClose={handleCloseModal}
        />
      )}

      {checkInShow && (
        <MyVerticallyCenteredModal
          shows={checkInShow}
          onHide={handleCheckInModalClose}
          user_id={props.user_id}
          date={props.date}
          _id={props._id}
        />
      )}

      {checkOutShow && (
        <Checkouts
          show={checkOutShow}
          onHide={handleCheckOutModalClose}
          user_id={props.user_id}
          date={props.date}
          _id={props._id}
        />
      )}
    </>
  );
};

export default ScheduledRequestCard;
