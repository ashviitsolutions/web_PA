import React, { useState } from 'react';
import '../Profile.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from '../../../../../Constant';
import image1 from '../../../../assets/img/gift-card-with-red-ribbon_23-2147510395 (1).webp';
import { useNavigate } from 'react-router-dom';


function Yourcard() {
    const nav = useNavigate();
    const id = localStorage.getItem("userid")
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };



    const handleSend = async () => {
        try {
            const formData = {
                usermail: email,
                message: message,
            };

            const token = localStorage.getItem("token");
            const url = `${IP}/user/send-gift/${id}`;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };

            const res = await axios.post(url, formData, config);

            console.log("api details redux", res);

            if (res.status === 200) {
                closeModal();
                toast.success("Your Application was successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/userProfile")
                        // Handle navigation or other actions on success
                    },
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }

            console.log("Response:", res);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
        // Close the modal after sending

    };











    return (
        <>
            <div id='gift'>
                <div className='overview_container'>
                    <div className='gift_container'>
                        <div className='gift_input'>
                            <div className='gift_image'>
                                <img src={image1} width={380} height={166} alt='...' />
                                <div className='gift_button'>
                                    <button className='Use_button'>Use</button>
                                    <button className='Send_button' onClick={openModal}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Other gift inputs */}
                    </div>
                </div>
            </div>

            {/* Modal for sending gift card */}
            {isModalOpen && (
                <div className='modal_send_gift_card'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>
                            &times;
                        </span>
                        <h2>single massage</h2>
                        <label>Email:</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter recipient email'
                        />
                        <label>Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Enter your message'
                        />
                        <button type='submit' onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>

    );
}

export default Yourcard;
