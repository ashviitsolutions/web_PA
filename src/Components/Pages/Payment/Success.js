import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FallingLines } from "react-loader-spinner";
import { IP } from '../../../Constant';
import logo from "../../assets/img/logo_home_navbar.png";
import "./Payment.css";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const session_id = searchParams.get('session_id');
  const tokenuser = localStorage.getItem("token");

  const [session, setSession] = useState(session_id);
  const [token, setToken] = useState(tokenuser);

  // useEffect(() => {
  //   setSession(session_id);
  //   setToken(tokenuser);
  // }, [session_id, tokenuser]);

  // useEffect(() => {
  //   const onSubmit = async () => {
  //     if (!session || !token) return;

  //     try {
  //       const url = `${IP}/user/service_bookssssss?session_id=${session}`;
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //           // 'Cache-Control': 'no-cache', 
  //         },
  //       };
  //       const res = await axios.get(url, config);

  //       console.log("respose of booking", res?.status)

  //       if (res.status === 200) {
  //         // navigate('/userProfile'); 
  //       } else {
  //         console.error('Failed to process payment:', res.data.error);
  //         // Optionally, navigate to an error page or show a message
  //       }
  //     } catch (error) {
  //       console.error('Error processing payment:', error);
  //       // Optionally, navigate to a cancel/error page or show a message
  //     }
  //   };

  //   const timer = setTimeout(() => {
  //     onSubmit();
  //   }, 2000);

  //   // Clean up the timer if the component unmounts before the timeout
  //   return () => clearTimeout(timer);
  // }, [session, token, navigate]);


  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/userProfile');
    }, 3000);
    // Clean up the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className='PaymentForm'>
      <FallingLines
        color="#03a9f4"
        width="150"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
      <div className='container reciept_body'>
        <h2>Processing Request...</h2>
      </div>
      <div className='receipt_footer'>
        <p className='small'>Payment Processing....</p>
        <p className='small'>Do not reload or press back button!</p>
        <p><img src={logo} alt="Logo" className='receipt_logo' /></p>
      </div>
    </div>
  );
}

export default Success;
