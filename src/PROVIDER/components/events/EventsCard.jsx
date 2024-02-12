import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const EventsCard = (props) => {
  var tip = props.tip ? props.tip : 0;
  var instructions = props.instructions ? props.instructions : '';
  let badge = props.newclient ? <Badge pill bg="warning shadow" style={{ width: 'auto', width: '70px', position: 'absolute', top: '8px', right: '-12px' }}>New</Badge> : '';
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
        <Card.Body>
          <Row>
            <div className="col-md-10">
              <div>
                <FontAwesomeIcon icon={faLocationDot} style={{ width: 20 }} />{" "}
                {props.location}
              </div>
              <div>
                <FontAwesomeIcon icon={faClock} style={{ width: 20 }} /> {props.time}
              </div>
              <div>
                {instructions != '' ? <><strong className="mt-1">Instructions : </strong> {instructions} </> : ''}
              </div>
            </div>
            <div className="col-md-2" style={{ textAlign: "right" }}>
              <div>${props.amt}</div>
              <div>+${tip} pre-tip</div>
              <div className="text-warning">Total = ${props.amt + tip}</div>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventsCard;
