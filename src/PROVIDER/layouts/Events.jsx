import React, { useState, useEffect, useCallback } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import EventsCard from "../components/events/EventsCard";
// import ScheduledRequestCard from "../components/ScheduledRequestCard";
import { IP } from "../../Constant";
import RequestCard from "../components/newrequests/RequestCard"
import Completed from "../components/newrequests/Completed";
// import ServicesCard from "../components/services/ServicesCard";
// import ScheduledRequestCard from "../components/BookingCard";
import ScheduledEvents from "./ScheduledEvents";
import ScheduledRequestCard from "../components/ScheduledRequestCard";
import { updateInputData } from "../../Components/Pages/Redux/counterSlice"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';



const Events = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const request = formData.booking_request && formData.booking_request[0] ? formData.booking_request[0] : "";
  const schule = formData.booking_scheduled && formData.booking_scheduled[0] ? formData.booking_scheduled[0] : "";
  const user = formData.booking_completed && formData.booking_completed[0] ? formData.booking_completed[0] : "";

  const nav = useNavigate()
  const [radioValue, setRadioValue] = useState('1');
  const [ondemand, setOndemand] = useState([]);
  const [privateEvent, setPrivateEvent] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  // const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  // const [request, setreq] = useState([])

  const token = localStorage.getItem("providertoken");
  const radios = [
    { name: "Upcoming", value: "1" },
    { name: "Finished", value: "2" },
    { name: "New Requests", value: "3" },

  ];






  const fetchData = useCallback(() => {
    fetch(`${IP}/provider/requests?service_status=scheduled`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        // setSchudule(result.scheduled);
        dispatch(updateInputData({ formName: 'booking_scheduled', inputData: result }));

      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);




  useEffect(() => {
    fetch(`${IP}/provider/requests?service_status=completed`, {
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
        console.log("boking completd", result);
        dispatch(updateInputData({ formName: 'booking_completed', inputData: result }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("boking completd", user);

  useEffect(() => {
    fetch(`${IP}/provider/requests?service_status=pending`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      // setreq(result)
      dispatch(updateInputData({ formName: 'booking_request', inputData: result }));
      // console.log("request api", result)
    }).catch(err => {
      console.log(err)
    })
  }, [])


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



  console.log("data request", request)


  return (
    <div className="schudulecard">
      <h2 className="text-center mt-2" id="schudule-title">Appointments</h2>
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

          {Array.isArray(user) && user?.map((cur, index) => (
            <React.Fragment key={index}>
              <Completed
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
                user_id={cur.service_id._id}
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

            </React.Fragment>
          ))}

        </>
      )}

      {radioValue === '1' && (
        <>
          {Array.isArray(schule) && schule?.map((cur, index) => (
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
        </>


      )}

      {radioValue === '3' && (
        <>
          {Array.isArray(request) && request.map((cur, index) => (
            <React.Fragment key={index}>
              <RequestCard
                event='event'
                newclient="true"
                title={cur.service_name}
                location={cur.location}
                address={cur.address}
                time={cur.scheduled_timing}
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
                paymentIntentId={cur.paymentIntentId}
                gendercheck={cur.gendercheck}
                add_ons={cur.add_ons}
                add_ons_details={cur.add_ons_details}
                massage_for={cur.massage_for}
                amount_calculation={cur.provider_amount_calculation}
              />

            </React.Fragment>
          ))}

        </>
      )}



    </div>
  );
};

export default Events;
