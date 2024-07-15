import React, { useEffect, useState } from "react";
import Hook from "../Hook/Hook";
import "./Profile.css";
import image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Rating from "react-rating-stars-component";
import { FallingLines } from "react-loader-spinner";
import { IP } from "../../../../Constant";
import axios from "../../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';

function Booking() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    const posts = Array.isArray(selector?.bookinghistory) && selector.bookinghistory.length > 0 ? selector.bookinghistory[0] : [];
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("userid");
    const [data, setData] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userFeedback, setUserFeedback] = useState("");
    const username = localStorage.getItem("user_name");
    const [toggleStates, setToggleStates] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [profile, setProfile] = useState([]);
    const [providerId, setProviderId] = useState();
    const [booking_id, setBookingData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                };

                const response = await axios.get(`${IP}/user/my-bookings?service_status=completed`, config);

                console.log("Response:", response.data);

                dispatch(updateInputData({ formName: 'bookinghistory', inputData: response.data }));
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [IP, dispatch]);








    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Hook.getProfile();
                setProfile(response.data.favorites);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handlePageClick = (data) => {
        setData(data.selected + 1);
    };

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
    };

    const handleFeedbackChange = (event) => {
        setUserFeedback(event.target.value);
    };

    const handleToggle = (booking) => {
        setModalOpen(true);
        setProviderId(booking.provider);
        setBookingData(booking._id);
        const newToggleStates = [...toggleStates];
        newToggleStates[booking.provider] = !newToggleStates[booking.provider];
        setToggleStates(newToggleStates);
    };

    const handleSubmitRating = () => {
        setLoading(true);
        axios
            .post(`${IP}/user/addReviewToStore/${providerId}/${user_id}`, {
                reviewerName: username,
                rating: userRating,
                comments: userFeedback,
                booking_id: booking_id
            }, { shouldAddAuth: true })
            .then((res) => {
                if (res.status === 200) {
                    setModalOpen(false);
                    setLoading(false);
                    toast.success("Your Review Successfully", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        onClose: () => {
                            nav("/userProfile");
                        },
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    const addToFavorite = (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };

        axios
            .post(`${IP}/user/addTofavorites/${id}/${user_id}`, {}, config)
            .then((res) => {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => {
                        nav("/userProfile");
                    },
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    return (
        <>
            <div className="progressbar_userpannel profileSpace">
                <div className="overview" id="invoices">
                    <div className="overview_container">
                        <div className="title">
                            <h3>BOOKING HISTORY</h3>
                        </div>
                        <div className="overview__containerMain">
                            {isLoading ? (
                                <FallingLines
                                    color="#03a9f4"
                                    width="150"
                                    visible={true}
                                    ariaLabel="falling-circles-loading"
                                />
                            ) : (
                                Array.isArray(posts) && posts.length > 0 ? (
                                    posts.map((booking, index) => (
                                        <div className="overview_card" key={index}>
                                            <div className="overview_input">
                                                <div className="image_text">
                                                    <span className="avatar">
                                                        <img
                                                            src={`${IP}/file/${booking?.attachments}`}
                                                            width={60}
                                                            height={60}
                                                            alt="Avatar"
                                                        />
                                                    </span>
                                                    <div className="text-item">
                                                        <h3>Appointment With {username}</h3>
                                                        <p>{booking.service_status}</p>
                                                        <p>{booking.address}</p>
                                                    </div>
                                                </div>
                                                <div className="time_date">
                                                    <p>{booking.scheduled_date}</p>
                                                    <h3>{booking.scheduled_timing}</h3>


                                                    <div className="time_date">
                                                        <p>{booking.scheduled_date}</p>
                                                        <h3>{booking.scheduled_timing}</h3>
                                                        <div style={{ cursor: "pointer", fontSize: "30px" }} onClick={() => addToFavorite(booking.provider)}>❤️‍</div>
                                                        <button onClick={() => addToFavorite(booking.provider)} style={{ cursor: "pointer" }}>Add to Favorites</button>
                                                        <button onClick={() => handleToggle(booking)}>Feedback</button>
                                                        <Rating
                                                            value="3"
                                                            count={5}
                                                            size={24}
                                                            activeColor="#007bff"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h3 style={{ color: "#162b3c", textAlign: "center" }}>No bookings yet.</h3>
                                )
                            )}
                        </div>
                        {isModalOpen && (
                            <div className="modal_send_gift_card">
                                <div className="modal-content">
                                    <span className="close" onClick={() => setModalOpen(false)}>
                                        &times;
                                    </span>
                                    <h3>Rate your experience</h3>
                                    <Rating
                                        value={userRating}
                                        count={5}
                                        onChange={handleRatingChange}
                                        size={24}
                                        activeColor="#007bff"
                                    />
                                    <textarea
                                        placeholder="Share your feedback"
                                        value={userFeedback}
                                        onChange={handleFeedbackChange}
                                    />
                                    <button type="submit" onClick={handleSubmitRating}>
                                        {loading ? "Loading..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;
