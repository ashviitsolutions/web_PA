import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import ScheduledRequestCard from "../components/ScheduledRequestCard";
import { IP } from "../../Constant";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";

const ScheduledEvents = () => {
  const nav = useNavigate()
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("providertoken");



  //request api
  // useEffect(() => {
  //   fetch(`${IP}/provider/events/scheduled`, {
  //     headers: {
  //       'Authorization': token
  //     }
  //   }).then(resp => {
  //     return resp.json()
  //   }).then(result => {
  //     setUser(result.scheduled);

  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [user])
  const fetchData = useCallback(() => {
    fetch(`${IP}/provider/events/scheduled`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setUser(result.scheduled);
    }).catch(err => {
      console.log(err)
    });
  }, [token, setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  console.log("scheduled dfrghdfhdfhdfhapi", user)





  return (
    <Container className="schedule-card">
      <h2 className="text-center mt-2" id="schedule-title">
        Scheduled Events
      </h2>
      {user.map((cur, index) => (
        <React.Fragment key={index}>
          <ScheduledRequestCard
            key={index}
            title={cur.service_id.title}
            location={cur.address}
            time={cur.scheduled_timing}
            date={cur.scheduled_date}
            amt={75}
            tip={15}
            instructions={cur.instructions}
            amount={cur.amount_charged}
            user_id={cur.service_id._id}
            paymentIntentId={cur.paymentIntentId}
            _id={cur._id}

          />

        </React.Fragment>
      ))}
    </Container>
  );
};

export default ScheduledEvents;
