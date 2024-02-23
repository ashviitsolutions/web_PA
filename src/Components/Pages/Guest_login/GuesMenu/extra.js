import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import Calendar from 'react-calendar';

const FourForm = ({ nextStep }) => {
  const selector = useSelector((state) => state.counter.formData);
  console.log("selector", selector);
  const [selectedTime, setSelectedTime] = useState([]); // State to store selected time
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const times = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"
  ];

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    let roundedHour = currentHour;
    let roundedMinute = currentMinute >= 30 ? 30 : 0;

    // Round the time to the nearest 30-minute interval
    if (roundedMinute === 30) {
      roundedHour++;
      roundedMinute = 0;
    }

    // Convert the rounded time to 12-hour format
    const period = roundedHour >= 12 ? 'PM' : 'AM';
    const formattedHour = roundedHour % 12 === 0 ? 12 : roundedHour % 12;
    const formattedMinute = roundedMinute.toString().padStart(2, '0');

    // Format the rounded time
    const formattedCurrentTime = `${formattedHour}:${formattedMinute} ${period}`;
    console.log("formattedCurrentTime", formattedCurrentTime);

    // Find the closest available time in the times array
    const closestTimeIndex = times.filter(time => time > formattedCurrentTime);

    // const closestTime = times[closestTimeIndex];



    console.log("closestTime", closestTimeIndex);

    // Set the selected time to the closest available time
    setSelectedTime(formattedCurrentTime);
  }, []);


















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
        {/* Time selection dropdown */}
        <select
          style={{ width: "auto", display: "inline-block", padding: "0px 15px" }}
          className="input"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select Time</option>
          {times
            .filter((time) => {
              // Parse time string to compare with current time
              const [timeHour, timeMinute, timePeriod] = time.match(/(\d+):(\d+) (\w+)/).slice(1);
              const [currentHour, currentMinute, currentPeriod] = selectedTime.match(/(\d+):(\d+) (\w+)/).slice(1);

              // Convert hours to 24-hour format for comparison
              let hour = parseInt(timeHour, 10);
              if (timePeriod === "PM" && hour < 12) {
                hour += 12;
              }
              let currentHour24 = parseInt(currentHour, 10);
              if (currentPeriod === "PM" && currentHour24 < 12) {
                currentHour24 += 12;
              }

              // Compare hours and minutes if the selected date is today
              if (selectedDate.toDateString() === new Date().toDateString()) {
                if (hour > currentHour24 || (hour === currentHour24 && parseInt(timeMinute, 10) > parseInt(currentMinute, 10))) {
                  return true;
                }
              } else {
                return true; // Show all time slots for future dates
              }

              return false;
            })
            .map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
        </select>




        <div className="error-message">{errorMessage}</div>

        {/* Button to submit */}
        <button className="button" type="button" onClick={handleSubmit}>
          Next
        </button>
      </div>

      <center>
        <a className='small' href='/'>&larr; Back to Home</a>
      </center>
    </div>
  );
};

export default FourForm;
