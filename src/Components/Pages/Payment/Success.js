import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Payment.css"



function Success() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(null)
  const [userId, setUserid] = useState("")
  const [txnid, setTxnId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState("");
  const [productInfo, setProductInfo] = useState("");


  // useEffect(() => {
  //   const id = localStorage.getItem("order_id");
  //   axios.get(`${IP}/api/payment/fetch-details/${id}`)
  //     .then((res) => {
  //       setTxnId(res?.data?.paymentInfo?.transaction_id);
  //       setStatus(res?.data?.paymentInfo?.status);
  //       setAmount(res?.data?.paymentInfo?.amount);
  //       setEmail(res?.data?.paymentInfo?.email);
  //       setProductInfo(res?.data?.paymentInfo?.productInfo);
  //       setUserid(res?.data?.userInfo)
  //       setToggle(true)
  //       console.log("paymentapi", res);
  //       console.log(id);
  //       if (res.status === 200) {
  //         localStorage.setItem("email_id", res?.data?.paymentInfo?.email)

  //         setToggle(true)
  //       }

  //     })
  //     .catch((error) => {
  //       console.log("payment/success", error);
  //     });
  // }, []);



  // console.log("userId", userId)


  useEffect(() => {
    setTimeout(() => {
      navigate("/userProfile")
    }, 3000)

  }, [])
  return (
    <>
      <div className='PaymentForm'>
        <h1>Payment Status</h1>
        <p>Status: {status}</p>
        <p>Transaction ID: {txnid}</p>
        <p>Amount: {amount}</p>

      </div>

    </>

  );
}

export default Success;
