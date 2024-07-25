import React, { useEffect } from 'react';
import { IP } from '../../../Constant';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FallingLines } from "react-loader-spinner";
import logo from "../../assets/img/logo_home_navbar.png";
import "./Payment.css";

function Failed() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const session_id = searchParams.get('session_id');
  const tokenuser = localStorage.getItem("token");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/userProfile'); // Redirect to user profile page
    }, 2000); // 2 seconds delay

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className='PaymentForm'>
      <FallingLines
        color="#03a9f4"
        width="150"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
      <div className='container reciept_body'>
        <h2>Processing failed...</h2>
      </div>
      <div className='receipt_footer'>
        <p className='small'>Payment Processing failed</p>
        <p className='small'>If the problem persists, please contact support.</p>
        <p><img src={logo} alt="Logo" className='receipt_logo' /></p>
      </div>
    </div>
  );
}

export default Failed;
