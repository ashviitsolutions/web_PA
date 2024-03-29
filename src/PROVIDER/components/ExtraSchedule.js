import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot, faCoins } from "@fortawesome/free-solid-svg-icons";

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

  const [mainCardShow, setMainCardShow] = useState(true);



  const [isLoading, setIsLoading] = useState(true);


  const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
  const showCheckInButton = !removedChekincardArray.includes(_id);

  const formattedDate = new Date().toLocaleDateString();
  const formattedScheduledDate = new Date(date).toLocaleDateString();
  const isDisabled = formattedDate !== formattedScheduledDate;


  const handleCloseModal = () => {
    console.log("Modal closed!");
    setIsLoading(false);
    handleClose();
  };

  const handleCheckInClick = () => {
    setCheckInShow(true);
    setMainCardShow(false);
  };



  const handleCheckInModalClose = () => {
    setCheckInShow(false);
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

                <div className="col-md-4 tip">
                  <p>you'll earn</p>
                  {/* <div>${props.amt}</div>
                <div>+${tip} pre-tip</div>
                <div className="text-warning">Total = ${total}</div> */}
                  <div className="earn"><span><FontAwesomeIcon icon={faCoins} /></span>Total {amount}$</div>
                </div>





              </Row>
            </Card.Body>
            <Card.Footer>
              {showCheckInButton ? (
                <Button
                  className="mx-2 btn-sm"
                  onClick={handleCheckInClick}
                >
                  Check In
                </Button>
              ) : (
                <Button className="btn-sm" onClick={handleCheckInClick}>
                  Check Out
                </Button>
              )}
            </Card.Footer>
          </Card>
        </div>
      )}

      {checkInShow && (
        <CustomModal
          sheduleEvent="true"
          show={checkInShow}
          onHide={handleCheckInModalClose}
          title={props.title}
          location={props.location}
          time={props.time}
          date={props.date}
          _id={props._id}
          user_id={props.user_id}
          onClose={handleCloseModal}


        />
      )}


    </>
  );
};

export default ScheduledRequestCard;
