import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ServicesCard from "../components/services/ServicesCard";
import { IP } from "../../Constant";

const Services = () => {
  const [radioValue, setRadioValue] = useState("1");
  const [ondemand, setOndemand] = useState([]);
  const [privateEvent, setPrivateEvent] = useState([]);
  const [corporate, setCorporate] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const token = localStorage.getItem("providertoken");

  const radios = [
    { name: "Corporate Events", value: "1" },
    { name: "Service on Demand", value: "2" },
    { name: "Private Events", value: "3" },

  ];



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
        console.log("srvice data", result)
        setOndemand(result?.areas_of_expertise?.on_demand);
        setPrivateEvent(result?.areas_of_expertise?.private_events);
        setCorporate(result?.areas_of_expertise?.corporate_events)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);






  useEffect(() => {
    if (radioValue === "1") {
      setSelectedServices(
        corporate.map((service) => ({
          ...service,
          title: `${service}`,
        }))
      );
    } else if (radioValue === "2") {
      setSelectedServices(
        ondemand.map((service) => ({
          ...service,
          title: `${service}`,
        }))
      );
    } else if (radioValue === "3") {
      setSelectedServices(
        privateEvent.map((service) => ({
          ...service,
          title: `${service}`,
        }))
      );
    }
  }, [radioValue, corporate, ondemand, privateEvent]);



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
      <div id="types" className='marketplace'>
        <div className="row">
          {/* render the selected services */}
          {selectedServices.map((service, idx) => (
            <ServicesCard key={idx} {...service} />
          ))}
      </div>
    </div>
    </Container>
  );
};

export default Services;
