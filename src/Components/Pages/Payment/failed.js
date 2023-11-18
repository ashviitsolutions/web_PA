import React , {useEffect} from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import "./Payment.css"




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
        <h1>Payment Status</h1>
        <p>Status: failed</p>
        
      

      </div>

    </>

  );
}

export default Failed;
