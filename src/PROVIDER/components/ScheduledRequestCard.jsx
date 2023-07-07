import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import Checkouts from "./Checkout";
// import { IP } from "../../Constant";

const ScheduledRequestCard = (props) => {
  const { user_id,_id, amount, title,date, location, time, instructions = props.instructions ? props.instructions : '' } = props;

  // const [user_id]=props;
  // const {amount} =props;
  const [modalShow, setModalShow] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);
  // var tip = props.amount ? props.amount : 0;
  // var instructions = props.instructions ? props.instructions : '';
  // const [user_id, setUser] = useState([]);
  // const token = localStorage.getItem("providertoken");

  const tokenapi = localStorage.getItem('removedChekincard');

  const showCheckInButton = (tokenapi !== _id); 
  // const isDisabled = new Date().getDate() !== props.time;


  const dates = new Date();
  const day = String(dates.getDate()).padStart(2, '0');
  const month = String(dates.getMonth() + 1).padStart(2, '0');
  const year = dates.getFullYear();
  
  const formattedDate = `${day}-${month}-${year}`;
  
  const isDisabled = formattedDate !== props.date;
  

// console.log("date formate",formattedDate)





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
        <Card.Footer>

          {showCheckInButton ? (
            <Button className="mx-2 btn-sm" disabled={isDisabled}  onClick={() => setModalShow(true)} 
            style={{ backgroundColor: isDisabled ? "dimgray" : null }}
            >
              Check In
            </Button>
          ) : (
            <Button className="btn-sm" onClick={() => setCheckout(true)}>
              Check Out
            </Button>
          )}

        </Card.Footer>
      </Card>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user_id={props.user_id}
        date={props.date}
        _id={props._id}
      />
      <Checkouts
        show={checkout}
        onHide={() => setCheckout(false)}
        user_id={props.user_id}
        date={props.date}
        _id={props._id}
      />
    </div>
  );
};

export default ScheduledRequestCard;
