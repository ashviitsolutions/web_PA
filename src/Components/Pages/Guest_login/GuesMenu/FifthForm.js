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
  const location = formData.locationForm && formData.locationForm[0] ? formData.locationForm[0] : null;
  // Check if location is defined before trying to access its properties
  const locationName = location ? location.location : null;


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


  const adressuser = formData.locationForm?.[0]?.address || "";
  console.log("location", adressuser)





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
          location: locationName,
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
          // Show success notification and navigate to '/admin/Gift'
          toast.success("information received, moving to checkout now!", {
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
            autoClose: 2000,
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
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Arrival instructions for service provider:</label>
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
