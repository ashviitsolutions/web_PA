import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const RequestCard = (props) => {
  var tip = props.tip?props.tip:0;
  var instructions = props.instructions?props.instructions:'';
  let badge = props.newclient ? <Badge pill bg="warning shadow-sm" style={{width: '70px',position: 'absolute',top: '8px',right: '-12px',fontSize: '0.7rem'}}>New</Badge> :'';
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
                {props.location}
              </div>
              <div>
                <FontAwesomeIcon icon={faClock} style={{ width: 20 }} /> {props.time}
              </div>
              <div>
                {instructions!==''?<><strong className="mt-1">Instructions : </strong> {instructions} </>:''}
              </div>
            </div>
            <div className="col-md-4" style={{ textAlign: "right" }}>
              <div>${props.amt}</div>
              <div>+${tip} pre-tip</div>
              <div className="text-warning">Total = ${props.amt+tip}</div>
            </div>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button className="mx-2 btn-sm">
            Accept
          </Button>
          <Button className="nofillbtn btn-sm">Reject</Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default RequestCard;
