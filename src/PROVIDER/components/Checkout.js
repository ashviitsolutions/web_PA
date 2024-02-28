
import React, { useState, useEffect } from "react";
import { FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { IP } from "../../Constant";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const nav = useNavigate();
  const { user_id, paymentIntentId, _id } = props;
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [am, setAm] = useState(true);
  const [pm, setPm] = useState(false);
  const token = localStorage.getItem("providertoken");
  const [loading, setLoading] = useState(false);

  // console.log("paymentiod", props)



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




  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

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

      if (res.status === 200) {
        // Remove _id from removedChekincard in localStorage
        const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
        const updatedArray = removedChekincardArray.filter(itemId => itemId !== _id);
        localStorage.setItem('removedChekincard', JSON.stringify(updatedArray));

        // Run confirmAndCapturePayment after successful checkout submission
        confirmAndCapturePayment();

        // Redirect to providers page

        props.onHide();
        nav("/providers/earnings");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmAndCapturePayment = async () => {
    try {
      const response = await axios.post(`${IP}/payment/confirm`, {
        paymentIntentId: paymentIntentId
      });
      console.log('Payment confirmation:', response.data);
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  // useEffect(() => {

  //   onSubmit();
  // }, []);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Enter Checkout Time   {hour} {minute} {am}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input
              type="text"
              className="form-control"
              id="hr"
              placeholder="Hour"
              value={hour}
            // onChange={(e) => setHour(e.target.value)}
            />
          </div>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input
              type="text"
              className="form-control"
              id="min"
              placeholder="Minutes"
              value={minute}
            // onChange={(e) => setMinute(e.target.value)}
            />
          </div>
          <div className="col-4">
            <Button className={`form-control btn-sm mb-1 ${am ? 'active' : ''}`} onClick={() => { setAm(true); setPm(false) }}>A.M.</Button>
            <Button className={`form-control btn-sm ${pm ? 'active' : ''}`} onClick={() => { setAm(false); setPm(true) }}>P.M.</Button>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button onClick={onSubmit} disabled={loading}> {loading ? "Loading.." : "Done"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Checkout;































