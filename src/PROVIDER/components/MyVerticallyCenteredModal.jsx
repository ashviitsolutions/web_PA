import React, { useState } from "react";
import { Row, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IP } from "../../Constant";

const MyVerticallyCenteredModal = (props) => {
  const nav = useNavigate();
  const { user_id, _id, date } = props;
  // console.log("data console", user_id, _id, date)
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [am, setAm] = useState(true);
  const [pm, setPm] = useState(false);
  const token = localStorage.getItem("providertoken");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const timeValue = `${hour}:${minute} ${am ? 'AM' : 'PM'}`;
      const formData = {
        service: user_id,
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
        // nav("/providers");
        props.onHide();
        // Retrieve existing array or initialize an empty array
        const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];

        // Push the new _id to the array
        removedChekincardArray.push(_id);

        // Save the updated array in localStorage
        localStorage.setItem('removedChekincard', JSON.stringify(removedChekincardArray));
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
              placeholder="Hour"
              onChange={(e) => setHour(e.target.value)}
            />
          </div>

          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Minutes"
              onChange={(e) => setMinute(e.target.value)}
            />
          </div>

          <div className="col-4">
            <Button
              className={`form-control btn-sm mb-1 ${am ? 'active' : ''}`}
              onClick={() => { setAm(true); setPm(false); }}
            >
              A.M.
            </Button>
            <Button
              className={`form-control btn-sm ${pm ? 'active' : ''}`}
              onClick={() => { setAm(false); setPm(true); }}
            >
              P.M.
            </Button>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
       
        <Button onClick={onSubmit} disabled={loading}> {loading ? "Loading.." : "Done"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
