import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { IP } from '../../../../Constant';
import moment from 'moment'; // Import moment for date formatting

function Membership() {
    const nav = useNavigate();
    const username = localStorage.getItem('user_name');
    const GOLD_ID = "price_1OAmzQLnVrUYOeK2VStJarnV";
    const token = localStorage.getItem("token");
    const [url, setUrl] = useState(null); // Change initial state to null
    const membershipOptions = [
        {
            id: "price_1OAn62LnVrUYOeK2Y2M7l0Cj",
            name: 'Silver',
            price: 119,
            savings: '5% saving off regular rate',
            commitment: '3 months commitment',
        },
        {
            id: GOLD_ID,
            name: 'Gold',
            price: 119,
            savings: '10% saving off regular rate',
            commitment: '12 months commitment',
        },
        // Add more membership options as needed
    ];

    const handleSubmit = async (membership_id) => {
        try {
            const user_id = localStorage.getItem("userid");
            const token = localStorage.getItem("token");
            const url = `${IP}/payment/create-checkout-session?membership=${membership_id}&userId=${user_id}`;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };

            const res = await axios.get(url, config);
            console.log("Stripe Redirect URL:", res.config.url);
            setUrl(res.config.url);
            console.log("API Response:", res);

            if (res.config.url) {
                // Redirect to Stripe Checkout
                window.location.href = res.config.url;
            } else {
                console.error("Invalid response from the server:", res);
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };


    return (
        <div className='overview' id='invoices'>
            <div className='overview_container'>
                <div className='heading'>
                    <h3>{username}</h3>
                </div>
                <div className='title'>
                    <h3>Membership Level</h3>
                    <h3>Regular</h3>
                </div>
                <div className='membership_container'>
                    {membershipOptions.map((option, index) => (
                        <div className='membership_update' key={index}>
                            <div className='heading'>
                                <h3>{option.name}</h3>
                                <p>${option.price} / month</p>
                            </div>
                            <div className='content'>
                                <h3>{option.savings}</h3>
                                <p>{option.commitment}</p>
                            </div>
                            <div className='membership_update_button'>
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
