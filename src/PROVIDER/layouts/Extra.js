import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import EarningsCard from "../components/earnings/EarningsCard";
import RequestCard from "../components/newrequests/RequestCard";
import ScheduledEvents from "./ScheduledEvents";
import { IP } from "../../Constant"
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const nav = useNavigate()

  const [request, setreq] = useState([])
  const token = localStorage.getItem('providertoken')
  const [withdraw, setWithdraw] = useState([])
  const [available, setAvailble] = useState([])
  const [neyincome, setNeyincome] = useState([]);



  useEffect(() => {
    fetch(`${IP}/provider/available`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setWithdraw(result)
      console.log("available", result)
    }).catch(err => {
      console.log(err)
    })


    fetch(`${IP}/provider/fetchwitdrawl`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setAvailble(result)
      console.log("fetchwitdrawl", result)
    }).catch(err => {
      console.log(err)
    })

    fetch(`${IP}/provider/net-income`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setNeyincome(result.net_income)
      console.log("net-income", result.net_income)
    }).catch(err => {
      console.log(err)
    })
  }, [])














  //request api
  useEffect(() => {
    fetch(`${IP}/provider/requests`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setreq(result)
      console.log("request api", result)
    }).catch(err => {
      console.log(err)
    })
  }, [])


  return (
    <Container className="dashboardprovider">
      <Row>
        <div className="col-md-12">
          <h2 className="text-center mt-2">Earnings</h2>
          <Row>
            <EarningsCard label="Net Income" amt={neyincome} />
            <EarningsCard label="Withdrawn" amt={withdraw} />
            <EarningsCard label="Pending Clearance" amt="100" />
            <EarningsCard label="Available for Withdrawl" amt={available} />
          </Row>
        </div>
        <div className="col-md-12">
          <Row>
            <div className="col-md-6">
              <div className="shadow card px-2" style={{ border: "none" }}>
                <h2 className="text-center mt-2">New Requests</h2>



                {Array.isArray(request) && request.map((cur, index) => (
                  <React.Fragment key={index}>
                    <RequestCard
                      newclient="true"
                      title={cur.service}
                      location={cur.location}
                      time={cur.scheduled_time}
                      date={cur.scheduled_date}
                      amt={75}
                      tip={15}
                      instructions={cur.instructions}
                      total={cur.total}
                      _id={cur._id}

                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="schoduledasboard">
                <ScheduledEvents />

              </div>
            </div>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default Dashboard;
