import React from "react";
import { useState, useEffect } from "react";
import { FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { IP } from "../../Constant"
import { useNavigate } from "react-router-dom";
import ScheduledRequestCard from "./ScheduledRequestCard";

const MyVerticallyCenteredModal = (props) => {
  const nav = useNavigate()
  const {user_id} = props;
  const {_id}=props;
  const {date} = props;

  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [am, setAm] = useState('')
  const [pm, setPm] = useState('')
  const token = localStorage.getItem("providertoken")




 



  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const timeValue = `${hour}:${minute}`;
      const amOrPm = am ? 'am' : 'pm';
      const bodyFormData = new FormData();
      bodyFormData.append("service", user_id);
      bodyFormData.append("id", _id);
      bodyFormData.append("date", date);

      bodyFormData.append("checkin", `${timeValue} ${amOrPm}`);



      const res = await axios.put(`${IP}/provider/update/checkin`, bodyFormData, {
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      });
      // console.log(res);
      if (res.status === 200) {
        nav("/providers/scheduled-requests");
          props.onHide();
          localStorage.setItem('removedChekincard', _id); // set new _id
    }

    } catch (error) {
      console.error(error);
    }
  };




  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Enter Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input
              type="text"
              className="form-control"
              id="hr"
              placeholder="Hour"
              onChange={(e) => setHour(e.target.value)}

            />
          </div>

          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input
              type="text"
              class="form-control"
              id="min"
              placeholder="Minutes"
              onChange={(e) => setMinute(e.target.value)}
            />
          </div>

          <div className="col-4">
            <Button className={`form-control btn-sm mb-1 ${am ? 'active' : ''}`} onClick={() => { setAm(true); setPm(false) }}>A.M.</Button>
            <Button className={`form-control btn-sm ${pm ? 'active' : ''}`} onClick={() => { setAm(false); setPm(true) }}>P.M.</Button>
          </div>

        </Row>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button onClick={onSubmit}>Done</Button>
      </Modal.Footer>

    </Modal>
  );
};

export default MyVerticallyCenteredModal;
