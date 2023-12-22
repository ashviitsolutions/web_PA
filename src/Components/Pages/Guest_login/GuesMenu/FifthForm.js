import React, { useState } from "react";
import "./style.css";
import postServices from "../Services/postServices";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from "../../../../Constant";



const FifthForm = ({ step, nextStep }) => {
  const { provider_id } = useParams();

  console.log("all data provider_id", provider_id);

  const formData = useSelector((state) => state.counter.formData);
  console.log("all data dispatch", formData);
  const useremail = localStorage.getItem("user_email")
  const username = localStorage.getItem("user_name")
  const userid = localStorage.getItem("userid")
  const token = localStorage.getItem("token")

  // Check if the necessary form data exists before accessing its properties    
  const addon_id = formData.addon_id && formData.addon_id[0] ? formData.addon_id[0] : "";
  const location = formData.locationForm && formData.locationForm[0] ? formData.locationForm[0] : "";

  const location_type = formData.location && formData.location[0] ? formData.location[0].location_type : "";
  const gender = formData.secondform && formData.secondform[0] ? formData.secondform[0].gender : "";
  const totalPrice = formData.secondform && formData.secondform[0] ? formData.secondform[0].totalPrice : "";
  const service_id = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_ids : "";
  const service_time = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_time : "";
  const areas_of_concern = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].areas_of_concern : "";
  const health_conditions = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].health_conditions : "";
  const massage_body_part = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_body_part : "";
  const massage_pressure = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_pressure : "";
  const special_considerations = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].special_considerations : "";
  const scheduled_date = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].date : "";
  const scheduled_timing = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].time : "";
  const massage_for = formData?.firstForm?.[0];


  // const addon_id = formData.addon_id?.[0] || "";
  // const location = formData.locationForm?.[0] || "";
  const adressuser = formData.locationForm?.[0]?.address || "";
  console.log("adress", adressuser)
  // const secondform = formData.secondform?.[0] || {};
  // const { gender, totalPrice, service_id, service_time } = secondform;
  // const thirdform = formData.thirdform?.[0] || {};
  // const {
  //   areas_of_concern,
  //   health_conditions,
  //   massage_body_part,
  //   massage_pressure,
  //   special_considerations
  // } = thirdform;
  // const fourthform = formData.fourthform?.[0] || {};
  // const { date: scheduled_date, time: scheduled_timing } = fourthform;
  // const massage_for = formData?.firstForm?.[0];




  const nav = useNavigate();
  const [address, setAddress] = useState(adressuser);
  const [email, setEmail] = useState(useremail);
  const [arrivalInstructions, setArrivalInstructions] = useState("");
  const [name, setName] = useState(username)
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)



  console.log("userid", userid)



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setError(true);
    } else {
      try {
        // const formData = new FormData();


        // {
        //   userid && (
        //     formData.append("user", userid)

        //   )
        // }

        // formData.append("add_ons", addon_id);
        // formData.append("location", location);
        // formData.append("location_type", location_type);
        // formData.append("massage_for", massage_for);
        // formData.append("service_id", service_id);
        // formData.append("gender", gender);
        // formData.append("service_time", service_time);
        // formData.append("areas_of_concern", areas_of_concern);
        // formData.append("special_considerations", special_considerations);
        // formData.append("health_conditions", health_conditions);
        // formData.append("massage_body_part", massage_body_part);
        // formData.append("massage_pressure", massage_pressure);
        // formData.append("scheduled_date", scheduled_date);
        // formData.append("scheduled_timing", scheduled_timing);
        // formData.append("address", address);
        // formData.append("email", email);
        // formData.append("name", name);
        // formData.append("arrival_instructions", arrivalInstructions);
        // formData.append("password", password);
        // formData.append("confirm_password", confirmpassword);
        const formData = {
          ...(userid ? {
            user: userid,
            customer_email: email,
          }
            : {
              email: email,
              password: password,
              confirm_password: confirmpassword
            }

          ),
          location: location,
          location_type: location_type,
          massage_for: massage_for,
          service_id: service_id,
          gender: gender,
          provider_id: provider_id,

          service_time: service_time,
          health_conditions: health_conditions,
          areas_of_concern: areas_of_concern,
          special_considerations: special_considerations,
          massage_body_part: massage_body_part,
          massage_pressure: massage_pressure,
          scheduled_date: scheduled_date,
          scheduled_timing: scheduled_timing,
          address: address,

          instructions: "bring material",
          add_ons: addon_id,


        }



        const token = localStorage.getItem("token");
        const url = `${IP}/user/service_book`;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };

        const res = await axios.post(url, formData, config);

        console.log("api details redux", res)

        // const userId = res.data.ref;
        if (res.status === 200) {
          // setValues({});
          // resetForm();

          // Show success notification and navigate to '/admin/Gift'
          toast.success("Your Application successfully!", {
            position: "top-right",
            autoClose: 3000,
            onClose: () => {
              nav(`/book/${userid}/${totalPrice}`);
            },
          });
        } else {
          // Show error notification if the API response is not successful
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        // Navigate to the next page with the extracted ID

        console.log("Response:", res);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });

        // Handle the error, e.g., show an error message to the user
      }
    }
  };














  return (
    <>
      <div className="review_page">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hotelName">  Apt / Suite / Hotel Name &amp; room:</label>
            <input
              type="text"
              name="hotelName"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Arrival Instructions:</label>
            <textarea
              name="bio"
              rows="4"
              value={arrivalInstructions}
              onChange={(e) => setArrivalInstructions(e.target.value)}
            />
          </div>
          {
            !token && (
              <>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p style={{ color: "red" }}>Passwords do not match.</p>
                )}
              </>
            )
          }

          <button type="submit"
            className="button"
          >review</button>
          <p style={{ float: "right" }}>Total Price: ${totalPrice}</p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default FifthForm;
