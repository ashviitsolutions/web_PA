import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faCalendar, faClock, faLocationDot, faCoins } from "@fortawesome/free-solid-svg-icons";
import { IP } from "../../../Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../Modal";



const RequestCard = (props) => {
  const token = localStorage.getItem("providertoken");
  const { total, onHide, gendercheck, add_ons, amount_calculation, add_ons_details, event, location } = props;
  const { _id } = props;
  var tip = props.tip ? props.tip : 0;
  var instructions = props.instructions ? props.instructions : '';
  let badge = props.newclient ? <Badge pill bg="warning shadow-sm" style={{ width: '70px', position: 'absolute', top: '8px', right: '-12px', fontSize: '0.7rem' }}>New</Badge> : '';
  const nav = useNavigate();

  const [display, setDisplay] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const [totalPrice, setTotalPrice] = useState(0);

  console.log("amount_calculation", amount_calculation)









  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const removedCardString = localStorage.getItem('removedCard');
    const removedCardIds = removedCardString ? JSON.parse(removedCardString) : [];
    if (removedCardIds.includes(_id)) {
      setDisplay(false);
    }
  }, [_id]);
  

  if (!display) {
    return null;
  }










  return (

    <div  >
      <Card className="mb-2 pointer" onClick={openModal} >
        {badge}
        <Card.Title
          className="px-3"
        >
          {props.title} {props.serviceTime} - {props.massage_for}
        </Card.Title>
        <Card.Body>
          <Row>
            <div className="col-md-8 cardLeft" >
              <div>
                <FontAwesomeIcon icon={faLocationDot} style={{ width: 20 }} />{" "}
                {props.address}
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
          <button className="mx-2 btn-sm btn btn-primary" >Review Request</button>

          {/* <Button className="nofillbtn btn-sm" onClick={removeItem}>
            Reject
          </Button> */}
        </Card.Footer>
      </Card>
      <CustomModal
        event={event}
        show={showModal}
        onHide={closeModal}
        title={props.title}
        location={props.address}
        getdirection={location}
        time={props.time}
        date={props.date}
        _id={props._id}
        serviceTime={props.serviceTime}
        massage_for={props.massageFor}
        specialConsiderations={props.specialConsiderations}
        massageBodyPart={props.massageBodyPart}
        healthConditions={props.healthConditions}
        areasOfConcern={props.areasOfConcern}
        gender={props.gender}
        locationType={props.locationType}
        newclient={props.newclient}
        paymentIntentId={props.paymentIntentId}
        add_ons_details={props.add_ons_details}
        massage_pressure={props.massage_pressure}
        amount_calculation={props.amount_calculation}
      />
    </div>
  );
};

export default RequestCard;
