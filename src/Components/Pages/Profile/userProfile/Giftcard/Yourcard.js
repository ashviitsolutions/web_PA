import React, { useState, useEffect } from 'react';
import '../Profile.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from '../../../../../Constant';
import { useNavigate } from 'react-router-dom';


function Yourcard() {
    const nav = useNavigate();
    const id = localStorage.getItem("userid")
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState([]);
    const [images, setImageObjectURL] = useState([]);



    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };




    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                };

                const res = await fetch(`${IP}/user/my-giftCards`, config);
                const data = await res.json();
                setUser(data?.data);
                // setOfferValue(data.offerValue)
                // setGiftCardId(data._id)
                console.log("user/my-giftCards", data.data);
            } catch (error) {
                // Handle errors
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = user.map((card) => {
                console.log("user image", card?.offerId?.attachments)
                return fetch(`${IP}/file/${card?.offerId?.attachments}`)
                    .then((res) => res.blob())
                    .then((imageBlob) => URL.createObjectURL(imageBlob))
                    .catch((error) => {
                        console.error("Error loading image:", error);
                        return null; // Return null for images that couldn't be loaded
                    });
            });

            Promise.all(imagePromises).then((imageUrls) => {
                setImageObjectURL(imageUrls);
            });
        };

        fetchImages();
    }, [user]);



    console.log("user", user);








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
                        {
                            user.length === 0 ? (
                                <p>No gift cards available</p>
                            ) : (
                                user.map((cur, index) => (
                                    <div className='gift_input' key={index}>
                                        <div className='gift_image'>
                                            <img src={images[index]} width={380} height={166} alt='...' />
                                            <div className='gift_button'>
                                                <button className='Use_button'>Use</button>
                                                <button className='Send_button' onClick={openModal}>
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }


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
