import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import EventsCard from "../components/events/EventsCard";
import ScheduledRequestCard from "../components/ScheduledRequestCard";
import { IP } from "../../Constant";
import RequestCard from "../components/newrequests/RequestCard"
// import ServicesCard from "../components/services/ServicesCard";
// import ScheduledRequestCard from "../components/BookingCard";
import { useNavigate } from "react-router-dom";


const Events = () => {
  const nav = useNavigate()
  const [radioValue, setRadioValue] = useState('1');
  const [ondemand, setOndemand] = useState([]);
  const [privateEvent, setPrivateEvent] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const [request, setreq] = useState([])

  const token = localStorage.getItem("providertoken");
  const radios = [
    { name: "Booked Events", value: "1" },
    { name: "Completed Events", value: "2" },
    { name: "New Events", value: "3" },

  ];



  useEffect(() => {
    fetch(`${IP}/provider/events/completed`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((result) => {
        setUser(result.completed);
        // console.log("boking completd", result.completed);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    fetch(`${IP}/provider/events/booked`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((result) => {
        setBooking(result.scheduled);
        console.log("boking setBooking", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);







  useEffect(() => {
    if (radioValue === "2") {
      setSelectedServices(privateEvent.map(service => {
        return { ...service, title: service + " (Private)" };
      }));
    } else if (radioValue === "3") {
      setSelectedServices(ondemand.map(service => {
        return { ...service, title: service + " (On Demand)" };
      }));
    }
  }, [radioValue, ondemand, privateEvent]);


  useEffect(() => {
    fetch(`${IP}/provider/requests`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setreq(result)
      // console.log("request api", result)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  console.log("data request", request)


  return (
    <Container className="schudulecard">
      <h2 className="text-center mt-2" id="schudule-title">Events</h2>
      <div className="mb-4">
        <div className="text-center">
          <ButtonGroup className="my-4">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-primary" : "outline-primary"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </div>



      {radioValue === '2' && (
        <>


          {user.map((cur, index) => (
            <React.Fragment key={index}>
              <ScheduledRequestCard />

            </React.Fragment>
          ))}

        </>
      )}

      {radioValue === '1' && (
        <>
          {booking.map((cur, index) => (
            <React.Fragment key={index}>
              <ScheduledRequestCard
                title={cur.service_id.title}
                location={cur.address}
                time={cur.scheduled_timing}
                date={cur.scheduled_date}
                amt={75}
                tip={15}
                instructions={cur.instructions}
                amount={cur.amount_charged}
              />

            </React.Fragment>
          ))}
        </>
      )}

      {radioValue === '3' && (
        <>
          {Array.isArray(request) && request.map((cur, index) => (
            <React.Fragment key={index}>
              <RequestCard
                newclient="true"
                title={cur.service}
                location={cur.location}
                address={cur.address}
                time={cur.scheduled_time}
                date={cur.scheduled_date}
                amt={75}  // Update this with the actual logic for calculating amount
                tip={15}  // Update this with the actual logic for calculating tip
                instructions={cur.instructions}
                total={cur.total}
                _id={cur._id}
                areasOfConcern={cur.areas_of_concern}
                customerEmail={cur.customer_email}
                gender={cur.gender}
                healthConditions={cur.health_conditions}
                locationType={cur.location_type}
                massageBodyPart={cur.massage_body_part}
                massageFor={cur.massage_for}
                serviceTime={cur.service_time}
                specialConsiderations={cur.special_considerations}
              />

            </React.Fragment>
          ))}

        </>
      )}



    </Container>
  );
};

export default Events;
