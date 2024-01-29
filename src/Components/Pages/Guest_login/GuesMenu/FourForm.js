import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import Calendar from 'react-calendar';

const FourForm = ({ nextStep }) => {
  const selector = useSelector((state) => state.counter.formData);
  console.log("selector", selector);
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();





  const handleSubmit = () => {
    // If selectedTime is not set, set an error message and do not proceed
    if (!selectedTime) {
      setErrorMessage("Please select a time before proceeding.");
      return;
    }

    // Clear any previous error message
    setErrorMessage("");

    // Format the date as a string in "YYYY-MM-DD" format
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    // You can use formattedDate and selectedTime in your submission
    const formData = {
      date: formattedDate,
      time: selectedTime,
    };

    // Dispatch the form data to Redux
    dispatch(updateInputData({ formName: 'fourthform', inputData: formData }));

    setTimeout(() => {
      nextStep();
    }, 2000);
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
              minDate={new Date()}
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
            <option value="8:30 am">8:30 am</option>
            <option value="9:00 am">9:00 am</option>
            <option value="9:30 am">9:30 am</option>
            <option value="10:00 am">10:00 am</option>
            <option value="10:30 am">10:30 am</option>
            <option value="11:00 am">11:00 am</option>
            <option value="11:30 am">11:30 am</option>
            <option value="12:00 pm">12:00 pm</option>
            <option value="12:30 pm">12:30 pm</option>
            <option value="1:00 pm">1:00 pm</option>
            <option value="1:30 pm">1:30 pm</option>
            <option value="2:00 pm">2:00 pm</option>
            <option value="2:30 pm">2:30 pm</option>
            <option value="3:00 pm">3:00 pm</option>
            <option value="3:30 pm">3:30 pm</option>
            <option value="4:00 pm">4:00 pm</option>
            <option value="4:30 pm">4:30 pm</option>
            <option value="5:00 pm">5:00 pm</option>
            <option value="5:30 pm">5:30 pm</option>
            <option value="6:00 pm">6:00 pm</option>
            <option value="6:30 pm">6:30 pm</option>
            <option value="7:00 pm">7:00 pm</option>
            <option value="7:30 pm">7:30 pm</option>
            <option value="8:00 pm">8:00 pm</option>
            <option value="8:30 pm">8:30 pm</option>
            <option value="9:00 pm">9:00 pm</option>
            <option value="9:30 pm">9:30 pm</option>
            <option value="10:00 pm">10:00 pm</option>
          </select>
          <div className="error-message">{errorMessage}</div>

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
