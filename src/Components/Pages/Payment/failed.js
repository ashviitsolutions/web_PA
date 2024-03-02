import React , {useEffect} from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import "./Payment.css"
import logo from "../../assets/img/logo_home_navbar.png";




function Failed() {
  const navigate = useNavigate();
  const { paymentId, oferValue } = useParams()




  useEffect(() => {
    setTimeout(() => {
      navigate("/userProfile")
    }, 3000)

  }, [])
  return (
    <>
      <div className='PaymentForm'>
        <div className='receipt_head'><img src={logo} /></div>
        <div className='container reciept_body'>
          <h2>Payment Status</h2>
          <p className='small'>Status: failed</p>
        </div>
        <div className='receipt_footer'><p className='small'>Redirecting... </p>
          <p className='small'>Do not reload or press back button!</p></div>
      </div>

    </>

  );
}

export default Failed;
