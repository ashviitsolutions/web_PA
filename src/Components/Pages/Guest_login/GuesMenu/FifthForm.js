import React, { useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateInputData } from '../../Redux/counterSlice';
import { IP } from "../../../../Constant";
import openEye from "../../../assets/img/iconoir_eye.png"
import closeEye from "../../../assets/img/codicon_eye-closed.png"
import axios from "axios";


const FifthForm = ({ step, nextStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { provider_id } = useParams();
  const formData = useSelector((state) => state.counter.formData);
  const dispatch = useDispatch();

  const useremail = localStorage.getItem("user_email");
  const firstname = localStorage.getItem("first_name");
  const lastname = localStorage.getItem("last_name");
  const mobiledata = localStorage.getItem("mobile");
  const username = localStorage.getItem("user_name");
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  const totalPrice = formData.secondform && formData.secondform[0] ? formData.secondform[0].totalPrice : "";
  const addressUser = formData.locationForm?.[0]?.address || "";

  const nav = useNavigate();
  const [address, setAddress] = useState(addressUser);
  const [email, setEmail] = useState(useremail);
  const [arrivalInstructions, setArrivalInstructions] = useState("");
  const [first_name, setFirst] = useState(firstname);
  const [last_name, setLast] = useState(lastname);
  const [mobile, setMobile] = useState(mobiledata);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmits = (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = {
      first_name: last_name,
      last_name: last_name,
      mobile: mobile,
      email: email,
      address: address,
      arrivalInstructions: arrivalInstructions,
      password: password,
      confirmpassword: confirmpassword
    };

    dispatch(updateInputData({ formName: 'fifthform', inputData: formData }));

    setTimeout(() => {
      nav(`/book/${provider_id}/${totalPrice}`);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setError(true);
      return;
    }
    setLoading(true);
    const formData = {
      first_name: last_name,
      last_name: last_name,
      mobile: mobile,
      email: email,
      address: address,
      arrivalInstructions: arrivalInstructions,
      password: password,
      confirmpassword: confirmpassword
    };

    try {
      if (!token) {
        const response = await axios.post(`${IP}/user/register`, formData);
        console.log("register login", response);

        if (response.status === 200) {
          const token = response.headers.authorization; // Extracting token from response headers
          localStorage.setItem('token', token);
          localStorage.setItem('userid', response?.data?.user?._id);
          localStorage.setItem('user_email', response?.data?.user?.email);
          localStorage.setItem('mobile', response?.data?.user?.mobile);
          localStorage.setItem("first_name", response?.data.user?.first_name);
          localStorage.setItem("last_name", response?.data.user?.last_name);

          dispatch(updateInputData({ formName: 'fifthform', inputData: formData }));
          toast.success("Registration successful!", {
            position: "top-right",
            autoClose: 2000,
            onClose: () => {
              nav(`/book/${provider_id}/${totalPrice}`);
            },
          });
        } else {
          dispatch(updateInputData({ formName: 'fifthform', inputData: formData }));
          if (response.data.msg.includes('email') || response.data.msg.includes('mobile')) {
            toast.error("Email or mobile number already exists", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            toast.error("Registration failed. Please try again.", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      } else {
        handleSubmits(e); // Execute handleSubmits if token is present
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="review_page1 checkkout">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form-group half">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirst(e.target.value)}
                required
              />
            </div>
            <div className="form-group half">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => setLast(e.target.value)}
                required
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>

            <div className="form-group half">
              <label htmlFor="address">Full Address:</label>
              <input
                type="text"
                name="address"
                value={address}
                // onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group half">
              <label htmlFor="mobile">Phone No:</label>
              <input
                type="text"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form-group half">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group half">
              <label htmlFor="hotelName">  Apt / Hotel &amp; room:</label>
              <input
                type="text"
                name="hotelName"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Arrival instructions for service provider:</label>
            <textarea
              name="bio"
              rows="1"
              value={arrivalInstructions}
              onChange={(e) => setArrivalInstructions(e.target.value)}
            />
          </div>
          {
            !token && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="form-group half">
                    <label htmlFor="password">Create Password:</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button className='eye_button' type="button" onClick={handleTogglePassword}>
                      {showPassword ? <img src={closeEye} alt='' /> : <img src={openEye} alt='' />}
                    </button>
                  </div>
                  <div className="form-group half">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button className='eye_button' type="button" onClick={handleTogglePassword}>
                      {showPassword ? <img src={closeEye} alt='' /> : <img src={openEye} alt='' />}
                    </button>
                  </div>

                </div>
                {error && (
                  <p style={{ color: "red" }}>Passwords do not match.</p>
                )}
              </>
            )
          }
          <button
            type="submit"
            className="button"
            disabled={loading}
          >
            {loading ? "Loading" : "Review"}
          </button>
          <p style={{ float: "right" }}>Total Price: ${totalPrice}</p>
        </form>
        <center>
          <a className='small' href='/'>&larr; Back to Home</a>
        </center>
      </div>
      <ToastContainer />
    </>
  );
};

export default FifthForm;
