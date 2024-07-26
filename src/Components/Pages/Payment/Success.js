import React, { useEffect } from 'react';
import { IP } from '../../../Constant';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FallingLines } from "react-loader-spinner";
import logo from "../../assets/img/logo_home_navbar.png";
import "./Payment.css";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const session_id = searchParams.get('session_id');
  const tokenuser = localStorage.getItem("token");

  useEffect(() => {
    const onSubmit = async () => {
      if (!session_id) return;

      try {
        const url = `${IP}/user/service_book?session_id=${session_id}`;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenuser,
          },
        };
        const res = await axios.get(url, config);

        if (res.status === 200) {
          navigate('/userProfile'); 
        } else {
          console.error('Failed to process payment:', res.data.error);
          // navigate('/userProfile'); 
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        // navigate('/userProfile/payment/cancel');
      }
    };

    const timer = setTimeout(() => {
      onSubmit();
    }, 3000);

    // Clean up the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [session_id, navigate, tokenuser]);

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
