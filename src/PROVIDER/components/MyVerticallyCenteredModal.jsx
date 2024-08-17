import React, { useState, useEffect } from "react";
import { Row, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IP } from "../../Constant";

const MyVerticallyCenteredModal = (props) => {
  const nav = useNavigate();
  const { service_id, _id, date } = props;
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [am, setAm] = useState(true);
  const [pm, setPm] = useState(false);
  const token = localStorage.getItem("providertoken");
  const [loading, setLoading] = useState(false);

  // Function to get current time in 12-hour format along with AM/PM
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const isAM = hours < 12 || hours === 0;

    if (hours === 0) {
      hours = 12; // Convert midnight (0:00) to 12:00 AM
    } else if (hours > 12) {
      hours -= 12; // Convert 24-hour time to 12-hour time
    }

    return { hours: String(hours).padStart(2, '0'), minutes: String(minutes).padStart(2, '0'), isAM };
  };

  useEffect(() => {
    const currentTime = getCurrentTime();
    setHour(currentTime.hours);
    setMinute(currentTime.minutes);
    setAm(currentTime.isAM);
    setPm(!currentTime.isAM);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const timeValue = `${hour}:${minute} ${am ? 'AM' : 'PM'}`;
      const formData = {
        service_id: service_id,
        id: _id,
        date: date,
        checkin: timeValue,
      };

      const res = await axios.put(`${IP}/provider/update/checkin`, formData, {
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
        removedChekincardArray.push(_id);
        localStorage.setItem('removedChekincard', JSON.stringify(removedChekincardArray));
        props.onHide();
        nav("/providers");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered id="timer_selected">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Enter Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Hour" 
              value={hour} 
              onChange={(e) => setHour(e.target.value)} 
            />
          </div>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Minutes" 
              value={minute} 
              onChange={(e) => setMinute(e.target.value)} 
            />
          </div>
          <div className="col-4">
            <Button
              className="form-control btn-sm mb-1"
              onClick={() => { setAm(true); setPm(false); }}
              style={{
                backgroundColor: !am ? '#007bff' : '#6c757d',
                color: 'white',
                borderColor: !am ? '#007bff' : '#6c757d'
              }}
            >
              A.M.
            </Button>
            <Button
              className="form-control btn-sm"
              onClick={() => { setAm(false); setPm(true); }}
              style={{
                backgroundColor: !pm ? '#007bff' : '#6c757d',
                color: 'white',
                borderColor: !pm ? '#007bff' : '#6c757d'
              }}
            >
              P.M.
            </Button>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Loading..." : "Done"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
