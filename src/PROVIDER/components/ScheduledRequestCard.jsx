import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faCalendar, faClock, faLocationDot, faCoins } from "@fortawesome/free-solid-svg-icons";

import CustomModal from "../Modal";

const ScheduledRequestCard = (props) => {
  const {
    handleClose,
    _id,
    service_id,
    title,
    amount_calculation,
    date,
    serviceTime,
    massage_for,
    getlocation,
    instructions = props.instructions ? props.instructions : '',
  } = props;


  console.log("serviceTime", serviceTime)

  let badge = props.newclient ? <Badge pill bg="warning shadow-sm" style={{ width: '70px', position: 'absolute', top: '8px', right: '-12px', fontSize: '0.7rem' }}>New</Badge> : '';
  const [checkInShow, setCheckInShow] = useState(false);

  const [mainCardShow, setMainCardShow] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);


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








  console.log("service_id", service_id)






  return (
    <>
      {mainCardShow && (
        <div>
          <Card className="mb-2 pointer" onClick={handleCheckInClick} >
            {badge}
            <Card.Title
              className="px-3"
            >
              <p className="title">{title} {serviceTime} - {massage_for}</p>
            </Card.Title>
            <Card.Body>
              <Row>
                <div className="col-md-8 cardLeft" >
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} style={{ width: 20 }} />{" "}
                    {props.location}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faClock} style={{ width: 20 }} /> {props.time}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCalendar} style={{ width: 20 }} /> {props.date}
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
                  <div className="earn"><span><FontAwesomeIcon icon={faCoins} /></span> {amount_calculation?.totalAmount?.toFixed(2)}$</div>
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
          getdirection={getlocation}
          specialConsiderations={props.specialConsiderations}
          massageFor={props.massage_for}
          massageBodyPart={props.massageBodyPart}
          healthConditions={props.healthConditions}
          areasOfConcern={props.areasOfConcern}
          locationType={props.locationType}
          serviceTime={serviceTime}
          gender={props.gender}
          massage_for={props.massage_for}
          time={props.time}
          date={props.date}
          _id={props._id}
          paymentIntentId={props.paymentIntentId}
          service_id={service_id}
          add_ons_details={props.add_ons_details}
          amount_calculation={props.amount_calculation}
          onClose={handleCloseModal}


        />
      )}


    </>
  );
};

export default ScheduledRequestCard;
