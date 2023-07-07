import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TimePicker from "../multistep/TimePicker";
import { IP } from '../../../Constant'
import { useNavigate } from "react-router-dom";
const EditAvaliabilityModal = (props) => {
  const nav=useNavigate()
  const token = localStorage.getItem("providertoken")
  const [availabilityHours, setAvailabilityHours] = useState({
    mon_Start_time: "",
    tue_Start_time: "",
    wed_Start_time: "",
    thu_Start_time: "",
    fri_Start_time: "",
    sat_Start_time: "",
    sun_Start_time: "",


    mon_End_time: "",
    tue_End_time: "",
    wed_End_time: "",
    thu_End_time: "",
    fri_End_time: "",
    sat_End_time: "",
    sun_End_time: "",
  });
  const handleAvailabilityHoursChange = (id, value) => {
    setAvailabilityHours((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };




  const handleSubmit = async (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();

    const formData = new FormData();
   
    formData.append("working_information", JSON.stringify(availabilityHours));
  
    try {
      const resp = await fetch(`${IP}/provider/update-availability`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await resp.json();
      console.log("time value first form", result);
      console.log(result);
      // props.nextStep();
      if (resp.status === 200) {
        nav("/providers/personal-settings");
        props.onHide();
    }
    } catch (error) {
      console.log("Error show", error);
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
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Availability
        </Modal.Title>
      </Modal.Header>
      <Form>

      <div className="dayselected" style={{ display: "flex" }}>
      <div className="col-md-10 mb-2 timerange" style={{marginLeft: "50px"}}>
        <p className="mt-2">Availability Hours</p>
        <TimePicker
          id="mon"
          label="Monday (Start Time)"
          value={availabilityHours.mon_Start_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("mon_Start_time", selectedTime)}
        />

        <TimePicker
          id="tue"
          label="Tuesday (Start Time)"
          value={availabilityHours.tue_Start_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("tue_Start_time", selectedTime)}
        />
        <TimePicker
          id="wed"
          label="Wednesday (Start Time)"
          value={availabilityHours.wed_Start_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("wed_Start_time", selectedTime)}
        />


        <TimePicker
          id="thu"
          label="Thursday (Start Time)"
          value={availabilityHours.thu_Start_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("thu_Start_time", selectedTime)}
        />

        <TimePicker
          id="fri"
          label="Friday (Start Time)"
          value={availabilityHours.fri_Start_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("fri_Start_time", selectedTime)}
        />

        <TimePicker
          id="sat"
          label="Saturday (Start Time)"
          value={availabilityHours.sat_Start_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("sat_Start_time", selectedTime)}
        />

        <TimePicker
          id="sun"
          label="Sunday (Start Time)"
          value={availabilityHours.sun_Start_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("sun_Start_time", selectedTime)}
        />



      </div>

      <div className="col-md-10 mb-2 timerange" id="secondtimers" style={{marginLeft: "149px"}}>
        <TimePicker
          id="mon"
          label="Monday (End Time)"
          value={availabilityHours.mon_End_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("mon_End_time", selectedTime)}
        />

        <TimePicker
          id="tue"
          label="Tuesday (End Time)"
          value={availabilityHours.tue_End_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("tue_End_time", selectedTime)}
        />
        <TimePicker
          id="wed"
          label="Wednesday (End Time)"
          value={availabilityHours.wed_End_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("wed_End_time", selectedTime)}
        />


        <TimePicker
          id="thu"
          label="Thursday (End Time)"
          value={availabilityHours.thu_End_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("thu_End_time", selectedTime)}
        />

        <TimePicker
          id="fri"
          label="Friday (End Time)"
          value={availabilityHours.fri_End_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("fri_End_time", selectedTime)}
        />

        <TimePicker
          id="sat"
          label="Saturday (End Time)"
          value={availabilityHours.sat_End_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("sat_End_time", selectedTime)}
        />

        <TimePicker
          id="sun"
          label="Sunday (End Time)"
          value={availabilityHours.sun_End_time}
          onChange={(selectedTime) => handleAvailabilityHoursChange("sun_End_time", selectedTime)}
        />



      </div>

    </div>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAvaliabilityModal;
