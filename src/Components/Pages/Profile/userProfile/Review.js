import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Rating from "react-rating-stars-component";
import { IP } from "../../../../Constant";
import axios from "../../../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"; // Ensure this is imported
import "./Profile.css";

function Review() {
    const location = useLocation();
    const nav = useNavigate();
    const [userRating, setUserRating] = useState(0);
    const [userFeedback, setUserFeedback] = useState("");
    const [username, setUsername] = useState("");
    const [servicename, setService] = useState("");
    const [booking_id, setBookingId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const bookingId = params.get('booking_id');
        const userId = params.get('userId');
        const username = params.get('username');
        const servicename = params.get('servicename');
        setBookingId(bookingId);
        setUserId(userId);
        setUsername(username);
        setService(servicename);
    }, [location.search]);

    const handleSubmitRating = () => {
        setLoading(true);
        axios
            .post(`${IP}/user/addReview`, {
                reviewerName: username,
                rating: userRating,
                comments: userFeedback,
                booking_id: booking_id,
                userId: userId
            }, { shouldAddAuth: true })
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    toast.success("Your Review was submitted successfully", {
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
                setLoading(false);
                console.log(err);
                toast.error(err.response?.data?.message || "An error occurred", {
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

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
    };

    const handleFeedbackChange = (event) => {
        setUserFeedback(event.target.value);
    };

    return (
        <>
            <div className="modal-wrapper-review profileSpace">
                <div className="modal-content-review-user">
                    <span className="close">
                        &times;
                    </span>
                    <h3>Rate your experience</h3>
                    <p>{servicename}</p>
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
            <ToastContainer />
        </>
    );
}

export default Review;
