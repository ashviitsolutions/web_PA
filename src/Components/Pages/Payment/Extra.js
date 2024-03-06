// import React, { useEffect, useState } from 'react';
// import { IP } from '../../../Constant';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import "./Payment.css";
// import logo from "../../assets/img/logo_home_navbar.png";


// function Success() {

//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const session_id = searchParams.get('session_id');
//   const tokenuser = localStorage.getItem("token");


//   const [bookingCompleted, setBookingCompleted] = useState(false);
//   const [booking, setBookinData] = useState();



//   console.log("booking data formData", booking)

//   useEffect(() => {
//     const formData = JSON.parse(localStorage.getItem("bookingData"));
//     setBookinData(formData)
//   }, [])

//   useEffect(() => {
//     if (session_id && booking) {
//       const onSubmit = async () => {
//         try {
//           const url = `${IP}/user/service_book?session_id=${session_id}`;
//           const config = {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: tokenuser,
//             },
//           };
//           const res = await axios.post(url, booking, config);

//           if (res.status === 200) {
//             localStorage.removeItem("bookingData");
//             setBookingCompleted(true);
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       onSubmit();
//     }
//   }, [session_id, booking]);




//   useEffect(() => {
//     if (bookingCompleted) {
//       const redirectTimer = setTimeout(() => {
//         navigate('/userProfile');
//       }, 1000);

//       return () => clearTimeout(redirectTimer);
//     }
//   }, [bookingCompleted, navigate]);





//   return (
//     <>
//       <div className='PaymentForm'>
//         <div className='receipt_head'><img src={logo} /></div>
//         <div className='container reciept_body'>
//           <h2>Payment Status</h2>
//           <p className='small'>Status: successful</p>
//           <p className='small'>Transaction ID: {session_id}</p>
//           <p className='small'>Redirecting... </p>
//           <p className='small'>Do not reload or press back button!</p>
//         </div>
//         <div className='receipt_footer'><p className='small'>Redirecting... </p>
//           <p className='small'>Do not reload or press back button!</p></div>
//       </div>
//     </>
//   );
// }

// export default Success;



















// import React, { useEffect, useState } from 'react';
// import { IP } from '../../../Constant';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import "./Payment.css";
// import logo from "../../assets/img/logo_home_navbar.png";
// import { updateInputData } from '../Redux/counterSlice';


// function Success({ bookingData }) {

//   const formData = useSelector((state) => state.counter.formData);
//   const dispatch = useDispatch();


//   const bookingdata = formData.booking && formData.booking[0] ? formData.booking[0] : "";

//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const session_id = searchParams.get('session_id');
//   const tokenuser = localStorage.getItem("token");


//   const [bookingCompleted, setBookingCompleted] = useState(false);
//   // const [booking, setBookinData] = useState();



//   console.log("booking data  redux", bookingdata)

//   useEffect(() => {
//     dispatch(updateInputData({ formName: 'booking', inputData: bookingData }));

//   }, [])

//   useEffect(() => {
//     if (session_id && bookingdata) {
//       const onSubmit = async () => {
//         try {
//           const url = `${IP}/user/service_book?session_id=${session_id}`;
//           const config = {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: tokenuser,
//             },
//           };
//           const res = await axios.post(url, bookingdata, config);

//           if (res.status === 200) {

//             setBookingCompleted(true);
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       onSubmit();
//     }
//   }, [session_id, bookingdata]);




//   useEffect(() => {
//     if (bookingCompleted) {
//       const redirectTimer = setTimeout(() => {
//         navigate('/userProfile');
//       }, 5000);

//       return () => clearTimeout(redirectTimer);
//     }
//   }, [bookingCompleted, navigate]);





//   return (
//     <>
//       <div className='PaymentForm'>
//         <div className='receipt_head'><img src={logo} /></div>
//         <div className='container reciept_body'>
//           <h2>Payment Status</h2>
//           <p className='small'>Status: successful</p>
//           <p className='small'>Transaction ID: {session_id}</p>
//           <p className='small'>Redirecting... </p>
//           <p className='small'>Do not reload or press back button!</p>
//         </div>
//         <div className='receipt_footer'><p className='small'>Redirecting... </p>
//           <p className='small'>Do not reload or press back button!</p></div>
//       </div>
//     </>
//   );
// }

// export default Success;
