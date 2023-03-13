
import React, { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ServicesCard from "../components/services/ServicesCard";

const Services = () => {
   const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Corporate Wellness Events', value: '1' },
    { name: 'Corporate Private Events', value: '2' },
    { name: 'Service on Demand', value: '3' },
  ];

  return (
    <Container className="schudulecard">
      <h2 className="text-center mt-2" id="schudule-title">Services</h2>
      
      <div className="text-center">
         <ButtonGroup className="my-4">
           {radios.map((radio, idx) => (
             <ToggleButton
               key={idx}
               id={`radio-${idx}`}
               type="radio"
               variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
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
      <ServicesCard
      title="Couple Deep Tissue Massage"
      location='Jersey city, NJ 546842'
      time='Sun, June 12, 06:30pm'
      amt= {75}
      tip= {15}
      instructions = 'Main Nahi bataunga'
      />
      <ServicesCard
      title="Couple Deep Tissue Massage1"
      location='Jersey city, NJ 546842'
      time='Sun, June 12, 06:30pm'
      amt= {75}
      />
    </Container>
  );
};

export default Services;