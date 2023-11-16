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




    const handleSubmit = async (membership_id) => {
        try {
            // Retrieve the authentication token and user_id from local storage
            const user_id = localStorage.getItem("userid");
            const token = localStorage.getItem("token");

            // Construct the URL and headers for the API request
            const url = `${IP}/payment/create-checkout-session?membership=${membership_id}&user_id=${user_id}`;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };

            // Make the API request using Axios
            const res = await axios.get(url, config);

            // Check the response status and update state if successful

            // Log API details and the full response
            console.log("api details redux", res);
            console.log("Response:", res);

        } catch (error) {
            // Handle errors by logging to the console
            console.error(error);
        }
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

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Membership;
