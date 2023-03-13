
import React from "react";
import Container from "react-bootstrap/Container";
import ScheduledRequestCard from "../components/ScheduledRequestCard";

const ScheduledEvents = () => {
  return (
    <Container  className="schudulecard">
      <h2 className="text-center mt-2" id="schudule-title">Scheduled Events</h2>
      <ScheduledRequestCard
      title="Couple Deep Tissue Massage"
      location='Jersey city, NJ 546842'
      time='Sun, June 12, 06:30pm'
      amt= {75}
      tip= {15}
      instructions = 'Main Nahi bataunga'
  
      />
      <ScheduledRequestCard
      title="Couple Deep Tissue Massage1"
      location='Jersey city, NJ 546842'
      time='Sun, June 12, 06:30pm'
      amt= {75}
   
      />
    </Container>
  );
};

export default ScheduledEvents;