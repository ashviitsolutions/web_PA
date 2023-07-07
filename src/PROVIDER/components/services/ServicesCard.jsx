import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const ServicesCard = (props) => {
  var tip = props.tip?props.tip:0;
  var instructions = props.instructions?props.instructions:'';
  let badge = props.newclient ? <Badge pill bg="warning shadow" style={{width:'auto',width: '70px',position: 'absolute',top: '8px',right: '-12px'}}>New</Badge> :'';
  return (
    <div>
      <Card className="shadow-sm mb-2">
         {badge}
        <Card.Title
          className="px-3"
          style={{ paddingLeft: "18px", paddingTop: "10px" }}
        >
          {props.title}
        </Card.Title>
       
      </Card>
    </div>
  );
};

export default ServicesCard;
