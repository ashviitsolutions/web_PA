import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { IP } from "../../../Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../layouts/dashboard";


const RequestCard = (props) => {
  const token = localStorage.getItem("providertoken")
  const { total } = props;
  const { _id } = props;
  var tip = props.tip ? props.tip : 0;
  var instructions = props.instructions ? props.instructions : '';
  let badge = props.newclient ? <Badge pill bg="warning shadow-sm" style={{ width: '70px', position: 'absolute', top: '8px', right: '-12px', fontSize: '0.7rem' }}>New</Badge> : '';
  const nav = useNavigate()

  const [display, setDisplay] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault()

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
        setDisplay(false);
      }

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    onSubmit();
  }, [_id]);



  const removeItem = () => {
    localStorage.setItem('removedCard', _id); // set new _id
    setDisplay(false);
  };

  useEffect(() => {
    const removedCardId = localStorage.getItem('removedCard');
    if (removedCardId) {
      if (removedCardId === _id) {
        setDisplay(false);
      } else {
        setDisplay(true);
      }
    }
  }, [_id]);


  if (!display) {
    return null;
  }

  return (

    <div>
      <Card className="mb-2">
        {badge}
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
                {props.address}
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
              <div>${props.amt}</div>
              <div>+${tip} pre-tip</div>
              <div className="text-warning">Total = ${total}</div>
            </div>
          </Row>
        </Card.Body>
        <Card.Footer>
          <button className="mx-2 btn-sm btn btn-primary" onClick={onSubmit}>Accept</button>

          <Button className="nofillbtn btn-sm" onClick={removeItem}>
            Reject
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default RequestCard;
