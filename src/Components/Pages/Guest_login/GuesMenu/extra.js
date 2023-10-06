import React, { useState } from "react";
import "./style.css";
import postServices from "../Services/postServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const image1 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.804601388554!2d77.38583598519591!3d28.616237787899024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefbfc0af6e6f%3A0xf1bb1ef79e931eea!2sYusufpur%20Chak%20Saberi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1661391086520!5m2!1sen!2sin";

const FifthForm = ({ step, nextStep }) => {
  const formData = useSelector((state) => state.counter.formData);
  console.log("all data", formData);
  const useremail = localStorage.getItem("user_email")
  // Check if the necessary form data exists before accessing its properties
  const location = formData.locationForm && formData.locationForm[0] ? formData.locationForm[0].location : "";
  const location_type = formData.location && formData.location[0] ? formData.location[0].location_type : "";
  const massage_for = formData.firstForm && formData.firstForm[0] ? formData.firstForm[0].massage_for : "";
  const gender = formData.secondform && formData.secondform[0] ? formData.secondform[0].gender : "";
  const service_id = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_id : "";
  const service_time = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_time : "";
  const areas_of_concern = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].areas_of_concern : "";
  const health_conditions = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].health_conditions : "";
  const massage_body_part = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_body_part : "";
  const massage_pressure = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_pressure : "";
  const special_considerations = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].special_considerations : "";
  const scheduled_date = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].date : "";
  const scheduled_timing = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].time : "";

  const nav = useNavigate();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(useremail);
  const [arrivalInstructions, setArrivalInstructions] = useState("");

  const totalPayment=formData

  const handleSubmit = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();
      
      // Append data from the Redux state to the FormData object
      formData.append("location", location);
      formData.append("location_type", location_type);
      formData.append("massage_for", massage_for);
      formData.append("service_id", service_id);
      formData.append("gender", gender);
      formData.append("service_time", service_time);
      formData.append("areas_of_concern", areas_of_concern);
      formData.append("special_considerations", special_considerations);
      formData.append("health_conditions", health_conditions);
      formData.append("massage_body_part", massage_body_part);
      formData.append("massage_pressure", massage_pressure);
      formData.append("scheduled_date", scheduled_date);
      formData.append("scheduled_timing", scheduled_timing);
      
      // Append address, email, and arrival instructions to FormData
      formData.append("address", address);
      formData.append("email", email);
      formData.append("arrival_instructions", arrivalInstructions);

      // Make an API request to create a post with the form data
      const res = await postServices.createPost(formData);
      // console.log("submit:", "res");

      const userId = res.data.ref;

      // Navigate to the next page with the extracted ID
      nav(`/book/${userId}`);
      console.log("Response:", res);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <div id="sec_wiz_5" className="section">
        <div id="employees" style={{ textAlign: "center" }}>
          <label
            style={{ textAlign: "center", fontSize: "18px" }}
            className="as_title"
            htmlFor=""
          >
            address details
          </label>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-7">
                <div className="inner">
                  <div className="map">
                    <iframe
                      src={image1}
                      style={{ border: 0, height: "360px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="inner">
                  <h3 style={{ fontSize: "18px" }}>24000 EL Toro Road</h3>
                  <p style={{ fontSize: "18px" }}>Laguna Woods, CA 92653</p>
                </div>
                <div className="inner">
                  <label htmlFor="" style={{ fontSize: "18px" }}>
                    Apt / Suite / Hotel Name &amp; room
                  </label>
                  <input
                    className="input"
                    type="text"
                    name=""
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // Update address state
                  />
                </div>
                <div className="inner">
                  <label htmlFor="" style={{ fontSize: "18px" }}>
                    Email
                  </label>
                  <input
                    className="input"
                    type="email"
                    name=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                  />
                </div>
                <div className="inner">
                  <label htmlFor="" style={{ fontSize: "18px" }}>
                    Arrival Instructions
                  </label>
                  <textarea
                    className="input"
                    name="name"
                    rows="5"
                    value={arrivalInstructions}
                    onChange={(e) =>
                      setArrivalInstructions(e.target.value) // Update arrivalInstructions state
                    }
                  ></textarea>
                </div>
                <div className="inner" style={{ fontSize: "18px" }}></div>
              </div>
              <p>Total Price: $100</p>
              <button
                className="button"
                type="submit"
                onClick={handleSubmit}
              >
                review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FifthForm;
