import React, { useEffect, useState } from 'react';
import Hook from '../Hook/Hook';
import './Profile.css';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';

function Membership() {
    const nav = useNavigate()
    const username = localStorage.getItem('user_name');

    const membershipOptions = [
        {
            name: 'Silver',
            price: 119,
            savings: '5% saving off regular rate',
            commitment: '3 months commitment',
        },
        {
            name: 'Gold',
            price: 129,
            savings: '10% saving off regular rate',
            commitment: '12 months commitment',
        },
        // Add more membership options as needed
    ];

    const onSubmit = () => {
        nav("/userProfile")

    }
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
                                <StripeCheckout
                                    amount={option.price * 100}
                                    token={onSubmit}
                                    currency='USD'
                                    stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
                                >
                                    <div id='membership_button_payment'>
                                        <button className="button">Join now</button>
                                    </div>
                                </StripeCheckout>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Membership;
