import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IP } from '../../../../Constant';
import { FcClock, FcCancel } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import gold from "../../../assets/img/membership_gold2.png"
import Activegold from "../../../assets/img/active_gold2.png"
import Activesilver from "../../../assets/img/active_silver2.png"
import silver from "../../../assets/img/membeship_silver21.png"
function Membership() {
    const username = localStorage.getItem('user_name');
    const GOLD_ID = "price_1OAmzQLnVrUYOeK2VStJarnV";

    const membershipOptions = [
        {
            id: "price_1OAn62LnVrUYOeK2Y2M7l0Cj",
            name: 'Silver',
            price: 119,
            savings: '5% saving off regular rate',
            commitment: '3 months commitment',
            GOLD: silver,
            active: Activesilver,
            title1: "Membership Flexibility",
            para1: "cancel or pouse at any time after your first two monthly payment",
            title2: "One 60-minute massage each month",
            para2: "you're billed for one massage a month at the member rate, no initiation fee. Credits roll over and never expire",
            title3: "Preffered rote all bookings",
            para3: "Book as many appointments as you like at the membership rate. Get a massage anywhere Productive Alliance is available"
        },
        {
            id: GOLD_ID,
            name: 'Gold',
            price: 119,
            savings: '10% saving off regular rate',
            commitment: '12 months commitment',
            GOLD: gold,
            active: Activegold,
            title1: "Membership Flexibility",
            para1: "cancel or pouse at any time after your first two monthly payment",
            title2: "One 60-minute massage each month",
            para2: "you're billed for one massage a month at the member rate, no initiation fee. Credits roll over and never expire",
            title3: "Preffered rote all bookings",
            para3: "Book as many appointments as you like at the membership rate. Get a massage anywhere Productive Alliance is available"
        },
        // Add more membership options as needed
    ];

    const [url, setUrl] = useState(null);
    const [showModal, setShowModal] = useState(Array(membershipOptions.length).fill(false));
    const [selectedMembership, setSelectedMembership] = useState(null);

    const handleToggleModal = (index) => {
        setShowModal((prevShowModal) => {
            const newShowModal = [...prevShowModal];
            newShowModal[index] = !newShowModal[index];
            return newShowModal;
        });
        setSelectedMembership(membershipOptions[index]);
    };

    const closeModal = () => {
        setShowModal(Array(membershipOptions.length).fill(false));
        setSelectedMembership(null);
    };

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
                <div className='memberships'>
                    {membershipOptions.map((option, index) => (
                        <div className='membership_containers' key={index}>
                            <div className='image_membership'>
                                <img src={option.GOLD} alt='...' />

                              {/*  <div className='active_membership_icons'>
                                    <img src={option.active} alt='...' />
                                </div>
                    */}


                            </div>
                            <div className='membership_buttons'>
                                <button onClick={() => handleToggleModal(index)}>Join now</button>
                            </div>

                            {showModal[index] && (
                                <div className='model_card_gift_container'>
                                    <span className='close' onClick={closeModal}>
                                        &times;
                                    </span>
                                    <div className='model_card_gift'>
                                        <h3>{option.name}</h3>
                                        <div className='membership_model_item'>
                                            <FcCancel id='icon_mwembership1' />
                                            <div>
                                                <p><strong>{option.title1}</strong></p>
                                                <p>{option.para1}</p>
                                            </div>
                                        </div>
                                        <div className='membership_model_item'>
                                            <FcClock id='icon_mwembership' />
                                            <div>
                                                <p><strong>{option.title2}</strong></p>
                                                <p>{option.para2}</p>
                                            </div>
                                        </div>
                                        <div className='membership_model_item'>
                                            <TbBrandBooking id='icon_mwembership' />
                                            <div>
                                                <p><strong>{option.title3}</strong></p>
                                                <p>{option.para3}</p>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='membership_update_button'>
                                        <button className="button" onClick={() => handleSubmit(selectedMembership.id)}>Join now</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Membership;
