// import React from 'react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import "../../Book/style.css";
// import postServices from '../Services/postServices';
// import { useNavigate } from 'react-router-dom';


// function Location() {
//   const nav = useNavigate()
//   const [Input, setinput] = useState("");



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const config = {
//       "location": {
//         "type": "Point",
//         "coordinates": [28.586445, 77.365726]
//       }
//     };
//     const formData = new FormData();
//     formData.append('location', JSON.stringify(config));
//     const res = await postServices.createPost(formData);
//     console.log("location", res);
//     nav("/guest_login");
//   };

//   return (
//     <>
//       <div id="over_banner">
//         <div class="container">
//           <div class="row">
//             <form class="location card layer1" >
//               <h3>Where would you like our provider to  meet you.</h3>
//               <div class="input_group">
//                 <input class="input" type="text" onChange={(e) => setinput(e.target.value)} value={Input} placeholder="Search for an address here..." />
//               </div>
//               <div class="input_group">
//                 <button class="button" style={{ paddingTop: "11px" }} type="button" onClick={handleSubmit}>continue</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Location
















// import React from 'react';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateInputData } from '../../Redux/counterSlice'; // Replace with the correct path
// import { useNavigate } from 'react-router-dom';

// function Location() {
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const [Input, setInput] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const config = {
//       "location": {
//         "type": "Point",
//         "coordinates": [28.586445, 77.365726]
//       }
//     };
    
//     // Dispatch the updateInputData action with the Input value
//     dispatch(updateInputData({ formName: 'locationForm', inputData: config }));

   
//     nav("/guest_login");
//   };


//   return (
//     <>
//       <div id="over_banner">
//         <div class="container">
//           <div class="row">
//             <form class="location card layer1" >
//               <h3>Where would you like our provider to  meet you.</h3>
//               <div class="input_group">
//                 <input class="input" type="text" onChange={(e) => setInput(e.target.value)} value={Input} placeholder="Search for an address here..." />
//               </div>
//               <div class="input_group">
//                 <button class="button" style={{ paddingTop: "11px" }} type="button" onClick={handleSubmit}>continue</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Location

import React, { useState } from "react";
import "./style.css";
import { useDispatch } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import { useNavigate } from "react-router-dom";

const image1 =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.804601388554!2d77.38583598519591!3d28.616237787899024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefbfc0af6e6f%3A0xf1bb1ef79e931eea!2sYusufpur%20Chak%20Saberi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1661391086520!5m2!1sen!2sin";

const FifthForm = ({ step, nextStep }) => {
  const [id, setId] = useState("");
  const nav = useNavigate();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [arrivalInstructions, setArrivalInstructions] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const formData = {
      address,
      email,
      arrival_instructions: arrivalInstructions,
    };

    // Dispatch the form data to Redux
    dispatch(updateInputData({ formName: 'fifthform', inputData: formData }));

    // Navigate to the review page
    nav(`/review`); 

    console.log("Form Data:", formData);
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
            Address Details
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
                    onChange={(e) => setAddress(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                      setArrivalInstructions(e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="inner" style={{ fontSize: "18px" }}></div>
              </div>
              <button
                className="button"
                type="submit"
                onClick={handleSubmit}
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FifthForm;
