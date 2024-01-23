import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, Card, Row } from "react-bootstrap";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import Checkouts from "./Checkout";
import { IP } from "../../Constant";
import Modal from "../Modal";



const ScheduledRequestCard = (props) => {
  const { handleClose, user_id, _id, amount, title, date, location, time, instructions = props.instructions ? props.instructions : '' } = props;
  const [user, setUser] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading state



  const token = localStorage.getItem("providertoken");
  const tokenapi = localStorage.getItem("removedChekincard");

  const showCheckInButton = (tokenapi !== _id);


  const formattedDate = new Date().toLocaleDateString();  // formatted as M/D/YYYY
  const formattedScheduledDate = new Date(date).toLocaleDateString();  // format the date in the same way

  const isDisabled = formattedDate !== formattedScheduledDate;


  const handleCloseModal = () => {
    setIsLoading(false);
    handleClose(); // Call the function to close the modal
  };


  const handleClick = () => {

    fetchData(_id);
  };


  const fetchData = async (id) => {
    try {
      console.log('Fetching data for ID:', id);

      const response = await fetch(`${IP}/provider/events/booking/${id}`, {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setUser(result.bookings);
      console.log("scheduled api id based", result?.bookings);

    } catch (error) {
      console.log('Error fetching data:', error.message);
      // You can handle the error here, e.g., set an error state, show a message, etc.
    }
  };

  console.log("scheduled api id user", user);

  return (
    <>
      {Array.isArray(user) && user.length > 0 && <Modal user={user} onClose={handleCloseModal} />}
      <div>
        <Card className="shadow-sm mb-2">
          <Card.Title
            className="px-3"
          >
            {props.title}
          </Card.Title>
          <Card.Body>
            <Row>
              <div className="col-md-8" onClick={handleClick}>
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
              <div className="col-md-4" style={{ textAlign: "right" }}>

                <div className="text-warning">Total = ${amount}</div>
              </div>
            </Row>
          </Card.Body>
          <Card.Footer>

            {showCheckInButton ? (
              <Button className="mx-2 btn-sm" disabled={isDisabled} onClick={() => setModalShow(true)}
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
    </>

  );
};

export default ScheduledRequestCard;
