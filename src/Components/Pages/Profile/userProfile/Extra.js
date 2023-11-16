// import React, { useState, useEffect } from 'react';
// import "./Profile.css";
// import image1 from "../../../assets/img/gift-card-with-red-ribbon_23-2147510395 (1).webp"

// import { IP } from '../../../../Constant';
// function Gift() {
//   const username = localStorage.getItem("user_name")
//   const [user, setUser] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${IP}/coupon/fetch`);
//         const data = await res.json();
//         setUser(data);

//         console.log("gift data data", data)
//       } catch (error) {
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <>
//       <div id='gift'>
//         <div className='overview_container'>
//           <div className='heading'>
//             <h3>{username}</h3>
//           </div>
//           <div className='title'>
//             <h3>Your GIFT CARDS</h3>
//           </div>

//           <div className='gift_container'>
//             <div className='gift_input'>
//               <div className='gift_image'>
//                 <img src={image1} width={380} height={166} alt='...' />
//                 <div className='gift_button'>
//                   <button className='Use_button'>Use</button>
//                   <button className='Send_button'>Send</button>
//                 </div>
//               </div>
//             </div>
//             <div className='gift_input'>
//               <div className='gift_image'>
//                 <img src={image1} width={380} height={166} alt='...' />
//                 <div className='gift_button'>
//                   <button className='Use_button'>Use</button>
//                   <button className='Send_button'>Send</button>
//                 </div>
//               </div>
//             </div>
//           </div>


//           <div className='title' id='buycard'>
//             <h3>Buy GIFT CARDS</h3>
//           </div>
//           <div className='gift_container' id="gift_vard_buy">
//             <div className='gift_input' id='buy_gift_card_input'>
//               <div className='gift_image' id='buy_gift_card_image'>
//                 <img src={image1} alt='...' />
//                 <div className='gift_button'>
//                   <h3 className='title'>Silver gift card</h3>
//                   <button className='Use_button'>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//             <div className='gift_input' id='buy_gift_card_input'>
//               <div className='gift_image' id='buy_gift_card_image'>
//                 <img src={image1} alt='...' />
//                 <div className='gift_button'>
//                   <h3 className='title'>Silver gift card</h3>
//                   <button className='Use_button'>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//             <div className='gift_input' id='buy_gift_card_input'>
//               <div className='gift_image' id='buy_gift_card_image'>
//                 <img src={image1} alt='...' />
//                 <div className='gift_button'>
//                   <h3 className='title'>Silver gift card</h3>
//                   <button className='Use_button'>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//             <div className='gift_input' id='buy_gift_card_input'>
//               <div className='gift_image' id='buy_gift_card_image'>
//                 <img src={image1} alt='...' />
//                 <div className='gift_button'>
//                   <h3 className='title'>Silver gift card</h3>
//                   <button className='Use_button'>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//             <div className='gift_input' id='buy_gift_card_input'>
//               <div className='gift_image' id='buy_gift_card_image'>
//                 <img src={image1} alt='...' />
//                 <div className='gift_button'>
//                   <h3 className='title'>Silver gift card</h3>
//                   <button className='Use_button'>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//             <div className='gift_input' id='buy_gift_card_input'>
//               <div className='gift_image' id='buy_gift_card_image'>
//                 <img src={image1} alt='...' />
//                 <div className='gift_button'>
//                   <h3 className='title'>Silver gift card</h3>
//                   <button className='Use_button'>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default Gift


import React, { useEffect, useState } from 'react';
import Hook from '../Hook/Hook';
import './Profile.css';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IP } from '../../../../Constant';
function Membership() {
    const nav = useNavigate()
    const username = localStorage.getItem('user_name');


    const [toggle, setToggle] = useState(false);
    const membershipOptions = [
        {
            id: "price_1OAn62LnVrUYOeK2Y2M7l0Cj",
            name: 'Silver',
            price: 119,
            savings: '5% saving off regular rate',
            commitment: '3 months commitment',
        },
        {
            id: "price_1OAmzQLnVrUYOeK2VStJarnV",
            name: 'Gold',
            price: 129,
            savings: '10% saving off regular rate',
            commitment: '12 months commitment',
        },
        // Add more membership options as needed
    ];
    const closeModal = () => {
        setToggle(false);
    };



    const handleSubmit = async (membership_id) => {
        try {
            // Retrieve the authentication token from local storage
            const user_id = localStorage.getItem("userid")
            const token = localStorage.getItem("token");

            // Construct the URL and headers for the API request
            const url = `${IP}/payment/create-checkout-session?membership=${membership_id}&${user_id}`;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };

            // Make the API request using Axios
            const res = await axios.get(url, config);

            // Check the response status and update state if successful
            if (res.status === 200) {
                // Assuming setToggle is a state-setting function
                setToggle(true);
            }

            // Log API details and the full response
            console.log("api details redux", res);
            console.log("Response:", res);

        } catch (error) {
            // Handle errors by logging to the console
            console.error(error);
        }
    };










    const onSubmit = async (token) => {
        console.log("repsose payment", token)
        // try {

        //     const paymentId = token.id;

        //     console.log("token", paymentId)


        //     const token = localStorage.getItem("token");

        //     // Send the payment information to your server
        //     const paymentData = {
        //         paymentId: paymentId,
        //         userId: user_id,


        //     };
        //     const config = {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: token,
        //         },
        //     };


        //     const response = await axios.post(`${IP}/payment/create-checkout-session`, paymentData, config);
        //     if (response.status === 200) {
        //         nav("/userProfile/payment/success")


        //     }
        //     // Handle the response from your server as needed
        //     console.log('Payment successful:', response.data);

        //     // Additional logic, such as navigating to a success page, can be added here
        //     // alert("Payment successful");
        // } catch (error) {
        //     console.error('Error processing payment:', error);
        //     // alert("Payment Failed");
        //     nav("/userProfile/payment/success")
        //     // Handle errors
        // }
    };
    return (
        <div className='overview' id='invoices'>
            <div className='overview_container'>
                <div className='heading'>
                    <h3>{username}</h3>
                </div>
                <div className='title'>
                    <h3>Membership</h3>
                </div>
                <div className='membership_container'>
                    {membershipOptions.map((option, index) => (
                        <div className='membership_update' key={index}>
                            <div className='heading'>
                                <h3>{option.name}</h3>
                                <p>${option.price} / month</p>
                            </div>
                            <div className='conetnt'>
                                <h3>{option.savings}</h3>
                                <p>{option.commitment}</p>
                            </div>
                            <div className='mebershi_update_button'>
                                <button className="button" onClick={() => handleSubmit(option.id)}>Join now</button>

                                {
                                    toggle && (
                                        <StripeCheckout
                                            amount={option.price * 100}
                                            token={onSubmit}
                                            currency='USD'
                                            stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
                                        >
                                            <div style={{ textAlign: 'center' }}>
                                                {/* Modal for sending gift card */}

                                                <div className='modal_send_gift_card'>
                                                    <div className='modal-content'>
                                                        <span className='close' onClick={closeModal}>
                                                            &times;
                                                        </span>
                                                        <h2>{option.name}</h2>
                                                        <label>Benifit:</label>

                                                        <button className="button">Proceed to Pay </button>
                                                    </div>
                                                </div>


                                            </div>
                                        </StripeCheckout>
                                    )
                                }











                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Membership;
