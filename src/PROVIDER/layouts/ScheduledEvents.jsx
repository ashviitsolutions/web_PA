import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import ScheduledRequestCard from "../components/ScheduledRequestCard";
import { IP } from "../../Constant";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import axios from "axios";

const ScheduledEvents = () => {
  const nav = useNavigate();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("providertoken");

  const fetchData = useCallback(() => {
    fetch(`${IP}/provider/events/scheduled`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setUser(result.scheduled);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  console.log("user schudule date", user)

  const refundPayment = async (paymentIntentId) => {
    try {
      const response = await axios.post(`${IP}/payment/refund`, {
        paymentIntentId,
      });
      console.log("Payment refunded successfully:", response.data);
      // Remove the refunded booking from the user state
      setUser((prevUser) =>
        prevUser.filter((booking) => booking.paymentIntentId !== paymentIntentId)
      );
    } catch (error) {
      console.error("Error refunding payment:", error);
    }
  };

  useEffect(() => {
    const checkRefundableBookings = () => {
      user.forEach((booking) => {
        const updatedAt = new Date(booking.updatedAt).getTime();
        const currentTime = new Date().getTime();
        const timeDiffInHours = Math.abs(currentTime - updatedAt) / (1000 * 60 * 60);

        if (timeDiffInHours > 24) {
          // Trigger refund for bookings exceeding 24 hours
          refundPayment(booking.paymentIntentId);
        }
      });
    };

    const timer = setInterval(checkRefundableBookings, 3600000); // Check every hour
    return () => clearInterval(timer);
  }, [user, refundPayment]);


  return (
    <Container className="schedule-card">
      <h2 className="text-center mt-2" id="schedule-title">
        Scheduled Events
      </h2>
      {user.map((cur, index) => (
        <ScheduledRequestCard
          key={index}
          title={cur.service_id.title}
          location={cur.address}
          date={cur.scheduled_date}
          time={cur.scheduled_timing}
          amt={75}
          tip={15}
          instructions={cur.instructions}
          amount={cur.amount_charged}
          user_id={cur.service_id._id}
          paymentIntentId={cur.paymentIntentId}
          add_ons_details={cur.add_ons_details}
          serviceTime={cur.service_time}
          gendercheck={cur.gendercheck}
          _id={cur._id}
        />
      ))}
    </Container>
  );
};

export default ScheduledEvents;
