import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import Checkouts from "./Checkout";
const BookingCard = (props) => {
  const { amount } = props;
  const [modalShow, setModalShow] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);
  var tip = props.amount ? props.amount : 0;
  var instructions = props.instructions ? props.instructions : '';



  return (
    <div>
      <Card className="shadow-sm mb-2">
        <Card.Title
          className="px-3"
        >
          {props.title}
        </Card.Title>
        <Card.Body>
          <Row>
            <div className="col-md-8">
              <div>
                <FontAwesomeIcon icon={faLocationDot} style={{ width: 20 }} />{" "}
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

      </Card>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Checkouts
        show={checkout}
        onHide={() => setCheckout(false)}
      />
    </div>
  );
};

export default BookingCard;
