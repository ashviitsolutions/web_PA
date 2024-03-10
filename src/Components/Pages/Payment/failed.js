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
        {/* <div className='receipt_head'><img src={logo} /></div> */}
        <FallingLines
								color="#03a9f4"
								width="150"
								visible={true}
								ariaLabel="falling-circles-loading"
							/>
        <div className='container reciept_body'>
          <h2>Processing Request...</h2>
          {/* <p className='small'>Status: successful</p> */}
          {/* <p className='small'>Transaction ID: {session_id}</p> */}
          {/* <p className='small'>Redirecting... </p>
          <p className='small'>Do not reload or press back button!</p> */}
        </div>
        <div className='receipt_footer'><p className='small'>Payment <span className='failed danger'>failed</span></p>
          <p className='small'>Do not reload or press back button!</p>
          <p><img src={logo} className='receipt_logo' /></p>
          </div>
      </div>

    </>

  );
}

export default Failed;
