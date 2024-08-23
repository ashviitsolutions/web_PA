import React from 'react';
import BookingDetails from './BookingDetails';
import { IP } from "../../../../../Constant";
import moment from 'moment';
import Rating from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingCard({ post, toggleEvent, isOpen, rating, favrate }) {
    const nav = useNavigate()
    const user_id = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    // Determine whether to show details based on booking status
    const handleToggle = (booking) => {
        nav(`/userProfile/review?servicename=${booking?.service_name}&booking_id=${booking._id}&userId=${user_id}`)

    };
    const addToFavorite = (booking) => {

        console.log("provide data", booking)
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };


        axios.post(`${IP}/user/addTofavorites/${booking?.providerInfo[0]?.provider_id}/${user_id}/${booking?._id}`, {}, config)
            .then((res) => {
                alert(res.data.message)
                nav("/userProfile");

            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data.message)

            });
    };
    const showDetails = post.service_status !== "completed";

    return (
        <div className="booking-card">
            <div className="booking-card-content" onClick={() => showDetails && toggleEvent(post.id)}>
                <span className="booking-card-ripple"></span>
                <div className="booking-card-time">
                    <h3 className="booking-card-time-scheduled">Apt Time: {post.scheduled_timing}</h3>
                    <h4 className="booking-card-time-date">
                        {moment(post.scheduled_date).format("MMMM Do YYYY")}
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
                                        <button className="btn btn-primary sub" id="review-rating-button" onClick={() => addToFavorite(post)}>Add to Favorites</button>
                                    )}
                                </div>
                            )
                        }



                    </div>
                </div>
                {isOpen && showDetails && <BookingDetails post={post} card_id={post._id} />}
            </div>
        </div>
    );
}

export default BookingCard;
