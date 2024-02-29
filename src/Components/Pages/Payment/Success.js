import React, { useEffect, useState } from 'react';
import { IP } from '../../../Constant';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/img/logo_home_navbar.png";
import "./Payment.css";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const session_id = searchParams.get('session_id');
  const tokenuser = localStorage.getItem("token");
  const formData = JSON.parse(localStorage.getItem("bookingData")); // Parse JSON data

  const [bookingCompleted, setBookingCompleted] = useState(false);

  console.log("booking data full", formData)

  useEffect(() => {
    if (session_id && formData) {
      const onSubmit = async () => {
        try {
          const url = `${IP}/user/service_book?session_id=${session_id}`;
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenuser,
            },
          };
          const res = await axios.post(url, formData, config);

          if (res.status === 200) {
            localStorage.removeItem("bookingData");
            setBookingCompleted(true);
          }
        } catch (error) {
          console.error(error);
        }
      };

      onSubmit();
    }
  }, [session_id, formData, tokenuser]);

  useEffect(() => {
    if (bookingCompleted) {

      const redirectTimer = setTimeout(() => {
        navigate('/userProfile');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [bookingCompleted, navigate]);

  return (
    <>
      <div className='PaymentForm'>
        <div className='receipt_head'><img src={logo} /></div>
        <div className='container reciept_body'>
          <h2>Payment Status</h2>
          <p className='small'>Status: successful</p>
          <p className='small'>Transaction ID: {session_id}</p>
          <p className='small'>Redirecting... </p>
          <p className='small'>Do not reload or press back button!</p>
        </div>
        <div className='receipt_footer'><p className='small'>Redirecting... </p>
          <p className='small'>Do not reload or press back button!</p></div>
      </div>
    </>
  );
}

export default Success;
