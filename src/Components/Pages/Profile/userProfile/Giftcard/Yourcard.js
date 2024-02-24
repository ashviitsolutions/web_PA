import React, { useState, useEffect } from 'react';
import '../Profile.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from '../../../../../Constant';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Yourcard() {

    const nav = useNavigate();
    // const id = localStorage.getItem("userid")
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState([]);
    const [giftCardId, setGiftcardId] = useState();
    const [images, setImageObjectURL] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = (id) => {
        setGiftcardId(id)
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
        setLoading(true);
        console.log("id giftcard", giftCardId)
        try {
            const formData = {
                usermail: email,
                message: message,
            };

            const token = localStorage.getItem("token");
            const url = `${IP}/user/send-gift/${giftCardId}`;
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
                toast.success("Your Gift Card send  successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/userProfile")
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div id='gift'>
                <div className='overview_container'>
                    <div className='gift_container row'>
                        {user.length === 0 ? (
                            <p>No gift cards available</p>
                        ) : (
                            user.map((cur, index) => (
                                <div className='gift_input col-md-4' key={index}>
                                    <div className='gift_image'>
                                        <img src={images[index]} alt='...' />
                                        <div className='gift_button'>
                                            <Link to="/select_location_type">
                                                <button className='Use_button'>Use</button>
                                            </Link>
                                            <button className='Send_button' onClick={() => openModal(cur._id)}>
                                                Send
                                            </button>
                                        </div>
                                        <div className="content_container_gift_card">
                                            <h3>{cur?.offerId?.title}</h3>
                                            <div className="content_container_gift_card_dis">
                                                <p className="description">{/*{cur?.offerId?.description.slice(0, 60)}...*/}Send the gift card to your loved ones or use it to get discount.</p>
                                            </div>
                                            <div className="content_container_gift_card_para">
                                                <div className="d-block">
                                                    {/* <p>Price: ${cur?.offerId?.price}</p> */}
                                                    <p>Card Value: ${cur?.offerId?.offerValue}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

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
                        <button type='submit' onClick={handleSend}> {loading ? "Sending..." : "Send"}</button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
}

export default Yourcard;
