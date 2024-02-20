import React, { useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateInputData } from '../../Redux/counterSlice';


const FifthForm = ({ step, nextStep }) => {
  const { provider_id } = useParams();
  const formData = useSelector((state) => state.counter.formData);
  const dispatch = useDispatch();

  const useremail = localStorage.getItem("user_email")
  const username = localStorage.getItem("user_name")
  const userid = localStorage.getItem("userid")
  const token = localStorage.getItem("token")

  const totalPrice = formData.secondform && formData.secondform[0] ? formData.secondform[0].totalPrice : "";
  const addressUser = formData.locationForm?.[0]?.address || "";

  const nav = useNavigate();
  const [address, setAddress] = useState(addressUser);
  const [email, setEmail] = useState(useremail);
  const [arrivalInstructions, setArrivalInstructions] = useState("");
  const [name, setName] = useState(username);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setError(true);
      return;
    }
    setLoading(true)
    const formData = {
      name: name,
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
