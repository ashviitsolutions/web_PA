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

  // Function to get current time in 12-hour format
  // Function to get current time in 12-hour format along with AM/PM
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const isAM = hours < 12;
    if (!isAM) {
      hours -= 12;
    }
    hours = hours === 0 ? 12 : hours;
    return { hours: String(hours).padStart(2, '0'), minutes: String(minutes).padStart(2, '0'), isAM };
  };

  useEffect(() => {
    const currentTime = getCurrentTime();
    setHour(currentTime.hours);
    setMinute(currentTime.minutes);
    setAm(currentTime.isAM);
    setPm(!currentTime.isAM); // Set PM to the opposite of AM
  }, []);


  console.log("booking serviceid", service_id)

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const timeValue = `${hour}:${minute} ${am ? 'AM' : 'PM'}`;
      const formData = {
        service_id: service_id, // Include service_id here
        id: _id,
        date: date,
        checkin: timeValue,
      };

      console.log("formData data value", formData);

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
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Enter Time  {am}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input type="text" className="form-control" placeholder="Hour" value={hour} />
          </div>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input type="text" className="form-control" placeholder="Minutes" value={minute} />
          </div>
          <div className="col-4">
            <Button className={`form-control btn-sm mb-1 ${am ? 'active' : ''}`} onClick={() => { setAm(true); setPm(false); }}>A.M.</Button>
            <Button className={`form-control btn-sm ${pm ? 'active' : ''}`} onClick={() => { setAm(false); setPm(true); }}>P.M.</Button>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button onClick={onSubmit} disabled={loading}>{loading ? "Loading..." : "Done"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
