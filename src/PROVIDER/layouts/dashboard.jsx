import React from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import EarningsCard from "../components/earnings/EarningsCard";
import RequestCard from "../components/newrequests/RequestCard";
import ScheduledRequestCard from "../components/ScheduledRequestCard";

const Dashboard = () => {
  return (
    <Container className="dashboardprovider">
      <Row>
        <div className="col-md-12">
          <h2 className="text-center mt-2">Earnings</h2>
          <Row>
            <EarningsCard label="Net Income" amt="1000" />
            <EarningsCard label="Withdrawn" amt="450" />
            <EarningsCard label="Pending Clearance" amt="100" />
            <EarningsCard label="Available for Withdrawl" amt="80" />
          </Row>
        </div>
        <div className="col-md-12">
          <Row>
            <div className="col-md-6">
              <div className="shadow card px-2" style={{ border: "none" }}>
                <h2 className="text-center mt-2">New Requests</h2>
                <RequestCard
                  newclient="true"
                  title="Couple Deep Tissue Massage"
                  location="Jersey city, NJ 546842"
                  time="Sun, June 12, 06:30pm"
                  amt={75}
                  tip={15}
                  instructions="Main Nahi bataunga"
                />
                <RequestCard
                  title="Couple Deep Tissue Massage1"
                  location="Jersey city, NJ 546842"
                  time="Sun, June 12, 06:30pm"
                  amt={75}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="shadow card px-2" style={{ border: "none" }}>
                <h2 className="text-center mt-2">Scheduled Events</h2>
                <ScheduledRequestCard
                  title="Couple Deep Tissue Massage"
                  location="Jersey city, NJ 546842"
                  time="Sun, June 12, 06:30pm"
                  amt={75}
                  tip={15}
                  instructions="Main Nahi bataunga"
                />
                <ScheduledRequestCard
                  title="Couple Deep Tissue Massage1"
                  location="Jersey city, NJ 546842"
                  time="Sun, June 12, 06:30pm"
                  amt={75}
                />
              </div>
            </div>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default Dashboard;
