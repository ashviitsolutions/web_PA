import React, { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import EventsCard from "../components/events/EventsCard";

const Events = () => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: "Booked Events", value: "1" },
    { name: "Completed Events", value: "2" },
    { name: "Payment Pending", value: "3" },
    { name: "Paid Events", value: "4" },
  ];
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
      <EventsCard
        title="Couple Deep Tissue Massage"
        location="Jersey city, NJ 546842"
        time="Sun, June 12, 06:30pm"
        amt={75}
        tip={15}                                            
        instructions="Main Nahi bataunga"
      />
      <EventsCard
        title="Couple Deep Tissue Massage1"
        location="Jersey city, NJ 546842"
        time="Sun, June 12, 06:30pm"
        amt={75}
      />
    </Container>
  );
};

export default Events;
