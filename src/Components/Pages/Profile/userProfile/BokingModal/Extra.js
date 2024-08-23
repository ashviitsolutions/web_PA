import React, { useState, useEffect } from 'react';
import BookingDetails from './BookingDetails';
import { IP } from "../../../../../Constant";
import Hook from "../../Hook/Hook";
import moment from 'moment';
import Rating from "react-rating-stars-component";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function BookingCard({ post, toggleEvent, isOpen, rating, favrate }) {
    const nav = useNavigate()
    const [loadingprofile, setLoadingprofile] = useState(false);
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("userid");
    const [userRating, setUserRating] = useState(0);
    const [userFeedback, setUserFeedback] = useState("");
    const username = localStorage.getItem("user_name");
    const [toggleStates, setToggleStates] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [profile, setProfile] = useState([]);
    const [providerId, setProviderId] = useState();
    const [service_id, setServiceId] = useState();
    const [booking_id, setBookingData] = useState(null);
    const [loading, setLoading] = useState(false);


    const [name, setName] = useState("");
    // const [posts, setPosts] = useState([]);
    const [eventStates, setEventStates] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setLoadingprofile(true);
        const fetchProfile = async () => {
            try {
                const response = await Hook.getProfile();
                setProfile(response.data.favorites);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoadingprofile(false);
            }
        };

        fetchProfile();
    }, []);
    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
    };

    const handleFeedbackChange = (event) => {
        setUserFeedback(event.target.value);
    };

    const handleToggle = (booking) => {
        setModalOpen(true);
        setProviderId(booking.provider); // Ensure booking.provider has the correct value
        setServiceId(booking.service_id);
        setBookingData(booking._id);
        const newToggleStates = [...toggleStates];
        newToggleStates[booking.provider] = !newToggleStates[booking.provider];
        setToggleStates(newToggleStates);
    };
    const handleSubmitRating = () => {
        setLoading(true);
        axios
            .post(`${IP}/user/addReviewToStore`, {
                reviewerName: username,
                rating: userRating,
                comments: userFeedback,
                booking_id: booking_id
            }, { shouldAddAuth: true })
            .then((res) => {
                if (res.status === 200) {
                    setModalOpen(false);
                    setLoading(false);
                    alert("Your Review Successfully")
                    nav("/userProfile");

                }
            })
            .catch((err) => {
                setLoading(false);
                alert(err.response.data.message)
            });
    };


    const addToFavorite = (booking) => {

        console.log("provide data", booking)
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };

        axios
            .post(`${IP}/user/addTofavorites/${booking?.providerInfo[0]?.provider_id}/${user_id}/${booking?._id}`, {}, config)
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
    // Determine whether to show details based on booking status
    const showDetails = post.service_status !== "completed";

    return (
        <>
            <div className="booking-card">
                <div className="booking-card-content" onClick={() => showDetails && toggleEvent(post.id)}>
                    <span className="booking-card-ripple"></span>
                    <div className="booking-card-time">
                        <h3 className="booking-card-time-scheduled">{post.scheduled_timing}</h3>
                        <h4 className="booking-card-time-date">
                            {moment(post.scheduled_date).format("Do MMMM YYYY")}
                        </h4>
                    </div>
                    <div className="booking-card-profile">
                        <span className="booking-card-avatar">
                            <img src={`${IP}/file/${post?.attachments}`} width={60} height={60} alt="Avatar" />
                        </span>
                        <div className="booking-card-text">
                            <h3>{post?.service_name}</h3>
                            <p>{post.service_time}</p>

                            {
                                rating && (
                                    <div className="rating-review-container">
                                        {
                                            !post?.ratings?.length > 0 ? (
                                                <button className="btn btn-primary sub" id="review-rating-button" onClick={() => handleToggle(post)}>Feedback</button>

                                            ) : (
                                                <Rating
                                                    value={post?.ratings && post.ratings.length > 0 ? post.ratings[0] : 0}
                                                    count={5}
                                                    size={24}
                                                    activeColor="#007bff"
                                                />
                                            )
                                        }
                                    </div>
                                )
                            }



                        </div>


                        <div className="booking-card-addons">
                            <div>
                                <h3>Add-ons:</h3>
                                {post.add_ons_details.map((addon, index) => (
                                    <p key={index}>{addon.title}</p>
                                ))}
                            </div>

                            {
                                favrate && (
                                    <div>
                                        {!post?.ratings?.length > 0 ? (
                                            <div style={{ cursor: "pointer", fontSize: "30px" }}>❤️‍</div>
                                        ) : (
                                            <button className="btn btn-primary sub" id="review-rating-button" onClick={() => addToFavorite(post)}>Favorites</button>
                                        )}
                                    </div>
                                )
                            }



                        </div>
                    </div>
                    {isOpen && showDetails && <BookingDetails post={post} card_id={post._id} />}
                </div>

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
        </>

    );
}

export default BookingCard;
