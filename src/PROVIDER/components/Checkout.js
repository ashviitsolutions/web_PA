import React from "react";
import { useState, useEffect } from "react";
import { FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { IP } from "../../Constant"
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const nav = useNavigate()
  const { user_id } = props;
  const { _id } = props;

  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [am, setAm] = useState('')
  const [pm, setPm] = useState('')
  const token = localStorage.getItem("providertoken")






  const onSubmit = async (e) => {
    // e.preventDefault()

    try {
      const timeValue = `${hour}:${minute}`;
      const amOrPm = am ? 'am' : 'pm';
      const bodyFormData = new FormData();
      bodyFormData.append("service", user_id);
      bodyFormData.append("id", _id);
      bodyFormData.append("checkout", `${timeValue} ${amOrPm}`);
      const res = await axios.put(`${IP}/provider/update/checkout`, bodyFormData, {
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      });
      // console.log(res);
      if (res.status === 200) {
        nav("/providers/scheduled-requests");
        if (res.status === 200) {
          // Remove _id from removedChekincard in localStorage
          const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
          const updatedArray = removedChekincardArray.filter(itemId => itemId !== _id);
          localStorage.setItem('removedChekincard', JSON.stringify(updatedArray));

          nav("/providers");
          props.onHide();
        }

      }

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    onSubmit()
  }, [])



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Enter Checkout Time</Modal.Title>
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

export default Checkout;
