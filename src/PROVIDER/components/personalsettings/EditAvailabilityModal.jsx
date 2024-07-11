import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TimePicker from "../multistep/TimePicker";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IP } from "../../../Constant";

const EditAvailabilityModal = (props) => {
  const [loading, setLoading] = useState(false);
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : {};
  const nav = useNavigate();
  const token = localStorage.getItem("providertoken");

  const initialAvailabilityHours = [
    { day: 'Monday', start_time: '', end_time: '' },
    { day: 'Tuesday', start_time: '', end_time: '' },
    { day: 'Wednesday', start_time: '', end_time: '' },
    { day: 'Thursday', start_time: '', end_time: '' },
    { day: 'Friday', start_time: '', end_time: '' },
    { day: 'Saturday', start_time: '', end_time: '' },
    { day: 'Sunday', start_time: '', end_time: '' },
  ];

  const [availabilityHours, setAvailabilityHours] = useState(initialAvailabilityHours);

  useEffect(() => {
    if (user.working_information && Array.isArray(user.working_information)) {
      setAvailabilityHours(user.working_information);
    }
  }, [user]);

  const handleAvailabilityHoursChange = (index, timeType, value) => {
    setAvailabilityHours(prevState => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [timeType]: value };
      return newState;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      working_information: availabilityHours
    };

    try {
      const resp = await fetch(`${IP}/provider/update-availability`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(payload),
      });

      const result = await resp.json();
      console.log("API response:", result);

      if (resp.status === 200) {
        setLoading(false);
        nav("/providers/personal-settings");
        props.onHide();
      }
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Availability</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <div className="dayselected" style={{ display: "flex" }}>
          <div className="col-md-10 mb-2 timerange" style={{ marginLeft: "50px" }}>
            {availabilityHours.map(({ day, start_time, end_time }, index) => (
              <div className="col-md-10 mb-2 timerange" key={day} style={{ marginBottom: "20px" }}>
                <p className="mt-2">{day} Availability Hours</p>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <TimePicker
                    label={`${day} (Start Time)`}
                    value={start_time}
                    onChange={(selectedTime) => handleAvailabilityHoursChange(index, 'start_time', selectedTime)}
                  />
                  <TimePicker
                    label={`${day} (End Time)`}
                    value={end_time}
                    onChange={(selectedTime) => handleAvailabilityHoursChange(index, 'end_time', selectedTime)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit">{loading ? "Loading" : "Save"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAvailabilityModal;
