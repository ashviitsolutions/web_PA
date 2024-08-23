import React from 'react';

function BookingDetails({ post ,card_id}) {

    console.log('card_idcard_id',card_id)
    return (
        <div className="booking-details">
            <div className="booking-details-address">
                <p>{post.address}</p>
                {post.location_type === "provider" && (
                    <button className="booking-details-button">Get Directions</button>
                )}
            </div>
            <hr />
            <div className="booking-details-host">
                <p>
                    {post?.service_status === "pending" ? (
                        "Your request is being reviewed by our service providers. Once accepted, we will notify you!"
                    ) : (
                        <>Appointment with <b>{post?.providerInfo[0]?.first_name} {post?.providerInfo[0]?.last_name}</b></>
                    )}
                </p>
            </div>
            <div className="booking-details-billing">
                <h3 className="booking-details-billing-amount">$ {post?.user_amount_calculation?.totalAmountWithTax?.toFixed(2)}</h3>
                <h3 className="booking-details-billing-status">{post?.service_status}</h3>
            </div>
        </div>
    );
}

export default BookingDetails;
