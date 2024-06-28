import React, { useState, useEffect, useCallback } from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import EarningsCard from "../components/earnings/EarningsCard";
import RequestCard from "../components/newrequests/RequestCard";
import ScheduledEvents from "./ScheduledEvents";
import { IP } from "../../Constant"
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from "../../Components/Pages/Redux/counterSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const request = formData.booking_request && formData.booking_request[0] ? formData.booking_request[0] : "";
  // const wallate = formData.provider_wallet && formData.provider_wallet[0] ? formData.provider_wallet[0] : "";
  const nav = useNavigate()

  // const [request, setreq] = useState([])
  const token = localStorage.getItem('providertoken')


  const [wallate, setWallate] = useState();



  useEffect(() => {
    fetch(`${IP}/provider/getProviderWallet`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {

      setWallate(result.wallet)
      // dispatch(updateInputData({ formName: 'provider_wallet', inputData: result.wallet }));

    }).catch(err => {
      console.log(err)
    })



  }, [wallate,dispatch])


  console.log("wallate wallate",wallate)


  const fetchData = useCallback(() => {
    fetch(`${IP}/provider/requests`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      // setreq(result)
      dispatch(updateInputData({ formName: 'booking_request', inputData: result }));
      // console.log("request data", result)
    }).catch(err => {
      console.log(err)
    });
  }, [token ,dispatch]);

  useEffect(() => {
    fetchData();
  }, [request ,dispatch]);








  console.log("data request", request)


  return (
    <Container className="dashboardprovider">
      <Row>
        <div className="col-md-12">
          <h2 className="text-center mt-2">Earnings</h2>
          <Row>
            <EarningsCard label="Net Income" amt={wallate?.available_amount?.toFixed(2)} />
            <EarningsCard label="Total Withdrawn" amt={wallate?.total_withdrawn.toFixed(2)} />

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
                      paymentIntentId={cur.paymentIntentId}
                      gendercheck={cur.gendercheck}
                      add_ons={cur.add_ons}
                      add_ons_details={cur.add_ons_details}
                      massage_for={cur.massage_for}
                      // amount_calculation={cur.amount_calculation}
                      amount_calculation={cur.provider_amount_calculation}

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
