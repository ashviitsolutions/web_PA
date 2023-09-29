import React, { useState } from "react";
import "./style.css";
import { useDispatch ,useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import Calendar from 'react-calendar';

const FourForm = ({ nextStep }) => {
  const selector = useSelector((state) => state.counter.formData);
  console.log("selector", selector);
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date

  const dispatch = useDispatch();

  const handleSubmit = () => {
    // You can use selectedDate and selectedTime in your submission
    const formData = {
      date: selectedDate.toISOString(), // Convert date to ISO format
      time: selectedTime,
    };

    // Dispatch the form data to Redux
    dispatch(updateInputData({ formName: 'fourthform', inputData: formData }));
    setTimeout(() => {
      nextStep();


  }, 2000)
    // Proceed to the next step
    // nextStep();
  };

  return (
    <>
      <div id="sec_wiz_4" className="section">
        <div className="input_group" style={{ textAlign: "center" }}>
          <label className="static" style={{ fontSize: "17px" }} htmlFor="">
            <b>WHEN WOULD YOU LIKE IT?</b>
          </label>

          {/* Date picker */}
          <div style={{ display: "inline-block" }} id="datepicker">
            <Calendar
              onChange={(date) => setSelectedDate(date)}
              value={selectedDate}
            />
          </div>

          {/* Time selection dropdown */}
          <select
            style={{ width: "auto", display: "inline-block", padding: "0px 15px" }}
            className="input"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="8:00 am">8:00 am</option>
            <option value="9:00 am">9:00 am</option>
            <option value="10:00 am">10:00 am</option>
            <option value="8:00 am">11:00 am</option>
            <option value="9:00 am">12:00 pm</option>
            <option value="10:00 am">1:00 pm</option>
            {/* Add more time options as needed */}
          </select>

          {/* Button to submit */}
          <button className="button" type="button" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FourForm;
