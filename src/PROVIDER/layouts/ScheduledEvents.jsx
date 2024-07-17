import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import ScheduledRequestCard from "../components/ScheduledRequestCard";
import { IP } from "../../Constant";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from "../../Components/Pages/Redux/counterSlice";

import axios from "axios";

const ScheduledEvents = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.booking_scheduled && formData.booking_scheduled[0] ? formData.booking_scheduled[0] : "";
  const nav = useNavigate();
  // const [user, setUser] = useState(userdefined);
  const token = localStorage.getItem("providertoken");

  const fetchData = useCallback(() => {
    fetch(`${IP}/provider/requests?service_status=scheduled`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        // setUser(result.scheduled);
        dispatch(updateInputData({ formName: 'booking_scheduled', inputData: result }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [nav, token]);


  console.log("user schudule booking", user)

  const refundPayment = async (paymentIntentId) => {
    try {
      const response = await axios.post(`${IP}/payment/refund`, {
        paymentIntentId,
      });
      console.log("Payment refunded successfully:", response.data);
      // Remove the refunded booking from the user state
      // setUser((prevUser) =>
      //   prevUser.filter((booking) => booking.paymentIntentId !== paymentIntentId)
      // );
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
      {Array.isArray(user) && user?.map((cur, index) => (
        <ScheduledRequestCard
          key={index}
          title={cur.service_name}
          location={cur.address}
          getlocation={cur?.location?.coordinates}
          date={cur.scheduled_date}
          time={cur.scheduled_timing}
          locationType={cur.location_type}
          massage_for={cur.massage_for}
          amt={75}
          tip={15}
          instructions={cur.instructions}
          amount={cur.amount_charged}
          gender={cur.gender}
          service_id={cur.service_id}
          paymentIntentId={cur.paymentIntentId}
          add_ons_details={cur.add_ons_details}
          serviceTime={cur.service_time}
          gendercheck={cur.gender}
          areasOfConcern={cur.areas_of_concern}
          healthConditions={cur.health_conditions}
          massageBodyPart={cur.massage_body_part}
          specialConsiderations={cur.special_considerations}
          amount_calculation={cur.provider_amount_calculation}
          _id={cur._id}

        />
      ))}
    </Container>
  );
};

export default ScheduledEvents;
