import React, { useState } from 'react';
import BookingCard from './BookingCard';

function BookingList({ bookings, status, favrate, rating }) {
    // State to manage the currently opened card's ID
    const [openCardId, setOpenCardId] = useState(null);

    const handleCardClick = (id) => {
        if (status === "pending" || status === "scheduled") {
            // Toggle the card details view
            if (openCardId === id) {
                setOpenCardId(null); // Close if already open
            } else {
                setOpenCardId(id); // Open new card
            }
        }
    };

    if (bookings.length === 0) {
        return <h3 className="booking-no-data">No {status} bookings found.</h3>;
    }

    let title;
    switch (status) {
        case "pending":
            title = "Pending Bookings";
            break;
        case "scheduled":
            title = "Scheduled Bookings";
            break;
        case "completed":
            title = "History Bookings";
            break;
        default:
            title = "";
    }

    return (
        <>
            <div id="booking-card-content">
                <h3>{title}</h3>
            </div>
            <div className="booking-list-container">
                {bookings.map((post) => (
                    <BookingCard
                        key={post.id}
                        post={post}
                        toggleEvent={() => handleCardClick(post._id)}
                        isOpen={post._id === openCardId}
                        card_id={post.id}
                        favrate={favrate}
                        rating={rating}
                    />
                ))}
            </div>
        </>
    );
}

export default BookingList;
