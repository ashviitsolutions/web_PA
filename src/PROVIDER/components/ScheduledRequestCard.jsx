import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

const ScheduledRequestCard = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  var tip = props.tip?props.tip:0;
  var instructions = props.instructions?props.instructions:'';
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
          <Button className="mx-2 btn-sm" onClick={() => setModalShow(true)}>
            Check In
          </Button>
          <Button className="btn-sm" onClick={() => setModalShow(true)}>Check Out</Button>
        </Card.Footer>
      </Card>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default ScheduledRequestCard;
