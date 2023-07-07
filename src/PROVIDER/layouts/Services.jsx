import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ServicesCard from "../components/services/ServicesCard";
import { IP } from "../../Constant";

const Services = () => {
  const [radioValue, setRadioValue] = useState("1");
  const [ondemand, setOndemand] = useState([]);
  const [privateEvent, setPrivateEvent] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const token = localStorage.getItem("providertoken");

  const radios = [
    { name: "Corporate Private Events", value: "1" },
    { name: "Service on Demand", value: "2" },
  ];

  // const services = [
  
  //   {
  //     title: "Couple Deep Tissue Massage1",
  //     location: 'Jersey city, NJ 546842',
  //     time: 'Sun, June 12, 06:30pm',
  //     amt: 75,
  //     tip: null,
  //     instructions: null
  //   },
  //   {
  //     title: "Service 3",
  //     location: 'Location 3',
  //     time: 'Time 3',
  //     amt: 50,
  //     tip: 10,
  //     instructions: 'Instructions for Service 3'
  //   },
    
  // ];







  useEffect(() => {
    fetch(`${IP}/provider/profile`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        setOndemand(result?.areas_of_expertise?.on_demand);
        setPrivateEvent(result?.areas_of_expertise?.private_events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (radioValue === "1") {
      setSelectedServices(privateEvent.map(service => {
        return { ...service, title: service + " (Private)" };
      }));
    } else if (radioValue === "2") {
      setSelectedServices(ondemand.map(service => {
        return { ...service, title: service + " (On Demand)" };
      }));
    }
  }, [radioValue, ondemand, privateEvent]);
  

  return (
    <Container className="schudulecard">
      <h2 className="text-center mt-2" id="schudule-title">
        Services
      </h2>


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

      {/* render the selected services */}
      {selectedServices.map((service, idx) => (
        <ServicesCard key={idx} {...service} />
      ))}

    </Container>
  );
};

export default Services;
